const merge = require('deepmerge');

const init = require('./tailwind.init.js');

const custom = {
  prefix: '',
  dark: 'media',
  separator: ':',
  important: false,
  target: 'relaxed',
  experimental: {
    darkModeVariant: true
  },
  purge: {
    mode: 'all',
    content: [],
    preserveHtmlElements: true
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  corePlugins: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms')
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    },
    borderRadius: {
      xs: '0.0625rem',
    },
    scale: {
        200: 2,
        300: 3,
        400: 4,
        500: 5
    }
  }
};

module.exports = merge(init, custom);
