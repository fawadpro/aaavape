/** @format */

import React from 'react'

const UnlockAccess = ({ children, currentUser, roles }) => {
  let permission = false
  if (roles && roles.length > 0) {
    permission = roles.includes(currentUser)
  }
  return <>{permission && children}</>
}

export default UnlockAccess
