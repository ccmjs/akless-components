/**
 * @overview configurations of ccm component for team building
 * @author André Kless <andre.kless@web.de> 2017-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "css": [ "ccm.load", "../teambuild/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "teambuild_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "editable": {
      "join": true,
      "leave": true,
      "rename": true,
    },
    "helper.1": "../modules/helper.mjs",
    "html.1": "../teambuild/resources/templates.html",
//  "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
//  "max_members": 2,
//  "max_teams": 3,
//  "names": [ "Team Red", "Team Blue" ],
//  "onchange": event => console.log( event ),
    "reload": true,
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/resources.js", "local" ] ]
  },

  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "teambuild_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.1.js" ]
  },

  "clicker": {
    "key": "clicker",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "teambuild_data", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "clicker"
    },
    "names": [ "Right", "Wrong", "Don't Know" ],
    "max_teams": 3,
    "editable": { "join": true, "leave": true, "rename": false },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  },

  "se_ws17_gr1": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr1",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr1"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "se_ws17_gr2": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr2",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr2"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "se_ws17_gr3": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr3",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr3"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "se_ws17_gr4": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr4",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr4"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "se_ws17_gr5": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr5",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr5"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "se_ws17_gr6": {  // created for ccm.teambuild-1.0.0.js
    "key": "se_ws17_gr6",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "se_ws17_gr6"
    },
    "editable": false,
    "max_members": 3,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "se_ws17_teambuild" ] ]
  },

  "sks_ws17": {  // created for ccm.teambuild-1.0.0.js
    "key": "sks_ws17",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/teambuild/resources/akless.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "sks_ws17"
    },
    "names": [ "Gruppe Prof. Dr. Manfred Kaul", "Gruppe Prof. Dr. Rudolf Berrendorf", "Gruppe Prof. Dr. Sascha Alda", "Gruppe Prof. Dr. Simone Bürsner" ],
    "max_teams": 4,
    "max_members": 12,
    "editable": false,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", { "logged_in": true, "sign_on": "hbrsinfkaul" } ],
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "sks_ws17_teambuild" ] ]
  }

};