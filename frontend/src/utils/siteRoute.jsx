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
    '/product-verification',
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
    '/order-history',
    '/edit-profile',
  ],
}
