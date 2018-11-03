/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "cloze_builder": [ "ccm.component", "../cloze_builder/ccm.cloze_builder.js", {
      "key": [ "ccm.get", "../cloze_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "../teambuild_builder/ccm.teambuild_builder.js", {
      "key": [ "ccm.get", "../teambuild_builder/resources/configs.js", "local" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "name": "submit", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
    "inner": "<source src=\"https://ccmjs.github.io/akless-components/blank/ccm.blank.js\"><h3>Decoration</h3><ccm-blank></ccm-blank><h3>Input</h3><p> <label> color:<br> <input type=\"color\" name=\"color\"> </label></p><p> <label> date:<br> <input type=\"date\" name=\"date\"> </label></p><p> <label> datetime-local:<br> <input type=\"datetime-local\" name=\"datetime-local\"> </label></p><p> <label> email:<br> <input type=\"email\" name=\"email\"> </label></p><p> <label> month:<br> <input type=\"month\" name=\"month\"> </label></p><p> <label> password:<br> <input type=\"password\" name=\"password\"> </label></p><p> <label> search:<br> <input type=\"search\" name=\"search\"> </label></p><p> <label> tel:<br> <input type=\"tel\" name=\"tel\"> </label></p><p> <label> text:<br> <input type=\"text\" name=\"text\"> </label></p><p> <label> time:<br> <input type=\"time\" name=\"time\"> </label></p><p> <label> url:<br> <input type=\"url\" name=\"url\"> </label></p><p> <label> week:<br> <input type=\"week\" name=\"week\"> </label></p><h3>Number</h3><p> <label> number:<br> <input type=\"number\" name=\"number\"> </label></p><p> <label> range:<br> <input type=\"range\" name=\"range\" min=\"1\" max=\"10\"> </label></p><h3>Checkbox</h3><p> <label> checkbox: <input type=\"checkbox\" name=\"checkbox\"> </label></p><fieldset><legend>multi-checkbox</legend> <label> checkbox A: <input type=\"checkbox\" name=\"multi-checkbox\" value=\"A\"> &nbsp; </label> <label> checkbox B: <input type=\"checkbox\" name=\"multi-checkbox\" value=\"B\"> &nbsp; </label> <label> checkbox C: <input type=\"checkbox\" name=\"multi-checkbox\" value=\"C\"> </label></fieldset><h3>Radio</h3><fieldset><legend>radio</legend> <label> radio A: <input type=\"radio\" name=\"radio\" value=\"A\"> &nbsp; </label> <label> radio B: <input type=\"radio\" name=\"radio\" value=\"B\"> &nbsp; </label> <label> radio C: <input type=\"radio\" name=\"radio\" value=\"C\"> </label></fieldset><h3>Select</h3><p> <label> select:<br> <select name=\"select\"><option>A</option><option>B</option><option>C</option> </select> </label></p><p> <label> multi-select:<br> <select name=\"multi-select\" multiple><option>A</option><option>B</option><option>C</option> </select> </label></p><h3>Textarea</h3><p> <label> textarea:<br><textarea name=\"textarea\"></textarea></label></p><h3>Special</h3><p> <label> contenteditable:<br><div name=\"contenteditable\" contenteditable></div> </label></p><p> <label> complex-data:<br> <select name=\"complex-data\"><option value=\"{'A':{'B':'C'}}\">object</option><option value=\"['A','B','C']\">array</option><option value=\"{'A':['B','C']}\">both</option> </select> </label></p><p> <label> deep.property:<br> <input type=\"text\" name=\"deep.property\"> </label></p><fieldset><legend>texts:</legend> <several><p> <label> text <nr></nr>:<br> <input type=\"text\" name=\"texts\"> </label></p> </several></fieldset><fieldset><legend>highscore:</legend> <several name=\"highscore\"><fieldset><p> <label> player <nr></nr>:<br> <input type=\"text\" name=\"player\"> </label></p><p> <label> score:<br> <input type=\"number\" min=\"0\" name=\"score\"> </label></p></fieldset> </several></fieldset><h3><i>ccm</i>-based Input Elements</h3><fieldset><legend>cloze_builder:</legend> <input type=\"cloze_builder\" name=\"cloze_builder\"></fieldset><fieldset><legend>teambuild_builder:</legend> <input type=\"teambuild_builder\" name=\"teambuild_builder\"></fieldset><fieldset><legend>objects:</legend> <several><p> <label> object <nr></nr>:<br> <input type=\"json_builder\" name=\"objects\"> </label></p> </several></fieldset><h3>Submit</h3><input type=\"submit\">",
    "data": {
      "store": [ "ccm.store", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "cloze_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-3.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/cloze_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "teambuild_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-4.0.0.js", {
      "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild_builder/resources/configs.js", "demo" ],
      "submit_button": false
    } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": {
        "settings": { "name": "submit", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  }

};