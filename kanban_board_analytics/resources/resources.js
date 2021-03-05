/**
 * @overview data-based resources of ccmjs-based web component for kanban board analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "board": [ "ccm.instance", "./../kanban_board/ccm.kanban_board.js", [ "ccm.get", "./../kanban_board/resources/configs.js", "local" ] ],
    "chart.1": "./../highchart/ccm.highchart.js",
    "css.1": "./../kanban_board_analytics/resources/default.css",
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../kanban_board_analytics/resources/templates.html"
  },

  "demo": {
    "board": [ "ccm.instance", "https://ccmjs.github.io/akless-components/kanban_board/versions/kanban_board-4.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_board/resources/configs.js", "demo" ] ],
  }

};