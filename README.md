# Autoform Password 2

Standard HTML5 Password input with some extended features:

- toggle input visibility
- specifiy regex based rues to be fulfilled
- display rules to users and if they have been fulfilled or are pending
- display a fontawesome (4 or 5) icon
- Bootstrap 4 compatible (requires `communitypackages:autoform-bootstrap4`) but
  not restricted (and not depending) to it

## Import this package

This package now splits between dynamic and static imports.
If you need static imports, please use the following:

```javascript
import { AutoFormPassword2 } from  'meteor/jkuester:autoform-password2'

AutoFormPassword2.load()
```

If you need this via  dynamic import please import as the following:

```javascript
import { AutoFormPassword2 } from 'meteor/jkuester:autoform-password2/dynamic'

AutoFormPassword2.load()
  .catch(e => { ... })
  .then(() => { ... })
```

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

Rules is a list of Objects with the following properties:

```javascript
{
  test: value => Boolean,
  message: value => String
}
```

Each rule will be checked on input of a character against the `test` method and
the message will be displayed below the input.

If a rule passes, it will be marked as green / successfull, if it failed it
will be marked as red / failed, otherwise it will be neutral.

## License

MIT, see [license file](LICENSE.md)
