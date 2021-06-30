/** @format */

import React from 'react'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'

import './store-locator-card.scss'

const StoreLocatorCard = ({ mainTitle, address }) => {
  return (
    <div className="store-location-card-container">
      <div className="row">
        <div className="col-md-9">
          <div className="location-name">{mainTitle}</div>
          <div className="location-sub-title">
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

export default StoreLocatorCard
