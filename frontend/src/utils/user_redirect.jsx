/** @format */

import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export const userRedirect = (history) => {
  const user = Cookies.get('aaavape_user')
  const userDetail = user !== undefined && jwt_decode(user)
  switch (userDetail.role) {
    case 'customer':
      window.location.href = '/order-history'
      break
    case 'super_admin':
      window.location.href = '/dashboard'
      break
  }
}
