
# Modal

<div style="display: block; margin-bottom: 20px"> </div>

[API docs] (url)

<div style="display: block; margin-bottom: 40px"> </div>
<div class="index_anchors__17q-7" data-gumshoe="">
  <a href="#general" class="index_a__oUQfl" data-scroll="">General</a>
  <a href="#styles" class="index_a__oUQfl" data-scroll="">Styles</a>
  <a href="#accessibility" class="index_a__oUQfl sw-active" data-scroll="">Accessibility</a>
  <a href="#behavior" class="index_a__oUQfl" data-scroll="">Behavior</a>
  <a href="#motion" class="index_a__oUQfl" data-scroll="">Motion</a>
  <a href="#do" class="index_a__oUQfl" data-scroll="">Do</a>
</div>

## General

### Usage
In this section, you will find all type of dialog boxes present in Talend's UI.
By default dialog boxes will close clicking on cancel, on the closing icon and outside of its own area.

### Confirmation modal
Confirming actions confirm a proposed action. These actions involve adding actions, confirming actions, selecting actions, but can also involve removing actions, such as “Delete” or “Remove,” if it suits the context. They are placed on the right side of the dialog. Dismiss or cancellation actions are placed on the left side of the dialog.
On those type of dialog boxes, close icon cannot be displayed. Because those dialogs are proposing types of actions, we expect the user to clearly dismiss or confirm his action.

## Styles

### Color
| Attribute            | Variable       | HEX / RGBA                                                                |        
|----------------------|:--------------:|--------------------------------------------------------------------------:|
| Background header    | $tc-color-1    | #FFFFFF ![tc-color-1](~assets/images/table/$tc-color-1.svg "tc-color-1)") |
| Border-bottom header | $wild-sand     | #DDDDDD ![wild sand](~assets/images/table/$wild-sand.svg "wild sand")     |
| Text                 | $black         | #202020 ![black](~assets/images/table/$black.svg "black)")                |
| Title                | $black         | #202020 ![black](~assets/images/table/$black.svg "black)")                |
| X icon               | $dove-gray     | #555555 ![dove-gray](~assets/images/table/$dove-gray.svg "Dove-gray)")    |
| Page Overlay         | $transparent   | rgba(0 0 0 0.85)                                                          |

![Modal style](~assets/images/t-modal__style.svg "Modal style")

### Typography

Quitania verni imbres solito crebriores prohibebant auctique torrentes, Herculanus advenit protector domesticus, Hermogenis ex magistro equitum filius, apud Constantinopolim, ut supra rettulimus, popula turbela discerpti.

| Property    | Font size (px/rem) | Font-weight  |
|-------------|:------------------:|-------------:|
| Title       | 16 / 1.6           | Bold / 700   |
| Content     | 15 / 1.5           | Normal / 400 |


### Structure

Quitania verni imbres solito crebriores prohibebant auctique torrentes, Herculanus advenit protector domesticus, Hermogenis ex magistro equitum filius, apud Constantinopolim, ut supra rettulimus, popula turbela discerpti.

| Property          | px    | rem          |
|-------------------|:-----:|-------------:|
| Height header     | 70    | 7            |
| External spacing  | 20    | 2            |
| Spacing : content | 20    | 2            |

## Accessibility

Quitania verni imbres solito crebriores prohibebant auctique torrentes, Herculanus advenit protector domesticus, Hermogenis ex magistro equitum filius, apud Constantinopolim, ut supra rettulimus, popula turbela discerpti.

```html
<div class="modal-dialog">
  <div class="modal-content" role="document">
    <div class="modal-header">
      <button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
      <h4 id="tc-dialog-header" class="modal-title">Hello world</h4>
    </div>
    <div class="modal-body">
      <div>BODY content. You can put what ever you want here</div>
    </div>
    <div class="modal-footer">
      <button aria-label="OK" type="button" class="btn btn-default"><span>OK</span></button>
    </div>
  </div>
</div>
```

## Behavior

Quitania verni imbres solito crebriores prohibebant auctique torrentes, Herculanus advenit protector domesticus, Hermogenis ex magistro equitum filius, apud Constantinopolim, ut supra rettulimus, popula turbela discerpti.

![Modal Behavior](~assets/images/t-modal__style.svg "Modal style")

## Motion
Quitania verni imbres solito crebriores prohibebant auctique torrentes, Herculanus advenit protector domesticus, Hermogenis ex magistro equitum filius, apud Constantinopolim, ut supra rettulimus,  turbela discerpti.

![Modal Motion](~assets/images/t-checkbox__motion.gif "Checkbox Motion")
