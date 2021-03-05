/**
 * @overview configurations of ccmjs-baed web component for a "Highchart.js" chart
 * @author André Kless <andre.kless@web.de> 2017-2019, 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "helper": [ "ccm.load", "./../modules/helper.mjs" ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "settings": {
      "title": {
        "text": "Solar Employment Growth by Sector, 2010-2016"
      },
      "subtitle": {
        "text": "Source: thesolarfoundation.com"
      },
      "yAxis": {
        "title": {
          "text": "Number of Employees"
        }
      },
      "legend": {
        "layout": "vertical",
        "align": "right",
        "verticalAlign": "middle"
      },
      "plotOptions": {
        "series": {
          "label": {
            "connectorAllowed": false
          },
          "pointStart": 2010
        }
      },
      "series": [
        {
          "name": "Installation",
          "data": [ 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175 ]
        },
        {
          "name": "Manufacturing",
          "data": [ 24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434 ]
        },
        {
          "name": "Sales & Distribution",
          "data": [ 11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387 ]
        },
        {
          "name": "Project Development",
          "data": [ null, null, 7988, 12169, 15112, 22452, 34400, 34227 ]
        },
        {
          "name": "Other",
          "data": [ 12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111 ]
        }
      ],
      "responsive": {
        "rules": [
          {
            "condition": {
              "maxWidth": 500
            },
            "chartOptions": {
              "legend": {
                "layout": "horizontal",
                "align": "center",
                "verticalAlign": "bottom"
              }
            }
          }
        ]
      }
    }
  },

  "line": {
    "key": "line",
    "settings": {
      "title": {
        "text": "Solar Employment Growth by Sector, 2010-2016"
      },
      "subtitle": {
        "text": "Source: thesolarfoundation.com"
      },
      "yAxis": {
        "title": {
          "text": "Number of Employees"
        }
      },
      "legend": {
        "layout": "vertical",
        "align": "right",
        "verticalAlign": "middle"
      },
      "plotOptions": {
        "series": {
          "label": {
            "connectorAllowed": false
          },
          "pointStart": 2010
        }
      },
      "series": [
        {
          "name": "Installation",
          "data": [ 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175 ]
        },
        {
          "name": "Manufacturing",
          "data": [ 24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434 ]
        },
        {
          "name": "Sales & Distribution",
          "data": [ 11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387 ]
        },
        {
          "name": "Project Development",
          "data": [ null, null, 7988, 12169, 15112, 22452, 34400, 34227 ]
        },
        {
          "name": "Other",
          "data": [ 12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111 ]
        }
      ],
      "responsive": {
        "rules": [
          {
            "condition": {
              "maxWidth": 500
            },
            "chartOptions": {
              "legend": {
                "layout": "horizontal",
                "align": "center",
                "verticalAlign": "bottom"
              }
            }
          }
        ]
      }
    }
  },

  "area": {
    "key": "area",
    "settings": {
      "chart": {
        "type": "area"
      },
      "title": {
        "text": "US and USSR nuclear stockpiles"
      },
      "subtitle": {
        "text": "Sources: <a href='https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006'>thebulletin.org</a> &amp; <a href='https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat'>armscontrol.org</a>"
      },
      "xAxis": {
        "allowDecimals": false
      },
      "yAxis": {
        "title": {
          "text": "Nuclear weapon states"
        }
      },
      "tooltip": {
        "pointFormat": "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}"
      },
      "plotOptions": {
        "area": {
          "pointStart": 1940,
          "marker": {
            "enabled": false,
            "symbol": "circle",
            "radius": 2,
            "states": {
              "hover": {
                "enabled": true
              }
            }
          }
        }
      },
      "series": [
        {
          "name": "USA",
          "data": [
            null, null, null, null, null, 6, 11, 32, 110, 235,
            369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
            20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
            26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
            21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
            10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
            5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
          ]
        },
        {
          "name": "USSR/Russia",
          "data": [
            null, null, null, null, null, null, null, null, null, null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
            1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
            11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
            30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
            37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
            12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
          ]
        }
      ]
    }
  },

  "bar": {
    "key": "bar",
    "settings": {
      "chart": {
        "type": "bar"
      },
      "title": {
        "text": "Historic World Population by Region"
      },
      "subtitle": {
        "text": "Source: <a href='https://en.wikipedia.org/wiki/World_population'>Wikipedia.org</a>"
      },
      "xAxis": {
        "categories": [ "Africa", "America", "Asia", "Europe", "Oceania" ],
        "title": {
          "text": null
        }
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": "Population (millions)",
          "align": "high"
        },
        "labels": {
          "overflow": "justify"
        }
      },
      "tooltip": {
        "valueSuffix": " millions"
      },
      "plotOptions": {
        "bar": {
          "dataLabels": {
            "enabled": true
          }
        }
      },
      "legend": {
        "layout": "vertical",
        "align": "right",
        "verticalAlign": "top",
        "x": -40,
        "y": 80,
        "floating": true,
        "borderWidth": 1,
        "backgroundColor": "#FFFFFF",
        "shadow": true
      },
      "credits": {
        "enabled": false
      },
      "series": [
        {
          "name": "Year 1800",
          "data": [ 107, 31, 635, 203, 2 ]
        },
        {
          "name": "Year 1900",
          "data": [ 133, 156, 947, 408, 6 ]
        },
        {
          "name": "Year 2000",
          "data": [ 814, 841, 3714, 727, 31 ]
        },
        {
          "name": "Year 2016",
          "data": [ 1216, 1001, 4436, 738, 40 ]
        }
      ]
    }
  },

  "column": {
    "key": "column",
    "settings": {
      "chart": {
        "type": "column"
      },
      "title": {
        "text": "Monthly Average Rainfall"
      },
      "subtitle": {
        "text": "Source: WorldClimate.com"
      },
      "xAxis": {
        "categories": [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        "crosshair": true
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": "Rainfall (mm)"
        }
      },
      "tooltip": {
        "headerFormat": "<span style='font-size:10px'>{point.key}</span><table>",
        "pointFormat": "<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y:.1f} mm</b></td></tr>",
        "footerFormat": "</table>",
        "shared": true,
        "useHTML": true
      },
      "plotOptions": {
        "column": {
          "pointPadding": 0.2,
          "borderWidth": 0
        }
      },
      "series": [
        {
          "name": "Tokyo",
          "data": [ 49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4 ]
        },
        {
          "name": "New York",
          "data": [ 83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3 ]
        },
        {
          "name": "London",
          "data": [ 48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2 ]
        },
        {
          "name": "Berlin",
          "data": [ 42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1 ]
        }
      ]
    }
  },

  "pie": {
    "key": "pie",
    "settings": {
      "chart": {
        "plotBackgroundColor": null,
        "plotBorderWidth": null,
        "plotShadow": false,
        "type": "pie"
      },
      "title": {
        "text": "Browser market shares in January, 2018"
      },
      "tooltip": {
        "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      "plotOptions": {
        "pie": {
          "allowPointSelect": true,
          "cursor": "pointer",
          "dataLabels": {
            "enabled": true,
            "format": "<b>{point.name}</b>: {point.percentage:.1f} %",
            "style": {
              "color": "black"
            }
          }
        }
      },
      "series": [
        {
          "name": "Brands",
          "colorByPoint": true,
          "data": [
            {
              "name": "Chrome",
              "y": 61.41,
              "sliced": true,
              "selected": true
            },
            {
              "name": "Internet Explorer",
              "y": 11.84
            },
            {
              "name": "Firefox",
              "y": 10.85
            },
            {
              "name": "Edge",
              "y": 4.67
            },
            {
              "name": "Safari",
              "y": 4.18
            },
            {
              "name": "Sogou Explorer",
              "y": 1.64
            },
            {
              "name": "Opera",
              "y": 1.6
            },
            {
              "name": "QQ",
              "y": 1.2
            },
            {
              "name": "Other",
              "y": 2.61
            }
          ]
        }
      ]
    }
  },

  "semi_circle_donut": {
    "key": "semi_circle_donut",
    "settings": {
      "chart": {
        "plotBackgroundColor": null,
        "plotBorderWidth": 0,
        "plotShadow": false
      },
      "title": {
        "text": "Browser<br>shares<br>2017",
        "align": "center",
        "verticalAlign": "middle",
        "y": 40
      },
      "tooltip": {
        "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      "plotOptions": {
        "pie": {
          "dataLabels": {
            "enabled": true,
            "distance": -50,
            "style": {
              "fontWeight": "bold",
              "color": "white"
            }
          },
          "startAngle": -90,
          "endAngle": 90,
          "center": [ "50%", "75%" ],
          "size": "110%"
        }
      },
      "series": [
        {
          "type": "pie",
          "name": "Browser share",
          "innerSize": "50%",
          "data": [
            [ "Chrome", 58.9 ],
            [ "Firefox", 13.29 ],
            [ "Internet Explorer", 13 ],
            [ "Edge", 3.78 ],
            [ "Safari", 3.42 ],
            {
              "name": "Other",
              "y": 7.61,
              "dataLabels": {
                "enabled": false
              }
            }
          ]
        }
      ]
    }
  },

  "scatter": {
    "key": "scatter",
    "settings": {
      "chart": {
        "type": "scatter",
        "zoomType": "xy"
      },
      "title": {
        "text": "Height Versus Weight of 507 Individuals by Gender"
      },
      "subtitle": {
        "text": "Source: Heinz  2003"
      },
      "xAxis": {
        "title": {
          "enabled": true,
          "text": "Height (cm)"
        },
        "startOnTick": true,
        "endOnTick": true,
        "showLastLabel": true
      },
      "yAxis": {
        "title": {
          "text": "Weight (kg)"
        }
      },
      "legend": {
        "layout": "vertical",
        "align": "left",
        "verticalAlign": "top",
        "x": 100,
        "y": 70,
        "floating": true,
        "backgroundColor": "#FFFFFF",
        "borderWidth": 1
      },
      "plotOptions": {
        "scatter": {
          "marker": {
            "radius": 5,
            "states": {
              "hover": {
                "enabled": true,
                "lineColor": "rgb(100,100,100)"
              }
            }
          },
          "states": {
            "hover": {
              "marker": {
                "enabled": false
              }
            }
          },
          "tooltip": {
            "headerFormat": "<b>{series.name}</b><br>",
            "pointFormat": "{point.x} cm, {point.y} kg"
          }
        }
      },
      "series": [
        {
          "name": "Female",
          "color": "rgba(223, 83, 83, .5)",
          "data": [
            [ 161.2, 51.6 ], [ 167.5,  59.0 ], [ 159.5, 49.2 ], [ 157.0, 63.0 ], [ 155.8, 53.6 ],
            [ 170.0, 59.0 ], [ 159.1,  47.6 ], [ 166.0, 69.8 ], [ 176.2, 66.8 ], [ 160.2, 75.2 ],
            [ 172.5, 55.2 ], [ 170.9,  54.2 ], [ 172.9, 62.5 ], [ 153.4, 42.0 ], [ 160.0, 50.0 ],
            [ 147.2, 49.8 ], [ 168.2,  49.2 ], [ 175.0, 73.2 ], [ 157.0, 47.8 ], [ 167.6, 68.8 ],
            [ 159.5, 50.6 ], [ 175.0,  82.5 ], [ 166.8, 57.2 ], [ 176.5, 87.8 ], [ 170.2, 72.8 ],
            [ 174.0, 54.5 ], [ 173.0,  59.8 ], [ 179.9, 67.3 ], [ 170.5, 67.8 ], [ 160.0, 47.0 ],
            [ 154.4, 46.2 ], [ 162.0,  55.0 ], [ 176.5, 83.0 ], [ 160.0, 54.4 ], [ 152.0, 45.8 ],
            [ 162.1, 53.6 ], [ 170.0,  73.2 ], [ 160.2, 52.1 ], [ 161.3, 67.9 ], [ 166.4, 56.6 ],
            [ 168.9, 62.3 ], [ 163.8,  58.5 ], [ 167.6, 54.5 ], [ 160.0, 50.2 ], [ 161.3, 60.3 ],
            [ 167.6, 58.3 ], [ 165.1,  56.2 ], [ 160.0, 50.2 ], [ 170.0, 72.9 ], [ 157.5, 59.8 ],
            [ 167.6, 61.0 ], [ 160.7,  69.1 ], [ 163.2, 55.9 ], [ 152.4, 46.5 ], [ 157.5, 54.3 ],
            [ 168.3, 54.8 ], [ 180.3,  60.7 ], [ 165.5, 60.0 ], [ 165.0, 62.0 ], [ 164.5, 60.3 ],
            [ 156.0, 52.7 ], [ 160.0,  74.3 ], [ 163.0, 62.0 ], [ 165.7, 73.1 ], [ 161.0, 80.0 ],
            [ 162.0, 54.7 ], [ 166.0,  53.2 ], [ 174.0, 75.7 ], [ 172.7, 61.1 ], [ 167.6, 55.7 ],
            [ 151.1, 48.7 ], [ 164.5,  52.3 ], [ 163.5, 50.0 ], [ 152.0, 59.3 ], [ 169.0, 62.5 ],
            [ 164.0, 55.7 ], [ 161.2,  54.8 ], [ 155.0, 45.9 ], [ 170.0, 70.6 ], [ 176.2, 67.2 ],
            [ 170.0, 69.4 ], [ 162.5,  58.2 ], [ 170.3, 64.8 ], [ 164.1, 71.6 ], [ 169.5, 52.8 ],
            [ 163.2, 59.8 ], [ 154.5,  49.0 ], [ 159.8, 50.0 ], [ 173.2, 69.2 ], [ 170.0, 55.9 ],
            [ 161.4, 63.4 ], [ 169.0,  58.2 ], [ 166.2, 58.6 ], [ 159.4, 45.7 ], [ 162.5, 52.2 ],
            [ 159.0, 48.6 ], [ 162.8,  57.8 ], [ 159.0, 55.6 ], [ 179.8, 66.8 ], [ 162.9, 59.4 ],
            [ 161.0, 53.6 ], [ 151.1,  73.2 ], [ 168.2, 53.4 ], [ 168.9, 69.0 ], [ 173.2, 58.4 ],
            [ 171.8, 56.2 ], [ 178.0,  70.6 ], [ 164.3, 59.8 ], [ 163.0, 72.0 ], [ 168.5, 65.2 ],
            [ 166.8, 56.6 ], [ 172.7, 105.2 ], [ 163.5, 51.8 ], [ 169.4, 63.4 ], [ 167.8, 59.0 ],
            [ 159.5, 47.6 ], [ 167.6,  63.0 ], [ 161.2, 55.2 ], [ 160.0, 45.0 ], [ 163.2, 54.0 ],
            [ 162.2, 50.2 ], [ 161.3,  60.2 ], [ 149.5, 44.8 ], [ 157.5, 58.8 ], [ 163.2, 56.4 ],
            [ 172.7, 62.0 ], [ 155.0,  49.2 ], [ 156.5, 67.2 ], [ 164.0, 53.8 ], [ 160.9, 54.4 ],
            [ 162.8, 58.0 ], [ 167.0,  59.8 ], [ 160.0, 54.8 ], [ 160.0, 43.2 ], [ 168.9, 60.5 ],
            [ 158.2, 46.4 ], [ 156.0,  64.4 ], [ 160.0, 48.8 ], [ 167.1, 62.2 ], [ 158.0, 55.5 ],
            [ 167.6, 57.8 ], [ 156.0,  54.6 ], [ 162.1, 59.2 ], [ 173.4, 52.7 ], [ 159.8, 53.2 ],
            [ 170.5, 64.5 ], [ 159.2,  51.8 ], [ 157.5, 56.0 ], [ 161.3, 63.6 ], [ 162.6, 63.2 ],
            [ 160.0, 59.5 ], [ 168.9,  56.8 ], [ 165.1, 64.1 ], [ 162.6, 50.0 ], [ 165.1, 72.3 ],
            [ 166.4, 55.0 ], [ 160.0,  55.9 ], [ 152.4, 60.4 ], [ 170.2, 69.1 ], [ 162.6, 84.5 ],
            [ 170.2, 55.9 ], [ 158.8,  55.5 ], [ 172.7, 69.5 ], [ 167.6, 76.4 ], [ 162.6, 61.4 ],
            [ 167.6, 65.9 ], [ 156.2,  58.6 ], [ 175.2, 66.8 ], [ 172.1, 56.6 ], [ 162.6, 58.6 ],
            [ 160.0, 55.9 ], [ 165.1,  59.1 ], [ 182.9, 81.8 ], [ 166.4, 70.7 ], [ 165.1, 56.8 ],
            [ 177.8, 60.0 ], [ 165.1,  58.2 ], [ 175.3, 72.7 ], [ 154.9, 54.1 ], [ 158.8, 49.1 ],
            [ 172.7, 75.9 ], [ 168.9,  55.0 ], [ 161.3, 57.3 ], [ 167.6, 55.0 ], [ 165.1, 65.5 ],
            [ 175.3, 65.5 ], [ 157.5,  48.6 ], [ 163.8, 58.6 ], [ 167.6, 63.6 ], [ 165.1, 55.2 ],
            [ 165.1, 62.7 ], [ 168.9,  56.6 ], [ 162.6, 53.9 ], [ 164.5, 63.2 ], [ 176.5, 73.6 ],
            [ 168.9, 62.0 ], [ 175.3,  63.6 ], [ 159.4, 53.2 ], [ 160.0, 53.4 ], [ 170.2, 55.0 ],
            [ 162.6, 70.5 ], [ 167.6,  54.5 ], [ 162.6, 54.5 ], [ 160.7, 55.9 ], [ 160.0, 59.0 ],
            [ 157.5, 63.6 ], [ 162.6,  54.5 ], [ 152.4, 47.3 ], [ 170.2, 67.7 ], [ 165.1, 80.9 ],
            [ 172.7, 70.5 ], [ 165.1,  60.9 ], [ 170.2, 63.6 ], [ 170.2, 54.5 ], [ 170.2, 59.1 ],
            [ 161.3, 70.5 ], [ 167.6,  52.7 ], [ 167.6, 62.7 ], [ 165.1, 86.3 ], [ 162.6, 66.4 ],
            [ 152.4, 67.3 ], [ 168.9,  63.0 ], [ 170.2, 73.6 ], [ 175.2, 62.3 ], [ 175.2, 57.7 ],
            [ 160.0, 55.4 ], [ 165.1, 104.1 ], [ 174.0, 55.5 ], [ 170.2, 77.3 ], [ 160.0, 80.5 ],
            [ 167.6, 64.5 ], [ 167.6,  72.3 ], [ 167.6, 61.4 ], [ 154.9, 58.2 ], [ 162.6, 81.8 ],
            [ 175.3, 63.6 ], [ 171.4,  53.4 ], [ 157.5, 54.5 ], [ 165.1, 53.6 ], [ 160.0, 60.0 ],
            [ 174.0, 73.6 ], [ 162.6,  61.4 ], [ 174.0, 55.5 ], [ 162.6, 63.6 ], [ 161.3, 60.9 ],
            [ 156.2, 60.0 ], [ 149.9,  46.8 ], [ 169.5, 57.3 ], [ 160.0, 64.1 ], [ 175.3, 63.6 ],
            [ 169.5, 67.3 ], [ 160.0,  75.5 ], [ 172.7, 68.2 ], [ 162.6, 61.4 ], [ 157.5, 76.8 ],
            [ 176.5, 71.8 ], [ 164.4,  55.5 ], [ 160.7, 48.6 ], [ 174.0, 66.4 ], [ 163.8, 67.3 ]
          ]
        },
        {
          "name": "Male",
          "color": "rgba(119, 152, 191, .5)",
          "data": [
            [ 174.0,  65.6 ], [ 175.3,  71.8 ], [ 193.5, 80.7 ], [ 186.5,  72.6 ], [ 187.2,  78.8 ],
            [ 181.5,  74.8 ], [ 184.0,  86.4 ], [ 184.5, 78.4 ], [ 175.0,  62.0 ], [ 184.0,  81.6 ],
            [ 180.0,  76.6 ], [ 177.8,  83.6 ], [ 192.0, 90.0 ], [ 176.0,  74.6 ], [ 174.0,  71.0 ],
            [ 184.0,  79.6 ], [ 192.7,  93.8 ], [ 171.5, 70.0 ], [ 173.0,  72.4 ], [ 176.0,  85.9 ],
            [ 176.0,  78.8 ], [ 180.5,  77.8 ], [ 172.7, 66.2 ], [ 176.0,  86.4 ], [ 173.5,  81.8 ],
            [ 178.0,  89.6 ], [ 180.3,  82.8 ], [ 180.3, 76.4 ], [ 164.5,  63.2 ], [ 173.0,  60.9 ],
            [ 183.5,  74.8 ], [ 175.5,  70.0 ], [ 188.0, 72.4 ], [ 189.2,  84.1 ], [ 172.8,  69.1 ],
            [ 170.0,  59.5 ], [ 182.0,  67.2 ], [ 170.0, 61.3 ], [ 177.8,  68.6 ], [ 184.2,  80.1 ],
            [ 186.7,  87.8 ], [ 171.4,  84.7 ], [ 172.7, 73.4 ], [ 175.3,  72.1 ], [ 180.3,  82.6 ],
            [ 182.9,  88.7 ], [ 188.0,  84.1 ], [ 177.2, 94.1 ], [ 172.1,  74.9 ], [ 167.0,  59.1 ],
            [ 169.5,  75.6 ], [ 174.0,  86.2 ], [ 172.7, 75.3 ], [ 182.2,  87.1 ], [ 164.1,  55.2 ],
            [ 163.0,  57.0 ], [ 171.5,  61.4 ], [ 184.2, 76.8 ], [ 174.0,  86.8 ], [ 174.0,  72.2 ],
            [ 177.0,  71.6 ], [ 186.0,  84.8 ], [ 167.0, 68.2 ], [ 171.8,  66.1 ], [ 182.0,  72.0 ],
            [ 167.0,  64.6 ], [ 177.8,  74.8 ], [ 164.5, 70.0 ], [ 192.0, 101.6 ], [ 175.5,  63.2 ],
            [ 171.2,  79.1 ], [ 181.6,  78.9 ], [ 167.4, 67.7 ], [ 181.1,  66.0 ], [ 177.0,  68.2 ],
            [ 174.5,  63.9 ], [ 177.5,  72.0 ], [ 170.5, 56.8 ], [ 182.4,  74.5 ], [ 197.1,  90.9 ],
            [ 180.1,  93.0 ], [ 175.5,  80.9 ], [ 180.6, 72.7 ], [ 184.4,  68.0 ], [ 175.5,  70.9 ],
            [ 180.6,  72.5 ], [ 177.0,  72.5 ], [ 177.1, 83.4 ], [ 181.6,  75.5 ], [ 176.5,  73.0 ],
            [ 175.0,  70.2 ], [ 174.0,  73.4 ], [ 165.1, 70.5 ], [ 177.0,  68.9 ], [ 192.0, 102.3 ],
            [ 176.5,  68.4 ], [ 169.4,  65.9 ], [ 182.1, 75.7 ], [ 179.8,  84.5 ], [ 175.3,  87.7 ],
            [ 184.9,  86.4 ], [ 177.3,  73.2 ], [ 167.4, 53.9 ], [ 178.1,  72.0 ], [ 168.9,  55.5 ],
            [ 157.2,  58.4 ], [ 180.3,  83.2 ], [ 170.2, 72.7 ], [ 177.8,  64.1 ], [ 172.7,  72.3 ],
            [ 165.1,  65.0 ], [ 186.7,  86.4 ], [ 165.1, 65.0 ], [ 174.0,  88.6 ], [ 175.3,  84.1 ],
            [ 185.4,  66.8 ], [ 177.8,  75.5 ], [ 180.3, 93.2 ], [ 180.3,  82.7 ], [ 177.8,  58.0 ],
            [ 177.8,  79.5 ], [ 177.8,  78.6 ], [ 177.8, 71.8 ], [ 177.8, 116.4 ], [ 163.8,  72.2 ],
            [ 188.0,  83.6 ], [ 198.1,  85.5 ], [ 175.3, 90.9 ], [ 166.4,  85.9 ], [ 190.5,  89.1 ],
            [ 166.4,  75.0 ], [ 177.8,  77.7 ], [ 179.7, 86.4 ], [ 172.7,  90.9 ], [ 190.5,  73.6 ],
            [ 185.4,  76.4 ], [ 168.9,  69.1 ], [ 167.6, 84.5 ], [ 175.3,  64.5 ], [ 170.2,  69.1 ],
            [ 190.5, 108.6 ], [ 177.8,  86.4 ], [ 190.5, 80.9 ], [ 177.8,  87.7 ], [ 184.2,  94.5 ],
            [ 176.5,  80.2 ], [ 177.8,  72.0 ], [ 180.3, 71.4 ], [ 171.4,  72.7 ], [ 172.7,  84.1 ],
            [ 172.7,  76.8 ], [ 177.8,  63.6 ], [ 177.8, 80.9 ], [ 182.9,  80.9 ], [ 170.2,  85.5 ],
            [ 167.6,  68.6 ], [ 175.3,  67.7 ], [ 165.1, 66.4 ], [ 185.4, 102.3 ], [ 181.6,  70.5 ],
            [ 172.7,  95.9 ], [ 190.5,  84.1 ], [ 179.1, 87.3 ], [ 175.3,  71.8 ], [ 170.2,  65.9 ],
            [ 193.0,  95.9 ], [ 171.4,  91.4 ], [ 177.8, 81.8 ], [ 177.8,  96.8 ], [ 167.6,  69.1 ],
            [ 167.6,  82.7 ], [ 180.3,  75.5 ], [ 182.9, 79.5 ], [ 176.5,  73.6 ], [ 186.7,  91.8 ],
            [ 188.0,  84.1 ], [ 188.0,  85.9 ], [ 177.8, 81.8 ], [ 174.0,  82.5 ], [ 177.8,  80.5 ],
            [ 171.4,  70.0 ], [ 185.4,  81.8 ], [ 185.4, 84.1 ], [ 188.0,  90.5 ], [ 188.0,  91.4 ],
            [ 182.9,  89.1 ], [ 176.5,  85.0 ], [ 175.3, 69.1 ], [ 175.3,  73.6 ], [ 188.0,  80.5 ],
            [ 188.0,  82.7 ], [ 175.3,  86.4 ], [ 170.5, 67.7 ], [ 179.1,  92.7 ], [ 177.8,  93.6 ],
            [ 175.3,  70.9 ], [ 182.9,  75.0 ], [ 170.8, 93.2 ], [ 188.0,  93.2 ], [ 180.3,  77.7 ],
            [ 177.8,  61.4 ], [ 185.4,  94.1 ], [ 168.9, 75.0 ], [ 185.4,  83.6 ], [ 180.3,  85.5 ],
            [ 174.0,  73.9 ], [ 167.6,  66.8 ], [ 182.9, 87.3 ], [ 160.0,  72.3 ], [ 180.3,  88.6 ],
            [ 167.6,  75.5 ], [ 186.7, 101.4 ], [ 175.3, 91.1 ], [ 175.3,  67.3 ], [ 175.9,  77.7 ],
            [ 175.3,  81.8 ], [ 179.1,  75.5 ], [ 181.6, 84.5 ], [ 177.8,  76.6 ], [ 182.9,  85.0 ],
            [ 177.8, 102.5 ], [ 184.2,  77.3 ], [ 179.1, 71.8 ], [ 176.5,  87.9 ], [ 188.0,  94.3 ],
            [ 174.0,  70.9 ], [ 167.6,  64.5 ], [ 170.2, 77.3 ], [ 167.6,  72.3 ], [ 188.0,  87.3 ],
            [ 174.0,  80.0 ], [ 176.5,  82.3 ], [ 180.3, 73.6 ], [ 167.6,  74.1 ], [ 188.0,  85.9 ],
            [ 180.3,  73.2 ], [ 167.6,  76.3 ], [ 183.0, 65.9 ], [ 183.0,  90.9 ], [ 179.1,  89.1 ],
            [ 170.2,  62.3 ], [ 177.8,  82.7 ], [ 179.1, 79.1 ], [ 190.5,  98.2 ], [ 177.8,  84.1 ],
            [ 180.3,  83.2 ], [ 180.3,  83.2 ]
          ]
        }
      ]
    }
  },

  "bubble": {
    "key": "bubble",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/highcharts-more.js" ],
    "settings": {
      "chart": {
        "type": "bubble",
        "plotBorderWidth": 1,
        "zoomType": "xy"
      },
      "legend": {
        "enabled": false
      },
      "title": {
        "text": "Sugar and fat intake per country"
      },
      "subtitle": {
        "text": "Source: <a href='http://www.euromonitor.com/'>Euromonitor</a> and <a href='https://data.oecd.org/'>OECD</a>"
      },
      "xAxis": {
        "gridLineWidth": 1,
        "title": {
          "text": "Daily fat intake"
        },
        "labels": {
          "format": "{value} gr"
        },
        "plotLines": [
          {
            "color": "black",
            "dashStyle": "dot",
            "width": 2,
            "value": 65,
            "label": {
              "rotation": 0,
              "y": 15,
              "style": {
                "fontStyle": "italic"
              },
              "text": "Safe fat intake 65g/day"
            },
            "zIndex": 3
          }
        ]
      },
      "yAxis": {
        "startOnTick": false,
        "endOnTick": false,
        "title": {
          "text": "Daily sugar intake"
        },
        "labels": {
          "format": "{value} gr"
        },
        "maxPadding": 0.2,
        "plotLines": [
          {
            "color": "black",
            "dashStyle": "dot",
            "width": 2,
            "value": 50,
            "label": {
              "align": "right",
              "style": {
                "fontStyle": "italic"
              },
              "text": "Safe sugar intake 50g/day",
              "x": -10
            },
            "zIndex": 3
          }
        ]
      },
      "tooltip": {
        "useHTML": true,
        "headerFormat": "<table>",
        "pointFormat": "<tr><th colspan='2'><h3>{point.country}</h3></th></tr><tr><th>Fat intake:</th><td>{point.x}g</td></tr><tr><th>Sugar intake:</th><td>{point.y}g</td></tr><tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>",
        "footerFormat": "</table>",
        "followPointer": true
      },
      "plotOptions": {
        "series": {
          "dataLabels": {
            "enabled": true,
            "format": "{point.name}"
          }
        }
      },
      "series": [
        {
          "data": [
            { "x": 95  , "y":  95  , "z": 13.8, "name": "BE", "country": "Belgium" },
            { "x": 86.5, "y": 102.9, "z": 14.7, "name": "DE", "country": "Germany" },
            { "x": 80.8, "y":  91.5, "z": 15.8, "name": "FI", "country": "Finland" },
            { "x": 80.4, "y": 102.5, "z": 12  , "name": "NL", "country": "Netherlands" },
            { "x": 80.3, "y":  86.1, "z": 11.8, "name": "SE", "country": "Sweden" },
            { "x": 78.4, "y":  70.1, "z": 16.6, "name": "ES", "country": "Spain" },
            { "x": 74.2, "y":  68.5, "z": 14.5, "name": "FR", "country": "France" },
            { "x": 73.5, "y":  83.1, "z": 10  , "name": "NO", "country": "Norway" },
            { "x": 71  , "y":  93.2, "z": 24.7, "name": "UK", "country": "United Kingdom" },
            { "x": 69.2, "y":  57.6, "z": 10.4, "name": "IT", "country": "Italy" },
            { "x": 68.6, "y":  20  , "z": 16  , "name": "RU", "country": "Russia" },
            { "x": 65.5, "y": 126.4, "z": 35.3, "name": "US", "country": "United States" },
            { "x": 65.4, "y":  50.8, "z": 28.5, "name": "HU", "country": "Hungary" },
            { "x": 63.4, "y":  51.8, "z": 15.4, "name": "PT", "country": "Portugal" },
            { "x": 64  , "y":  82.9, "z": 31.3, "name": "NZ", "country": "New Zealand" }
          ]
        }
      ]
    }
  },

  "heatmap": {
    "key": "heatmap",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/heatmap.js" ],
    "settings": {
      "chart": {
        "type": "heatmap",
        "marginTop": 40,
        "marginBottom": 80,
        "plotBorderWidth": 1
      },
      "title": {
        "text": "Sales per employee per weekday"
      },
      "xAxis": {
        "categories": [ "Alexander", "Marie", "Maximilian", "Sophia", "Lukas", "Maria", "Leon", "Anna", "Tim", "Laura" ]
      },
      "yAxis": {
        "categories": [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ],
        "title": null
      },
      "colorAxis": {
        "min": 0,
        "minColor": '#FFFFFF',
        "maxColor": "#7CB5EC"
      },
      "legend": {
        "align": "right",
        "layout": "vertical",
        "margin": 0,
        "verticalAlign": "top",
        "y": 25,
        "symbolHeight": 280
      },
      "tooltip": false,
      "series": [
        {
          "name": "Sales per employee",
          "borderWidth": 1,
          "data": [
            [ 0, 0,  10 ],
            [ 0, 1,  19 ],
            [ 0, 2,   8 ],
            [ 0, 3,  24 ],
            [ 0, 4,  67 ],
            [ 1, 0,  92 ],
            [ 1, 1,  58 ],
            [ 1, 2,  78 ],
            [ 1, 3, 117 ],
            [ 1, 4,  48 ],
            [ 2, 0,  35 ],
            [ 2, 1,  15 ],
            [ 2, 2, 123 ],
            [ 2, 3,  64 ],
            [ 2, 4,  52 ],
            [ 3, 0,  72 ],
            [ 3, 1, 132 ],
            [ 3, 2, 114 ],
            [ 3, 3,  19 ],
            [ 3, 4,  16 ],
            [ 4, 0,  38 ],
            [ 4, 1,   5 ],
            [ 4, 2,   8 ],
            [ 4, 3, 117 ],
            [ 4, 4, 115 ],
            [ 5, 0,  88 ],
            [ 5, 1,  32 ],
            [ 5, 2,  12 ],
            [ 5, 3,   6 ],
            [ 5, 4, 120 ],
            [ 6, 0,  13 ],
            [ 6, 1,  44 ],
            [ 6, 2,  88 ],
            [ 6, 3,  98 ],
            [ 6, 4,  96 ],
            [ 7, 0,  31 ],
            [ 7, 1,   1 ],
            [ 7, 2,  82 ],
            [ 7, 3,  32 ],
            [ 7, 4,  30 ],
            [ 8, 0,  85 ],
            [ 8, 1,  97 ],
            [ 8, 2, 123 ],
            [ 8, 3,  64 ],
            [ 8, 4,  84 ],
            [ 9, 0,  47 ],
            [ 9, 1, 114 ],
            [ 9, 2,  31 ],
            [ 9, 3,  48 ],
            [ 9, 4,  91 ]
          ],
          "dataLabels": {
            "enabled": true,
            "color": "#000000"
          }
        }
      ]
    }
  },

  "spiderweb": {
    "key": "spiderweb",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/highcharts-more.js" ],
    "settings": {
      "chart": {
        "polar": true,
        "type": "line"
      },
      "title": {
        "text": "Budget vs spending",
        "x": -80
      },
      "pane": {
        "size": "80%"
      },
      "xAxis": {
        "categories": [ "Sales", "Marketing", "Development", "Customer Support", "Information Technology", "Administration" ],
        "tickmarkPlacement": "on",
        "lineWidth": 0
      },
      "yAxis": {
        "gridLineInterpolation": "polygon",
        "lineWidth": 0,
        "min": 0
      },
      "tooltip": {
        "shared": true,
        "pointFormat": "<span style='color:{series.color}'>{series.name}: <b>${point.y:,.0f}</b><br/>"
      },
      "legend": {
        "align": "right",
        "verticalAlign": "top",
        "y": 70,
        "layout": "vertical"
      },
      "series": [
        {
          "name": "Allocated Budget",
          "data": [ 43000, 19000, 60000, 35000, 17000, 10000 ],
          "pointPlacement": "on"
        },
        {
          "name": "Actual Spending",
          "data": [ 50000, 39000, 42000, 31000, 26000, 14000 ],
          "pointPlacement": "on"
        }
      ]
    }
  },

  "boxplot": {
    "key": "boxplot",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/highcharts-more.js" ],
    "settings": {
      "chart": {
        "type": "boxplot"
      },
      "title": {
        "text": "Highcharts Box Plot Example"
      },
      "legend": {
        "enabled": false
      },
      "xAxis": {
        "categories": [ "1", "2", "3", "4", "5" ],
        "title": {
          "text": "Experiment No."
        }
      },
      "yAxis": {
        "title": {
          "text": "Observations"
        },
        "plotLines": [
          {
            "value": 932,
            "color": "red",
            "width": 1,
            "label": {
              "text": "Theoretical mean: 932",
              "align": "center",
              "style": {
                "color": "gray"
              }
            }
          }
        ]
      },
      "series": [
        {
          "name": "Observations",
          "data": [
            [ 760, 801, 848, 895,  965 ],
            [ 733, 853, 939, 980, 1080 ],
            [ 714, 762, 817, 870,  918 ],
            [ 724, 802, 806, 871,  950 ],
            [ 834, 836, 864, 882,  910 ]
          ],
          "tooltip": {
            "headerFormat": "<em>Experiment No {point.key}</em><br/>"
          }
        },
        {
          "name": "Outlier",
          "color": "#7CB5EC",
          "type": "scatter",
          "data": [
            [ 0, 644 ],
            [ 4, 718 ],
            [ 4, 951 ],
            [ 4, 969 ]
          ],
          "marker": {
            "fillColor": "white",
            "lineWidth": 1,
            "lineColor": "#7CB5EC"
          },
          "tooltip": {
            "pointFormat": "Observation: {point.y}"
          }
        }
      ]
    }
  },

  "histogram": {
    "key": "histogram",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/histogram-bellcurve.js" ],
    "settings": {
      "title": {
        "text": "Highcharts Histogram"
      },
      "xAxis": [
        {
          "title": { "text": "Data" },
          "alignTicks": false
        },
        {
          "title": { "text": "Histogram" },
          "alignTicks": false,
          "opposite": true
        }
      ],
      "yAxis": [
        {
          "title": { "text": "Data" }
        },
        {
          "title": { "text": "Histogram" },
          "opposite": true
        }
      ],
      "series": [
        {
          "name": "Histogram",
          "type": "histogram",
          "xAxis": 1,
          "yAxis": 1,
          "baseSeries": "s1",
          "zIndex": -1
        },
        {
          "name": "Data",
          "type": "scatter",
          "data": [ 3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3 ],
          "id": "s1",
          "marker": {
            "radius": 1.5
          }
        }
      ]
    }
  },

  "pyramid": {
    "key": "pyramid",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/funnel.js" ],
    "settings": {
      "chart": {
        "type": "pyramid"
      },
      "title": {
        "text": "Sales pyramid",
        "x": -50
      },
      "plotOptions": {
        "series": {
          "dataLabels": {
            "enabled": true,
            "format": "<b>{point.name}</b> ({point.y:,.0f})",
            "color": "black",
            "softConnector": true
          },
          "center": [ "40%", "50%" ],
          "width": "80%"
        }
      },
      "legend": {
        "enabled": false
      },
      "series": [
        {
          "name": "Unique users",
          "data": [
            [ "Website visits",      15654 ],
            [ "Downloads",            4064 ],
            [ "Requested price list", 1987 ],
            [ "Invoice sent",          976 ],
            [ "Finalized",             846 ]
          ]
        }
      ]
    }
  },

  "xrange": {
    "key": "xrange",
    "lib": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/highcharts/xrange.js" ],
    "settings": {
      "chart": {
        "type": "xrange"
      },
      "title": {
        "text": "Highcharts X-range"
      },
      "xAxis": {
        "type": "datetime"
      },
      "yAxis": {
        "title": {
          "text": ""
        },
        "categories": [ "Prototyping", "Development", "Testing" ],
        "reversed": true
      },
      "series": [
        {
          "name": "Project 1",
          "borderColor": "gray",
          "pointWidth": 20,
          "data": [
            {
              "x":  Date.UTC( 2014, 10, 21 ),
              "x2": Date.UTC( 2014, 11,  2 ),
              "y":  0,
              "partialFill": 0.25
            },
            {
              "x":  Date.UTC( 2014, 11, 2 ),
              "x2": Date.UTC( 2014, 11, 5 ),
              "y":  1
            },
            {
              "x":  Date.UTC( 2014, 11, 8 ),
              "x2": Date.UTC( 2014, 11, 9 ),
              "y":  2
            },
            {
              "x":  Date.UTC( 2014, 11,  9 ),
              "x2": Date.UTC( 2014, 11, 19 ),
              "y":  1
            },
            {
              "x":  Date.UTC( 2014, 11, 10),
              "x2": Date.UTC( 2014, 11, 23),
              "y":  2
            }
          ],
          "dataLabels": {
            "enabled": true
          }
        }
      ]
    }
  }

};