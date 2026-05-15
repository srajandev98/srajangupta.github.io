// @ts-check

const config = {
  title: 'AI Agent Framework',
  tagline: 'Composable TypeScript primitives for AI chains and agents',

  url: 'https://srajangupta.com',
  baseUrl: '/projects/ai-agent-framework/docs/',

  organizationName: 'Srajan Gupta',
  projectName: 'AI Agent Framework',

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
      title: 'AI Agent Framework',
      items: [
        {
          to: '/',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/srajandev98/ai-agent-framework',
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
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Srajan Gupta`,
    },
  },
};

module.exports = config;
