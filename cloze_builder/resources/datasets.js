/**
 * @overview datasets of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  "test": {
    "key" : "test",
    "feedback" : true,
    "retry" : false,
    "solutions" : true,
    "blank" : true,
    "onfinish" : {
      "restart" : true
    }
  }

};