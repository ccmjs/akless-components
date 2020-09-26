/**
 * @overview ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (22.09.2020)
 */

( () => {

  const component = {

    name: 'quick_question',

    ccm: 'https://ccmjs.github.io/akless-components/quick_question/resources/ccm.js',

    config: {
      "convert": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/json2json.mjs#quick_question2highchart" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/styles.css" ],
      "diagram": [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/versions/ccm.highchart-3.0.2.js" ],
      "store": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/helper.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/quick_question/resources/templates.mjs" ],
      "icon": {
        "yes": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"64\" height=\"64\" viewBox=\"0 0 512 512\" style=\" fill:#000000;\"><path fill=\"#32BEA6\" d=\"M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z\"></path><path fill=\"#FFF\" d=\"M392.6,172.9c-5.8-15.1-17.7-12.7-30.6-10.1c-7.7,1.6-42,11.6-96.1,68.8c-22.5,23.7-37.3,42.6-47.1,57c-6-7.3-12.8-15.2-20-22.3C176.7,244.2,152,229,151,228.4c-10.3-6.3-23.8-3.1-30.2,7.3c-6.3,10.3-3.1,23.8,7.2,30.2c0.2,0.1,21.4,13.2,39.6,31.5c18.6,18.6,35.5,43.8,35.7,44.1c4.1,6.2,11,9.8,18.3,9.8c1.2,0,2.5-0.1,3.8-0.3c8.6-1.5,15.4-7.9,17.5-16.3c0.1-0.2,8.8-24.3,54.7-72.7c37-39.1,61.7-51.5,70.3-54.9c0.1,0,0.1,0,0.3,0c0,0,0.3-0.1,0.8-0.4c1.5-0.6,2.3-0.8,2.3-0.8c-0.4,0.1-0.6,0.1-0.6,0.1l0-0.1c4-1.7,11.4-4.9,11.5-5C393.3,196.1,397,184.1,392.6,172.9z\"></path></svg>",
        "neither": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"64\" height=\"64\" viewBox=\"0 0 172 172\" style=\" fill:#000000;\"><g fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><path d=\"M0,172v-172h172v172z\" fill=\"none\"></path><g><path d=\"M169.34609,86c0,-46.02344 -37.32266,-83.34609 -83.34609,-83.34609c-46.02344,0 -83.34609,37.32266 -83.34609,83.34609c0,46.02344 37.32266,83.34609 83.34609,83.34609c46.02344,0 83.34609,-37.32266 83.34609,-83.34609z\" fill=\"#25b7d3\"></path><path d=\"M49.08047,60.97266c0,-4.66953 1.51172,-9.40625 4.50156,-14.21016c2.98984,-4.80391 7.39063,-8.76797 13.13516,-11.92578c5.74453,-3.15781 12.46328,-4.73672 20.15625,-4.73672c7.12187,0 13.4375,1.31016 18.87969,3.96406c5.47578,2.62031 9.675,6.21484 12.66484,10.75c2.98984,4.53516 4.46797,9.43984 4.46797,14.74766c0,4.19922 -0.83984,7.86094 -2.55312,10.98516c-1.71328,3.15781 -3.72891,5.87891 -6.04687,8.16328c-2.35156,2.28438 -6.51719,6.14766 -12.59766,11.55625c-1.67969,1.51172 -3.02344,2.85547 -4.03125,4.03125c-1.00781,1.14219 -1.74688,2.21719 -2.25078,3.15781c-0.50391,0.97422 -0.87344,1.91484 -1.14219,2.88906c-0.26875,0.97422 -0.67187,2.65391 -1.20938,5.07266c-0.94062,5.10625 -3.86328,7.69297 -8.76797,7.69297c-2.55313,0 -4.70312,-0.83984 -6.45,-2.51953c-1.74687,-1.67969 -2.62031,-4.16563 -2.62031,-7.45781c0,-4.13203 0.63828,-7.72656 1.91484,-10.75c1.27656,-3.02344 2.98984,-5.67734 5.10625,-7.96172c2.11641,-2.28437 4.97187,-5.00547 8.56641,-8.16328c3.15781,-2.75469 5.40859,-4.8375 6.81953,-6.24844c1.41094,-1.41094 2.58672,-2.95625 3.52734,-4.70312c0.97422,-1.71328 1.44453,-3.59453 1.44453,-5.61016c0,-3.93047 -1.47812,-7.25625 -4.40078,-9.97734c-2.92266,-2.72109 -6.71875,-4.06484 -11.32109,-4.06484c-5.40859,0 -9.40625,1.37734 -11.95938,4.09844c-2.55312,2.72109 -4.73672,6.75234 -6.48359,12.06016c-1.67969,5.57656 -4.8375,8.33125 -9.50703,8.33125c-2.75469,0 -5.07266,-0.97422 -6.9875,-2.92266c-1.88125,-1.88125 -2.85547,-3.96406 -2.85547,-6.24844zM85.12656,141.86641c-2.98984,0 -5.61016,-0.97422 -7.86094,-2.92266c-2.25078,-1.94844 -3.35937,-4.66953 -3.35937,-8.16328c0,-3.09063 1.075,-5.71094 3.25859,-7.82734c2.15,-2.11641 4.8375,-3.15781 7.96172,-3.15781c3.09063,0 5.71094,1.075 7.82734,3.15781c2.11641,2.11641 3.15781,4.73672 3.15781,7.82734c0,3.46016 -1.10859,6.14766 -3.32578,8.12969c-2.21719,1.98203 -4.77031,2.95625 -7.65937,2.95625z\" fill=\"#ffffff\"></path></g></g></svg>",
        "no": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"64\" height=\"64\" viewBox=\"0 0 512 512\" style=\" fill:#000000;\"><path fill=\"#E04F5F\" d=\"M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z\"></path><path fill=\"#FFF\" d=\"M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256z\"></path></svg>",
        "like_off": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"48\" height=\"48\" viewBox=\"0 0 50 50\" style=\" fill:#000000;\"><path d=\"M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M32.7,36.4\tl-7.7-5l-7.7,5l2.3-8.9l-7.1-5.8l9.2-0.5l3.3-8.6l3.3,8.6l9.2,0.5l-7.1,5.8L32.7,36.4z\"></path></svg>",
        "like_on": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"48\" height=\"48\" viewBox=\"0 0 172 172\" style=\" fill:#000000;\"><g fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><path d=\"M0,172v-172h172v172z\" fill=\"none\"></path><g><path d=\"M2.65391,86c0,-46.02344 37.32266,-83.34609 83.34609,-83.34609c46.02344,0 83.34609,37.32266 83.34609,83.34609c0,46.02344 -37.32266,83.34609 -83.34609,83.34609c-46.02344,0 -83.34609,-37.32266 -83.34609,-83.34609z\" fill=\"#e5aa17\"></path><path d=\"M86,32.88828l16.39375,33.19063l36.61719,5.34141l-26.50547,25.83359l6.24844,36.48281l-32.75391,-17.23359l-32.7875,17.23359l6.28203,-36.48281l-26.50547,-25.83359l36.61719,-5.34141z\" fill=\"#ffffff\"></path></g></g></svg>",
        "add": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24\" height=\"24\" viewBox=\"0 0 172 172\" style=\" fill:#000000;\"><g fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><path d=\"M0,172v-172h172v172z\" fill=\"none\" stroke=\"none\"></path><g stroke=\"none\"><path d=\"M169.34609,86c0,-46.02344 -37.32266,-83.34609 -83.34609,-83.34609c-46.02344,0 -83.34609,37.32266 -83.34609,83.34609c0,46.02344 37.32266,83.34609 83.34609,83.34609c46.02344,0 83.34609,-37.32266 83.34609,-83.34609z\" fill=\"#666666\"></path><path d=\"M49.08047,60.97266c0,-4.66953 1.51172,-9.40625 4.50156,-14.21016c2.98984,-4.80391 7.39063,-8.76797 13.13516,-11.92578c5.74453,-3.15781 12.46328,-4.73672 20.15625,-4.73672c7.12187,0 13.4375,1.31016 18.87969,3.96406c5.47578,2.62031 9.675,6.21484 12.66484,10.75c2.98984,4.53516 4.46797,9.43984 4.46797,14.74766c0,4.19922 -0.83984,7.86094 -2.55312,10.98516c-1.71328,3.15781 -3.72891,5.87891 -6.04687,8.16328c-2.35156,2.28438 -6.51719,6.14766 -12.59766,11.55625c-1.67969,1.51172 -3.02344,2.85547 -4.03125,4.03125c-1.00781,1.14219 -1.74688,2.21719 -2.25078,3.15781c-0.50391,0.97422 -0.87344,1.91484 -1.14219,2.88906c-0.26875,0.97422 -0.67187,2.65391 -1.20938,5.07266c-0.94062,5.10625 -3.86328,7.69297 -8.76797,7.69297c-2.55313,0 -4.70312,-0.83984 -6.45,-2.51953c-1.74687,-1.67969 -2.62031,-4.16563 -2.62031,-7.45781c0,-4.13203 0.63828,-7.72656 1.91484,-10.75c1.27656,-3.02344 2.98984,-5.67734 5.10625,-7.96172c2.11641,-2.28437 4.97187,-5.00547 8.56641,-8.16328c3.15781,-2.75469 5.40859,-4.8375 6.81953,-6.24844c1.41094,-1.41094 2.58672,-2.95625 3.52734,-4.70312c0.97422,-1.71328 1.44453,-3.59453 1.44453,-5.61016c0,-3.93047 -1.47812,-7.25625 -4.40078,-9.97734c-2.92266,-2.72109 -6.71875,-4.06484 -11.32109,-4.06484c-5.40859,0 -9.40625,1.37734 -11.95938,4.09844c-2.55312,2.72109 -4.73672,6.75234 -6.48359,12.06016c-1.67969,5.57656 -4.8375,8.33125 -9.50703,8.33125c-2.75469,0 -5.07266,-0.97422 -6.9875,-2.92266c-1.88125,-1.88125 -2.85547,-3.96406 -2.85547,-6.24844zM85.12656,141.86641c-2.98984,0 -5.61016,-0.97422 -7.86094,-2.92266c-2.25078,-1.94844 -3.35937,-4.66953 -3.35937,-8.16328c0,-3.09063 1.075,-5.71094 3.25859,-7.82734c2.15,-2.11641 4.8375,-3.15781 7.96172,-3.15781c3.09063,0 5.71094,1.075 7.82734,3.15781c2.11641,2.11641 3.15781,4.73672 3.15781,7.82734c0,3.46016 -1.10859,6.14766 -3.32578,8.12969c-2.21719,1.98203 -4.77031,2.95625 -7.65937,2.95625z\" fill=\"#ffffff\"></path></g><g stroke=\"none\"><g id=\"Layer_1\"><path d=\"M139.75,172v0c-5.93669,0 -10.75,-4.81331 -10.75,-10.75v-43c0,-5.93669 4.81331,-10.75 10.75,-10.75v0c5.93669,0 10.75,4.81331 10.75,10.75v43c0,5.93669 -4.81331,10.75 -10.75,10.75z\" fill=\"#404041\"></path><path d=\"M107.5,139.75v0c0,-5.93669 4.81331,-10.75 10.75,-10.75h43c5.93669,0 10.75,4.81331 10.75,10.75v0c0,5.93669 -4.81331,10.75 -10.75,10.75h-43c-5.93669,0 -10.75,-4.81331 -10.75,-10.75z\" fill=\"#404041\"></path><path d=\"M139.75,166.625v0c-2.96969,0 -5.375,-2.40531 -5.375,-5.375v-43c0,-2.96969 2.40531,-5.375 5.375,-5.375v0c2.96969,0 5.375,2.40531 5.375,5.375v43c0,2.96969 -2.40531,5.375 -5.375,5.375z\" fill=\"#1fa85b\"></path><path d=\"M112.875,139.75v0c0,-2.96969 2.40531,-5.375 5.375,-5.375h43c2.96969,0 5.375,2.40531 5.375,5.375v0c0,2.96969 -2.40531,5.375 -5.375,5.375h-43c-2.96969,0 -5.375,-2.40531 -5.375,-5.375z\" fill=\"#1fa85b\"></path></g></g><path d=\"M107.5,172v-64.5h64.5v64.5z\" id=\"overlay-drag\" fill=\"#ff0000\" stroke=\"none\" opacity=\"0\"></path></g></svg>",
        "confirm": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" style=\" fill:#000000;\"><path fill=\"#43A047\" d=\"M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z\"></path></svg>",
        "share": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"48\" height=\"48\" viewBox=\"0 0 512 512\" style=\" fill:#000000;\"><path fill=\"#25B7D3\" d=\"M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z\"></path><path fill=\"#FFF\" d=\"M154.4 203.09999999999997A53.8 53.8 0 1 0 154.4 310.7 53.8 53.8 0 1 0 154.4 203.09999999999997zM318.7 107.39999999999999A53.8 53.8 0 1 0 318.7 215 53.8 53.8 0 1 0 318.7 107.39999999999999zM318.7 297A53.8 53.8 0 1 0 318.7 404.6 53.8 53.8 0 1 0 318.7 297z\"></path><g><path fill=\"#FFF\" d=\"M222.1 112.2H251V302.3H222.1z\" transform=\"rotate(59.786 236.552 207.272)\"></path></g><g><path fill=\"#FFF\" d=\"M141.5 288.5H331.6V317.4H141.5z\" transform=\"rotate(30.214 236.576 302.965)\"></path></g></svg>",
        "cancel": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"48\" height=\"48\" viewBox=\"0 0 172 172\" style=\" fill:#000000;\"><defs><linearGradient x1=\"35.15967\" y1=\"35.15967\" x2=\"137.46025\" y2=\"137.46025\" gradientUnits=\"userSpaceOnUse\" id=\"color-1_hRIvjOSQ8I0i_gr1\"><stop offset=\"0\" stop-color=\"#f44f5a\"></stop><stop offset=\"0.443\" stop-color=\"#ee3d4a\"></stop><stop offset=\"1\" stop-color=\"#e52030\"></stop></linearGradient><linearGradient x1=\"23.91875\" y1=\"23.91875\" x2=\"146.68017\" y2=\"146.68017\" gradientUnits=\"userSpaceOnUse\" id=\"color-2_hRIvjOSQ8I0i_gr2\"><stop offset=\"0\" stop-color=\"#f44f5a\"></stop><stop offset=\"0.443\" stop-color=\"#ee3d4a\"></stop><stop offset=\"1\" stop-color=\"#e52030\"></stop></linearGradient></defs><g fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><path d=\"M0,172v-172h172v172z\" fill=\"none\"></path><g><path d=\"M86,14.33333c-39.57792,0 -71.66667,32.08875 -71.66667,71.66667c0,39.57792 32.08875,71.66667 71.66667,71.66667c39.57792,0 71.66667,-32.08875 71.66667,-71.66667c0,-39.57792 -32.08875,-71.66667 -71.66667,-71.66667zM86,136.16667c-27.70633,0 -50.16667,-22.46033 -50.16667,-50.16667c0,-27.70633 22.46033,-50.16667 50.16667,-50.16667c27.70633,0 50.16667,22.46033 50.16667,50.16667c0,27.70633 -22.46033,50.16667 -50.16667,50.16667z\" fill=\"url(#color-1_hRIvjOSQ8I0i_gr1)\"></path><path d=\"M47.91275,139.28775l-15.2005,-15.2005l91.375,-91.375l15.2005,15.2005z\" fill=\"url(#color-2_hRIvjOSQ8I0i_gr2)\"></path></g></g></svg>",
        "report": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24\" height=\"24\" viewBox=\"0 0 172 172\" style=\" fill:#000000;\"><g fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"><path d=\"M0,172v-172h172v172z\" fill=\"none\"></path><g><path d=\"M169.34609,86c0,-46.02344 -37.32266,-83.34609 -83.34609,-83.34609c-46.02344,0 -83.34609,37.32266 -83.34609,83.34609c0,46.02344 37.32266,83.34609 83.34609,83.34609c46.02344,0 83.34609,-37.32266 83.34609,-83.34609z\" fill=\"#666666\"></path><path d=\"M49.08047,60.97266c0,-4.66953 1.51172,-9.40625 4.50156,-14.21016c2.98984,-4.80391 7.39063,-8.76797 13.13516,-11.92578c5.74453,-3.15781 12.46328,-4.73672 20.15625,-4.73672c7.12187,0 13.4375,1.31016 18.87969,3.96406c5.47578,2.62031 9.675,6.21484 12.66484,10.75c2.98984,4.53516 4.46797,9.43984 4.46797,14.74766c0,4.19922 -0.83984,7.86094 -2.55312,10.98516c-1.71328,3.15781 -3.72891,5.87891 -6.04687,8.16328c-2.35156,2.28438 -6.51719,6.14766 -12.59766,11.55625c-1.67969,1.51172 -3.02344,2.85547 -4.03125,4.03125c-1.00781,1.14219 -1.74688,2.21719 -2.25078,3.15781c-0.50391,0.97422 -0.87344,1.91484 -1.14219,2.88906c-0.26875,0.97422 -0.67187,2.65391 -1.20938,5.07266c-0.94062,5.10625 -3.86328,7.69297 -8.76797,7.69297c-2.55313,0 -4.70312,-0.83984 -6.45,-2.51953c-1.74687,-1.67969 -2.62031,-4.16563 -2.62031,-7.45781c0,-4.13203 0.63828,-7.72656 1.91484,-10.75c1.27656,-3.02344 2.98984,-5.67734 5.10625,-7.96172c2.11641,-2.28437 4.97187,-5.00547 8.56641,-8.16328c3.15781,-2.75469 5.40859,-4.8375 6.81953,-6.24844c1.41094,-1.41094 2.58672,-2.95625 3.52734,-4.70312c0.97422,-1.71328 1.44453,-3.59453 1.44453,-5.61016c0,-3.93047 -1.47812,-7.25625 -4.40078,-9.97734c-2.92266,-2.72109 -6.71875,-4.06484 -11.32109,-4.06484c-5.40859,0 -9.40625,1.37734 -11.95938,4.09844c-2.55312,2.72109 -4.73672,6.75234 -6.48359,12.06016c-1.67969,5.57656 -4.8375,8.33125 -9.50703,8.33125c-2.75469,0 -5.07266,-0.97422 -6.9875,-2.92266c-1.88125,-1.88125 -2.85547,-3.96406 -2.85547,-6.24844zM85.12656,141.86641c-2.98984,0 -5.61016,-0.97422 -7.86094,-2.92266c-2.25078,-1.94844 -3.35937,-4.66953 -3.35937,-8.16328c0,-3.09063 1.075,-5.71094 3.25859,-7.82734c2.15,-2.11641 4.8375,-3.15781 7.96172,-3.15781c3.09063,0 5.71094,1.075 7.82734,3.15781c2.11641,2.11641 3.15781,4.73672 3.15781,7.82734c0,3.46016 -1.10859,6.14766 -3.32578,8.12969c-2.21719,1.98203 -4.77031,2.95625 -7.65937,2.95625z\" fill=\"#ffffff\"></path></g><g><g id=\"Layer_1\"><path d=\"M168.85151,153.64877l-43.00028,-43.00028c-2.11506,-2.11506 -4.89192,-3.16419 -7.66407,-3.14807c-2.73016,0.01579 -5.45562,1.06526 -7.53876,3.14807c-2.12547,2.12581 -3.17494,4.92047 -3.14773,7.70673c0.02654,2.71605 1.07567,5.42404 3.14773,7.4961l43.00028,43.00028c2.0986,2.0986 4.84892,3.14807 7.5999,3.1484c2.75166,0.00034 5.50366,-1.04913 7.60293,-3.1484c2.11002,-2.11002 3.15949,-4.87915 3.1484,-7.64492c-0.01109,-2.73688 -1.06055,-5.47006 -3.1484,-7.55791z\" fill=\"#404041\"></path><path d=\"M153.64868,110.64849l-43.00028,43.00028c-2.11506,2.11506 -3.16419,4.89192 -3.14807,7.66407c0.01579,2.73016 1.06526,5.45562 3.14807,7.53876c2.12581,2.12581 4.92047,3.17494 7.70673,3.14773c2.71605,-0.02654 5.42404,-1.07567 7.4961,-3.14773l43.00028,-43.00028c2.0986,-2.0986 3.14807,-4.84892 3.1484,-7.5999c0.00034,-2.75166 -1.04913,-5.50366 -3.1484,-7.60293c-2.11002,-2.11002 -4.87915,-3.15949 -7.64492,-3.1484c-2.73688,0.01109 -5.47006,1.06055 -7.55791,3.1484z\" fill=\"#404041\"></path><path d=\"M114.44919,165.05081v0c-2.09994,-2.09994 -2.09994,-5.50164 0,-7.60125l43.00028,-43.00028c2.09994,-2.09994 5.50164,-2.09994 7.60125,0v0c2.09994,2.09994 2.09994,5.50164 0,7.60125l-43.00028,43.00028c-2.09994,2.09994 -5.50131,2.09994 -7.60125,0z\" fill=\"#e84849\"></path><path d=\"M114.44919,114.44928v0c2.09994,-2.09994 5.50164,-2.09994 7.60125,0l43.00028,43.00028c2.09994,2.09994 2.09994,5.50164 0,7.60125v0c-2.09994,2.09994 -5.50164,2.09994 -7.60125,0l-43.00028,-43.00028c-2.09994,-2.09994 -2.09994,-5.50131 0,-7.60125z\" fill=\"#e84849\"></path></g></g></g></svg>"
      },
      "permissions": {
        "access": {
          "get": "all",
          "set": "all",
          "del": "group"
        },
        "group": [ "admin" ]
      },
      "text": {
        "title": "Bürgervotum",
        "add_title": "Hier kannst du eine neue Frage stellen:",
        "add_placeholder": "...was möchtest du wissen?",
        "prev": "Vorherige Frage:",
        "next": "Nächste Frage:",
        "yes": "Ja",
        "neither": "Weiß nicht",
        "no": "Nein",
        "like": "Wichtige Frage",
        "add": "Frage stellen",
        "confirm": "Bestätigen",
        "share": "Frage teilen",
        "cancel": "Abbrechen",
        "report": "Frage melden"
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js" ]
    },

    Instance: function () {

      let $, prev, next, add = false, numbers = [];

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        /**
         * unique key of logged in user
         * @type {string}
         */
        const user = this.user.getValue().key;

        // random selection of next question
        if ( !next ) {
          if ( !numbers.length ) {
            const n = await this.store.count();
            for ( let i = 1; i <= n; i++ )
              numbers.push( i );
            $.shuffleArray( numbers );
          }
          next = await this.store.get( numbers.pop().toString() );
        }

        /**
         * when the question is answered by the user
         * @type {Function}
         * @returns {Promise<void>}
         */
        const finish = async () => {
          await this.store.set( next );  // update data of answered question
          prev = next;                   // current question is now previous question
          next = null;                   // next question is chosen at random
          this.start();                  // restart => shows next question
        };

        /**
         * contains callbacks for click events
         * @type {Object.<string,Function>}
         */
        const event = {
          yes: () => {
            next.voting.yes[ user ] = true;
            delete next.voting.neither[ user ];
            delete next.voting.no[ user ];
            finish();
          },
          neither: () => {
            delete next.voting.yes[ user ];
            next.voting.neither[ user ] = true;
            delete next.voting.no[ user ];
            finish();
          },
          no: () => {
            delete next.voting.yes[ user ];
            delete next.voting.neither[ user ];
            next.voting.no[ user ] = true;
            finish();
          },
          like: () => {
            next.likes[ user ] = !next.likes[ user ];
            this.store.set( next );
            this.start();
          },
          add: () => {
            add = true;
            this.start();
          },
          confirm: async () => {
            next = {
              "key": ( await this.store.count() + 1 ).toString(),
              "text": this.element.querySelector( '[contenteditable]' ).innerText.trim(),
              "voting": {
                "yes": {},
                "no": {},
                "neither": {}
              },
              "likes": {},
              "_": this.permissions
            };
            try {
              add = false;
              prev = null;
              await this.store.set( next );
              alert( 'Question saved!' );
            }
            catch ( e ) {}
            this.start();
          },
          share: () => console.log( 'TODO' ),
          cancel: () => {
            add = false;
            this.start();
          },
          report: async () => {
            try {
              await this.store.del( next.key );
              next = null;
              alert( 'Question deleted!' );
              this.start();
            }
            catch ( e ) {}
          }
        };

        // render content in webpage area via lit-html template
        $.render( $.html( this.html.main, this, event, next, prev, add ), this.element );

        // render diagram for results of previous question
        prev && await this.diagram.start( {
          root: this.element.querySelector( 'section#prev article' ),
          style: '',
          settings: this.convert( {
            title: this.text.prev,
            subtitle: prev.text,
            categories: [ this.text.yes, this.text.no, this.text.neither ],
            data: [ Object.keys( prev.voting.yes ).length, Object.keys( prev.voting.no ).length, Object.keys( prev.voting.neither ).length ]
          } )
        } );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();