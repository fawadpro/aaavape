/** @format */

export const menus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fas fa-home-lg-alt',
    roles: ['super_admin'],
  },

  {
    name: 'Order History ',
    url: '/order-history',
    icon: 'fad fa-bags-shopping',
    roles: ['customer'],
  },

  {
    name: 'Orders',
    url: '/order',
    icon: 'fas fa-inbox-in',
    roles: ['super_admin'],
    children: [
      {
        name: 'All Orders',
        url: '/order',
        icon: 'fas fa-home-lg-alt',
        roles: ['super_admin'],
      },
      {
        name: 'Pending Orders',
        url: '/pending-orders',
        icon: 'fas fa-home-lg-alt',
        roles: ['super_admin'],
      },
    ],
  },

  {
    name: 'Products',
    url: '/product',
    icon: 'fas fa-tag',
    roles: ['super_admin'],
    children: [
      {
        name: 'All Products',
        url: '/product',
        icon: 'fas fa-home-lg-alt',
        roles: ['super_admin'],
      },
    ],
  },
]
