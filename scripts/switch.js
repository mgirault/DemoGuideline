#!/usr/bin/env node

const spawn =  require('cross-spawn');
const prompts = require('prompts');

async function askUsername() {
	const { username } = await prompts({
		type: 'text',
		name: 'username',
		message: `What is your username ?`,
		validate: value => value ? true : 'Please enter your git username',
	});
	return username;
}

async function gitBranch(username, remote) {
	return new Promise((resolve, reject) => {
		let branches = [];
		const options = ['branch'];
		if(remote) {
			options.push('-r');
		}

		const thread = spawn('git', options);

		thread.stdout.on('data', (data) => {
			branches = data.toString('utf8').split('\n');
		});
		thread.stderr.on('data', (data) => {
			reject(data.toString('utf8'));
		});
		thread.on('close', () => {
			resolve(branches);
		});
	})
		.then(
			branches => branches
				.map(branch => branch.replace('origin/', '').trim())
				.filter(branch => branch.indexOf(username) === 0)
		);
}

async function getBranches(username) {
	let localBranches;
	return gitBranch(username)
		.then(branches => { localBranches = branches; })
		.then(() => gitBranch(username, /* remote */ true))
		.then(remoteBranches => {
			const allBranches = localBranches.concat(remoteBranches);
			return [...new Set(allBranches)];
		});
}

async function askBranch(branches) {
	const { branch } = await prompts({
		type: 'select',
		name: 'branch',
		message: `Choose your branch`,
		choices: branches.map(branch => ({ title: branch, value: branch })),
	});
	return branch;
}

async function goToBranch(branch) {
	spawn.sync('git', ['checkout', branch], { stdio: 'inherit' });
}

console.log("Let's switch branch !");
// TODO check if we have changed files
askUsername()
	.then(getBranches)
	.then(askBranch)
	.then(goToBranch)
	.then(() => { console.log('You\'re good to go !'); });
