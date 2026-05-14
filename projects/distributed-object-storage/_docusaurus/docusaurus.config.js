// @ts-check

const config = {
  title: 'Distributed Object Storage',
  tagline: 'S3-inspired distributed object storage documentation',

  url: 'https://srajangupta.github.io',
  baseUrl: '/projects/distributed-object-storage/',

  organizationName: 'srajandev98',
  projectName: 'srajangupta.github.io',

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
      ],
      copyright: `Copyright ${new Date().getFullYear()} Srajan Gupta`,
    },
  },
};

module.exports = config;
