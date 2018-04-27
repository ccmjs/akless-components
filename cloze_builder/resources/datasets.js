/**
 * @overview datasets of ccm component for rendering a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  "test": {
    "key" : "test",
    "css" : [
      "ccm.load",
      "https://ccmjs.github.io/akless-components/cloze/resources/default.css"
    ],
    "keywords" : false,
    "feedback" : true,
    "blank" : false,
    "start_button" : false,
    "captions" : {
      "retry" : "Retry",
      "submit" : "Submit",
      "start" : "Start",
      "finish" : "Finish"
    },
    "text" : "<p>Hello, *W(or)l(d)*!</p>",
    "retry" : true,
    "solutions" : false,
    "onfinish" : {
      "restart" : false
    }
  }

};