/** @format */

import React from 'react'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'

import './mobile-store-card.scss'

const MobileStoreLocatorCard = ({ mainTitle, address }) => {
  return (
    <div className="mobile-store-location-card-container">
      <div className="row ml-2 mr-2">
        <div className="col-md-9">
          <div className="mobile-location-name">{mainTitle}</div>
          <div className="mobile-location-sub-title">
            <EllipsisWithTooltip placement="top">
              <i className="fas fa-map-marker-alt mr-2"></i> {address}
            </EllipsisWithTooltip>
          </div>
        </div>

        <div className="col-md-3">
          <div>
            <i className="fas fa-map-signs"></i>
          </div>
          <div>Indications</div>
        </div>
      </div>
    </div>
  )
}

export default MobileStoreLocatorCard
