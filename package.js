/* eslint-env meteor */
Package.describe({
  name: 'jkuester:autoform-password2',
  version: '3.0.0',
  // Brief, one-line summary of the package.
  summary: 'Autoform password input using Bootstrap 4 and with extra functionality.',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:jankapunkt/meteor-autoform-password2.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom(['3.0.1'])
  api.use([
    'ecmascript',
    'reactive-dict',
    'templating@1.4.4',
    'aldeed:autoform@7.0.0 || 8.0.0'
  ])

  api.mainModule('static.js', 'client')
})
