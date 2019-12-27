/**
 * @overview module for providing ccm helper functions
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

/*--------------------------------------------------- Action Data ----------------------------------------------------*/

/**
 * @summary executes action data
 * @param {Array} action data
 * @param {Object} [context] - context for this
 * @returns {Promise<*>} return value of executed action data
 * @example action( [ functionName, 'param1', 'param2' ] )
 * @example action( [ 'functionName', 'param1', 'param2' ] )
 * @example action( [ 'this.functionName', 'param1', 'param2' ], context )
 * @example action( [ 'my.namespace.functionName', 'param1', 'param2' ] )
 * @example action( [ [ 'ccm.load', 'moduleURL#functionName' ], 'param1', 'param2' ] )
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
 * @summary performs a function by function name
 * @param {string} name - function name
 * @param {Array} [args] - function arguments
 * @param {Object} [context] - context for this
 * @returns {*} return value of performed function
 * @example action( [ 'functionName', 'param1', 'param2' ] )
 * @example action( [ 'this.functionName', 'param1', 'param2' ], context )
 * @example action( [ 'my.namespace.functionName', 'param1', 'param2' ] )
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

/*------------------------------------------------- DOM Manipulation -------------------------------------------------*/

/**
 * @summary appends content to a HTML element (contained <script> tags will be removed)
 * @param {Element} element - HTML element
 * @param {...ccm.types.html} content
 * @example append( document.body, 'Hello World!' )
 * @example append( document.body, 'Hello', ' ', 'World', '!' )
 * @example append( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example append( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example append( document.body, { inner: 'Hello World!' } )
 * @example append( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
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
 * @summary prepends content to a HTML element (contained <script> tags will be removed)
 * @param {Element} element - HTML element
 * @param {...ccm.types.html} content
 * @example prepend( document.body, 'Hello World!' )
 * @example prepend( document.body, 'Hello', ' ', 'World', '!' )
 * @example prepend( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example prepend( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example prepend( document.body, { inner: 'Hello World!' } )
 * @example prepend( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
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
 * @summary replaces a HTML element with an other single HTML element (contained <script> tags will be removed)
 * @param {Element} element - HTML element (must have a parent)
 * @param {ccm.types.html} other - other single HTML element
 * @example replace( document.querySelector( '#myid' ), '<b>World</b>' )
 * @example replace( document.querySelector( '#myid' ), { tag: 'b', inner: 'World' } )
 */
export function replace( element, other ) {
  const ccm = framework( arguments );
  element.parentNode && element.parentNode.replaceChild( protect( ccm.helper.html( other ), ccm ), element );
}

/**
 * @summary set the content of a HTML element (contained <script> tags will be removed)
 * @param {Element} element - HTML element
 * @param {...ccm.types.html} content - new content for the HTML element (old content is cleared)
 * @example setContent( document.body, 'Hello World!' )
 * @example setContent( document.body, 'Hello', ' ', 'World', '!' )
 * @example setContent( document.body, [ 'Hello', ' ', 'World', '!' ] )
 * @example setContent( document.body, [ 'Hello', ' ', [ 'World', '!' ] ] )
 * @example setContent( document.body, { inner: 'Hello World!' } )
 * @example setContent( document.body, 'Hello', [ ' ', [ { inner: 'World' }, '!' ] ] )
 */
export function setContent( element, content ) {
  element.innerHTML = '';           // clear old content
  append.apply( null, arguments );  // append new content
}

/*----------------------------------------------------- Security -----------------------------------------------------*/

/**
 * @summary filters script elements out of given HTML
 * @param {string|Element} html - HTML String or HTML Element
 * @returns {string|Element} cleaned HTML
 * @example protect( "Hello <script>alert('XSS');</script>World!" ) // => 'Hello World!'
 * @example
 * // <div>Hello <script>alert('XSS');</script>World!</div>
 * div = protect( div ); // => <div>Hello, World!</div>
 */
export function protect( html ) {
  const ccm = framework( arguments );

  if ( typeof html === 'string' )
    return html.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

  if ( ccm.helper.isElementNode( html ) )
    [ ...html.querySelectorAll( 'script' ) ].forEach( ccm.helper.removeElement );

  return html;
}

/*--------------------------------------------------- Handover App ---------------------------------------------------*/

/**
 * returns the URL of a ccm-based app
 * @param {string} component - URL of the ccm component
 * @param {Object} store - settings for the ccm data store that contains the ccm instance configuration
 * @param {string|string[]} app_id - key of the data set that hold the ccm instance configuration
 * @param {string} website - URL of the website which renders the ccm-based app
 * @returns {string}
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
 */
export function copyToClipboard( element ) {
  element.select();
  document.execCommand( 'copy' );
}

/**
 * decomposes a given app URL into component URL, component index, component name, component version, store settings and app ID
 * @param {string} app_url - URL of a ccm-based app
 * @param {ccm.types.framework} [ccm=window.ccm] - ccm framework version to be used internally
 * @returns {Object}
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
 * @returns {ccm.types.framework} reference to the internally used <i>ccm</i> framework version
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
