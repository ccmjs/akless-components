/**
 * @overview data-based resources of ccm component for unit tests
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  /** test configuration (relative paths) */
  "local": {
    "html": [ "ccm.load", "../testsuite/resources/templates.html" ],
    "css": [ "ccm.load", "../testsuite/resources/default.css" ],
    "tests": [ "ccm.load", "../testsuite/resources/tests.js" ]
  }

};
