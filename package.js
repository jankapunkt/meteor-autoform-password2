Package.describe({
  name: 'jkuester:autoform-password2',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Autoform password input using Bootstrap 4 and with extra functionality.',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:jankapunkt/meteor-autoform-password2.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use([
    'ecmascript',
    'reactive-dict',
    'templating@1.3.2',
    'aldeed:autoform@6.0.0'
  ])
  api.addFiles([
    'autoform-password2.html',
    'autoform-password2.js'
  ], 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('templating')
  api.use('blaze')
  api.use('meteortesting:mocha')
  api.use('practicalmeteor:chai')
  api.use('jkuester:autoform-password2')
  api.mainModule('autoform-password2-tests.js')
})
