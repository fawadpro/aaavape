/** @format */

import React from 'react'

import StoreLocator from '../../images/store-locator.jpeg'
import StoreLocatorCard from '../../components/StoreLocatorCard'
import './store-locator-home.scss'

const DesktopStoreLocatorHome = () => {
  return (
    <div className="store-locator-home-container">
      <div className="row">
        <div className="col-md-6">
          <img src={StoreLocator} alt="store locator" className="store-image-size" />
        </div>
        <div className="col-md-6">
          <div className="location-container">
            <div className="location-title">Find our store locations</div>

            <div className="store-locations-list-container">
              <StoreLocatorCard
                mainTitle="AAAVape HQ"
                address="2nd Floor, Building B, Shangfang
              Industry Park, Shajing Xinqiao,Bao'an district., Shenzhen, Guangdong 518101 China"
              />
              <StoreLocatorCard
                mainTitle="VaporDNA"
                address="8162 Talbert Ave. Suite 103 Huntington Beach CA 92646
                Huntington Beach, CA 92646 USA"
              />
              <StoreLocatorCard
                mainTitle="Vaporismcz"
                address="28. října 159/214 70900 Ostrava, Czech Republic
                Ostrava Czech Republic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopStoreLocatorHome
