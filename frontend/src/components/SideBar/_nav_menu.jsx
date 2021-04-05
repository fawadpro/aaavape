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
    icon: 'fas fa-home-lg-alt',
    roles: ['Admin', 'Super Admin', 'Customer Support'],
    children: [
      {
        name: 'Active Orders',
        url: '/active-orders',
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
]
