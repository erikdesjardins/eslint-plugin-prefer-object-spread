/**
 * @fileoverview Suggest using the spread operator over Object.assign.
 * @author Erik Desjardins
 * @copyright 2016 Erik Desjardins. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

var rule = require('../rules/prefer-object-spread');
var RuleTester = require('eslint').RuleTester;

var errorMessage = 'Expected spread operator.';

var ruleTester = new RuleTester();
ruleTester.run('prefer-object-spread', rule, {
	valid: [
		//// without "includeNearEquivalents"

		// no args
		'Object.assign(); _.assign();',
		// non-object-literal first arg
		'Object.assign(foo, bar); _.assign(foo, bar);',
		// invalid object identifier
		'object.assign({}, foo); __.assign({}, foo);',
		// deep property
		'a.Object.assign({}, foo); a._.assign({}, foo);',
		// bare function
		'assign({}, foo);',
		// near equivalents
		'$.extend({}, foo); _.assignIn({}, foo); _.extend({}, foo);',
		// near equivalents, one arg
		'$.extend({}); _.assignIn({}); _.extend({});',
		// near equivalents, non-empty object
		'$.extend({ foo: 5 }, bar); _.assignIn({ foo: 5 }, bar); _.extend({ foo: 5 }, bar);',

		//// with "includeNearEquivalents"

		// no args
		{ code: '$.extend(); _.assignIn(); _.extend();', options: ['includeNearEquivalents'] },
		// non-object-literal first arg
		{ code: '$.extend(foo, bar); _.assignIn(foo, bar); _.extend(foo, bar);', options: ['includeNearEquivalents'] },
		// invalid object identifier
		{ code: '$$.extend({}, foo); __.assignIn({}, foo); __.extend(foo, bar);', options: ['includeNearEquivalents'] },
		// deep property
		{ code: 'a.$.extend({}, foo); a._.assignIn({}, foo); a._.extend(foo, bar);', options: ['includeNearEquivalents'] },
		// bare function
		{ code: 'extend({}, foo); assignIn({}, foo);', options: ['includeNearEquivalents'] },
		// jQuery deep extend
		{ code: '$.extend(true, {}, foo);', options: ['includeNearEquivalents'] },
	],
	invalid: [
		//// without "includeNearEquivalents"

		// empty object literal
		{
			code: 'Object.assign({}, foo); _.assign({}, foo); $.extend({}, foo); _.assignIn({}, foo); _.extend({}, foo);',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 27
			}]
		},
		// non-empty object literal
		{
			code: 'Object.assign({ foo: 5 }, foo); _.assign({ foo: 5 }, foo); $.extend({ foo: 5 }, foo); _.assignIn({ foo: 5 }, foo); _.extend({ foo: 5 }, foo);',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 35
			}]
		},
		// just an object literal
		// you couldn't use the spread operator here, but it doesn't make sense, so might as well report it
		{
			code: 'Object.assign({}); _.assign({}); $.extend({}); $.assignIn({}); _.extend({});',
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 22
			}]
		},

		//// with "includeNearEquivalents"

		// empty object literal
		{
			code: 'Object.assign({}, foo); _.assign({}, foo); $.extend({}, foo); _.assignIn({}, foo); _.extend({}, foo);',
			options: ['includeNearEquivalents'],
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 27
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 46
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 65
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 86
			}]
		},
		// non-empty object literal
		{
			code: 'Object.assign({ foo: 5 }, foo); _.assign({ foo: 5 }, foo); $.extend({ foo: 5 }, foo); _.assignIn({ foo: 5 }, foo); _.extend({ foo: 5 }, foo);',
			options: ['includeNearEquivalents'],
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 35
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 62
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 89
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 118
			}]
		},
		// just an object literal
		{
			code: 'Object.assign({}); _.assign({}); $.extend({}); _.assignIn({}); _.extend({});',
			options: ['includeNearEquivalents'],
			errors: [{
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 8
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 22
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 36
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 50
			}, {
				message: errorMessage,
				type: 'Identifier',
				line: 1,
				column: 66
			}]
		},
	]
});
