(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{916:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),c=n(122),i=n(288),a=n(57),u=n(160),l=n.n(u),f=n(19),s=n.n(f),p=n(182),m=n.n(p);n(934);function y(t,e,n,r,o,c,i){try{var a=t[c](i),u=a.value}catch(l){return void n(l)}a.done?e(u):Promise.resolve(u).then(r,o)}function h(t){return(h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w(t);if(e){var o=w(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return d(this,n)}}function d(t,e){return!e||"object"!==h(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var k=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(u,t);var e,n,r,c=v(u);function u(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),c.call(this,t)}return e=u,(n=[{key:"render",value:function(){this.props.browserInfo.height;var t=this.props,e=t.homeBgList,n=t.selftalking,r=s()(e,"1.fullUrl","");return o.a.createElement("div",{className:"selftalking"},o.a.createElement(i.a,{isFixed:!0}),o.a.createElement("div",{className:"selftalking-wrap",style:{background:"url(".concat(r,") no-repeat fixed top")}},o.a.createElement("div",{className:"selftalking-content"},o.a.createElement("ul",{className:"selftalking-content-ul"},o.a.createElement("div",{className:"selftalking-content-line"}),m()(n,(function(t,e){var n=e%2===0?"selftalking-content-text-left":"selftalking-content-text-right";return o.a.createElement("li",{key:t._id,className:n},o.a.createElement("p",null,t.content),o.a.createElement("span",null,Object(a.e)(t.createTime)))}))))))}}])&&g(e.prototype,n),r&&g(e,r),u}(r.Component);k.getInitialProps=function(){var t,e=(t=regeneratorRuntime.mark((function t(e){var n,r,o,c,i,a,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,r=n.dispatch,o=n.getState,(c=o()).article,i=c.home,c.common,a=i.homeBgList,u=[],l()(a)&&u.push(r({type:"home/getBgImageList"})),l()(s()(i,"selftalking.result"))&&u.push(r({type:"home/getSelftalkingList"})),t.next=8,Promise.all(u);case 8:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function i(t){y(c,r,o,i,a,"next",t)}function a(t){y(c,r,o,i,a,"throw",t)}i(void 0)}))});return function(t){return e.apply(this,arguments)}}();e.default=Object(c.connect)((function(t){return{browserInfo:t.common.browserInfo,homeBgList:t.home.homeBgList,selftalking:t.home.selftalking}}))(k)},934:function(t,e,n){}}]);