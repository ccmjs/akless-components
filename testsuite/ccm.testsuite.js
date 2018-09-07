/**
 * @overview ccm component for unit testing
 * @author André Kless <andre.kless@web.de> 2016-2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( function () {

  const component = {

    name: 'testsuite',

    ccm: '../../ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "summary",
              "inner": [
                { "id": "executed", "inner": 0 },
                { "id": "passed",   "inner": 0 },
                { "id": "failed",   "inner": 0 }
              ]
            },
            { "id": "packages" }
          ]
        },
        "package": {
          "class": "package",
          "inner": [
            { "class": "label", "inner": "%%" },
            { "class": "table" },
            { "class": "conclusion" }
          ]
        },
        "test": {
          "class": "tr",
          "inner": [
            { "class": "td name", "inner": "%%" },
            { "class": "td result" }
          ]
        },
        "result": {
          "class": "%value%",
          "inner": "%value%"
        },
        "message": {
          "class": "td details message",
          "inner": "%%"
        },
        "comparison": {
          "class": "td details comparison",
          "inner": [
            { "class": "expected", "inner": "%%" },
            { "class": "actual",   "inner": "%%" }
          ]
        }
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/testsuite/resources/default.css" ],
      "onfinish": { "log": true }

  //  tests
  //  package

    },

    Instance: function () {

      let $;

      /**
       * higher collected setup functions that have to be performed before each test
       * @type {function[]}
       */
      const setups = [];

      /**
       * higher collected finalize functions that have to be performed after each test
       * @type {function[]}
       */
      const finallies = [];

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // no package path? => abort
        if ( !this.package ) return;

        // navigate to the relevant test package and collect setup and finally functions along the way
        const array = this.package.split( '.' );
        while ( array.length > 0 ) {
          if ( this.tests.setup   ) setups.push( this.tests.setup );          // collect founded setup    function
          if ( this.tests.finally ) finallies.unshift( this.tests.finally );  // collect founded finalize function
          this.tests = this.tests[ array.shift() ];
        }

      };

      this.start = async () => {

        /**
         * own reference for inner functions
         * @type {Instance}
         */
        const self = this;

        // set initial result data
        const results = {
          executed: 0,  // number of executed tests
          passed:   0,  // number of   passed tests
          failed:   0,  // number of   failed tests
          details:  {}
        };

        // has website area? => render main HTML structure
        let main_elem, packages_elem;
        if ( self.element ) {
          main_elem = $.html( self.html.main );
          packages_elem = main_elem.querySelector( '#packages' );
          $.setContent( self.element, main_elem );
        }

        // process relevant test package (including all subpackages)
        processPackage( self.package || '', self.tests || {}, setups, finallies, finish );

        /**
         * processes current test package (recursive)
         * @param {string} package_path - path to current test package
         * @param {Object} package_obj - data of current test package
         * @param {function[]} setups - setup functions that have to be performed before each test
         * @param {function[]} finallies - finalize functions that have to be performed after each test
         * @param {function} callback
         */
        function processPackage( package_path, package_obj, setups, finallies, callback ) {

          // has setup function? => add her to (cloned) setup functions
          if ( package_obj.setup ) { setups = setups.slice(); setups.push( package_obj.setup ); }

          // has finalize function? => add her to (cloned) finallies functions
          if ( package_obj.finally ) { finallies = finallies.slice(); finallies.unshift( package_obj.finally ); }

          // has tests? => perform all these tests
          package_obj.tests ? runTests( proceed ) : proceed();

          function proceed() {

            // remove no more needed properties (only package properties remain)
            delete package_obj.setup;
            delete package_obj.tests;

            // process first subpackage (if exists)
            processNextSubpackage();

            /** processes current subpackage (recursive function) */
            function processNextSubpackage() {

              for ( const key in package_obj ) {
                const package = package_obj[ key ];
                delete package_obj[ key ];
                processPackage( ( package_path ? package_path + '.' : '' ) + key, package, setups, finallies, processNextSubpackage );  // recursive call
                return;
              }

              // all subpackages are processed
              callback();

            }

          }

          /** performs all directly contained tests of the current test package */
          function runTests( callback ) {

            const tests = prepareTests();
            let i = 0;

            // has website area? => render (empty) test package
            let table_elem;
            if ( self.element ) {
              const package_elem = $.html( self.html.package, package_path );
              table_elem = package_elem.querySelector( '.table' );
              packages_elem.appendChild( package_elem );
            }

            // run first contained test
            runNextTest();

            /** runs current test (recursive) */
            function runNextTest() {

              let test_elem;

              // all tests finished? => abort and perform callback
              if ( i === tests.length ) return callback();

              let result_elem;

              // has website area?
              if ( self.element ) {

                // show that another test will be executed
                main_elem.querySelector( '#executed' ).appendChild( $.loading( self ) );

                // render table row for current test
                test_elem = $.html( self.html.test, tests[ i ].name );
                table_elem.appendChild( test_elem ) ;

                // for the moment render loading as result
                result_elem = test_elem.querySelector( '.result' );
                result_elem.appendChild( $.loading( self ) );

              }

              // prepare test suite object for the current test
              const suite = {

                ccm: self.ccm,  // provide reference to ccm framework

                /** finishes current test with a positive result */
                passed: function () {
                  addResult( true );
                  finishTest();
                },

                /**
                 * finishes current test with a negative result
                 * @param {string} [message] - message that explains why the test has failed
                 */
                failed: function ( message ) {
                  addResult( false );
                  if ( message ) addMessage( message );
                  finishTest();
                },

                /**
                 * finishes current test with positive result if the given condition is true
                 * @param {boolean} condition
                 */
                assertTrue: function ( condition ) {
                  addResult( !!condition );
                  finishTest();
                },

                /**
                 * finishes current test with negative result if the given condition is true
                 * @param {boolean} condition
                 */
                assertFalse: function ( condition ) {
                  addResult( !condition );
                  finishTest();
                },

                /**
                 * finishes current test with positive result if given expected and actual value contains same data
                 * @param {Object} expected
                 * @param {Object} actual
                 */
                assertSame: function ( expected, actual ) {
                  const result = expected === actual;
                  addResult( result );
                  if ( !result ) addComparison( expected, actual );
                  finishTest();
                },

                /**
                 * finishes current test with positive result if given expected value equals given actual value
                 * @param {Object} expected
                 * @param {Object} actual
                 */
                assertEquals: function ( expected, actual ) {
                  suite.assertSame( JSON.stringify( expected ), JSON.stringify( actual ) );
                },

                /**
                 * finishes current test with positive result if given expected and actual value NOT contains same data
                 * @param {Object} expected
                 * @param {Object} actual
                 */
                assertNotSame: function ( expected, actual ) {
                  const result = expected !== actual;
                  addResult( result );
                  finishTest();
                },

                /**
                 * finishes current test with positive result if given expected value NOT equals given actual value
                 * @param {Object} expected
                 * @param {Object} actual
                 */
                assertNotEquals: function ( expected, actual ) {
                  suite.assertNotSame( JSON.stringify( expected ), JSON.stringify( actual ) );
                }

              };

              // run setup functions and then run current test
              runSetups( function () { tests[ i ]( suite ); } );

              /** runs all relevant setup functions (recursive function) */
              function runSetups( callback ) {
                let i = 0;                           // Remember: Each setup function could be asynchron
                runSetup();                          //           and must performed sequentially
                function runSetup() {                //           to avoid mutual influence.
                  if ( i === setups.length )
                    return callback();
                  setups[ i++ ]( suite, runSetup );  // recursive call
                }
              }

              /** replaces loading icon with test result and increases passed or failed counter */
              function addResult( result ) {
                const value = result ? 'passed' : 'failed';
                if ( result ) results.passed++; else results.failed++;
                if ( self.element ) $.setContent( result_elem, $.html( self.html.result, { value: value } ) );
                results.details[ package_path + '.' + tests[ i ].name ] = result;
              }

              /** show message as detail information for a failed test */
              function addMessage( message ) {
                if ( self.element ) test_elem.appendChild( $.html( self.html.message, message ) );
                results.details[ package_path + '.' + tests[ i ].name ] = message;
              }

              /** show expected and actual value as detail information for a failed test */
              function addComparison( expected, actual ) {
                if ( self.element ) test_elem.appendChild( $.html( self.html.comparison, expected, actual ) );
                results.details[ package_path + '.' + tests[ i ].name ] = { expected: expected, actual: actual };
              }

              /** increases test counters, updates summary section and starts running next test */
              function finishTest() {
                i++; results.executed++;
                if ( self.element ) {
                  main_elem.querySelector( '#executed' ).innerHTML = results.executed.toString();
                  main_elem.querySelector( '#passed'   ).innerHTML = results.  passed.toString();
                  main_elem.querySelector( '#failed'   ).innerHTML = results.  failed.toString();
                }
                runFinallies( runNextTest );  // recursive call

                /** runs all relevant finally functions (recursive function) */
                function runFinallies( callback ) {
                  let i = 0;                           // Remember: Each finalize function could be asynchron
                  runFinally();                        //           and must performed sequentially
                  function runFinally() {              //           to avoid mutual influence.
                    if ( i === finallies.length )
                      return callback();
                    finallies[ i++ ]( suite, runFinally );  // recursive call
                  }
                }
              }

            }

            /** convert test package from object to array and ensure that each test has a function name */
            function prepareTests() {

              // convert object to array
              return Object.keys( package_obj.tests ).map( function ( key ) {

                // if test function has no name, than use property key of the test inside the object as name
                if ( !package_obj.tests[ key ].name ) Object.defineProperty( package_obj.tests[ key ], 'name', { value: key } );

                return package_obj.tests[ key ];

              } );

            }

          }

        }

        /** callback when all tests in all relevant test packages are finished */
        function finish() {
          $.onFinish( self, results );
          if ( callback ) callback();
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
}() );