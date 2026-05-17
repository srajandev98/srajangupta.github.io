// @ts-check

const config = {
  title: 'Real-time Event Streaming',
  tagline: 'Distributed event streaming architecture in Go',

  url: 'https://srajangupta.com',
  baseUrl: '/projects/real-time-event-streaming/docs/',

  organizationName: 'Srajan Gupta',
  projectName: 'Real-time Event Streaming',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Real-time Event Streaming',
      items: [
        { to: '/', label: 'Docs', position: 'left' },
        {
          href: 'https://github.com/srajandev98/real-time-event-streaming',
          label: 'GitHub',
          position: 'right',
        },
        { href: 'https://srajangupta.com', label: 'Home', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'Architecture', to: '/architecture' },
            { label: 'Roadmap', to: '/roadmap' },
          ],
        },
        {
          title: 'Links',
          items: [
            { label: 'GitHub', href: 'https://github.com/srajandev98/real-time-event-streaming' },
            { label: 'Home', href: 'https://srajangupta.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Srajan Gupta`,
    },
  },
};

module.exports = config;
