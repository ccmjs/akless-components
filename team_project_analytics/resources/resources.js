/**
 * @overview data-based resources of ccmjs-based web component for team project analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "./../libs/bootstrap-4/css/bootstrap.min.css",
        "./../team_project_analytics/resources/default.css"
      ]
    ],
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../team_project_analytics/resources/templates.mjs",
    "project": [ "ccm.instance", "./../team_project/ccm.team_project.min.js", [ "ccm.get", "./../team_project/resources/resources.min.js", "local" ] ]
  },

  "demo": {
    "project": [ "ccm.instance", "https://ccmjs.github.io/akless-components/team_project/versions/ccm.team_project-2.0.0.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/team_project/resources/resources.min.js", "demo" ] ],
  }

};