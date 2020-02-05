# Modern Select

Example : modern-select/demo/index.html

![alt preview](https://zupimages.net/up/20/06/r55p.gif)

## installation

Download the zip and include build files inside your html file

```html
<link rel="stylesheet" href="path/to/modernselect.css">
<script src="path/to/modernselect.js"></script>
```

or install with npm

```shell
npm install @nekodev/modernselect --save
```

Include the files :

From your javascript
```js
import ModernSelect from '@nekodev/modernselect'
```

From your scss
```scss
@import '~@nekodev/modernselect/src/scss/modernselect.scss'
```

If using SCSS, you can customize some varaible :
```scss
$option-background: #FFFFFF !default;
$option-background-hover: lightgrey !default;
$output-radius: .2em !default;
$output-icon-size: 30px !default;
$dropdown-animation-duration: .3s !default;
$border: solid 1px rgba(0, 0, 0, .2) !default;
```

## Initialisation

```html
<div class="modern-select" id="modern-select">
    <div data-value="" data-placeholder>Select value</div>
    <div data-value="1">
        <div class="select-content">
            <img src="https://picsum.photos/id/0/200">
            <span>Computer</span>
        </div>
    </div>
    <div data-value="2">
        <div class="select-content">
            <img src="https://picsum.photos/id/10/200">
            <span>Forest</span>
        </div>
    </div>
    <div data-value="3">
        <div class="select-content">
            <img src="https://picsum.photos/id/237/200">
            <span>Dog</span>
        </div>
    </div>
    <div data-value="4">
        <div class="select-content">
            <img src="https://picsum.photos/id/1001/200">
            <span>Sea</span>
        </div>
    </div>
</div>
```

```js
let modernSelect = new ModernSelect("#modern-select", {
                        formName: "choice",
                        animation: "fade-in",
                        icon: `<i class="fas fa-arrow-down"></i>`,
                        customClass: "my-custom-class"
                    })
```

All element with `data-value` propertie have same role than `<option value="someValue"></option>`. So all `data-value` elements are considère has option. You can also customise the option has you need.

## Options

| Option      | Value type | Description                                                                                                                       |
|-------------|------------|-----------------------------------------------------------------------------------------------------------------------------------|
| formName    | String     | The name of the select input. You can access to form request name with this property                                              |
| animation   | String     | The animation class that you want to apply when the dropdown is opened. You can create your once or use library like animate.css. |
| icon        | String     | You can add some image or fontawesome element for example.  ex. : `icon: <i class="fas fa-arrow-down"></i>`                       |
| customClass | String     | The custom class you want to add to the output element. With this class, you can change the design of this element.               |

## Methods

| Method | return | Description                                   |
|--------|--------|-----------------------------------------------|
| value  | void   | Set a new value to the custom-select element. |
| close  | void   | Close the dropdown.                           |
| on     | void   | Event listener for triggered event.           |

## Events

Your element send three events : `change`, `open`, `close`
You can listen event with :

```js
modernSelect.on('change', function() {
    doSometing()
})
```

The change event is trigger only if the value of the element is changing.  
**Warning :** If you change the value with the `value()` method and if the value is not defined in any `data-value` element, you can get a warrning in the console. No effect on your script, no crash. For turn off this feature set debug to false like this :

```js
modernSelect.debug = false
```
