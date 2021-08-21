/** @format */

export const SiteRoute = {
  publicRoute: [
    '/',
    '/product-detail/:id',
    '/cart',
    '/payment',
    '/email-success',
    '/forgot-password',
    '/password/reset/:token',
  ],
  privateRoute: [
    '/login',
    '/dashboard',
    '/add-product',
    '/update-product/:id',
    '/pending-orders',
    '/order',
    '/product',
    '/register',
  ],
}
