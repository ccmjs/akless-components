/**
 * @overview ccmjs-based web component for multiple choice analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (01.07.2021)
 */

( () => {
  const component = {
    name: 'mc_analytics',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "chart": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.4.js" ],
      "css": [ "ccm.load", [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        "https://ccmjs.github.io/akless-components/mc_analytics/resources/styles.css"
      ] ],
      "data": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.4.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/mc_analytics/resources/templates.mjs" ],
      "modal": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
        "backdrop_close": true,
        "buttons": null,
        "closed": true,
        "content": "",
        "title": ""
      } ],
//    "onstart": instance => { ... },
      "sort": {
        "question": ( a, b ) => a.nr - b.nr,
        "answer":   ( a, b ) => a.nr - b.nr
      },
      "text": {
        "answer": "Multiple Choice Answer",
        "average": "Achieved Average Points",
        "correct": "Correct Solution Selected",
        "diagram": "Show Diagram",
        "pchart": {
          "points": "Points",
          "series": [ "Minimum", "Average", "Maximum" ],
          "title": "Average Number of Points Achieved",
          "xaxis": "Multiple Choice Questions",
          "yaxis": "Achieved Points"
        },
        "points": "Show Points Average",
        "qchart": {
          "column": "A%nr%",
          "correct": "answered correctly",
          "subtitle": "A total of %total% submissions.",
          "tooltip": "<b>%category%</b> was <b>%series%</b> in <b>%y%</b> submissions.<br><i>%answer%</i>",
          "wrong": "answered incorrectly",
          "yaxis": "Number of Submissions",
        },
        "question": "Multiple Choice Question",
        "refresh": "Refresh Table Data",
        "solution": "Correct Solution",
        "sum": "Number of Submissions",
        "wrong": "Wrong Solution Selected"
      }
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * analytics data
       * @type {Object}
       */
      let data;

      /**
       * question-focused analytics data
       * @type {Object}
       */
      let questions;

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // get analytics data
        data = await $.dataset( this.data );
        if ( !Array.isArray( data ) ) data = [ data ];

        // convert analytics data to question-focused data
        questions = this.toQuestions( data );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, () => { $.setContent( this.element.querySelector( '#refresh' ), $.loading( this ) ); this.start(); }, this.text.refresh ) );

        // render analytics data
        this.html.render( this.html.table( this ), this.element.querySelector( '#data' ) );

        // set click events for diagram buttons
        this.element.querySelectorAll( '.question' ).forEach( row => row.querySelector( 'button' ).addEventListener( 'click', () => showQuestionChart( row.dataset.key ) ) );
        this.element.querySelector( '#points-chart' ).addEventListener( 'click', showPointsChart );

        // trigger 'onstart' callback
        this.onstart && await this.onstart( this );

      };

      /**
       * returns analytics data
       * @returns {Object} current app state data
       */
      this.getValue = () => $.clone( data );

      /**
       * converts analytics data to questions-focused data
       * @returns {Object} questions-focused data
       */
      this.toQuestions = () => {
        const questions = {};
        data.forEach( dataset => {
          dataset.questions.forEach( question => {
            if ( !question.key ) question.key = $.toKey( question.text );
            let section = questions[ question.key ];
            if ( !section ) {
              section = {
                key: question.key,
                nr: question.nr,
                text: question.text,
                answers: {},
                total: 0,
                points: {
                  average: 0
                }
              };
              question.answers.forEach( answer => {
                if ( !answer.key ) answer.key = $.toKey( answer.text );
                section.answers[ answer.key ] = {
                  key: answer.key,
                  nr: answer.nr,
                  text: answer.text,
                  solution: answer.solution,
                  correct: 0,
                  wrong: 0
                }
              } );
              questions[ question.key ] = section;
            }
            let points = 0;
            question.answers.forEach( answer => {
              if ( answer.input !== '' ) {
                section.answers[ answer.key ][ answer.input === answer.solution ? 'correct' : 'wrong' ]++;
                answer.input === answer.solution ? points++ : points--;
              }
            } );
            section.total++;
            if ( points < 0 ) points = 0;
            if ( section.points.min === undefined || points < section.points.min ) section.points.min = points;
            if ( section.points.max === undefined || points > section.points.max ) section.points.max = points;
            section.points.average += points;
          } );
        } );
        Object.values( questions ).forEach( question => question.points.average = question.points.average / question.total );
        return questions;
      };

      /**
       * shows the data of a question as a chart in a modal dialog
       * @param {string|Object} question - unique key of the question
       */
      const showQuestionChart = question => {
        const self = this;
        const content = this.modal.element.querySelector( '#content' );
        $.setContent( content, $.loading( this ) );
        this.modal.open();
        question = questions[ question ];
        const answers = Object.values( question.answers ).sort( this.sort.answer );
        const categories = [ '', '', '', '', '' ].map( ( _, i ) => this.text.qchart.column.replaceAll( '%nr%', i + 1 ) );
        this.chart.start( {
          root: content,
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: question.text
            },
            subtitle: {
              text: this.text.qchart.subtitle.replaceAll( '%total%', question.total )
            },
            xAxis: [
              { categories: categories },
              {
                opposite: true,
                reversed: false,
                categories: categories.map( ( _, i) => `<span style="color:${answers[i].solution?'green':'red'}">•</span>` ),
                linkedTo: 0
              }
            ],
            yAxis: {
              title: {
                text: this.text.qchart.yaxis
              },
              labels: {
                formatter: function () {
                  return Math.abs( this.value );
                }
              },
              tickInterval: 1
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    return Math.abs( this.point.y );
                  }
                },
                stacking: 'normal'
              }
            },
            tooltip: {
              formatter: function () {
                return $.format( self.text.qchart.tooltip, {
                  answer: answers[ this.point.index ].text,
                  category: this.point.category,
                  series: this.series.name,
                  y: Math.abs( this.point.y ).toString()
                } );
              }
            },
            series: [
              {
                name: this.text.qchart.correct,
                data: answers.map( answer => answer.correct ),
                color: 'limegreen'
              },
              {
                name: this.text.qchart.wrong,
                data: answers.map( answer => -answer.wrong ),
                color: 'red'
              }
            ]
          }
        } );

      };

      /** shows the average number of points achieved for each question in a modal dialog */
      const showPointsChart = () => {
        const data = Object.values( questions ).sort( this.sort.question );
        const content = this.modal.element.querySelector( '#content' );
        $.setContent( content, $.loading( this ) );
        this.modal.open();
        this.chart.start( {
          root: content,
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: this.text.pchart.title
            },
            xAxis: {
              categories: data.map( question => question.text ),
              title: {
                text: this.text.pchart.xaxis
              }
            },
            yAxis: {
              title: {
                text: this.text.pchart.yaxis
              },
              tickInterval: 1
            },
            tooltip: {
              valueSuffix: ' ' + this.text.pchart.points
            },
            plotOptions: {
              column: {
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    return this.point.y % 1 !== 0 ? Math.round( this.point.y * 10 ) / 10 : this.point.y;
                  }
                }
              }
            },
            series: [
              {
                name: this.text.pchart.series[ 0 ],
                data: data.map( question => question.points.min ),
                color: 'red'
              },
              {
                name: this.text.pchart.series[ 1 ],
                data: data.map( question => question.points.average ),
                color: 'blue'
              },
              {
                name: this.text.pchart.series[ 2 ],
                data: data.map( question => question.points.max ),
                color: 'limegreen'
              }
            ]
          }
        } );

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();