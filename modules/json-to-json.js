/**
 * @overview Module for conversion of JSON
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

export function example( json ) {
  // change JSON here
  return json;
}

/**
 * converts member votes of a live poll to a plotly bar chart configuration
 * @param {Object} poll - member votings of a live poll
 * @returns {Object} plotly bar chart configuration
 * @example { "john": 1, "jane": 2, "jake": 1 } => { "data": [ { "x": [ "A", "B" ], "y": [ 2, 1 ], "type": "bar" } ] }
 */
export function poll_to_plotly( poll ) {

  const data = {};
  Object.values( poll ).forEach( value => {
    value = String.fromCharCode( 65 + value - 1 );
    if ( !data[ value ] ) data[ value ] = 0;
    data[ value ]++;
  } );

  return {
    data: [
      {
        x: Object.keys( data ),
        y: Object.values( data ),
        type: 'bar'
      }
    ]
  };

}
