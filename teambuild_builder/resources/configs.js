/**
 * @overview configurations of ccm component for building a team building
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../teambuild_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", "../teambuild_builder/resources/datasets.js" ],
      "key": "test"
    },
    "target": [ "ccm.component", "../teambuild/ccm.teambuild.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function () { console.log( this.index, 'onchange', this.getValue() ) },
    "onfinish": { "log": true }
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load",
      "../libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../teambuild_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "teambuild", "url": "http://localhost:8080" } ],
      "key": "test"
    },
    "defaults": {
      "editable": {
        "join": true,
        "leave": true,
        "rename": true
      },
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free",
        "message": "Nothing to display."
      },
      "data.store": "['ccm.store',{'name':'teambuild_data','url':'ws://localhost:8080'}]",
      "data.key": "test",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js',{'realm':'guest','title':'Guest Mode: Please enter any username'}]"
    },
    "target": [ "ccm.component", "../teambuild/ccm.teambuild.js" ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "name": "teambuild", "url": "http://localhost:8080" },
        "key": "test"
      },
      "alert": "Saved!"
    }
  },

  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "teambuild", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "defaults": {
      "editable": {
        "join": true,
        "leave": true,
        "rename": true
      },
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free",
        "message": "Nothing to display."
      },
      "data.store": "['ccm.store',{'name':'teambuild_data','url':'wss://ccm2.inf.h-brs.de'}]",
      "data.key": "demo",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js',{'realm':'guest','title':'Guest Mode: Please enter any username'}]"
    },
    "submit_button": "Submit",
    "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js" ],
    "onfinish": {
      "store": {
        "settings": { "name": "teambuild", "url": "https://ccm2.inf.h-brs.de" },
        "key": "demo"
      },
      "alert": "Saved!"
    }
  },

  "crud": {
    "key": "crud",
    "css": [ "ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/teambuild_builder/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "https://ccm2.inf.h-brs.de" } ]
    },
    "defaults": {
      "editable": {
        "join": true,
        "leave": true,
        "rename": true
      },
      "text": {
        "team": "Team",
        "leave": "leave",
        "join": "join",
        "free": "free",
        "message": "Nothing to display."
      },
      "data.store": "['ccm.store',{'store':'teambuild_data','url':'wss://ccm2.inf.h-brs.de'}]",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.1.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
    },
    "submit_button": "Submit",
    "target": [ "ccm.component", "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-2.0.0.js" ],
    "onfinish": {
      "store": {
        "settings": { "store": "teambuild", "url": "https://ccm2.inf.h-brs.de" }
      },
      "alert": "Saved!"
    }
  }

};