export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '/dashboard',
      getHref: () => '/dashboard',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const
