/**
 * @fileoverview Suggest using the spread operator over Object.assign.
 * @author Erik Desjardins
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

var rule = require('../rules/prefer-object-spread');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('prefer-object-spread', rule, {
	valid: [
	],
	invalid: [
	]
});
