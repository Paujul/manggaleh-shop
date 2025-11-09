import { createBrowserRouter } from 'react-router'

import NotFound from '@/components/error/NotFound'
import AppLayout from '@/components/layout/AppLayout'
import { FallbackSpinner } from '@/components/layout/FallbackSpinner'
import { paths } from '@/config/paths'

export const appRouter = createBrowserRouter([
  {
    path: paths.home.path,
    element: <AppLayout />,
    HydrateFallback: FallbackSpinner,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/product/ProductPage')).default,
        }),
      },
      {
        path: paths.app.dashboard.path,
        lazy: async () => ({
          Component: (
            await import('@/pages/product/dashboard/ProductDashboard')
          ).default,
        }),
      },
      {
        path: paths.app.productDetail.path,
        lazy: async () => ({
          Component: (await import('@/pages/product/detail/ProductDetail'))
            .default,
        }),
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
])
