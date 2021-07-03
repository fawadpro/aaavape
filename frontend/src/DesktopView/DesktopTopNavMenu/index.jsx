/** @format */

import React from 'react'

import TopNavigation from '../../components/TopNavigation'

const DesktopTopNavMenu = () => {
  let data = [
    {
      name: 'Products',
      id: 1,
      children: [
        {
          name: 'POD Systems',
          subChild: [
            {
              name: 'Cube 30 Mode kit',
              image:
                'https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666',
              description: 'Hello Fawad',
            },
            {
              name: 'Cube 30 Mod Kit',
              image:
                'https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666',
              description: 'Hello Fawad 2',
            },
          ],
        },
      ],
    },

    { name: 'Subscription', id: 3 },
    { name: 'Get Inspired', id: 4 },
    { name: 'Deals', id: 5 },
  ]
  return <TopNavigation menuContent={data} />
}

export default DesktopTopNavMenu
