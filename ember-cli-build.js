'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';
const isTesting = EmberApp.env() === 'test';
const isDevelopment = !isProduction;
const cacheVersion = +new Date();

const isCorber = process.env.CORBER ? true : false;
const isElectron = process.env.ELECTRON ? true : false;

/* eslint-disable no-console */
console.info();
console.info('ENVIRONMENT:', EmberApp.env());
console.info('IS ELECTRON', isElectron);
console.info('IS CORBER', isCorber);
console.info();
/* eslint-enable no-console */

const origin = '';
const extensions = [
	'webmanifest',
	'md', 'js', 'css', 'map',
	'eot', 'ttf', 'woff', 'woff2',
	'png', 'jpg', 'jpeg', 'gif', 'svg'
];

const options = {
	origin,
	'tests': isTesting,
	'hinting': isTesting,
	'storeConfigInMeta': isDevelopment,

	'ember-fetch': {
		preferNative: false
	},
	'ember-welcome-page': {
		enabled: false
	},
	'sassOptions': {
		sourceMap: isProduction,
		sourceMapEmbed: isProduction,
		includePaths: [
			'app/styles',
			'node_modules/loaders.css',
			'node_modules/tailwindcss/dist',
			'node_modules/ember-paper/app/styles',
			'node_modules/ember-cli-loaders/app/styles'
		]
	},
	'SRI': {
		crossorigin: 'anonymous',
		enabled: isProduction && !isElectron && !isCorber
	},
	'fingerprint': {
		extensions,
		prepend: origin,
		generateAssetMap: true,
		fingerprintAssetMap: true,
		enabled: isProduction && !isElectron && !isCorber,

		exclude: [
			'logo.png',
			'logo-dark.png',
			'logo-square.png',
			'waveWorker.min.js',
			'encoderWorker.min.js',
			'decoderWorker.min.js',
			'encoderWorker.min.wasm',
			'decoderWorker.min.wasm',
			'engine.js', 'engine.css',
			'sw.js', 'sw-registration.js',
			'engine-vendor.js', 'engine-vendor.css'
		]
	},
	'autoprefixer': {
		sourcemap: isProduction,
		enabled: false // Uses postCSS
	},
	'minifyJS': {
		enabled: isProduction
	},
	'minifyCSS': {
		enabled: false, // Minfied with CSS Nano using postCSS
		options: { processImport: false }
	},
	'sourcemaps': {
		compileModules: true,
		enabled: isProduction,
		extensions: ['js', 'ts', 'css', 'scss']
	},
	'ember-cli-babel': {
		compileModules: true,
		disablePresetEnv: false,
		disableDebugTooling: false,
		includeExternalHelpers: true,
		includePolyfill: isProduction,
		throwUnlessParallelizable: false,
		disableDecoratorTransforms: false,
		disableEmberModulesAPIPolyfill: false,
		disableEmberDataPackagesPolyfill: false
	},
	'babel': {
		debug: false,
		useBuiltIns: false,
		sourceMaps: isProduction,
		plugins: [ require.resolve('ember-auto-import/babel-plugin') ]
	},
	'ember-cli-image-transformer': {
		images: [{
			convertTo: 'png',
			outputFileName: 'icon-',
			destination: 'assets/images/icons',
			inputFilename: 'public/assets/images/icons/logo.jpg',
			sizes: [16, 32, 36, 48, 64, 70, 72, 96, 128, 144, 150, 152, 192, 310, 384, 512]
		}]
	}
};

const postcss = {
	postcssOptions: {
		compile: {
			enabled: true,
			extension: 'scss',
			map: isProduction,
			parser: require('postcss-scss'),
			plugins: [
				{
					module: require('@csstools/postcss-sass'),
					options: options.sassOptions
				},
				{
					module: require('postcss-import'),
					options: { path: options.sassOptions.includePaths }
				},
				{
					module: require('postcss-preset-env'),
					options: { stage: 0 }
				},
				{
					module: require('tailwindcss'),
					options: {
						config: './config/tailwind.config.js'
					}
				},
				// { module: require('postcss-extend-rule') },
				// { module: require('postcss-advanced-variables') },
				// { module: require('postcss-property-lookup') },
				// { module: require('postcss-critical-css') },
				// { module: require('postcss-easy-import') },
				// { module: require('postcss-nested-vars') },
				// { module: require('postcss-utilities') },
				// { module: require('postcss-nested') },
				// { module: require('postcss-mixins') },
				// { module: require('postcss-short') }
			]
		},
		filter: {
			map: isProduction,
			enabled: isProduction,
			plugins: [
				// {
				// 	module: require('@fullhuman/postcss-purgecss'),
				// 	options: {
				// 		content: [
				// 			// add extra paths here for components/controllers which include tailwind classes
				// 			'./app/*.html',
				// 			'./app/**/*.js',
				// 			'./app/**/*.hbs',
				// 			'./app/**/*.html'
				// 		],
				// 		rejected: true,
				// 		fontFace: false,
				// 		keyframes: true,
				// 		whitelistPatterns: [/^md/, /^fa/, /^flex/, /^layout/, /^paper/, /^material/, /^ember/],
				// 		defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
				// 	}
				// },
				{ module: require('autoprefixer') },
				{
					module: require('cssnano'),
					options: { preset: 'advanced' }
				},
				{ module: require('cssstats') },
				{ module: require('postcss-stats-reporter') },
				{
					module: require('postcss-reporter'),
					options: { clearReportedMessages: true }
				}
			]
		}
	}
};

const serviceWorker = {
	'ember-service-worker': {
		enabled: isProduction,
		unregistrationEnabled: true,
		serviceWorkerFilename: 'sw.js',
		registrationStrategy: 'inline',
		versionStrategy: 'every-build'
	},
	'esw-prember': {
		// changing this version number will bust the cache
		version: cacheVersion
	},
	'esw-index': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// Where the location of your index file is at, defaults to `index.html`
		location: 'index.html',

		includeScope: [/^\/[^_].+\/?/]
	},
	'esw-cache-first': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// RegExp patterns specifying which URLs to cache.
		patterns: [
			'/api/(.+)',
			'/fonts/(.+)',
			'/assets/(.+)',
			'/moment/(.+)',
			'/push.js/(.+)',
			'/opus-recorder/(.+)',
			'https://fonts.gstatic.com/(.+)',
			'https://fonts.googleapis.com/(.+)'
		]
	},
	'esw-cache-fallback': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// RegExp patterns specifying which URLs to cache.
		patterns: [
			'/api/(.+)',
			'/fonts/(.+)',
			'/assets/(.+)',
			'/moment/(.+)',
			'/push.js/(.+)',
			'/opus-recorder/(.+)',
			'https://fonts.gstatic.com/(.+)',
			'https://fonts.googleapis.com/(.+)'
		]
	},
	'asset-cache': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// if your files are on a CDN, put the url of your CDN here
		// defaults to `fingerprint.prepend`
		prepend: '',

		// mode of the fetch request. Use 'no-cors' when you are fetching resources
		// cross origin (different domain) that do not send CORS headers
		requestMode: 'cors',

		// which asset files to include, glob paths are allowed!
		// defaults to `['assets/**/*']`

		include: [
			'**',
			'**/*',
			'icons/**',
			'fonts/**',
			'assets/**',
			'moment/**',
			'push.js/**',
			'index.html',
			'icons/**/*',
			'fonts/**/*',
			'assets/**/*',
			'moment/**/*',
			'push.js/**/*',
			'engines-dist/**',
			'opus-recorder/**',
			'engines-dist/**/*'
		],

		// which asset files to exclude, glob paths are allowed!
		exclude: [
			'tests',
			'sw.js',
			'test*',
			'corber',
			'fastboot',
			'testem.js',
			'VERSION.txt',
			'ember-cordova',
			'ember-electron',
			'manifest.webmanifest'
		],

		// manually include extra assets
		manual: [
			'/',
			// '/app',
			// '/sw-registration.js',
			'/?utm_source=web_app_manifest',

			// 'https://cdn.ampproject.org/v0.js',
			// 'https://maps.googleapis.com/maps/api/js?v=3',
			// 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.2.0/katex.min.css'
		]
	}
};

const network = {
	orbit: {
		packages: [
			'@orbit/jsonapi',
			'@orbit/indexeddb',
			'@orbit/indexeddb-bucket'
		]
	},
	emberApolloClient: {
		keepGraphqlFileExtension: true
	}
};

const bundle = {
	'ember-web-app': {
		enabled: isProduction
	},
	'prember': {
		enabled: isProduction,
		urls: ['/', '/about']
		// urls: ['/', '/login', '/register']
	},
	'brotli': {
		appendSuffix: true,
		enabled: isProduction,
		keepUncompressed: true,
		extensions: [...extensions, 'txt', 'xml', 'html', 'json']
	},
	'bundle-analyzer': {
		ignoreTestFiles: true,
		ignore: ['*-fastboot.js']
	},
	autoImport: {
		webpack: {
			node: {
				process: true,
				global: false,
				fs: 'empty'
			}
		}
	},
};

// const amp = {
// 	'outputPaths': {
// 		app: { css: { amp: 'assets/amp.css' } }
// 	},
// 	'amp': {
// 		css: 'assets/amp.css',
// 		index: 'index.amp.html'
// 	}
// };

Object.assign(options, postcss, serviceWorker, network, bundle);

module.exports = function(defaults) {
	const app = new EmberApp(defaults, options);

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

	return app.toTree();
};
