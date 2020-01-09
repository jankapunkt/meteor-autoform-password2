// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-password2.js.
import { name as packageName } from "meteor/jkuester:autoform-password2";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-password2 - example', function (test) {
  test.equal(packageName, "autoform-password2");
});
