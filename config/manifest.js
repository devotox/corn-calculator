'use strict';

module.exports = function() {
	// See https://zonkyio.github.io/ember-web-app for a list of
	// supported properties

	const themeColor = '#161E2E';

	const sizes = [16, 32, 36, 48, 64, 70, 72, 96, 128, 144, 150, 152, 192, 310, 384, 512];

	const iconRoot = process.env.CORBER
		? 'assets/images/icons'
		: '/assets/images/icons';

	const icons = sizes.map((size) => {
		const sizes = `${size}x${size}`; // eslint-disable-line

		const result = {
			sizes,
			type: 'image/png',
			purpose: 'any maskable',
			src: `${iconRoot}/icon-${size}.png`,
			targets: ['manifest', 'apple', 'android']
		};

		[16, 32].includes(size) && (result.targets = ['favicon']);

		[150, 310].includes(size)
			&& (result.targets = ['ms'])
			&& (result.element = `square${sizes}logo`);

		return result;
	});

	return {
		icons,
		dir: 'ltr',
		scope: '/',
		name: 'Corn Calculator',
		'short_name': 'CornCalc',
		display: 'standalone',
		'theme_color': themeColor,
		orientation: 'portrait',
		'background_color': '#FFFFFF',
		'gcm_sender_id': '103953800507',
		description: 'Corn Calculation',
		'start_url': '/?utm_source=web_app_manifest',
		author: {
			'name': 'Devonte Emokpae',
			'website': 'https://corn-calculator.vercel.app',
			'github': 'https://github.com/devotox',
			'source-repo': 'https://github.com/devotox/corn-calculator'
		},
		apple: {
			precomposed: false,
			webAppCapable: true,
			statusBarStyle: 'black-translucent',
			formatDetection: {
				telephone: true
			}
		},
		ms: {
			tileColor: themeColor
		}
	};
};
