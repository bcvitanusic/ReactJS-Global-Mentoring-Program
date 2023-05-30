const { defineConfig } = require('cypress');

module.exports = defineConfig({
	component: {
		devServer: {
			framework: 'create-react-app',
			bundler: 'webpack',
		},
	},

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:3000',
	},
	viewportWidth: 1000,
	viewportHeight: 900,
});
