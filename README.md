# Autoform Password 2

Standard HTML5 Password input with some extended features:

* toggle input visibility
* specifiy regex based rues to be fulfilled
* display rules to users a fulfilled or pending
* display a fontawesome (4 or 5) icon
* Bootstrap 4 compatible (requires `imajus:autoform-bootstrap4`)

## Usage

Define the following schema to enable all options:

```javascript
{
  password: {
      type: String,
      min: min, // min and max are used for validation
      max: max, // beyond the internals of this component
      autoform: {
        type: 'password2',
        rules: rules,
        visibilityButton: true, // toggles password visibility
        visible: visible, // default visibility
        userIcon: 'lock', // font awesome name without prefixes
        css: 'border-0' // custom Bootstrap 4 css
      }
  }
}
``` 

## License

MIT, see [license file](LICENSE.md)
