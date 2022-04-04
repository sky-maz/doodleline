module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'google',
		'next/core-web-vitals',
		"plugin:@typescript-eslint/recommended",
		'plugin:react/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
