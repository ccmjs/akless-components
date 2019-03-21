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

/**
 * converts member votes of a live poll to a Highchart.js bar chart configuration
 * @param {Object} poll - member votings of a live poll
 * @returns {Object} Highchart.js bar chart configuration
 */
export function poll_to_highchart( poll ) {

  let data = [];
  Object.values( poll ).forEach( value => {
    if ( isNaN( data[ value ] ) )
      data[ value - 1 ] = 1;
    else
      data[ value - 1 ]++;
  } );
  data = data.map( value => value || 0 );

  const categories = [];
  for ( let i = 0; i < data.length; i++ )
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
