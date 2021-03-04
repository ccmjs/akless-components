/**
 * @overview ccmjs-based web component for users
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (04.03.2021)
 */

( () => {
  const component = {
    name: 'users',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
//    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs#md5" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "store": [ "ccm.store", {
        "john": {
          "key": "john",
          "user": "john@web.de",
          "name": "John Doe"
        },
        "jane": {
          "key": "jane",
          "user": "jane@web.de",
          "name": "Jane Doe"
        }
      } ]
    },

    Instance: function () {
      let $, user = null;

      this.init = async () => { $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm ); };

      this.start = async () => {};

      /**
       * logs an user in if not already logged in
       * @params {string} [username] only needed if user is not already logged in
       * @params {string} [password=''] default: empty password
       * @returns {Promise<Object>} user data
       */
      this.login = async ( username, password = '' ) => user || ( user = ( await this.store.get( { user: username, token: this.hash ? this.hash( password ) : password } ) || [ null ] )[ 0 ] );

      /**
       * logs the user out
       * @returns {Promise<null>}
       */
      this.logout = async () => user = null;

      /**
       * checks if an user is logged in
       * @returns {boolean}
       */
      this.isLoggedIn = () => !!user;

      /**
       * returns displayed username
       * @returns {string}
       */
      this.getUsername = () => {
        const user = $.clone( this.getValue() );
        return user.name || user.user || user.key;
      };

      /**
       * returns authentication mode
       * @returns {string}
       */
      this.getRealm = () => this.component.name;

      /**
       * returns current result data
       * @returns {Object} user data
       */
      this.getValue = () => $.clone( user );

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();