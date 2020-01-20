/**
 * <p>ES6 module that exports helper functions for <i>ccm</i> component developers</p>
 * <p>(namespaces are only used for categorization)</p>
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @namespace ModuleHelper
 */

/*--------------------------------------------------- Action Data ----------------------------------------------------*/

/**
 * helper functions for handling action data (predefined function calls)
 * @namespace ModuleHelper.ActionData
 */

/**
 * executes action data
 * @param {Array} action - action data
 * @param {Object} [context] - context for this
 * @returns {Promise<*>} return value of executed action data
 * @example action( [ functionName, 'param1', 'param2' ] )
 * @example action( [ 'functionName', 'param1', 'param2' ] )
 * @example action( [ 'this.functionName', 'param1', 'param2' ], context )
 * @example action( [ function () { console.log( this ); } ], context )
 * @example action( [ 'my.namespace.functionName', 'param1', 'param2' ] )
 * @example action( [ [ 'ccm.load', 'moduleURL#functionName' ], 'param1', 'param2' ] )
 * @example action( [ functionName ] )  // without parameters
 * @example action( functionName )      // without array
 * @memberOf ModuleHelper.ActionData
 */
export async function action( action, context ) {
  const ccm = framework( arguments );

  // action is no array? => convert to array
  if ( !Array.isArray( action ) ) action = [ action ];

  // support import of an external function
  action[ 0 ] = await ccm.helper.solveDependency( action[ 0 ] );

  // execute action data
  if ( typeof action[ 0 ] === 'function' )
    return action[ 0 ].apply( context, action.slice( 1 ) );
  else
    return executeByName( action[ 0 ], action.slice( 1 ), context, ccm );
}

/**
 * performs a function by function name
 * @param {string} name - function name
 * @param {Array} [args] - function arguments
 * @param {Object} [context] - context for this
 * @returns {*} return value of performed function
 * @example action( [ 'functionName', 'param1', 'param2' ] )
 * @example action( [ 'this.functionName', 'param1', 'param2' ], context )
 * @example action( [ 'my.namespace.functionName', 'param1', 'param2' ] )
 * @memberOf ModuleHelper.ActionData
 */
export function executeByName( name, args, context ) {
  const namespaces = name.split( '.' );
  let flag;
  if ( namespaces[ 0 ] === 'this' ) flag = !!namespaces.shift();
  let namespace = flag ? context : window;
  name = namespaces.pop();
  namespaces.forEach( value => namespace = namespace[ value ] );
  return namespace[ name ].apply( context, args );
}

/*--------------------------------------------- Asynchronous Programming ---------------------------------------------*/

/**
 * helper functions for handling asynchronous programming
 * @namespace ModuleHelper.AsynchronousProgramming
 */

/**
 * workaround for an asynchronous foreach
 * @param {Array} array - array to be iterated
 * @param {Function} callback - asynchronous function that is called for each array value
 * @returns {Promise<void>}
 * @example
 * const waiting_times = [ 100, 200, 300 ];
 * await asyncForEach( waiting_times, async ( value, i, array ) => {
 *   await ccm.helper.sleep( value );
 *   console.log( value, i, array );
 * } );
 * @memberOf ModuleHelper.AsynchronousProgramming
 */
export async function asyncForEach( array, callback ) {

  for ( let i = 0; i < array.length; i++ )
    await callback( array[ i ], i, array );

}

/**
 * sleep for a given number of milliseconds
 * @param {number} time - sleep time in milliseconds
 * @returns {Promise<void>}
 * @example await sleep( 3000 );
 * @example sleep( 3000 ).then( () => {...} ) );
 * @memberOf ModuleHelper.AsynchronousProgramming
 */
export function sleep( time ) { return new Promise( resolve => setTimeout( resolve, time ) ); }

/*----------------------------------------------------- Checker ------------------------------------------------------*/

/**
 * helper functions for checking conditions
 * @namespace ModuleHelper.Checker
 */

/**
 * checks if an ccm instance has DOM contact
 * @param {Object} instance - ccm instance
 * @returns {boolean}
 * @example
 * // <body><div id="app"></div></body>
 * const instance = await suite.ccm.instance( component, { root: document.querySelector( '#app' ) } );
 * console.log( hasDomContact( instance ) ) );  // => true
 * @example
 * const instance = await suite.ccm.instance( component, { root: document.createElement( 'div' ) } );
 * console.log( hasDomContact( instance ) ) );  // => false
 * @example
 * // <body><div id="app"></div></body>
 * const parent = await suite.ccm.instance( component, { root: document.querySelector( '#app' ) } );
 * const instance = await suite.ccm.instance( component, { parent: parent } );
 * parent.element.appendChild( instance.root );
 * console.log( hasDomContact( instance ) ) );  // => true
 * @example
 * // <body><div id="app"></div></body>
 * const parent = await suite.ccm.instance( component, { root: document.querySelector( '#app' ) } );
 * const instance = await suite.ccm.instance( component, { parent: parent } );
 * console.log( hasDomContact( instance ) ) );  // => false
 * @memberOf ModuleHelper.Checker
 */
export function hasDomContact( instance ) {
  const ccm = framework( arguments );
  return document.contains( ccm.context.root( instance ).root ) && ( hasParentContact( instance, ccm ) || !instance.parent )
}

/**
 * checks if an ccm instance has parent element contact
 * @param {Object} instance - ccm instance
 * @returns {boolean}
 * @example
 * const parent = await suite.ccm.instance( component );
 * const instance = await suite.ccm.instance( component, { parent: parent } );
 * parent.element.appendChild( instance.root );
 * console.log( hasParentContact( instance ) ) );  // => true
 * @example
 * const parent = await suite.ccm.instance( component );
 * const instance = await suite.ccm.instance( component, { parent: parent } );
 * console.log( hasParentContact( instance ) ) );  // => false
 * @memberOf ModuleHelper.Checker
 */
export function hasParentContact( instance ) {
  return instance.parent && instance.parent.element.contains( instance.root );
}

/**
 * checks if current web browser is Firefox
 * @returns {boolean}
 * @memberOf ModuleHelper.Checker
 */
export function isFirefox() {
  return navigator.userAgent.search( 'Firefox' ) > -1;
}

/**
 * checks if current web browser is Google Chrome
 * @returns {boolean}
 * @memberOf ModuleHelper.Checker
 */
export function isGoogleChrome() {
  return /Chrome/.test( navigator.userAgent ) && /Google Inc/.test( navigator.vendor );
}

/**
 * checks if current web browser is Safari
 * @returns {boolean}
 * @memberOf ModuleHelper.Checker
 */
export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test( navigator.userAgent );
}

/*-------------------------------------------------- Data Handling ---------------------------------------------------*/

/**
 * helper functions for data handling
 * @namespace ModuleHelper.DataHandling
 */

/**
 * converts an array to an object
 * @param {Array|Object} obj - array or object that contains the array
 * @param {string} [key] - object property where the array is contained
 * @returns {Object.<string,boolean>} resulting object
 * @example console.log( arrToObj( [ 'foo', 'bar' ] ) );  // => { foo: true, bar: true }
 * @example console.log( arrToObj( [ 1, 2 ] ) );  // => { 1: true, 2: true }
 * @example console.log( arrToObj( { key: [ 'foo', 'bar' ] }, 'key' ) );  // => { foo: true, bar: true }
 * @example
 * const obj = { key: [ 'foo', 'bar' ] };
 * arrToObj( obj, 'key' );  // without return value (original object is manipulated)
 * console.log( obj );      // => { key: { foo: true, bar: true } }
 * @memberOf ModuleHelper.DataHandling
 */
export function arrToObj( obj, key ) {

  const arr = key ? obj[ key ] : obj;
  if ( !Array.isArray( arr ) ) return null;

  const result = {};
  arr.forEach( value => result[ value ] = true );
  if ( key ) obj[ key ] = result;
  return result;

}

/**
 * cleans an object from falsy values
 * @param {object|Array} obj - object or array
 * @param {boolean} [deep] - clean also deeper properties (recursive)
 * @returns {object|Array} cleaned object (or array)
 * @example cleanObject( [ 'foo', false, 0, '', null, undefined, [], {} ] )  // => [ 'foo', [], {} ]
 * @memberOf ModuleHelper.DataHandling
 */
export function cleanObject( obj, deep ) {
  const ccm = framework( arguments );

  if ( Array.isArray( obj ) ) {
    for ( let i = obj.length - 1; i >= 0; i-- )
      if ( !obj[ i ] )
        obj.splice( i, 1 );
      else if ( deep && typeof obj[ i ] === 'object' && !ccm.helper.isSpecialObject( obj[ i ] ) )
        cleanObject( obj[ i ], ccm );
  }
  else
    for ( const key in obj )
      if ( obj.hasOwnProperty( key ) )
        if ( !obj[ key ] )
          delete obj[ key ];
        else if ( deep && typeof obj[ key ] === 'object' && !ccm.helper.isSpecialObject( obj[ key ] ) )
          cleanObject( obj[ key ], ccm );

  return obj;
}

/**
 * @summary decodes with encodeJSON() encoded JSON
 * @description
 * All <code>%'%</code> are replaced with <code>"</code>.<br>
 * Returns passed parameter if decoding fails.
 * @param {string} str - encoded JSON
 * @returns {Object|Array} decoded JSON
 * @example decodeJSON( "{%'%log%'%:true,%'%restart%'%:true}" )       // => { log: true, restart: true }
 * @example decodeJSON( "[%'%ccm.instance%'%,%'%./ccm.user.js%'%]" )  // => [ "ccm.instance", "./ccm.user.js" ]
 * @memberOf ModuleHelper.DataHandling
 */
export function decodeJSON( str ) {
  const ccm = framework( arguments );

  if ( typeof str !== 'string' || !ccm.helper.regex( 'json' ).test( str ) ) return str;
  return ccm.helper.parse( str.replace( /%'%/g, '"' ) );
}

/**
 * @summary encodes JSON as string so that it can be set as value for input elements
 * @description
 * All <code>"</code> are replaced with <code>%'%</code>.<br>
 * Returns passed parameter if encoding fails.
 * @param {Object|Array} json - JSON
 * @returns {string} encoded JSON
 * @example encodeJSON( { log: true, restart: true } )         // => "{%'%log%'%:true,%'%restart%'%:true}"
 * @example encodeJSON( [ 'ccm.instance', './ccm.user.js' ] )  // => "[%'%ccm.instance%'%,%'%./ccm.user.js%'%]"
 * @memberOf ModuleHelper.DataHandling
 */
export function encodeJSON( json ) {
  const ccm = framework( arguments );

  if ( typeof json !== 'object' ) return json;
  return ccm.helper.stringify( json ).replace( /"/g, "%'%" );
}

/**
 * escapes HTML characters of a string value
 * @param {string} value - string value
 * @returns {string}
 * @example escapeHTML( 'Hello <b>World</b>!' )  // => 'Hello &lt;b&gt;World&lt;/b&gt;!'
 * @memberOf ModuleHelper.DataHandling
 */
export function escapeHTML( value ) {
  const text = document.createTextNode( value );
  const div = document.createElement( 'div' );
  div.appendChild( text );
  return div.innerHTML;
}

/**
 * filters properties from an object
 * @param {Object} obj - object
 * @param {...string} [properties] - properties
 * @return {Object} filtered properties
 * @example filterProperties( { a: 'x', b: 'y', c: 'z' }, 'a', 'b' )  // => { a: 'x', b: 'y' }
 * @memberOf ModuleHelper.DataHandling
 */
export function filterProperties( obj, properties ) {
  const result = {};
  properties = [ ...arguments ]; properties.shift();
  properties.forEach( property => {
    if ( obj[ property ] !== undefined )
      result[ property ] = obj[ property ];
  } );
  return result;
}

/**
 * renames the property name of an object
 * @param {Object} obj - the object that contains the property
 * @param {string} before - old property name
 * @param {string} after - new property name
 * @example
 * const obj = { foo: 4711 };
 * renameProperty( obj, 'foo', 'bar' );
 * console.log( obj );  // => { "bar": 4711 }
 * @memberOf ModuleHelper.DataHandling
 */
export function renameProperty( obj, before, after ) {
  obj[ after ] = obj[ before ];
  delete obj[ before ];
  if ( obj[ after ] === undefined ) delete obj[ after ];
}

/**
 * shuffles an array in place with the Fisher-Yates algorithm
 * @see https://stackoverflow.com/a/6274381
 * @param {Array} array
 * @example
 * const array = [ 1, 2, 3 ];
 * shuffleArray( array );
 * console.log( array );
 * @memberOf ModuleHelper.DataHandling
 */
export function shuffleArray( array ) {
  for ( let i = array.length - 1; i > 0; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
  }
}

/**
 * unescapes HTML characters of a string value
 * @param {string} value - string value
 * @returns {string}
 * @example escapeHTML( 'Hello &lt;b&gt;World&lt;/b&gt;!' )  // => 'Hello <b>World</b>!'
 * @memberOf ModuleHelper.DataHandling
 */
export function unescapeHTML( value ) {
  const element = document.createElement( 'div' );
  return value.replace( /\&[#0-9a-z]+;/gi, x => {
    element.innerHTML = x;
    return element.innerText;
  } );
}

/*-------------------------------------------------- Data Workflow ---------------------------------------------------*/

/**
 * helper functions for data workflow handling
 * @namespace ModuleHelper.DataWorkflow
 */

/**
 * @summary gets a dataset from a datastore via given settings
 * @description
 * The original settings given are not changed (they are cloned).<br>
 * If the settings do not contain a dataset key, a unique key is generated.<br>
 * If the dataset does not exist in the datastore, an empty dataset is returned. This dataset is not newly created in the datastore and is only returned locally.<br>
 * Instead of the settings, a dataset can be given directly. This dataset is then returned as result.<br>
 * If the dataset key is specified directly in the settings as the dataset, this dataset is returned as the result.<br>
 * A user instance that can be reached from the datastore is automatically detected.
 * @param {Object} [settings={}] - contains the required data to determine the dataset (or is directly the dataset)
 * @param {Object} settings.store - the datastore that contains the dataset
 * @param {*} [settings.key] - the key of the dataset in the datastore (or initial dataset)
 * @param {boolean} [settings.login] - The user must log in if he is not already logged in to receive the dataset (only if a user instance could be determined automatically).
 * @param {boolean} [settings.user] - The dataset key given in the settings is expanded to a user-specific key: <code>[ dataset_key, user_key ]</code> (only if user is detected and logged in)
 * @param {Object} [settings.permissions] - If the dataset does not exist, the empty dataset then returned will contain these permission settings.
 * @param {Function} [settings.convert] - With this function, the data contained in the result dataset can be adjusted.
 * @returns {Promise<Object>}
 * @throws {Error} if user must log in and login is canceled
 * @example await dataset( { store: datastore, key: dataset_key } )  // => { key: dataset_key, ... }
 * @example await dataset( { key: dataset_key, ... } )  // => { key: dataset_key, ... }
 * @example await dataset( { store: datastore, key: { key: dataset_key, ... } } )  // => { key: dataset_key, ... }
 * @example await dataset( {
 *   store: datastore,
 *   key: dataset_key,
 *   login: true,
 *   user: true
 * } )  // => { key: [ dataset_key, user_key ], ... }
 * @example await dataset( {
 *   store: datastore,
 *   permissions: { creator: 'john', realm: 'guest', access: 'creator' }
 * } )  // => { key: generated_key, _: { creator: 'john', realm: 'guest', access: 'creator' } }
 * @example await dataset( {
 *   store: datastore,
 *   key: dataset_key,
 *   convert: dataset => { dataset.lang = dataset.lang.toUpperCase(); return dataset; }
 * } )  // => { key: dataset_key, lang: 'EN', ... }
 * @memberOf ModuleHelper.DataWorkflow
 */
export async function dataset( settings={} ) {
  const ccm = framework( arguments );

  // no manipulation of original passed parameter (avoids unwanted side effects)
  settings = ccm.helper.clone( settings );

  // settings are dataset directly? => dataset is result
  if ( !ccm.helper.isDatastore( settings.store ) ) return settings;

  // no dataset key? => generate a unique key
  if ( !settings.key ) settings.key = ccm.helper.generateKey();

  // key is initial data? => take it as result
  if ( ccm.helper.isDataset( settings.key ) ) return settings.convert ? await settings.convert( settings.key ) : settings.key;

  /**
   * nearest user instance in ccm context tree
   * @type {Object}
   */
  const user = ccm.context.find( settings.store, 'user' );

  // user exists and must be logged in? => login user (if not already logged in)
  user && settings.login && await user.login();

  // should a user-specific key be used? => make key user-specific
  if ( ccm.helper.isInstance( user ) && settings.user && user.isLoggedIn() ) settings.key = [ settings.key, user.data().key ];

  // get dataset from datastore
  let dataset = await settings.store.get( settings.key );

  // dataset not exists? => use empty dataset
  if ( !dataset ) {
    dataset = { key: settings.key };
    if ( settings.permissions ) dataset._ = settings.permissions;
  }

  // has converter? => convert dataset
  if ( settings.convert ) dataset = await settings.convert( dataset );

  return dataset;
}

/**
 * @summary allows a declarative way to perform usual finish actions
 * @description
 * The original parameters given are not changed (they are cloned).<br>
 * If a <i>ccm</i> instance is passed for <code>settings</code>, the finish actions defined via the <code>instance.onfinish</code> property are used.<br>
 * If a function is passed for <code>settings</code>, the function is called with the result data.<br>
 * If a <i>ccm</i> instance is passed for <code>settings</code>, the result data are automatically determined via <code>instance.getValue()</code>. To do this, the instance must have a <code>getValue</code> method.<br>
 * If a <i>ccm</i> instance is passed for <code>settings</code>, the nearest user instance in the <i>ccm</i> context of the instance is automatically determined.
 * @param {Object|Function} settings - declarative settings for usual finish actions (or 'onfinish' callback or finished <i>ccm</i> instance)
 * @param {Object} [results] - result data of the finished <i>ccm</i> instance
 * @param {string} [settings.confirm] - show confirm box (no finish actions will be performed if user chooses abort)
 * @param {Function} [settings.condition] - no finish actions will be performed if this function returns a falsy value (result data and possibly the <i>ccm</i> instance is passed as parameters)
 * @param {boolean} [settings.login] - user will be logged in if not already logged in (only works if a user instance could be determined)
 * @param {Function} [settings.convert] - for dynamic adjustment of the results data (result data is passed as parameter, must return adjusted result data)
 * @param {boolean} [settings.log] - log result data in the developer console of the web browser
 * @param {Object} [settings.clear] - clear website area of the finished <i>ccm</i> instance
 * @param {Object|boolean} [settings.store] - use this to store the result data in a data store (use boolean true to apply the settings of <code>instance.data</code>")
 * @param {Object} settings.store.settings - settings for a <i>ccm</i> datastore (result data will be set in this datastore)
 * @param {*} [settings.store.key] - dataset key for result data in the datastore (default is generated key)
 * @param {boolean} [settings.store.user] - The dataset key is expanded to an user-specific key: <code>[ dataset_key, user_key ]</code> (only if user is detected and logged in)
 * @param {boolean} [settings.store.unique] - The dataset key is expanded with an unique hash: <code>[ dataset_key, user_key, unique_hash ]</code>
 * @param {Object} [settings.store.permissions] - If the dataset does not exist, the dataset then will created with these permission settings.
 * @param {string} [settings.alert] - show alert message
 * @param {boolean} [settings.restart] - restart finished <i>ccm</i> instance
 * @param {{component: string, config: Object}|*} [settings.render] - render other content (<i>ccm</i>-based app or HTML content, as default the content is rendered in the root element of the instance)
 * @param {callback} [settings.callback] - additional finish callback which will be called after the other finish actions (result data and possibly the <i>ccm</i> instance is passed as parameter)
 * @returns {Promise<void>}
 * @example
 * instance.onfinish = {
 *   confirm: 'Are you sure?',
 *   condition: ( results, instance ) => true,
 *   login: true,
 *   convert: json => json,
 *   log: true,
 *   clear: true,
 *   store: {
 *     settings: { name: 'store_name', url: 'path/to/server/interface.php' },
 *     key: 'dataset_key',
 *     user: true,
 *     unique: true,
 *     permissions: {
 *       creator: 'john',
 *       group: {
 *         john: true,
 *         jane: true
 *       },
 *       access: {
 *         get: 'all',
 *         set: 'group',
 *         del: 'creator'
 *       }
 *     }
 *   },
 *   alert: 'Finished!',
 *   restart: true,
 *   render: {
 *     component: 'component_url',
 *     config: {...}
 *   },
 *   callback: ( results, instance ) => console.log( results, instance )
 * };
 * onFinish( instance );
 * @example
 * instance.data = {
 *   store: { name: 'store_name', url: 'path/to/server/interface.php' }
 *   key: 'dataset_key',
 *   user: true,
 *   unique: true,
 *   permissions: {...}
 * };
 * instance.onfinish = {
 *   store: true
 * };
 * onFinish( instance );
 * @example
 * onFinish( { render: {
 *   component: 'component_url',
 *   config: {
 *     root: document.body,
 *     ...
 *   }
 * } } );
 * @example
 * instance.onfinish = { render: 'Hello <b>World</b>!' };
 * onFinish( instance );
 * @example
 * instance.onfinish = { render: { inner: 'Hello World!' } } };
 * onFinish( instance );
 * @memberOf ModuleHelper.DataWorkflow
 */
export async function onFinish( settings, results ) {
  const ccm = framework( arguments );
  let instance, user;

  // no manipulation of original passed parameters (avoids unwanted side effects)
  settings = ccm.helper.clone( settings );
  results  = ccm.helper.clone( results  );

  // has ccm instance? => take finish actions from 'instance.onfinish' and result data from 'instance.getValue()'
  if ( ccm.helper.isInstance( settings ) ) {
    instance = settings;
    if ( !results && settings.getValue ) results = settings.getValue();  // determine result data
    settings = settings.onfinish;                                        // determine finish actions
    user = ccm.context.find( instance, 'user' );                         // determine nearest user instance in the ccm context of the instance
  }

  if ( !settings ) return;                                           // no finish actions? => abort
  if ( typeof settings === 'function' ) return settings( results );  // are the finish actions defined by function? => perform function with results

  if ( settings.confirm && confirm( !settings.confirm ) ) return;                          // confirm box
  if ( settings.condition && !( await settings.condition( results, instance ) ) ) return;  // check condition
  user && settings.login && await user.login();                                            // login user (if not already logged in)
  if ( settings.convert ) results = await settings.convert( results );                     // adjust result data
  settings.log && console.log( results );                                                  // log result data (if necessary)
  if ( instance && settings.clear ) instance.element.innerHTML = '';                       // clear website area of the instance (if necessary)

  // store result data in a datastore
  if ( settings.store && results ) {

    /**
     * deep copy of result data
     * @type {Object}
     */
    const dataset = ccm.helper.clone( results );

    // allow shortcut for update dataset in its original datastore
    if ( instance && settings.store === true ) {
      settings.store = {};
      if ( ccm.helper.isObject( instance.data ) && ccm.helper.isDatastore( instance.data.store ) ) {
        settings.store = ccm.helper.clone( instance.data );
        settings.store.settings = settings.store.store;
        delete settings.store.store;
      }
    }

    // prepare dataset key
    dataset.key = settings.store.key || ccm.helper.generateKey();
    if ( !Array.isArray( dataset.key ) && ( settings.store.user || settings.store.unique ) ) dataset.key = [ dataset.key ];
    settings.store.user && user && user.isLoggedIn() && dataset.key.push( user.data().key );
    settings.store.unique && dataset.key.push( ccm.helper.generateKey() );

    if ( settings.store.permissions ) dataset._ = settings.store.permissions;  // prepare permission settings
    if ( user ) settings.store.settings.user = user;                           // set user instance for datastore
    await ccm.set( settings.store.settings, dataset );                         // store result data in datastore

  }

  if ( settings.alert ) alert( settings.alert );           // alert message
  instance && settings.restart && await instance.start();  // restart ccm instance

  // render other content (ccm-based app or HTML content)
  if ( settings.render )
    if ( ccm.helper.isObject( settings.render ) && settings.render.component ) {
      let config = settings.render.config || {};                                  // determine instance configuration
      config.root = config.root || instance && instance.root;                     // default root element is root of instance
      config.parent = !settings.render.root && instance && instance.parent;       // set parent instance
      await ccm.start( settings.render.component, config );                       // render ccm-based app
    }
    else instance && setContent( instance.root, ccm.helper.html( settings.render ), ccm );  // render HTML content

  // perform additional finish callback
  settings.callback && await settings.callback( results, instance );

}

/*------------------------------------------------- DOM Manipulation -------------------------------------------------*/

/**
 * helper functions for DOM Manipulation
 * @namespace ModuleHelper.DomManipulation
 */

/**
 * appends content to a HTML element (contained script tags will be removed)
 * @param {Element} element - HTML element
 * @param {...*} content
 * @example append( document.body, 'Hello World!' )
 * @example append( document.body, 'Hello', ' ', 'World', '!' )
 * @example append( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example append( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example append( document.body, { inner: 'Hello World!' } )
 * @example append( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
 * @memberOf ModuleHelper.DomManipulation
 */
export function append( element, content ) {
  const ccm = framework( arguments );

  // hold content parameters in an array
  content = [ ...arguments ]; content.shift();

  // append each content to the HTML element
  content.forEach( content => {

    // is array? => recursive call for each value
    if ( Array.isArray( content ) )
      return content.forEach( content => append( element, content, ccm ) );

    // append content
    content = protect( ccm.helper.html( content ), ccm );
    if ( typeof content === 'object' )
      element.appendChild( content );
    else
      element.insertAdjacentHTML( 'beforeend', content );

  } );

}

/**
 * returns a <i>ccm</i> loading icon
 * @param {Object} [instance] - <i>ccm</i> instance (for determining Shadow DOM)
 * @returns {Element} <i>ccm</i> loading icon
 * @example document.body.appendChild( loading() )
 * @example document.body.appendChild( loading( instance ) )
 * @memberOf ModuleHelper.DomManipulation
 */
export function loading( instance ) {

  // set keyframe for ccm loading icon animation
  let element = instance ? instance.element.parentNode : document.head;
  if ( !element.querySelector( '#ccm_keyframe' ) ) {
    const style = document.createElement( 'style' );
    style.id = 'ccm_keyframe';
    style.appendChild( document.createTextNode( '@keyframes ccm_loading { to { transform: rotate(360deg); } }' ) );
    element.appendChild( style );
  }

  // create loading icon
  element = document.createElement( 'div' );
  element.classList.add( 'ccm_loading' );
  element.setAttribute( 'style', 'display: grid; padding: 0.5em;' );
  element.innerHTML = '<div style="align-self: center; justify-self: center; display: inline-block; width: 2em; height: 2em; border: 0.3em solid #f3f3f3; border-top-color: #009ee0; border-left-color: #009ee0; border-radius: 50%; animation: ccm_loading 1.5s linear infinite;"></div>';

  return element;
}

/**
 * prepends content to a HTML element (contained script tags will be removed)
 * @param {Element} element - HTML element
 * @param {...*} content
 * @example prepend( document.body, 'Hello World!' )
 * @example prepend( document.body, 'Hello', ' ', 'World', '!' )
 * @example prepend( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example prepend( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example prepend( document.body, { inner: 'Hello World!' } )
 * @example prepend( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
 * @memberOf ModuleHelper.DomManipulation
 */
export function prepend( element, content ) {
  const ccm = framework( arguments );

  // hold content parameters in an array (in reverse order)
  content = [ ...arguments ].reverse(); content.pop();

  // prepend each content to the HTML element
  content.forEach( content => {

    // is array? => recursive call for each value
    if ( Array.isArray( content ) )
      return content.reverse().forEach( content => prepend( element, content, ccm ) );

    // no child nodes? => append content
    if ( !element.hasChildNodes() )
      return append( element, content, ccm );

    // prepend content
    content = protect( ccm.helper.html( content ), ccm );
    if ( typeof content === 'object' )
      element.insertBefore( content, element.firstChild );
    else
      element.insertAdjacentHTML( 'afterbegin', content );

  } );

}

/**
 * removes an HTML element from its parent
 * @param {Element} element - HTML element
 * @example
 * const element = document.createElement( 'div' );
 * document.body.appendChild( element );
 * removeElement( element );
 * console.log( element.parentNode );  // => null
 * @memberOf ModuleHelper.DomManipulation
 */
export function remove( element ) {
  element && element.parentNode && element.parentNode.removeChild( element );
}

/**
 * replaces a HTML element with an other single HTML element (contained script tags will be removed)
 * @param {Element} element - HTML element (must have a parent)
 * @param {Object|string} other - other single HTML element
 * @example replace( document.querySelector( '#myid' ), '<b>World</b>' )
 * @example replace( document.querySelector( '#myid' ), { tag: 'b', inner: 'World' } )
 * @memberOf ModuleHelper.DomManipulation
 */
export function replace( element, other ) {
  const ccm = framework( arguments );
  element.parentNode && element.parentNode.replaceChild( protect( ccm.helper.html( other ), ccm ), element );
}

/**
 * set the content of a HTML element (contained script tags will be removed)
 * @param {Element} element - HTML element
 * @param {...*} content - new content for the HTML element (old content is cleared)
 * @example setContent( document.body, 'Hello World!' )
 * @example setContent( document.body, 'Hello', ' ', 'World', '!' )
 * @example setContent( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example setContent( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example setContent( document.body, { inner: 'Hello World!' } )
 * @example setContent( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
 * @memberOf ModuleHelper.DomManipulation
 */
export function setContent( element, content ) {
  element.innerHTML = '';           // clear old content
  append.apply( null, arguments );  // append new content
}

/*----------------------------------------------- HTML Input Elements ------------------------------------------------*/

/**
 * helper functions for handling of HTML input elements
 * @namespace ModuleHelper.InputElements
 */

/**
 * fills input elements with values
 * @param {Element} element - HTML element which contains the input elements (must not be a HTML form tag)
 * @param {Object} data - contains the values for the input elements
 * @example
 * // <body><input type="text" name="user"><input type="password" name="secret"></body>
 * fillForm( document.body, { user: 'JohnDoe', secret: '1aA' } );
 * console.log( formData( document.body ) ); // { user: 'JohnDoe', secret: '1aA' }
 * @example
 * // <body><input type="checkbox" name="agreed"></body> (boolean checkbox)
 * fillForm( document.body, { agreed: true } );
 * console.log( formData( document.body ) ); // { agreed: true }
 * @example
 * // <body><input type="checkbox" name="role" value="Coordinator"></body> (value checkbox)
 * fillForm( document.body, { role: 'Coordinator' } );
 * console.log( formData( document.body ) ); // { role: 'Coordinator' }
 * @example
 * // <body><input type="checkbox" name="types" value="A"><input type="checkbox" name="types" value="B"></body> (multi checkbox)
 * fillForm( document.body, { types: [ 'A', 'B' ] } );
 * console.log( formData( document.body ) ); // { types: [ 'A', 'B' ] }
 * @example
 * // <body><input type="radio" name="choice" value="A"><input type="radio" name="choice" value="B"></body> (radio buttons)
 * fillForm( document.body, { choice: 'A' } );
 * console.log( formData( document.body ) ); // { choice: 'A' }
 * @example
 * // <body><select name="item"><option value="A">Item A</option><option value="B">Item B</option></select></body> (selector box)
 * fillForm( document.body, { item: 'A' } );
 * console.log( formData( document.body ) ); // { item: 'A' }
 * @example
 * // <body><select name="item"><option>A</option><option>B</option></select></body> (selector box without values)
 * fillForm( document.body, { item: 'A' } );
 * console.log( formData( document.body ) ); // { item: 'A' }
 * @example
 * // <body><select multiple name="items"><option value="A">Item A</option><option value="B">Item B</option></select></body> (multi-selector box)
 * fillForm( document.body, { items: [ 'A', 'B' ] } );
 * console.log( formData( document.body ) ); // { items: [ 'A', 'B' ] }
 * @example
 * // <body><textarea name="description"></description></body> (textarea)
 * fillForm( document.body, { description: 'Hello World!' } );
 * console.log( formData( document.body ) ); // { description: 'Hello World!' }
 * @example
 * // <body><div contenteditable name="topic"></div></body> (in-place editing with contenteditable)
 * fillForm( document.body, { topic: 'Hello World!' } );
 * console.log( formData( document.body ) ); // { topic: 'Hello World!' }
 * @example
 * // <body><input type="text" name="deep.property.key"></input></body> (deep property value)
 * fillForm( document.body, { 'deep.property.key': 'value' } );
 * console.log( formData( document.body ) ); // { deep: { property: { key: 'value' } } }
 * @example
 * // <body><input type="text" name="data"></input></body> (complex data value)
 * fillForm( document.body, { data: { number: [ 1, 2, { a: 3 } ], checked: true, value: 'Hello World!' } } );
 * console.log( formData( document.body ) ); // { data: { number: [ 1, 2, { a: 3 } ], checked: true, value: 'Hello World!' } }
 * @memberOf ModuleHelper.InputElements
 */
export function fillForm( element, data ) {
  const ccm = framework( arguments );

  data = ccm.helper.clone( data );
  const dot = ccm.helper.toDotNotation( data, true );
  for ( const key in dot ) data[ key ] = dot[ key ];
  for ( const key in data ) {
    if ( !data[ key ] ) continue;
    if ( typeof data[ key ] === 'object' ) data[ key ] = encodeJSON( data[ key ], ccm );
    element.querySelectorAll( '[name="' + key + '"]' ).forEach( input => {
      if ( input.type === 'checkbox' ) {
        if ( input.value && typeof data[ key ] === 'string' && data[ key ].charAt( 0 ) === '[' )
          decodeJSON( data[ key ], ccm ).forEach( value => { if ( value === input.value ) input.checked = true; } );
        else
          input.checked = true;
      }
      else if ( input.type === 'radio' ) {
        if ( data[ key ] === input.value )
          input.checked = true;
      }
      else if ( input.tagName.toLowerCase() === 'select' ) {
        if ( input.hasAttribute( 'multiple' ) )
          data[ key ] = decodeJSON( data[ key ], ccm );
        input.querySelectorAll( 'option' ).forEach( option => {
          if ( input.hasAttribute( 'multiple' ) )
            data[ key ].forEach( value => encodeJSON( value, ccm ) === ( option.value ? option.value : option.innerHTML.trim() ) && ( option.selected = true ) );
          else if ( data[ key ] === ( option.value ? option.value : option.innerHTML.trim() ) )
            option.selected = true;
        } );
      }
      else if ( input.value === undefined )
        input.innerHTML = protect( data[ key ], ccm );
      else
        input.value = data[ key ];
    } );
  }

}

/**
 * gets the values of input elements
 * @param {Element} element - HTML element which contains the input elements (must not be a HTML form tag)
 * @returns {Object} values of the input elements
 * @example
 * // <body><input type="text" name="user"><input type="password" name="secret"></body>
 * fillForm( document.body, { user: 'JohnDoe', secret: '1aA' } );
 * console.log( formData( document.body ) ); // { user: 'JohnDoe', secret: '1aA' }
 * @example
 * // <body><input type="checkbox" name="agreed"></body> (boolean checkbox)
 * fillForm( document.body, { agreed: true } );
 * console.log( formData( document.body ) ); // { agreed: true }
 * @example
 * // <body><input type="checkbox" name="role" value="Coordinator"></body> (value checkbox)
 * fillForm( document.body, { role: 'Coordinator' } );
 * console.log( formData( document.body ) ); // { role: 'Coordinator' }
 * @example
 * // <body><input type="checkbox" name="types" value="A"><input type="checkbox" name="types" value="B"></body> (multi checkbox)
 * fillForm( document.body, { types: [ 'A', 'B' ] } );
 * console.log( formData( document.body ) ); // { types: [ 'A', 'B' ] }
 * @example
 * // <body><input type="radio" name="choice" value="A"><input type="radio" name="choice" value="B"></body> (radio buttons)
 * fillForm( document.body, { choice: 'A' } );
 * console.log( formData( document.body ) ); // { choice: 'A' }
 * @example
 * // <body><select name="item"><option value="A">Item A</option><option value="B">Item B</option></select></body> (selector box)
 * fillForm( document.body, { item: 'A' } );
 * console.log( formData( document.body ) ); // { item: 'A' }
 * @example
 * // <body><select name="item"><option>A</option><option>B</option></select></body> (selector box without values)
 * fillForm( document.body, { item: 'A' } );
 * console.log( formData( document.body ) ); // { item: 'A' }
 * @example
 * // <body><select multiple name="items"><option value="A">Item A</option><option value="B">Item B</option></select></body> (multi-selector box)
 * fillForm( document.body, { items: [ 'A', 'B' ] } );
 * console.log( formData( document.body ) ); // { items: [ 'A', 'B' ] }
 * @example
 * // <body><textarea name="description"></description></body> (textarea)
 * fillForm( document.body, { description: 'Hello World!' } );
 * console.log( formData( document.body ) ); // { description: 'Hello World!' }
 * @example
 * // <body><div contenteditable name="topic"></div></body> (in-place editing with contenteditable)
 * fillForm( document.body, { topic: 'Hello World!' } );
 * console.log( formData( document.body ) ); // { topic: 'Hello World!' }
 * @example
 * // <body><input type="text" name="deep.property.key"></input></body> (deep property value)
 * fillForm( document.body, { 'deep.property.key': 'value' } );
 * console.log( formData( document.body ) ); // { deep: { property: { key: 'value' } } }
 * @example
 * // <body><input type="text" name="data"></input></body> (complex data value)
 * fillForm( document.body, { data: { number: [ 1, 2, { a: 3 } ], checked: true, value: 'Hello World!' } } );
 * console.log( formData( document.body ) ); // { data: { number: [ 1, 2, { a: 3 } ], checked: true, value: 'Hello World!' } }
 * @memberOf ModuleHelper.InputElements
 */
export function formData( element ) {
  const ccm = framework( arguments );

  const data = {};
  element.querySelectorAll( '[name]' ).forEach( input => {
    let name = input.getAttribute( 'name' );
    if ( input.type === 'checkbox' ) {
      const value = input.checked ? ( input.value === 'on' ? true : input.value ) : ( input.value === 'on' ? false : '' );
      const multi = [ ...element.querySelectorAll( '[name="' + name + '"]' ) ].length > 1;
      if ( multi ) {
        if ( !data[ name ] ) data[ name ] = [];
        value && data[ name ].push( value );
      }
      else data[ name ] = value;
    }
    else if ( input.type === 'radio' )
      data[ name ] = input.checked ? input.value : ( data[ name ] ? data[ name ] : '' );
    else if ( input.tagName.toLowerCase() === 'select' ) {
      let result = [];
      if ( input.hasAttribute( 'multiple' ) )
        input.querySelectorAll( 'option' ).forEach( option => option.selected && result.push( option.value ? option.value : option.inner ) );
      else
        input.querySelectorAll( 'option' ).forEach( option => {
          if ( option.selected ) result = option.value ? option.value : option.inner;
        } );
      data[ name ] = result;
    }
    else if ( input.type === 'number' || input.type === 'range' ) {
      let value = parseInt( input.value );
      if ( isNaN( value ) ) value = '';
      data[ name ] = value;
    }
    else if ( input.value !== undefined )
      data[ name ] = input.value;
    else
      data[ input.getAttribute( 'name' ) ] = input.innerHTML;
    try {
      if ( typeof data[ name ] === 'string' )
        if ( ccm.helper.regex( 'json' ).test( data[ name ] ) )
          data[ name ] = decodeJSON( data[ name ], ccm );
    } catch ( err ) {}
  } );
  return ccm.helper.solveDotNotation( data );

}

/*----------------------------------------------------- Security -----------------------------------------------------*/

/**
 * helper functions for security handling
 * @namespace ModuleHelper.Security
 */

/**
 * @summary privatizes public members of an object
 * @description
 * Deletes all given properties in an object and returns another object with the deleted properties and there values.<br>
 * If no properties are given, then all not <i>ccm</i> relevant instance members will be privatized.<br>
 * List of <i>ccm</i> relevant properties that will not be privatized:
 * <ul>
 *   <li><code>ccm</code></li>
 *   <li><code>component</code></li>
 *   <li><code>config</code></li>
 *   <li><code>element</code></li>
 *   <li><code>id</code></li>
 *   <li><code>index</code></li>
 *   <li><code>parent</code></li>
 *   <li><code>root</code></li>
 *   <li><code>shadow</code></li>
 * </ul>
 * In addition to this: All functions and depending <i>ccm</i> context relevant <i>ccm</i> instances will also not be privatized.
 * If the first passed property is boolean 'true', than the privatized properties will not be deleted in the passed object.
 * @param {Object} object - object or <i>ccm</i> instance
 * @param {...string|boolean} [properties] - properties that have to privatized
 * @returns {Object} object that contains the privatized properties and there values
 * @example
 * // privatize two public instance members
 * ccm.component( {
 *   name: 'dummy1',
 *   ccm: ccm,
 *   config: { foo: 'abc', bar: 'xyz', baz: 4711 },
 *   Instance: function () {
 *     let my;
 *     this.ready = async () => {
 *       my = ccm.helper.privatize( this, 'foo', 'bar' );
 *       console.log( my );                // => { foo: 'abc', bar: 'xyz' }
 *       console.log( my.foo, this.foo );  // => abc undefined
 *       console.log( my.bar, this.bar );  // => xyz undefined
 *       console.log( my.baz, this.baz );  // => undefined 4711
 *     };
 *   }
 * } );
 * @example
 * // privatize all possible public instance members
 * ccm.component( {
 *   name: 'dummy2',
 *   ccm: ccm,
 *   config: { foo: 'abc', bar: 'xyz', baz: 4711 },
 *   Instance: function () {
 *     let my;
 *     this.ready = async () => {
 *       my = ccm.helper.privatize( this );
 *       console.log( my );                // => { foo: 'abc', bar: 'xyz', baz: 4711 }
 *       console.log( my.foo, this.foo );  // => abc undefined
 *       console.log( my.bar, this.bar );  // => xyz undefined
 *       console.log( my.baz, this.baz );  // => 4711 undefined
 *     };
 *   }
 * } );
 * @example
 * // log all non-ccm specific instance members
 * ccm.component( {
 *   name: 'dummy3',
 *   ccm: ccm,
 *   config: { foo: 'abc', bar: 'xyz', baz: 4711, logger: [ 'ccm.instance', logger_component_url, logger_config ] },
 *   Instance: function () {
 *     this.ready = async () => {
 *       this.logger && this.logger.log( 'ready', $.privatize( this, true ) );
 *       console.log( this.foo, this.bar, this.foo );  // => abc xyz 4711
 *     };
 *   }
 * } );
 * @memberOf ModuleHelper.Security
 */
export function privatize( object, properties ) {

  const keep = properties === true;
  const obj = {};
  if ( properties && ( !keep || arguments[ 2 ] ) )
    for ( let i = 1; i < arguments.length; i++ )
      privatizeProperty( arguments[ i ] );
  else
    for ( const key in object )
      privatizeProperty( key );
  return obj;

  function privatizeProperty( key ) {
    if ( key === true ) return;
    switch ( key ) {
      case 'ccm':
      case 'component':
      case 'config':
      case 'element':
      case 'id':
      case 'index':
      case 'parent':
      case 'root':
      case 'shadow':
        break;
      default:
        if ( typeof object[ key ] === 'function' ) return;
        if ( object[ key ] !== undefined ) obj[ key ] = object[ key ];
        if ( !keep ) delete object[ key ];
    }
  }

}

/**
 * filters script elements out of given HTML
 * @param {string|Element} html - HTML String or HTML Element
 * @returns {string|Element} cleaned HTML
 * @example protect( "Hello <script>alert('XSS');</script>World!" ) // => 'Hello World!'
 * @example
 * // <div>Hello <script>alert('XSS');</script>World!</div>
 * div = protect( div ); // => <div>Hello, World!</div>
 * @memberOf ModuleHelper.Security
 */
export function protect( html ) {
  const ccm = framework( arguments );

  if ( typeof html === 'string' )
    return html.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

  if ( ccm.helper.isElement( html ) )
    [ ...html.querySelectorAll( 'script' ) ].forEach( remove );

  return html;
}

/*--------------------------------------------------- Handover App ---------------------------------------------------*/

/**
 * helper functions for handover of an app
 * @namespace ModuleHelper.HandoverApp
 */

/**
 * returns the URL of a ccm-based app
 * @param {string} component - URL of the ccm component
 * @param {Object} store - settings for the ccm data store that contains the ccm instance configuration
 * @param {string|string[]} app_id - key of the data set that hold the ccm instance configuration
 * @param {string} website - URL of the website which renders the ccm-based app
 * @returns {string}
 * @memberOf ModuleHelper.HandoverApp
 */
export function appURL( component, store, app_id, website = 'https://ccmjs.github.io/digital-maker-space/app.html' ) {

  if ( store && app_id )
    return `${website}#component=${component}&name=${store.name}&url=${store.url}&key=${app_id}`;
  else
    return `${website}#component=${component}`;   // render with default instance configuration

}

/**
 * copies text inside a HTML element to clipboard
 * @param {Element} element - HTML element
 * @memberOf ModuleHelper.HandoverApp
 */
export function copyToClipboard( element ) {
  element.select();
  document.execCommand( 'copy' );
}

/**
 * decomposes a given app URL into component URL, component index, component name, component version, store settings and app ID
 * @param {string} app_url - URL of a ccm-based app
 * @param {Object} [ccm=window.ccm] - ccm framework version to be used internally
 * @returns {Object}
 * @memberOf ModuleHelper.HandoverApp
 */
export function decomposeAppURL( app_url ) {
  const ccm = framework( arguments );

  if ( !app_url ) return;

  const result = { store: {} };

  app_url.split( '#' )[ 1 ].split( '&' ).forEach( part => {
    if ( part.startsWith( 'component=' ) ) result.component  = part.split( '=' )[ 1 ];
    if ( part.startsWith( 'name='      ) ) result.store.name = part.split( '=' )[ 1 ];
    if ( part.startsWith( 'url='       ) ) result.store.url  = part.split( '=' )[ 1 ];
    if ( part.startsWith( 'key='       ) ) result.key        = part.split( '=' )[ 1 ];
  } );

  result.index = ccm.helper.getIndex( result.component );
  result.version = result.index.split( '-' );
  result.name = result.version[ 0 ];
  result.version.shift();
  result.version = result.version.length ? result.version : 'latest';

  if ( result.store.name === 'undefined' ) delete result.store.name;
  if ( result.store.url  === 'undefined' ) delete result.store.url;

  return result;
}

/**
 * decomposes a given embed code into component URL, component index, component name, component version, store settings and app ID
 * @param {string} embed_code - embed code of a ccm-based app
 * @returns {Object}
 * @memberOf ModuleHelper.HandoverApp
 */
export function decomposeEmbedCode( embed_code ) {
  const ccm = framework( arguments );

  if ( !embed_code ) return;
  embed_code = ccm.helper.html( embed_code );
  const dependency = ccm.helper.parse( embed_code.lastChild.getAttribute( 'key' ) );
  const index = embed_code.lastChild.tagName.substr( 'ccm-'.length ).toLowerCase();
  let version = index.split( '-' );
  const name = version[ 0 ];
  version.shift();
  return {
    component: embed_code.firstChild.getAttribute( 'src' ),
    index: index,
    name: name,
    version: version.length ? version : 'latest',
    store: dependency[ 1 ],
    key: dependency[ 2 ]
  };

}

/**
 * provides a download of an on-the-fly created file
 * @param {string} filename - file name including file extension
 * @param {string} content - content of the file
 * @param {string} [mime='text/html;charset=utf-8'] - media type followed by charset or 'base64' if non-textual
 * @memberOf ModuleHelper.HandoverApp
 */
export function download( filename, content, mime = 'text/html;charset=utf-8' ) {

  const element = document.createElement( 'a' );
  element.setAttribute( 'href', `data:${mime},${encodeURIComponent(content)}` );
  element.setAttribute( 'download', filename );
  element.style.display = 'none';
  document.body.appendChild( element );
  element.click();
  document.body.removeChild( element );

}

/**
 * provides a download of a ccm-based app as HTML file
 * @param {string} embed_code - embed code of the ccm-based app
 * @param {string} [filename='app'] - file name without file extension
 * @param {string} [title='App'] - website title
 * @param {string} [template='https://ccmjs.github.io/akless-components/resources/templates/app.html'] - URL of the HTML template file
 * @returns {Promise<void>}
 * @memberOf ModuleHelper.HandoverApp
 */
export async function downloadApp( embed_code, filename = 'app', title = 'App', template = 'https://ccmjs.github.io/akless-components/resources/templates/app.html' ) {

  template = await fetch( template ).then( response => response.text() );                 // load content of HTML template file
  template = template.replace( '__TITLE__', title ).replace( '__EMBED__', embed_code );   // integrate title and embed code
  download( `${filename}.html`, template );                                               // provide download of HTML file

}

/**
 * generates the HTML embed code of a ccm-based app
 * @param {string} component - URL of ccm component
 * @param {Object} store - settings of ccm data store which contains the ccm instance configuration data set
 * @param {string} app_id - dataset key of ccm instance configuration
 * @param {string} [template='https://ccmjs.github.io/akless-components/resources/templates/embed.html'] - URL of the HTML template file
 * @returns {Promise<string>} generated embed code
 * @memberOf ModuleHelper.HandoverApp
 */
export async function embedCode( component, store, app_id, template = 'https://ccmjs.github.io/akless-components/resources/templates/embed.html' ) {
  const ccm = framework( arguments );

  // load content of HTML template file
  template = await fetch( template ).then( response => response.text() );

  /**
   * index of the ccm component
   * @type {string}
   */
  const index = ccm.helper.getIndex( component );

  // replace placeholders in template
  template = template
    .replace( '__URL__', component )
    .replace( '__INDEX__', index )
    .replace( '__STORE__', ccm.helper.stringify( store ) )
    .replace( '__KEY__', app_id )
    .replace( '__INDEX__', index );

  return template;
}

/**
 * shows the content of an website area in fullscreen mode
 * @param {Element} element - website area
 * @memberOf ModuleHelper.HandoverApp
 */
export function fullscreen( element ) {

  if ( element.requestFullscreen )
    element.requestFullscreen();
  else if ( element.mozRequestFullScreen )    /* Firefox */
    element.mozRequestFullScreen();
  else if ( element.webkitRequestFullscreen ) /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  else if ( element.msRequestFullscreen )     /* IE/Edge */
    element.msRequestFullscreen();

}

/**
 * provides a download of a ccm-based app as iBook Widget (ZIP file)
 * @param {string} embed_code - embed code of the ccm-based app
 * @param {string} [filename='app'] - file name without file extension
 * @param {string} [title='App'] - website title for the index.html
 * @param {string} [folder='app'] - name of the folder inside the iBook Widget
 * @param {string} template - URL of the HTML template
 * @param {string} info_file - URL of the info file
 * @param {string} image_file - URL of the image file
 * @returns {Promise<void>}
 * @memberOf ModuleHelper.HandoverApp
 */
export async function iBookWidget( embed_code, filename = 'app', title = 'App', folder='app',
                                   template = 'https://ccmjs.github.io/akless-components/resources/templates/app.html',
                                   info_file = 'https://ccmjs.github.io/akless-components/resources/templates/ibook_widget/Info.plist',
                                   image_file = 'https://ccmjs.github.io/akless-components/resources/templates/ibook_widget/Default.png'
) {

  template = await fetch( template ).then( response => response.text() );                 // load content of HTML template file
  template = template.replace( '__TITLE__', title ).replace( '__EMBED__', embed_code );   // integrate title and embed code
  info_file = await fetch( info_file ).then( response => response.blob() );               // load content of info file
  image_file = await fetch( image_file ).then( response => response.blob() );             // load content of image file

  // generate ZIP file
  !window.JSZip  && await loadScript( 'https://ccmjs.github.io/akless-components/libs/jszip/jszip.min.js' );
  !window.saveAs && await loadScript( 'https://ccmjs.github.io/akless-components/libs/FileSaver/FileSaver.js' );
  let widgetZip = new JSZip();
  widgetZip.folder( `${folder}.wdgt` ).file( 'index.html', template );
  widgetZip.folder( `${folder}.wdgt` ).file( 'Info.plist', info_file );
  widgetZip.folder( `${folder}.wdgt` ).file( 'Default.png', image_file );
  widgetZip = await widgetZip.generateAsync( { type: 'blob' } );

  // provide download of generated ZIP file
  saveAs( widgetZip, `${filename}.zip`);

}

/**
 * executes the included code of a JavaScript file
 * @param {string} url - URL of the JavaScript file
 * @returns {Promise<void>}
 * @memberOf ModuleHelper.HandoverApp
 */
export async function loadScript( url ) {

  return new Promise( ( resolve, reject ) => {

    const script = document.createElement( 'script' );
    document.head.appendChild( script );
    script.onload  = () => { document.head.removeChild( script ); resolve(); };
    script.onerror = () => { document.head.removeChild( script ); reject();  };
    script.async = true;
    script.src = url;

  } );

}

/**
 * provides a download of a ccm-based app as SCORM package (ZIP file)
 * @param {string} embed_code - embed code of the ccm-based app
 * @param {string} [filename='app'] - file name without file extension
 * @param {string} [title='App'] - website title within the manifest
 * @param {string} [identifier='App'] - identifier within the manifest
 * @param {string} [html_template='https://ccmjs.github.io/akless-components/resources/templates/scorm/index.html'] - URL of HTML template
 * @param {string} [manifest_template='https://ccmjs.github.io/akless-components/resources/templates/scorm/imsmanifest.xml'] - URL of manifest template
 * @param {string} [api_file='https://ccmjs.github.io/akless-components/resources/templates/scorm/SCORM_API_wrapper.js'] - URL of SCORM API file
 * @returns {Promise<void>}
 * @memberOf ModuleHelper.HandoverApp
 */
export async function scorm( embed_code, filename = 'app', title = 'App', identifier = 'App',
                             html_template = 'https://ccmjs.github.io/akless-components/resources/templates/scorm/index.html',
                             manifest_template = 'https://ccmjs.github.io/akless-components/resources/templates/scorm/imsmanifest.xml',
                             api_file = 'https://ccmjs.github.io/akless-components/resources/templates/scorm/SCORM_API_wrapper.js'
) {

  html_template = await fetch( html_template ).then( response => response.text() );                 // load content of HTML template file
  html_template = html_template.replace( '__TITLE__', title ).replace( '__EMBED__', embed_code );   // integrate title and embed code in HTML template
  manifest_template = await fetch( manifest_template ).then( response => response.text() );         // load content of manifest template file
  manifest_template.replace( '__IDENTIFIER__', identifier ).replace( '__TITLE__', title );          // integrate identifier and title in manifest template
  api_file = await fetch( api_file ).then( response => response.blob() );                           // load content of SCORM API file

  // generate ZIP file
  !window.JSZip  && await loadScript( 'https://ccmjs.github.io/akless-components/libs/jszip/jszip.min.js' );
  !window.saveAs && await loadScript( 'https://ccmjs.github.io/akless-components/libs/FileSaver/FileSaver.js' );
  let widgetZip = new JSZip();
  widgetZip.file( 'index.html', html_template );
  widgetZip.file( 'imsmanifest.xml', manifest_template );
  widgetZip.file( 'SCORM_API_wrapper.js', api_file );
  widgetZip = await widgetZip.generateAsync( { type: 'blob' } );

  // provide download of generated ZIP file
  saveAs( widgetZip, `${filename}.zip` );

}

/*---------------------------------------- Framework Backwards Compatibility -----------------------------------------*/

/**
 * @summary returns the reference to the <i>ccm</i> framework version used for internal calls
 * @description
 * As the last parameter, each helper function can be given the reference to the ccm framework version to be used for internal calls.<br>
 * The default return value is the latest framework version registered on the web page (<code>window.ccm</code>).
 * @param {...*} args - passed helper function arguments (last argument will be checked)
 * @returns {Object} reference to the internally used <i>ccm</i> framework version
 * @ignore
 */
function framework( args ) {
  const last = args[ args.length - 1 ];
  if ( typeof last === 'object' && last !== null && last.components && last.version ) {
    delete args[ args.length - 1 ];
    args.length--;
    return last;
  }
  return window.ccm;
}
