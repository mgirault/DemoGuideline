#!/usr/bin/env node

const spawn =  require('cross-spawn');
const prompts = require('prompts');

function getCurrentBranch(data) {
	return new Promise((resolve, reject) => {
		const command = spawn('git', ['symbolic-ref', '-q', 'HEAD']);
		let result = '';
		command.stdout.on('data', (data) => {
			result += data.toString()
		});
		command.on('close', () => {
			resolve(result)
		});
		command.on('error', (err) => { reject(err) })
	})
		.then(branchRef => branchRef.replace('refs/heads/', '').replace('\n', ''))
		.then(branchName => {
			data.currentBranch = branchName;
			return data;
		});
}

async function manageCurrentBranch(data) {
	if (data.currentBranch !== 'master') {
		const branchNameParts = data.currentBranch.split('/');
		const purpose = branchNameParts[branchNameParts.length - 1].replace(/_/g, ' ');
		const { createNew } = await prompts({
			type: 'confirm',
			name: 'createNew',
			message: `You are currently on a branch for "${purpose}". Do you want to create a new one ?`,
		});
		data.createNew = createNew;

		if (!createNew) {
			process.exit(0);
		}
	}

	return data;
}

async function askUsername(data) {
	const { username } = await prompts({
		type: 'text',
		name: 'username',
		message: `What is your username ?`,
		validate: value => value ? true : 'Please enter your git username',
	});
	data.username = username;
	return data;
}

async function askFeatOrFix(data) {
	const { featOrFix } = await prompts({
		type: 'select',
		name: 'featOrFix',
		message: `Is it for a feature or a fix ?`,
		choices: [
			{ title: 'feat', value: 'feat' },
			{ title: 'fix', value: 'fix' },
		],
	});
	data.featOrFix = featOrFix;
	return data;
}

async function askDescription(data) {
	const { description } = await prompts({
		type: 'text',
		name: 'description',
		message: `Describe VERY shortly (3 or 4 words) what this is about`,
		validate: value => value ? true : 'Please provide a description',
	});
	data.description = description;
	return data;
}

function createBranchName(data) {
	const cleanDescription = data.description.replace(/[^\w]/gi, '_');
	data.branchName = `${data.username}/${data.featOrFix}/${cleanDescription}`;
	return data;
}

async function manageExistingBranch(data) {
	// check if branch already exists
	const result = spawn.sync('git', ['rev-parse', '--verify', data.branchName], { stdio: 'inherit' });
	if(result.status === 0) {
		const { createAnotherBranch } = await prompts({
			type: 'confirm',
			name: 'createAnotherBranch',
			message: `A branch with the exact same description already exists. Do you want to create a new one ? (Otherwise, we will go to this existing branch)`,
		});

		if (!createAnotherBranch) {
			spawn.sync('git', ['checkout', data.branchName], { stdio: 'inherit' });
			console.log('You are on the existing branch, you\'re good to go !');
			process.exit(0);
		} else {
			data.branchName = `${data.branchName}_${Math.floor(Math.random() * Math.floor(1000000))}`;
		}
	}

	return data;
}

async function createBranch(data) {
	spawn.sync('git', ['checkout', 'master'], { stdio: 'inherit' });
	spawn.sync('git', ['pull'], { stdio: 'inherit' });
	spawn.sync('git', ['checkout', '-b', data.branchName], { stdio: 'inherit' });

	const { push } = await prompts({
		type: 'confirm',
		name: 'push',
		message: `Do you want to push this branch to github ? (Otherwise, you will stay in local for now)`,
	});
	if (push) {
		spawn.sync('git', ['push', 'origin', data.branchName], { stdio: 'inherit' });
	}

	return data;
}

const data = {};
getCurrentBranch(data)
	.then(manageCurrentBranch)
	.then(askUsername)
	.then(askFeatOrFix)
	.then(askDescription)
	.then(createBranchName)
	.then(manageExistingBranch)
	.then(createBranch)
	.then(() => { console.log('You\'re good to go !'); });
