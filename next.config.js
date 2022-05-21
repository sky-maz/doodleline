const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
const nextConfig = {
	...nextTranslate(),
	reactStrictMode: true,
	poweredByHeader: false,
};

module.exports = nextConfig;
