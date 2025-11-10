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
    cart: {
      path: 'cart',
      getHref: () => '/app/cart',
    },
    productDetail: {
      path: '/product/:id',
      getHref: (id: string | number) => `/product/${id}`,
    },
  },
} as const
