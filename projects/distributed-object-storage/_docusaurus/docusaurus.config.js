// @ts-check

const config = {
  title: 'Distributed Object Storage',
  tagline: 'S3-inspired distributed object storage documentation',

  url: 'https://srajangupta.com',
  baseUrl: '/projects/distributed-object-storage/docs/',

  organizationName: 'Srajan Gupta',
  projectName: 'Distributed Object Storage',

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
      title: 'Distributed Object Storage',
      items: [
        {
          to: '/',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/srajandev98/distributed-object-storage',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://srajangupta.com',
          label: 'Home',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Architecture',
              to: '/architecture',
            },
            {
              label: 'MVP Roadmap',
              to: '/mvp-roadmap',
            },
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
