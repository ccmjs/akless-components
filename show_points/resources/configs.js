/**
 * @overview configurations of ccm component for rendering a point list of an user
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "we_ss18": {
    "html.inner.0.inner": "Punktekonto von %user%",
    "html.inner.2.inner": "Summe: %points% Punkte",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/show_points/resources/default.css" ],
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "store": "we_ss18_solutions", "method": "POST" } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.0.js", { "realm": "guest", "guest": "dludwi2s", "logged_in": true } ],
    "target": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/ccm.table.js" ],
    "mapping": {
      "le01_a1": { "points": 5, "deadline": "2018-04-19T08:00" },
      "le01_a2": { "points": 5, "deadline": "2018-04-19T08:00" },
      "le02_a1": { "points": 2, "deadline": "2018-04-26T08:00" },
      "le02_a2": { "points": 2, "deadline": "2018-04-26T08:00" },
      "le02_a3": { "points": 2, "deadline": "2018-04-26T08:00" },
      "le02_a4": { "points": 4, "deadline": "2018-04-26T08:00" },
      "le03_a1": { "points": 2, "deadline": "2018-05-03T08:00" },
      "le03_a2": { "points": 2, "deadline": "2018-05-03T08:00" },
      "le03_a3": { "points": 4, "deadline": "2018-05-03T08:00" },
      "le03_a4": { "points": 2, "deadline": "2018-05-03T08:00" },
      "le04_a1": { "points": 5, "deadline": "2018-05-17T08:00" },
      "le04_a2": { "points": 5, "deadline": "2018-05-17T08:00" },
      "le05_a1": { "points": 2, "deadline": "2018-05-24T08:00" },
      "le05_a2": { "points": 2, "deadline": "2018-05-24T08:00" },
      "le05_a3": { "points": 6, "deadline": "2018-05-24T08:00" },
      "le06_a1": { "points": 2, "deadline": "2018-06-07T08:00" },
      "le06_a2": { "points": 4, "deadline": "2018-06-07T08:00" },
      "le06_a3": { "points": 4, "deadline": "2018-06-07T08:00" },
      "le07_a1": { "points": 1, "deadline": "2018-06-14T08:00" },
      "le07_a2": { "points": 3, "deadline": "2018-06-14T08:00" },
      "le07_a3": { "points": 4, "deadline": "2018-06-14T08:00" },
      "le07_a4": { "points": 2, "deadline": "2018-06-14T08:00" },
      "le08_a1": { "points": 2, "deadline": "2018-06-21T08:00" },
      "le08_a2": { "points": 2, "deadline": "2018-06-21T08:00" },
      "le08_a3": { "points": 6, "deadline": "2018-06-21T08:00" },
      "le09_a1": { "points": 2, "deadline": "2018-06-28T08:00" },
      "le09_a2": { "points": 2, "deadline": "2018-06-28T08:00" },
      "le09_a3": { "points": 6, "deadline": "2018-06-28T08:00" },
      "le10_a1": { "points": 2, "deadline": "2018-07-05T08:00" },
      "le10_a2": { "points": 2, "deadline": "2018-07-05T08:00" },
      "le10_a3": { "points": 6, "deadline": "2018-07-05T08:00" },
      "le11_a1": { "points": 2, "deadline": "2018-07-12T08:00" },
      "le11_a2": { "points": 2, "deadline": "2018-07-12T08:00" },
      "le11_a": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_b": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_c": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_d": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_e": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_f": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_g": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_h": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_j": { "points": 1, "deadline": "2018-07-12T08:00" },
      "le11_k": { "points": 1, "deadline": "2018-07-12T08:00" }
    }
  }
};