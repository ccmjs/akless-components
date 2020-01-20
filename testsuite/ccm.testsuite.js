/**
 * @overview ccm component for unit tests
 * @author André Kless <andre.kless@web.de> 2016-2017, 2019-2020
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 (20.01.2020)
 * - uses ccm v25.0.0
 * - bug fix for comparison messages
 * - uses missing helper functions from module
 * (for older version changes see ccm.testsuite-2.0.1.js)
 */

( () => {

  const component = {

    name: 'testsuite',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',

    config: {

      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/testsuite/resources/templates.html" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/testsuite/resources/default.css" ],
      "onfinish": { "log": true },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-1.0.0.mjs" ]

  //  tests
  //  package

    },

    Instance: function () {

      let $;

      /**
       * higher collected setup functions that have to be performed before each test
       * @type {Function[]}
       */
      const setups = [];

      /**
       * higher collected finalize functions that have to be performed after each test
       * @type {Function[]}
       */
      const finallies = [];

      /**
       * current result data
       * @type {Object}
       */
      let results;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // no package path? => abort
        if ( !this.package ) return;

        // navigate to the relevant test package and collect setup and finally functions along the way
        const array = this.package.split( '.' );
        while ( array.length > 0 ) {
          if ( this.tests.setup   ) setups   .push   ( this.tests.setup );    // collect founded setup    function
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
        results = {
          executed: 0,  // number of executed tests
          passed:   0,  // number of   passed tests
          failed:   0,  // number of   failed tests
          details:  {}  // detailed test results
        };

        // has website area? => render main HTML structure
        let main_elem, packages_elem, test_elem, table_elem, result_elem;
        if ( self.element ) {
          main_elem = $.html( self.html.main );
          packages_elem = main_elem.querySelector( '#packages' );
          self.helper.setContent( self.element, main_elem );
        }

        // process relevant test package (including all subpackages)
        await processPackage( self.package || '', self.tests || {}, setups, finallies );

        // perform finish actions
        await this.helper.onFinish( self );

        /**
         * processes the current unit test package (recursive)
         * @param {string} package_path - path to current test package
         * @param {Object} package_obj - current test package
         * @param {Function[]} setups - setup functions that have to be performed before each test
         * @param {Function[]} finallies - finalize functions that have to be performed after each test
         * @returns {Promise<void>}
         */
        async function processPackage( package_path, package_obj, setups, finallies ) {

          // has setup function? => add her to (cloned) setup functions
          if ( package_obj.setup ) { setups = setups.slice(); setups.push( package_obj.setup ); }

          // has finalize function? => add her to (cloned) finallies functions
          if ( package_obj.finally ) { finallies = finallies.slice(); finallies.unshift( package_obj.finally ); }

          // perform all tests of the current package
          package_obj.tests && await runPackageTests( package_obj.tests );

          // remove no more needed properties (only package properties remain)
          delete package_obj.setup; delete package_obj.tests;

          // process the unit tests subpackages
          for ( const key in package_obj ) {
            const package = package_obj[ key ];
            delete package_obj[ key ];
            await processPackage( ( package_path ? package_path + '.' : '' ) + key, package, setups, finallies );
          }

          /**
           * performs all directly contained unit tests of the current package
           * @param {Function[]} tests - unit tests
           * @returns {Promise<void>}
           */
          async function runPackageTests( tests ) {

            // has website area? => render (empty) test package
            if ( self.element ) {
              const package_elem = $.html( self.html.package, package_path );
              table_elem = package_elem.querySelector( '.table' );
              packages_elem.appendChild( package_elem );
            }

            // run unit tests
            await self.helper.asyncForEach( Object.keys( tests ).map( key => tests[ key ] ), async test => {

              // has website area?
              if ( self.element ) {

                // show that another test will be executed
                main_elem.querySelector( '#executed' ).appendChild( self.helper.loading( self ) );

                // render table row for current test
                test_elem = $.html( self.html.test, test.name );
                table_elem.appendChild( test_elem ) ;

                // for the moment render loading as result
                result_elem = test_elem.querySelector( '.result' );
                result_elem.appendChild( self.helper.loading( self ) );

              }

              /**
               * test suite object for the current unit test
               * @type {Object}
               */
              const suite = {

                ccm: self.ccm,  // provide reference to ccm framework

                /**
                 * finishes current test with a positive result
                 * @function passed
                 */
                passed: () => addResult( true ),

                /**
                 * finishes current test with a negative result
                 * @function failed
                 * @param {string} [message] - message that explains why the test has failed
                 */
                failed: message => {
                  addResult( false );
                  if ( message ) addMessage( message );
                },

                /**
                 * finishes current test with positive result if the given condition is true
                 * @function assertTrue
                 * @param {boolean} condition
                 */
                assertTrue: condition => addResult( !!condition ),

                /**
                 * finishes current test with negative result if the given condition is true
                 * @function assertFalse
                 * @param {boolean} condition
                 */
                assertFalse: condition => addResult( !condition ),

                /**
                 * finishes current test with positive result if given expected and actual value contains same data (compare by reference)
                 * @function assertSame
                 * @param {*} expected - expected value
                 * @param {*} actual - actual value
                 */
                assertSame: ( expected, actual ) => {
                  const result = expected === actual;
                  addResult( result );
                  if ( !result ) addComparison( expected, actual );
                },

                /**
                 * finishes current test with positive result if given expected value equals given actual value (compare by content)
                 * @function assertEquals
                 * @param {*} expected - expected value
                 * @param {*} actual - actual value
                 */
                assertEquals: ( expected, actual ) => suite.assertSame( typeof expected === 'object' ? JSON.stringify( expected ) : expected, typeof actual === 'object' ? JSON.stringify( actual ) : actual ),

                /**
                 * finishes current test with positive result if given expected and actual value NOT contains same data (compare by reference)
                 * @function assertNotSame
                 * @param {*} expected - expected value
                 * @param {*} actual - actual value
                 */
                assertNotSame: ( expected, actual ) => addResult( expected !== actual ),

                /**
                 * finishes current test with positive result if given expected value NOT equals given actual value (compare by content)
                 * @function assertNotEquals
                 * @param {*} expected - expected value
                 * @param {*} actual - actual value
                 */
                assertNotEquals: ( expected, actual ) => suite.assertNotSame( JSON.stringify( expected ), JSON.stringify( actual ) )

              };

              await self.helper.asyncForEach( setups, async setup => setup( suite ) );  // run setup functions
              results.executed++;                                             // increase counters for executed tests

              // run current unit test (with error handling)
              try {
                await test( suite );
              }
              catch ( e ) {
                addResult( false );
                addMessage( e.name + ( e.message ? ': ' + e.message : '' ) );
              }

              // has website area? => update summary section
              if ( self.element ) {
                main_elem.querySelector( '#executed' ).innerHTML = results.executed.toString();
                main_elem.querySelector( '#passed'   ).innerHTML = results.  passed.toString();
                main_elem.querySelector( '#failed'   ).innerHTML = results.  failed.toString();
              }

              // run all relevant finally functions
              await self.helper.asyncForEach( finallies, final => final( suite ) );

              /** replaces loading icon with test result and increases passed or failed counter */
              function addResult( result ) {
                const value = result ? 'passed' : 'failed';
                if ( result ) results.passed++; else results.failed++;
                if ( self.element ) self.helper.setContent( result_elem, $.html( self.html.result, { value: value } ) );
                results.details[ package_path + '.' + test.name ] = result;
              }

              /** show message as detail information for a failed test */
              function addMessage( message ) {
                if ( self.element ) test_elem.appendChild( $.html( self.html.message, message ) );
                results.details[ package_path + '.' + test.name ] = message;
              }

              /** show expected and actual value as detail information for a failed test */
              function addComparison( expected, actual ) {
                if ( self.element ) {
                  if ( typeof expected === 'object' ) expected = $.stringify( expected );
                  expected = self.helper.escapeHTML( expected );
                  if ( typeof actual === 'object' ) actual = $.stringify( actual );
                  actual = self.helper.escapeHTML( actual );
                  test_elem.appendChild( $.html( self.html.comparison, expected, actual ) );
                }
                results.details[ package_path + '.' + test.name ] = { expected: expected, actual: actual };
              }

            } );

          }

        }

      };

      /** @returns {Object} current result data */
      this.getValue = () => $.clone( results );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();