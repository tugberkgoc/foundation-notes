
'use strict';

module.exports = {
	displayName: 'test',
	verbose: true,
	collectCoverage: true,
	testPathIgnorePatterns: [
		'/node_modules/',
		'/__tests__/fixtures/',
	],
}

// "jest": {
// 	"testEnvironment": "node",
// 	"verbose": true,
// 	"collectCoverage": true,
// 	"coverageThreshold": {
// 		"global": {
// 			"branches": 0,
// 			"functions": 0,
// 			"lines": 0,
// 			"statements": 0
// 		}
// 	}
// }