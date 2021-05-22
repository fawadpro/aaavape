/** @format */

export const menus = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fas fa-home-lg-alt',
    roles: ['Admin', 'Super Admin', 'Customer Support'],
  },
  {
    name: 'Orders',
    url: '/order',
    icon: 'fas fa-inbox-in',
    roles: ['Admin', 'Super Admin', 'Customer Support'],
    children: [
      {
        name: 'Active Orders',
        url: '/order',
        icon: 'fas fa-home-lg-alt',
        roles: ['Admin', 'Super Admin', 'Customer Support'],
      },
      {
        name: 'Pending Orders',
        url: '/pending-orders',
        icon: 'fas fa-home-lg-alt',
        roles: ['Admin', 'Super Admin', 'Customer Support'],
      },
    ],
  },

  {
    name: 'Products',
    url: '/product',
    icon: 'fas fa-tag',
    roles: ['Admin', 'Super Admin', 'Customer Support'],
    children: [
      {
        name: 'All Products',
        url: '/product',
        icon: 'fas fa-home-lg-alt',
        roles: ['Admin', 'Super Admin', 'Customer Support'],
      },
    ],
  },
]
