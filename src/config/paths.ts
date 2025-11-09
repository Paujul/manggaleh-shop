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
    productDetail: {
      path: '/product/:id',
      getHref: (id: string | number) => `/product/${id}`,
    },
  },
} as const
