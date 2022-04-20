const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	testEnvironment: 'jest-environment-jsdom',
	rootDir: './',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
		}
	}
};

module.exports = createJestConfig(customJestConfig);
