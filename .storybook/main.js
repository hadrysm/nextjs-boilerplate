const { toPath } = require('./utils');

module.exports = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    'storybook-dark-mode',
    '@storybook/addon-actions'
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@/components': toPath('src/components'),
          '@/pages': toPath('src/pages'),
          '@/lib': toPath('src/lib'),
          '@/hooks': toPath('src/hooks'),
          '@/mocks': toPath('mocks'),
          '@/tests': toPath('tests')
        }
      }
    };
  }
};
