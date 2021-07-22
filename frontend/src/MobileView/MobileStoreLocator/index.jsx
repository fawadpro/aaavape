/** @format */

import React from 'react'

import StoreLocator from '../../images/store-locator.jpeg'
import MobileStoreLocatorCard from '../../components/MobileStoreLocatorCard'
import './mobile-store-locator.scss'

const MobileStoreLocatorHome = () => {
  return (
    <div className="mobile-store-locator-home-container container-fluid">
      <div className="row ">
        <div className="col-md-6">
          <img src={StoreLocator} alt="store locator" className="store-image-size" />
        </div>
        <div className="col-md-6 pl-3 pr-3">
          <div className="mobile-location-container">
            <div className="mobile-location-title">Find our store locations</div>

            <div className="mobile-store-locations-list-container">
              <MobileStoreLocatorCard
                mainTitle="AAAVape HQ"
                address="2nd Floor, Building B, Shangfang
              Industry Park, Shajing Xinqiao,Bao'an district., Shenzhen, Guangdong 518101 China"
              />
              <MobileStoreLocatorCard
                mainTitle="VaporDNA"
                address="8162 Talbert Ave. Suite 103 Huntington Beach CA 92646
                Huntington Beach, CA 92646 USA"
              />
              <MobileStoreLocatorCard
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

export default MobileStoreLocatorHome
