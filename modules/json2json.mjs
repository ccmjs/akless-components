/**
 * @overview Module for conversion of JSON
 * @author André Kless <andre.kless@web.de> 2019-2020
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

/**
 * converts member votes of a live poll to a Highchart.js bar chart configuration
 * @param {Object} poll - member votings of a live poll
 * @param {String[]} poll - available answers
 * @returns {Object} Highchart.js bar chart configuration
 */
export function poll_to_highchart( poll, answers ) {

  const data = Array( answers.length ).fill( 0 );
  Object.values( poll ).forEach( value => data[ value - 1 ]++ );

  const categories = [];
  for ( let i = 0; i < answers.length; i++ )
    categories[ i ] = String.fromCharCode( 65 + i );

  return {
    settings: {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Votes'
        },
        tickInterval: 1
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      legend: false,
      tooltip: false,
      series: [ { data: data } ]
    }
  };

}

/**
 * converts result data of ccm.file_upload.js to base64 encoded file data
 * @param {Object} json - result data of ccm.file_upload.js
 * @returns {String} base64 encoded file data
 */
export function upload2data( json ) {
  return json.slides ? json.slides[ 0 ].data : undefined;
}

/**
 * converts user data to username with email as tooltip
 * @param {Object} user - user data
 * @returns {string}
 */
export function userWithEmail( user ) {
  return `<span title="${user.mail}">${user.name}</span>`;
}
