(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{369:function(e,t,s){},374:function(e,t,s){},375:function(e,t,s){},376:function(e,t,s){},377:function(e,t,s){},378:function(e,t,s){},379:function(e,t,s){},380:function(e,t,s){},381:function(e,t,s){},382:function(e,t,s){},383:function(e,t,s){},384:function(e,t,s){},385:function(e,t,s){},386:function(e,t,s){},387:function(e,t,s){},388:function(e,t,s){},389:function(e,t,s){},398:function(e,t,s){"use strict";s.r(t);var c=s(0),i=s.n(c),a=s(115),n=s(46),r=s(47),l=s(66),o=s(51),d=s(50),j=(s(369),s(1)),u=function(e){return Object(j.jsxs)("div",{className:"arrows",children:[Object(j.jsx)("span",{onClick:e.decreaseCount,className:"arrow btn-arrow btn-arrow-left"}),Object(j.jsx)("span",{onClick:e.increaseCount,className:"arrow btn-arrow btn-arrow-right"})]})},h=function(e){Object(o.a)(s,e);var t=Object(d.a)(s);function s(e){var c;return Object(n.a)(this,s),(c=t.call(this,e)).updateSlideOnIndex=function(e){c.setState({currentSlide:e})},c.state={currentSlide:e.defaultIndex,slideInterval:e.slideInterval,showIndex:e.showIndex,useDotIndex:e.useDotIndex,showArrows:e.showArrows,effect:e.effect,autoplay:e.autoplay,enableKeyboard:e.enableKeyboard,slides:e.slides.length>0?e.slides:e.children},c.runSlideShow=c.runSlideShow.bind(Object(l.a)(c)),c.autoSlideshow=c.autoSlideshow.bind(Object(l.a)(c)),c.restartSlideshow=c.restartSlideshow.bind(Object(l.a)(c)),c.increaseCount=c.increaseCount.bind(Object(l.a)(c)),c.decreaseCount=c.decreaseCount.bind(Object(l.a)(c)),c.handleKeyboard=c.handleKeyboard.bind(Object(l.a)(c)),c}return Object(r.a)(s,[{key:"componentDidMount",value:function(){this.state.autoplay&&this.runSlideShow(),this.state.enableKeyboard&&document.addEventListener("keydown",this.handleKeyboard)}},{key:"handleKeyboard",value:function(e){if(37===e.keyCode)this.decreaseCount();else{if(39!==e.keyCode)return null;this.increaseCount()}}},{key:"runSlideShow",value:function(){var e=setInterval(this.autoSlideshow,this.state.slideInterval);this.setState({intervalId:e})}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.intervalId),document.removeEventListener("keydown",this.handleKeyboard)}},{key:"autoSlideshow",value:function(){this.setState({currentSlide:(this.state.currentSlide+1)%this.state.slides.length})}},{key:"restartSlideshow",value:function(){clearInterval(this.state.intervalId),this.runSlideShow()}},{key:"increaseCount",value:function(){if("left"===this.state.effect)this.setState({effect:"right"});else if("bottom"===this.state.effect)this.setState({effect:"bottom"});else if("bounce-left"===this.state.effect)this.setState({effect:"bounce-left"});else{if("bounce-right"!==this.state.effect)return;this.setState({effect:"bounce-right"})}if(!this.state.autoplay)return null;this.restartSlideshow(),this.setState({currentSlide:(this.state.currentSlide+1)%this.state.slides.length})}},{key:"decreaseCount",value:function(){if("right"===this.state.effect)this.setState({effect:"left"});else if("bottom"===this.state.effect)this.setState({effect:"bottom"});else{if("bounce-right"!==this.state.effect)return null;this.setState({effect:"bounce-right"})}if(!this.state.autoplay)return null;var e;this.restartSlideshow(),e=0===this.state.currentSlide?this.state.slides.length-1:e=this.state.currentSlide-1,this.setState({currentSlide:e})}},{key:"render",value:function(){var e,t,s=this,c=this.state,i=c.slides,n=c.showIndex,r=c.useDotIndex,l=c.effect,o=c.showArrows,d=void 0===l?"fade":l;return e=this.props.children?i.map((function(e,t){return Object(j.jsx)("li",{className:"slide ".concat(l," ").concat(s.state.currentSlide===t?"showing-"+d:""),children:e},t)})):i.map((function(e,t){return Object(j.jsx)("li",{className:"slide ".concat(l," ").concat(s.state.currentSlide===t?"showing-"+d:""),style:{backgroundImage:"url(".concat(e,")")}},t)})),t=r?Object(j.jsx)("div",{className:"show-index is-dot",children:i.map((function(e,t){return Object(j.jsx)("span",{className:"dot ".concat(s.state.currentSlide===t?"is-active":""),onClick:function(){s.updateSlideOnIndex(t)}},"dot".concat(t))}))}):Object(j.jsx)("div",{className:"show-index is-text",children:Object(j.jsx)("p",{children:"".concat(this.state.currentSlide+1," / ").concat(i.length)})}),Object(j.jsx)("div",{style:{position:"relative",height:a.isMobile?"260px":"470px",width:this.props.width||"100%"},children:Object(j.jsxs)("div",{className:"slideshow-container",children:[Object(j.jsx)("ul",{className:"slides",children:e}),o&&Object(j.jsx)(u,{decreaseCount:this.decreaseCount,increaseCount:this.increaseCount}),n&&t]})})}}]),s}(c.Component);h.defaultProps={showIndex:!1,showArrows:!0,autoplay:!0,enableKeyboard:!0,useDotIndex:!1,slideInterval:2e3,defaultIndex:0,effect:"fade",slides:[],height:"100%",width:"100%"};var m=h,b=(s(374),function(){return Object(j.jsx)(m,{showIndex:!0,showArrows:!0,autoplay:!0,enableKeyboard:!0,useDotIndex:!0,slideInterval:5e3,defaultIndex:0,slides:["https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205349.jpeg?v=1609962781","https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205419.jpeg?v=1609962802","https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210101-112811.jpeg?v=1609958368"],effect:"bottom",height:"65%",width:"100%"})}),x=s.p+"static/media/animated.eddc90c8.gif",f=(s(375),function(){return Object(j.jsx)("div",{className:"promotion-product-container",children:Object(j.jsxs)("div",{className:"wrapper",children:[Object(j.jsx)("div",{className:"promotion-main-title",children:"function that fits form"}),Object(j.jsxs)("div",{className:"container-fluid",children:[Object(j.jsxs)("div",{className:"row text-center mt-4  edges-space",children:[Object(j.jsxs)("div",{className:"col-md-5 detail-info-container",children:[Object(j.jsx)("div",{className:"detail-title-left",style:{marginTop:150},children:"GET MORE OUT OF YOUR VAPE"}),Object(j.jsx)("p",{className:"detail-description",children:"Long-lasting pods and battery."})]}),Object(j.jsx)("div",{className:"col-md-2",children:Object(j.jsx)("img",{src:x,alt:"main",className:"main-image-size"})}),Object(j.jsxs)("div",{className:"col-md-5 detail-info-container",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"detail-title-right text-right",children:"DESIGNED TO FIT YOU"}),Object(j.jsx)("p",{className:"detail-description text-right",children:"7 Bold Colors 3 "}),Object(j.jsx)("p",{className:"detail-description text-right",children:" Premium Flavors 3"}),Object(j.jsx)("p",{className:"detail-description text-right",children:" Nicotine Levels"})]}),Object(j.jsxs)("div",{style:{marginTop:130},children:[Object(j.jsx)("div",{className:"detail-title-right text-right",children:"SIMPLE OPERATION"}),Object(j.jsxs)("p",{className:"detail-description text-right",children:["Compact with a consistent, quiet draw"," "]})]})]})]}),Object(j.jsx)("div",{className:"button-container",children:Object(j.jsx)("div",{className:"button-style",children:"View Detail"})})]})]})})}),O=s(20),p=(s(376),function(e){var t=e.image,s=e.mainTitle,c=e.subTitle,i=e.buttonText,a=e.borderColor,n=e.textColor,r=e.callBack;return Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"product-image-container",children:[Object(j.jsx)("img",{src:t,className:"product-image-size",alt:"product featured container"}),Object(j.jsx)("div",{className:"product-title",children:s}),Object(j.jsx)("div",{className:"product-sub-title",children:c}),Object(j.jsx)("div",{className:"product-button-container",style:{border:"2px solid ".concat(a),color:n},onClick:function(){return r()},children:i})]})})}),v=(s(377),Object(O.g)((function(e){var t=e.history;return Object(j.jsx)("div",{className:"features-products-container",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)(p,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/cub40-Abstract_1024x1024@2x.jpg?v=1608468973",mainTitle:"AAAVape CUB 40 MOD KIT",subTitle:"Smooth and well-balanced.",buttonText:"AAAVape CUB",borderColor:"#d49321",textColor:"#d49321",callBack:function(){return t.push("/product-detail/60f747727230b1121d877f6b")}})}),Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)(p,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666",mainTitle:"AAAVape Matrix Pod",subTitle:"Rich and robust.",buttonText:"AAAVape Matrix",borderColor:"#467A7B",textColor:"#467A7B",callBack:function(){return t.push("/product-detail/60f74ea69ac203135227b356")}})}),Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)(p,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BOOST-kit-STAINLESS_8394580e-8bd8-43b2-afdf-9c933f244804_1024x1024@2x.png?v=1608717181",mainTitle:"AAAVape Boost Vape Pen",subTitle:"Mellow, cool and crisp.",buttonText:"AAAVape Boost",borderColor:"#846348",textColor:"#846348",callBack:function(){return t.push("/product-detail/60f851fe12615f04222a5bdf")}})})]})})}))),N=s.p+"static/media/store-locator.db3b8d06.jpeg",g=s(72),w=s.n(g),S=(s(378),function(e){var t=e.mainTitle,s=e.address;return Object(j.jsx)("div",{className:"store-location-card-container",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-md-9",children:[Object(j.jsx)("div",{className:"location-name",children:t}),Object(j.jsx)("div",{className:"location-sub-title",children:Object(j.jsxs)(w.a,{placement:"top",children:[Object(j.jsx)("i",{className:"fas fa-map-marker-alt mr-2"})," ",s]})})]}),Object(j.jsxs)("div",{className:"col-md-3",children:[Object(j.jsx)("div",{children:Object(j.jsx)("i",{className:"fas fa-map-signs"})}),Object(j.jsx)("div",{children:"Indications"})]})]})})}),A=(s(379),function(){return Object(j.jsx)("div",{className:"store-locator-home-container",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-6",children:Object(j.jsx)("img",{src:N,alt:"store locator",className:"store-image-size"})}),Object(j.jsx)("div",{className:"col-md-6",children:Object(j.jsxs)("div",{className:"location-container",children:[Object(j.jsx)("div",{className:"location-title",children:"Find our store locations"}),Object(j.jsxs)("div",{className:"store-locations-list-container",children:[Object(j.jsx)(S,{mainTitle:"AAAVape HQ",address:"2nd Floor, Building B, Shangfang Industry Park, Shajing Xinqiao,Bao'an district., Shenzhen, Guangdong 518101 China"}),Object(j.jsx)(S,{mainTitle:"VaporDNA",address:"8162 Talbert Ave. Suite 103 Huntington Beach CA 92646 Huntington Beach, CA 92646 USA"}),Object(j.jsx)(S,{mainTitle:"Vaporismcz",address:"28. \u0159\xedjna 159/214 70900 Ostrava, Czech Republic Ostrava Czech Republic"})]})]})})]})})}),C=(s(380),function(e){var t=e.imageURI;return Object(j.jsx)("div",{className:"accessories-card-container",children:Object(j.jsx)("img",{src:t,alt:"imag 1",className:"card-size"})})}),y=(s(381),function(){return Object(j.jsx)("div",{className:"home-accessories-container",children:Object(j.jsxs)("div",{className:"home-accessories-title",children:[Object(j.jsx)("div",{className:"header-title",children:"WRAP YOUR ALTO IN PERSONALITY"}),Object(j.jsxs)("div",{className:"accessories-container-grid",children:[Object(j.jsx)("div",{className:"accessories-grid-item",children:Object(j.jsx)(C,{imageURI:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Black_1024x1024@2x.png?v=1606289623"})}),Object(j.jsx)("div",{className:"accessories-grid-item",children:Object(j.jsx)(C,{imageURI:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Rose-Gold_1024x1024@2x.png?v=1606289644"})}),Object(j.jsx)("div",{className:"accessories-grid-item",children:Object(j.jsx)(C,{imageURI:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Purple_b396d578-974c-407c-ac18-05cbc8c20f51_1024x1024@2x.png?v=1606289773"})}),Object(j.jsx)("div",{className:"accessories-grid-item",children:Object(j.jsx)(C,{imageURI:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Red_f5798e45-d70e-4100-aa14-5927167a4ebd_1024x1024@2x.png?v=1606289772"})}),Object(j.jsx)("div",{className:"accessories-grid-item",children:Object(j.jsx)(C,{imageURI:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Blue_453c0a55-bc14-4164-a2ed-9384388a5533_1024x1024@2x.png?v=1606289771"})})]}),Object(j.jsx)("div",{className:"button-container-revert mt-4",children:Object(j.jsx)("div",{className:"button-style",children:"View Detail"})})]})})}),T=s(4),k=s(7),I=s(17),B=s(41),M=s(27),V=s.n(M),R=s(154),D=(s(382),Object(O.g)(Object(I.b)((function(e){return Object(T.a)(Object(T.a)({},e),{},{topMenuState:e.TopMenu.topMenus})}),(function(e){return{fetchTopMenus:function(){return e(Object(R.b)())}}}))((function(e){var t=e.menuContent,s=e.fetchTopMenus,i=e.topMenuState,a=e.history,n=Object(c.useState)(!1),r=Object(k.a)(n,2),l=r[0],o=r[1],d=Object(c.useState)(""),u=Object(k.a)(d,2),h=u[0],m=u[1],b=Object(c.useState)([]),x=Object(k.a)(b,2),f=x[0],O=x[1],p=Object(c.useState)(""),v=Object(k.a)(p,2),N=v[0],g=v[1];Object(c.useEffect)((function(){s()}),[]);var w=V.a.get("aaavape_user"),S=void 0!==w&&Object(B.a)(w);console.log("@@ data",f);var A=void 0!==i?i:{},C=Object.keys(A);return console.log("@@ ata",S),Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"top-navigation-container",onMouseLeave:function(){return m("")},children:[Object(j.jsxs)("div",{className:"row pl-3 pr-3 edges-width",children:[Object(j.jsx)("div",{className:"col-md-10 text-right",children:Object(j.jsx)("div",{className:"row",children:t&&t.map((function(e,t){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:h===e.id?"col-1-4 text-center menu-item-hover ":"col-1-4 text-center menu-item",onMouseEnter:function(){return m(e.id),e&&e.children&&e.children.length?setTimeout((function(){o(!0),O(A[C[0]]),g(C[0])}),200):null},children:[e.name,Object(j.jsx)("span",{className:"ml-2 icon-vertical",children:e&&e.children&&e.children.length?h===e.id?Object(j.jsx)("i",{className:"fas fa-minus"}):Object(j.jsx)("i",{className:"fas fa-chevron-down"}):null}),h===e.id&&e&&e.children&&e.children.length?Object(j.jsx)("i",{className:"fas fa-caret-down nav-icon"}):null]},t)})}))})}),Object(j.jsx)("div",{className:"col-md-2 text-right",children:Object(j.jsx)("span",{className:"cursor-pointer",onClick:function(){return a.push("/login")},children:S?Object(j.jsxs)("span",{style:{color:"#F7AF3A"},children:[Object(j.jsx)("span",{style:{color:"#000"},children:"Hello, "}),S&&S.name]}):"Login"})})]}),l&&Object(j.jsx)("div",{className:"children-container",onMouseEnter:function(){return o(!0)},onMouseLeave:function(){m(""),o(!1)},children:Object(j.jsxs)("div",{className:"children-row",children:[Object(j.jsx)("div",{className:"item mt-4",children:C.map((function(e,t){return Object(j.jsxs)("div",{className:N===e?"menu-active":"menu-non-active",onClick:function(){g(e),O(A[e])},children:[e,N===e&&Object(j.jsx)("span",{className:"float-right mr-2",children:Object(j.jsx)("i",{className:"fas fa-arrow-right"})})]},t)}))}),Object(j.jsx)("div",{className:"ml-4",children:Object(j.jsx)("div",{className:"row",children:f&&f.map((function(e,t){return Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)("div",{className:"item",onClick:function(){return a.push("/product-detail/".concat(e.id))},children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-5",children:Object(j.jsx)("img",{src:e.image,alt:"menu",className:"image-size"})}),Object(j.jsx)("div",{className:"col-md-7 justify-content-center align-self-center detail-data",children:Object(j.jsxs)("div",{className:"data-container",children:[Object(j.jsx)("div",{className:"title",children:e.title}),Object(j.jsx)("div",{className:"subtitle",children:e.description})]})})]})})},t)}))})})]})})]})})})))),_=function(){return Object(j.jsx)(D,{menuContent:[{name:"Products",id:1,children:[{name:"POD Systems",subChild:[{name:"Cube 30 Mode kit",image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666",description:"Hello Fawad"},{name:"Cube 30 Mod Kit",image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666",description:"Hello Fawad 2"}]}]},{name:"Subscription",id:3},{name:"Get Inspired",id:4},{name:"Deals",id:5}]})},F=(s(383),function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(_,{}),Object(j.jsx)(b,{}),Object(j.jsx)(f,{}),Object(j.jsx)(v,{}),Object(j.jsx)(A,{}),Object(j.jsx)(y,{})]})}),L=(s(149),s(384),function(){return Object(j.jsx)(m,{showIndex:!0,showArrows:!0,autoplay:!0,enableKeyboard:!0,useDotIndex:!0,slideInterval:5e3,defaultIndex:0,slides:["https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205349.jpeg?v=1609962781","https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205419.jpeg?v=1609962802","https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210101-112811.jpeg?v=1609958368"],effect:"bottom",height:"40%",width:"100%"})}),U=(s(151),s(21)),E=(s(385),function(){var e=i.a.useState(0),t=Object(k.a)(e,2),s=t[0],c=t[1],a=i.a.useRef(null),n=U.a.promotion;function r(){a.current&&clearTimeout(a.current)}return i.a.useEffect((function(){return r(),a.current=setTimeout((function(){return c((function(e){return e===n.length-1?0:e+1}))}),4500),function(){r()}}),[s]),Object(j.jsxs)("div",{className:"mobile-promotion-product-container",children:[Object(j.jsx)("div",{className:"promotion-title",children:"FUNCTION THAT FITS FORM"}),Object(j.jsx)("img",{src:x,alt:"main",className:"image-gif"}),Object(j.jsxs)("div",{className:"promotion-slider",children:[Object(j.jsx)("div",{className:"slideshowSlider",style:{transform:"translate3d(".concat(100*-s,"%, 0, 0)")},children:n.map((function(e,t){return Object(j.jsxs)("div",{className:"slide-item",children:[Object(j.jsx)("div",{className:"slider-item-title",children:e.name}),e.description.map((function(e,t){return Object(j.jsx)("div",{className:"slider-item-description",children:e.name})}))]},t)}))}),Object(j.jsx)("div",{className:"slideshowDots",children:n.map((function(e,t){return Object(j.jsx)("div",{className:"slideshowDot".concat(s===t?" active":""),onClick:function(){c(t)}},t)}))})]}),Object(j.jsx)("div",{class:"button-container",children:Object(j.jsx)("div",{class:"button-style",children:"View Detail"})})]})}),P=(s(386),function(e){var t=e.image,s=e.mainTitle,c=e.subTitle,i=e.buttonText,a=e.borderColor,n=e.textColor;return Object(j.jsxs)("div",{className:"mobile-product-image-container",children:[Object(j.jsx)("img",{src:t,className:"mobile-product-image-size",alt:"product featured container"}),Object(j.jsx)("div",{className:"mobile-product-title",children:s}),Object(j.jsx)("div",{className:"mobile-product-sub-title",children:c}),Object(j.jsx)("div",{className:"mobile-product-button-container",style:{border:"2px solid ".concat(a),color:n},children:i})]})}),z=(s(387),function(){return Object(j.jsxs)("div",{className:"mobile-features-products-container",children:[Object(j.jsx)(P,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/cub40-Abstract_1024x1024@2x.jpg?v=1608468973",mainTitle:"AAAVape CUB 40 MOD KIT",subTitle:"Smooth and well-balanced.",buttonText:"AAAVape CUB",borderColor:"#d49321",textColor:"#d49321"}),Object(j.jsx)(P,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666",mainTitle:"AAAVape Matrix Pod",subTitle:"Rich and robust.",buttonText:"AAAVape Matrix",borderColor:"#467A7B",textColor:"#467A7B"}),Object(j.jsx)(P,{image:"https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BOOST-kit-STAINLESS_8394580e-8bd8-43b2-afdf-9c933f244804_1024x1024@2x.png?v=1608717181",mainTitle:"AAAVape Boost Vape Pen",subTitle:"Mellow, cool and crisp.",buttonText:"AAAVape Boost",borderColor:"#846348",textColor:"#846348"})]})}),K=(s(388),function(e){var t=e.mainTitle,s=e.address;return Object(j.jsx)("div",{className:"mobile-store-location-card-container",children:Object(j.jsxs)("div",{className:"row ml-2 mr-2",children:[Object(j.jsxs)("div",{className:"col-md-9",children:[Object(j.jsx)("div",{className:"mobile-location-name",children:t}),Object(j.jsx)("div",{className:"mobile-location-sub-title",children:Object(j.jsxs)(w.a,{placement:"top",children:[Object(j.jsx)("i",{className:"fas fa-map-marker-alt mr-2"})," ",s]})})]}),Object(j.jsxs)("div",{className:"col-md-3",children:[Object(j.jsx)("div",{children:Object(j.jsx)("i",{className:"fas fa-map-signs"})}),Object(j.jsx)("div",{children:"Indications"})]})]})})}),H=(s(389),function(){return Object(j.jsx)("div",{className:"mobile-store-locator-home-container container-fluid",children:Object(j.jsxs)("div",{className:"row ",children:[Object(j.jsx)("div",{className:"col-md-6",children:Object(j.jsx)("img",{src:N,alt:"store locator",className:"store-image-size"})}),Object(j.jsx)("div",{className:"col-md-6 pl-3 pr-3",children:Object(j.jsxs)("div",{className:"mobile-location-container",children:[Object(j.jsx)("div",{className:"mobile-location-title",children:"Find our store locations"}),Object(j.jsxs)("div",{className:"mobile-store-locations-list-container",children:[Object(j.jsx)(K,{mainTitle:"AAAVape HQ",address:"2nd Floor, Building B, Shangfang Industry Park, Shajing Xinqiao,Bao'an district., Shenzhen, Guangdong 518101 China"}),Object(j.jsx)(K,{mainTitle:"VaporDNA",address:"8162 Talbert Ave. Suite 103 Huntington Beach CA 92646 Huntington Beach, CA 92646 USA"}),Object(j.jsx)(K,{mainTitle:"Vaporismcz",address:"28. \u0159\xedjna 159/214 70900 Ostrava, Czech Republic Ostrava Czech Republic"})]})]})})]})})}),G=function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(L,{}),Object(j.jsx)(E,{}),Object(j.jsx)(z,{}),Object(j.jsx)(H,{})]})};t.default=function(){return a.isMobile?Object(j.jsx)(G,{}):Object(j.jsx)(F,{})}}}]);
//# sourceMappingURL=3.2f584733.chunk.js.map