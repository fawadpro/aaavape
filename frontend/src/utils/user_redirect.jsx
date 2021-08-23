/** @format */

export const userRedirect = (role, history) => {
  switch (role) {
    case 'customer':
      return (window.location.href = '/order-history')
    case 'super_admin':
      return (window.location.href = '/dashboard')
    default:
      history.push('/login')
  }
}
