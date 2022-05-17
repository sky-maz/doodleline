const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	testEnvironment: 'jest-environment-jsdom',
	rootDir: './',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'@locales/(.*)': '<rootDir>/locales/$1',
  	'@utils/(.*)': '<rootDir>/utils/$1'
  },
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		}
	}
};

module.exports = createJestConfig(customJestConfig);
