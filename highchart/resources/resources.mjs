/**
 * @overview data-based resources of ccmjs-based web component for a "Highchart.js" chart
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

export const line = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/series-label.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }
};

export const area = {
  settings: {
    chart: {
      type: 'area'
    },
    accessibility: {
      description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
      text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
      text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
        'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
        'armscontrol.org</a>'
    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        }
      },
      accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
      }
    },
    yAxis: {
      title: {
        text: 'Nuclear weapon states'
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + 'k';
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [{
      name: 'USA',
      data: [
        null, null, null, null, null, 6, 11, 32, 110, 235,
        369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
        20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
        26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
        21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
        10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
        5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
      ]
    }, {
      name: 'USSR/Russia',
      data: [null, null, null, null, null, null, null, null, null, null,
        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
        1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
        11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
        30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
        37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
        21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
        12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
      ]
    }]
  }
};

export const bar = {
  settings: {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Historic World Population by Region'
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' millions'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Year 1800',
      data: [107, 31, 635, 203, 2]
    }, {
      name: 'Year 1900',
      data: [133, 156, 947, 408, 6]
    }, {
      name: 'Year 2000',
      data: [814, 841, 3714, 727, 31]
    }, {
      name: 'Year 2016',
      data: [1216, 1001, 4436, 738, 40]
    }]
  }
};

export const column = {
  settings: {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Average Rainfall'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Tokyo',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }, {
      name: 'New York',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

    }, {
      name: 'London',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

    }, {
      name: 'Berlin',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

    }]
  }
};

export const pie = {
  settings: {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Sogou Explorer',
        y: 1.64
      }, {
        name: 'Opera',
        y: 1.6
      }, {
        name: 'QQ',
        y: 1.2
      }, {
        name: 'Other',
        y: 2.61
      }]
    }]
  }
};

export const semi_circle_donut = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Browser<br>shares<br>2017',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
        ['Chrome', 58.9],
        ['Firefox', 13.29],
        ['Internet Explorer', 13],
        ['Edge', 3.78],
        ['Safari', 3.42],
        {
          name: 'Other',
          y: 7.61,
          dataLabels: {
            enabled: false
          }
        }
      ]
    }]
  }
};

export const bubble = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts-more.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },

    legend: {
      enabled: false
    },

    title: {
      text: 'Sugar and fat intake per country'
    },

    subtitle: {
      text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
    },

    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
      }
    },

    xAxis: {
      gridLineWidth: 1,
      title: {
        text: 'Daily fat intake'
      },
      labels: {
        format: '{value} gr'
      },
      plotLines: [{
        color: 'black',
        dashStyle: 'dot',
        width: 2,
        value: 65,
        label: {
          rotation: 0,
          y: 15,
          style: {
            fontStyle: 'italic'
          },
          text: 'Safe fat intake 65g/day'
        },
        zIndex: 3
      }],
      accessibility: {
        rangeDescription: 'Range: 60 to 100 grams.'
      }
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Daily sugar intake'
      },
      labels: {
        format: '{value} gr'
      },
      maxPadding: 0.2,
      plotLines: [{
        color: 'black',
        dashStyle: 'dot',
        width: 2,
        value: 50,
        label: {
          align: 'right',
          style: {
            fontStyle: 'italic'
          },
          text: 'Safe sugar intake 50g/day',
          x: -10
        },
        zIndex: 3
      }],
      accessibility: {
        rangeDescription: 'Range: 0 to 160 grams.'
      }
    },

    tooltip: {
      useHTML: true,
      headerFormat: '<table>',
      pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
        '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
        '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
      footerFormat: '</table>',
      followPointer: true
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },

    series: [{
      data: [
        { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
        { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
        { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
        { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
        { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
        { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
        { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
        { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
        { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
        { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
        { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
        { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
        { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
        { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
        { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
      ]
    }]

  }
};

export const scatter = {
  settings: {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Height Versus Weight of 507 Individuals by Gender'
    },
    subtitle: {
      text: 'Source: Heinz  2003'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Height (cm)'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      title: {
        text: 'Weight (kg)'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      y: 70,
      floating: true,
      borderWidth: 1
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x} cm, {point.y} kg'
        }
      }
    },
    series: [{
      name: 'Female',
      color: 'rgba(223, 83, 83, .5)',
      data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
        [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
        [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
        [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
        [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
        [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
        [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
        [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
        [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
        [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
        [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
        [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
        [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
        [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
        [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
        [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
        [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
        [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
        [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
        [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
        [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
        [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
        [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
        [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
        [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
        [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
        [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
        [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
        [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
        [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
        [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
        [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
        [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
        [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
        [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
        [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
        [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
        [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
        [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
        [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
        [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
        [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
        [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
        [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
        [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
        [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
        [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
        [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
        [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
        [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
        [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
        [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

    }, {
      name: 'Male',
      color: 'rgba(119, 152, 191, .5)',
      data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
        [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
        [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
        [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
        [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
        [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
        [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
        [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
        [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
        [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
        [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
        [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
        [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
        [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
        [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
        [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
        [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
        [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
        [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
        [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
        [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
        [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
        [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
        [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
        [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
        [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
        [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
        [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
        [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
        [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
        [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
        [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
        [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
        [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
        [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
        [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
        [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
        [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
        [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
        [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
        [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
        [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
        [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
        [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
        [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
        [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
        [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
        [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
        [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
        [180.3, 83.2], [180.3, 83.2]]
    }]
  }
};

export const packedbubble = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts-more.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      type: 'packedbubble',
      height: '100%'
    },
    title: {
      text: 'Carbon emissions around the world (2014)'
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
      packedbubble: {
        minSize: '30%',
        maxSize: '120%',
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 250
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal'
          }
        }
      }
    },
    series: [{
      name: 'Europe',
      data: [{
        name: 'Germany',
        value: 767.1
      }, {
        name: 'Croatia',
        value: 20.7
      },
        {
          name: "Belgium",
          value: 97.2
        },
        {
          name: "Czech Republic",
          value: 111.7
        },
        {
          name: "Netherlands",
          value: 158.1
        },
        {
          name: "Spain",
          value: 241.6
        },
        {
          name: "Ukraine",
          value: 249.1
        },
        {
          name: "Poland",
          value: 298.1
        },
        {
          name: "France",
          value: 323.7
        },
        {
          name: "Romania",
          value: 78.3
        },
        {
          name: "United Kingdom",
          value: 415.4
        }, {
          name: "Turkey",
          value: 353.2
        }, {
          name: "Italy",
          value: 337.6
        },
        {
          name: "Greece",
          value: 71.1
        },
        {
          name: "Austria",
          value: 69.8
        },
        {
          name: "Belarus",
          value: 67.7
        },
        {
          name: "Serbia",
          value: 59.3
        },
        {
          name: "Finland",
          value: 54.8
        },
        {
          name: "Bulgaria",
          value: 51.2
        },
        {
          name: "Portugal",
          value: 48.3
        },
        {
          name: "Norway",
          value: 44.4
        },
        {
          name: "Sweden",
          value: 44.3
        },
        {
          name: "Hungary",
          value: 43.7
        },
        {
          name: "Switzerland",
          value: 40.2
        },
        {
          name: "Denmark",
          value: 40
        },
        {
          name: "Slovakia",
          value: 34.7
        },
        {
          name: "Ireland",
          value: 34.6
        },
        {
          name: "Croatia",
          value: 20.7
        },
        {
          name: "Estonia",
          value: 19.4
        },
        {
          name: "Slovenia",
          value: 16.7
        },
        {
          name: "Lithuania",
          value: 12.3
        },
        {
          name: "Luxembourg",
          value: 10.4
        },
        {
          name: "Macedonia",
          value: 9.5
        },
        {
          name: "Moldova",
          value: 7.8
        },
        {
          name: "Latvia",
          value: 7.5
        },
        {
          name: "Cyprus",
          value: 7.2
        }]
    }, {
      name: 'Africa',
      data: [{
        name: "Senegal",
        value: 8.2
      },
        {
          name: "Cameroon",
          value: 9.2
        },
        {
          name: "Zimbabwe",
          value: 13.1
        },
        {
          name: "Ghana",
          value: 14.1
        },
        {
          name: "Kenya",
          value: 14.1
        },
        {
          name: "Sudan",
          value: 17.3
        },
        {
          name: "Tunisia",
          value: 24.3
        },
        {
          name: "Angola",
          value: 25
        },
        {
          name: "Libya",
          value: 50.6
        },
        {
          name: "Ivory Coast",
          value: 7.3
        },
        {
          name: "Morocco",
          value: 60.7
        },
        {
          name: "Ethiopia",
          value: 8.9
        },
        {
          name: "United Republic of Tanzania",
          value: 9.1
        },
        {
          name: "Nigeria",
          value: 93.9
        },
        {
          name: "South Africa",
          value: 392.7
        }, {
          name: "Egypt",
          value: 225.1
        }, {
          name: "Algeria",
          value: 141.5
        }]
    }, {
      name: 'Oceania',
      data: [{
        name: "Australia",
        value: 409.4
      },
        {
          name: "New Zealand",
          value: 34.1
        },
        {
          name: "Papua New Guinea",
          value: 7.1
        }]
    }, {
      name: 'North America',
      data: [{
        name: "Costa Rica",
        value: 7.6
      },
        {
          name: "Honduras",
          value: 8.4
        },
        {
          name: "Jamaica",
          value: 8.3
        },
        {
          name: "Panama",
          value: 10.2
        },
        {
          name: "Guatemala",
          value: 12
        },
        {
          name: "Dominican Republic",
          value: 23.4
        },
        {
          name: "Cuba",
          value: 30.2
        },
        {
          name: "USA",
          value: 5334.5
        }, {
          name: "Canada",
          value: 566
        }, {
          name: "Mexico",
          value: 456.3
        }]
    }, {
      name: 'South America',
      data: [{
        name: "El Salvador",
        value: 7.2
      },
        {
          name: "Uruguay",
          value: 8.1
        },
        {
          name: "Bolivia",
          value: 17.8
        },
        {
          name: "Trinidad and Tobago",
          value: 34
        },
        {
          name: "Ecuador",
          value: 43
        },
        {
          name: "Chile",
          value: 78.6
        },
        {
          name: "Peru",
          value: 52
        },
        {
          name: "Colombia",
          value: 74.1
        },
        {
          name: "Brazil",
          value: 501.1
        }, {
          name: "Argentina",
          value: 199
        },
        {
          name: "Venezuela",
          value: 195.2
        }]
    }, {
      name: 'Asia',
      data: [{
        name: "Nepal",
        value: 6.5
      },
        {
          name: "Georgia",
          value: 6.5
        },
        {
          name: "Brunei Darussalam",
          value: 7.4
        },
        {
          name: "Kyrgyzstan",
          value: 7.4
        },
        {
          name: "Afghanistan",
          value: 7.9
        },
        {
          name: "Myanmar",
          value: 9.1
        },
        {
          name: "Mongolia",
          value: 14.7
        },
        {
          name: "Sri Lanka",
          value: 16.6
        },
        {
          name: "Bahrain",
          value: 20.5
        },
        {
          name: "Yemen",
          value: 22.6
        },
        {
          name: "Jordan",
          value: 22.3
        },
        {
          name: "Lebanon",
          value: 21.1
        },
        {
          name: "Azerbaijan",
          value: 31.7
        },
        {
          name: "Singapore",
          value: 47.8
        },
        {
          name: "Hong Kong",
          value: 49.9
        },
        {
          name: "Syria",
          value: 52.7
        },
        {
          name: "DPR Korea",
          value: 59.9
        },
        {
          name: "Israel",
          value: 64.8
        },
        {
          name: "Turkmenistan",
          value: 70.6
        },
        {
          name: "Oman",
          value: 74.3
        },
        {
          name: "Qatar",
          value: 88.8
        },
        {
          name: "Philippines",
          value: 96.9
        },
        {
          name: "Kuwait",
          value: 98.6
        },
        {
          name: "Uzbekistan",
          value: 122.6
        },
        {
          name: "Iraq",
          value: 139.9
        },
        {
          name: "Pakistan",
          value: 158.1
        },
        {
          name: "Vietnam",
          value: 190.2
        },
        {
          name: "United Arab Emirates",
          value: 201.1
        },
        {
          name: "Malaysia",
          value: 227.5
        },
        {
          name: "Kazakhstan",
          value: 236.2
        },
        {
          name: "Thailand",
          value: 272
        },
        {
          name: "Taiwan",
          value: 276.7
        },
        {
          name: "Indonesia",
          value: 453
        },
        {
          name: "Saudi Arabia",
          value: 494.8
        },
        {
          name: "Japan",
          value: 1278.9
        },
        {
          name: "China",
          value: 10540.8
        },
        {
          name: "India",
          value: 2341.9
        },
        {
          name: "Russia",
          value: 1766.4
        },
        {
          name: "Iran",
          value: 618.2
        },
        {
          name: "Korea",
          value: 610.1
        }]
    }]
  }
};

export const gauge = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts-more.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },

    title: {
      text: 'Speedometer'
    },

    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#FFF'],
            [1, '#333']
          ]
        },
        borderWidth: 0,
        outerRadius: '109%'
      }, {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#333'],
            [1, '#FFF']
          ]
        },
        borderWidth: 1,
        outerRadius: '107%'
      }, {
        // default background
      }, {
        backgroundColor: '#DDD',
        borderWidth: 0,
        outerRadius: '105%',
        innerRadius: '103%'
      }]
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 200,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: 'km/h'
      },
      plotBands: [{
        from: 0,
        to: 120,
        color: '#55BF3B' // green
      }, {
        from: 120,
        to: 160,
        color: '#DDDF0D' // yellow
      }, {
        from: 160,
        to: 200,
        color: '#DF5353' // red
      }]
    },

    series: [{
      name: 'Speed',
      data: [80],
      tooltip: {
        valueSuffix: ' km/h'
      }
    }]

  }
};

export const heatmap = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/heatmap.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: () => {

    function getPointCategoryName(point, dimension) {
      const series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
      return axis.categories[point[isY ? 'y' : 'x']];
    }

    return {

    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },


    title: {
      text: 'Sales per employee per weekday'
    },

    xAxis: {
      categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },

    yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      title: null,
      reversed: true
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, 'x'),
            yName = getPointCategoryName(point, 'y'),
            val = point.value;
          return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
        }
      }
    },

    colorAxis: {
      min: 0,
      minColor: '#FFFFFF'
    },

    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },

    tooltip: {
      formatter: function () {
        return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
          this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
      }
    },

    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          yAxis: {
            labels: {
              formatter: function () {
                return this.value.charAt(0);
              }
            }
          }
        }
      }]
    }

  };
  }
};

export const boxplot = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts-more.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    chart: {
      type: 'boxplot'
    },

    title: {
      text: 'Highcharts Box Plot Example'
    },

    legend: {
      enabled: false
    },

    xAxis: {
      categories: ['1', '2', '3', '4', '5'],
      title: {
        text: 'Experiment No.'
      }
    },

    yAxis: {
      title: {
        text: 'Observations'
      },
      plotLines: [{
        value: 932,
        color: 'red',
        width: 1,
        label: {
          text: 'Theoretical mean: 932',
          align: 'center',
          style: {
            color: 'gray'
          }
        }
      }]
    },

    series: [{
      name: 'Observations',
      data: [
        [760, 801, 848, 895, 965],
        [733, 853, 939, 980, 1080],
        [714, 762, 817, 870, 918],
        [724, 802, 806, 871, 950],
        [834, 836, 864, 882, 910]
      ],
      tooltip: {
        headerFormat: '<em>Experiment No {point.key}</em><br/>'
      }
    }, {
      name: 'Outliers',
      type: 'scatter',
      data: [ // x, y positions where 0 is the first category
        [0, 644],
        [4, 718],
        [4, 951],
        [4, 969]
      ],
      marker: {
        fillColor: 'white',
        lineWidth: 1
      },
      tooltip: {
        pointFormat: 'Observation: {point.y}'
      }
    }]

  }
};

export const wheel = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/sankey.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/dependency-wheel.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    title: {
      text: 'Highcharts Dependency Wheel'
    },

    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
      }
    },

    series: [{
      keys: ['from', 'to', 'weight'],
      data: [
        ['Brazil', 'Portugal', 5],
        ['Brazil', 'France', 1],
        ['Brazil', 'Spain', 1],
        ['Brazil', 'England', 1],
        ['Canada', 'Portugal', 1],
        ['Canada', 'France', 5],
        ['Canada', 'England', 1],
        ['Mexico', 'Portugal', 1],
        ['Mexico', 'France', 1],
        ['Mexico', 'Spain', 5],
        ['Mexico', 'England', 1],
        ['USA', 'Portugal', 1],
        ['USA', 'France', 1],
        ['USA', 'Spain', 1],
        ['USA', 'England', 5],
        ['Portugal', 'Angola', 2],
        ['Portugal', 'Senegal', 1],
        ['Portugal', 'Morocco', 1],
        ['Portugal', 'South Africa', 3],
        ['France', 'Angola', 1],
        ['France', 'Senegal', 3],
        ['France', 'Mali', 3],
        ['France', 'Morocco', 3],
        ['France', 'South Africa', 1],
        ['Spain', 'Senegal', 1],
        ['Spain', 'Morocco', 3],
        ['Spain', 'South Africa', 1],
        ['England', 'Angola', 1],
        ['England', 'Senegal', 1],
        ['England', 'Morocco', 2],
        ['England', 'South Africa', 7],
        ['South Africa', 'China', 5],
        ['South Africa', 'India', 1],
        ['South Africa', 'Japan', 3],
        ['Angola', 'China', 5],
        ['Angola', 'India', 1],
        ['Angola', 'Japan', 3],
        ['Senegal', 'China', 5],
        ['Senegal', 'India', 1],
        ['Senegal', 'Japan', 3],
        ['Mali', 'China', 5],
        ['Mali', 'India', 1],
        ['Mali', 'Japan', 3],
        ['Morocco', 'China', 5],
        ['Morocco', 'India', 1],
        ['Morocco', 'Japan', 3],
        ['Japan', 'Brazil', 1]
      ],
      type: 'dependencywheel',
      name: 'Dependency wheel series',
      dataLabels: {
        color: '#333',
        textPath: {
          enabled: true,
          attributes: {
            dy: 5
          }
        },
        distance: 10
      },
      size: '95%'
    }]

  }
};

export const drawing = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      backgroundColor: 'white',
      events: {
        load: function () {

          // Draw the flow chart
          var ren = this.renderer,
            colors = Highcharts.getOptions().colors,
            rightArrow = ['M', 0, 0, 'L', 100, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
            leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];


          // Separator, client from service
          ren.path(['M', 120, 40, 'L', 120, 330])
            .attr({
              'stroke-width': 2,
              stroke: 'silver',
              dashstyle: 'dash'
            })
            .add();

          // Separator, CLI from service
          ren.path(['M', 420, 40, 'L', 420, 330])
            .attr({
              'stroke-width': 2,
              stroke: 'silver',
              dashstyle: 'dash'
            })
            .add();

          // Headers
          ren.label('Web client', 20, 40)
            .css({
              fontWeight: 'bold'
            })
            .add();
          ren.label('Web service / CLI', 220, 40)
            .css({
              fontWeight: 'bold'
            })
            .add();
          ren.label('Command line client', 440, 40)
            .css({
              fontWeight: 'bold'
            })
            .add();

          // SaaS client label
          ren.label('SaaS client<br/>(browser or<br/>script)', 10, 82)
            .attr({
              fill: colors[0],
              stroke: 'white',
              'stroke-width': 2,
              padding: 5,
              r: 5
            })
            .css({
              color: 'white'
            })
            .add()
            .shadow(true);

          // Arrow from SaaS client to Phantom JS
          ren.path(rightArrow)
            .attr({
              'stroke-width': 2,
              stroke: colors[3]
            })
            .translate(95, 95)
            .add();

          ren.label('POST options in JSON', 90, 75)
            .css({
              fontSize: '10px',
              color: colors[3]
            })
            .add();

          ren.label('PhantomJS', 210, 82)
            .attr({
              r: 5,
              width: 100,
              fill: colors[1]
            })
            .css({
              color: 'white',
              fontWeight: 'bold'
            })
            .add();

          // Arrow from Phantom JS to Batik
          ren.path(['M', 250, 110, 'L', 250, 185, 'L', 245, 180, 'M', 250, 185, 'L', 255, 180])
            .attr({
              'stroke-width': 2,
              stroke: colors[3]
            })
            .add();

          ren.label('SVG', 255, 120)
            .css({
              color: colors[3],
              fontSize: '10px'
            })
            .add();

          ren.label('Batik', 210, 200)
            .attr({
              r: 5,
              width: 100,
              fill: colors[1]
            })
            .css({
              color: 'white',
              fontWeight: 'bold'
            })
            .add();

          // Arrow from Batik to SaaS client
          ren
            .path([
              'M', 235, 185,
              'L', 235, 155,
              'C', 235, 130, 235, 130, 215, 130,
              'L', 95, 130,
              'L', 100, 125,
              'M', 95, 130,
              'L', 100, 135
            ])
            .attr({
              'stroke-width': 2,
              stroke: colors[3]
            })
            .add();

          ren.label('Rasterized image', 100, 110)
            .css({
              color: colors[3],
              fontSize: '10px'
            })
            .add();

          // Browser label
          ren.label('Browser<br/>running<br/>Highcharts', 10, 180)
            .attr({
              fill: colors[0],
              stroke: 'white',
              'stroke-width': 2,
              padding: 5,
              r: 5
            })
            .css({
              color: 'white',
              width: '100px'
            })
            .add()
            .shadow(true);


          // Arrow from Browser to Batik
          ren.path(rightArrow)
            .attr({
              'stroke-width': 2,
              stroke: colors[1]
            })
            .translate(95, 205)
            .add();

          ren.label('POST SVG', 110, 185)
            .css({
              color: colors[1],
              fontSize: '10px'
            })
            .add();

          // Arrow from Batik to Browser
          ren.path(leftArrow)
            .attr({
              'stroke-width': 2,
              stroke: colors[1]
            })
            .translate(95, 215)
            .add();

          ren.label('Rasterized image', 100, 215)
            .css({
              color: colors[1],
              fontSize: '10px'
            })
            .add();

          // Script label
          ren.label('Script', 450, 82)
            .attr({
              fill: colors[2],
              stroke: 'white',
              'stroke-width': 2,
              padding: 5,
              r: 5
            })
            .css({
              color: 'white',
              width: '100px'
            })
            .add()
            .shadow(true);

          // Arrow from Script to PhantomJS
          ren.path(leftArrow)
            .attr({
              'stroke-width': 2,
              stroke: colors[2]
            })
            .translate(330, 90)
            .add();

          ren.label('Command', 340, 70)
            .css({
              color: colors[2],
              fontSize: '10px'
            })
            .add();

          // Arrow from PhantomJS to Script
          ren.path(rightArrow)
            .attr({
              'stroke-width': 2,
              stroke: colors[2]
            })
            .translate(330, 100)
            .add();

          ren.label('Rasterized image', 330, 100)
            .css({
              color: colors[2],
              fontSize: '10px'
            })
            .add();


        }
      }
    },
    title: {
      text: 'Highcharts export server overview',
      style: {
        color: 'black'
      }
    },
    accessibility: {
      typeDescription: 'Flowchart'
    }

  }
};

export const network = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/networkgraph.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      type: 'networkgraph',
      height: '100%'
    },
    title: {
      text: 'The Indo-European Language Tree'
    },
    subtitle: {
      text: 'A Force-Directed Network Graph in Highcharts'
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9
        }
      }
    },
    series: [{
      accessibility: {
        enabled: false
      },
      dataLabels: {
        enabled: true,
        linkFormat: ''
      },
      id: 'lang-tree',
      data: [
        ['Proto Indo-European', 'Balto-Slavic'],
        ['Proto Indo-European', 'Germanic'],
        ['Proto Indo-European', 'Celtic'],
        ['Proto Indo-European', 'Italic'],
        ['Proto Indo-European', 'Hellenic'],
        ['Proto Indo-European', 'Anatolian'],
        ['Proto Indo-European', 'Indo-Iranian'],
        ['Proto Indo-European', 'Tocharian'],
        ['Indo-Iranian', 'Dardic'],
        ['Indo-Iranian', 'Indic'],
        ['Indo-Iranian', 'Iranian'],
        ['Iranian', 'Old Persian'],
        ['Old Persian', 'Middle Persian'],
        ['Indic', 'Sanskrit'],
        ['Italic', 'Osco-Umbrian'],
        ['Italic', 'Latino-Faliscan'],
        ['Latino-Faliscan', 'Latin'],
        ['Celtic', 'Brythonic'],
        ['Celtic', 'Goidelic'],
        ['Germanic', 'North Germanic'],
        ['Germanic', 'West Germanic'],
        ['Germanic', 'East Germanic'],
        ['North Germanic', 'Old Norse'],
        ['North Germanic', 'Old Swedish'],
        ['North Germanic', 'Old Danish'],
        ['West Germanic', 'Old English'],
        ['West Germanic', 'Old Frisian'],
        ['West Germanic', 'Old Dutch'],
        ['West Germanic', 'Old Low German'],
        ['West Germanic', 'Old High German'],
        ['Old Norse', 'Old Icelandic'],
        ['Old Norse', 'Old Norwegian'],
        ['Old Norwegian', 'Middle Norwegian'],
        ['Old Swedish', 'Middle Swedish'],
        ['Old Danish', 'Middle Danish'],
        ['Old English', 'Middle English'],
        ['Old Dutch', 'Middle Dutch'],
        ['Old Low German', 'Middle Low German'],
        ['Old High German', 'Middle High German'],
        ['Balto-Slavic', 'Baltic'],
        ['Balto-Slavic', 'Slavic'],
        ['Slavic', 'East Slavic'],
        ['Slavic', 'West Slavic'],
        ['Slavic', 'South Slavic'],
        // Leaves:
        ['Proto Indo-European', 'Phrygian'],
        ['Proto Indo-European', 'Armenian'],
        ['Proto Indo-European', 'Albanian'],
        ['Proto Indo-European', 'Thracian'],
        ['Tocharian', 'Tocharian A'],
        ['Tocharian', 'Tocharian B'],
        ['Anatolian', 'Hittite'],
        ['Anatolian', 'Palaic'],
        ['Anatolian', 'Luwic'],
        ['Anatolian', 'Lydian'],
        ['Iranian', 'Balochi'],
        ['Iranian', 'Kurdish'],
        ['Iranian', 'Pashto'],
        ['Iranian', 'Sogdian'],
        ['Old Persian', 'Pahlavi'],
        ['Middle Persian', 'Persian'],
        ['Hellenic', 'Greek'],
        ['Dardic', 'Dard'],
        ['Sanskrit', 'Sindhi'],
        ['Sanskrit', 'Romani'],
        ['Sanskrit', 'Urdu'],
        ['Sanskrit', 'Hindi'],
        ['Sanskrit', 'Bihari'],
        ['Sanskrit', 'Assamese'],
        ['Sanskrit', 'Bengali'],
        ['Sanskrit', 'Marathi'],
        ['Sanskrit', 'Gujarati'],
        ['Sanskrit', 'Punjabi'],
        ['Sanskrit', 'Sinhalese'],
        ['Osco-Umbrian', 'Umbrian'],
        ['Osco-Umbrian', 'Oscan'],
        ['Latino-Faliscan', 'Faliscan'],
        ['Latin', 'Portugese'],
        ['Latin', 'Spanish'],
        ['Latin', 'French'],
        ['Latin', 'Romanian'],
        ['Latin', 'Italian'],
        ['Latin', 'Catalan'],
        ['Latin', 'Franco-Provençal'],
        ['Latin', 'Rhaeto-Romance'],
        ['Brythonic', 'Welsh'],
        ['Brythonic', 'Breton'],
        ['Brythonic', 'Cornish'],
        ['Brythonic', 'Cuymbric'],
        ['Goidelic', 'Modern Irish'],
        ['Goidelic', 'Scottish Gaelic'],
        ['Goidelic', 'Manx'],
        ['East Germanic', 'Gothic'],
        ['Middle Low German', 'Low German'],
        ['Middle High German', '(High) German'],
        ['Middle High German', 'Yiddish'],
        ['Middle English', 'English'],
        ['Middle Dutch', 'Hollandic'],
        ['Middle Dutch', 'Flemish'],
        ['Middle Dutch', 'Dutch'],
        ['Middle Dutch', 'Limburgish'],
        ['Middle Dutch', 'Brabantian'],
        ['Middle Dutch', 'Rhinelandic'],
        ['Old Frisian', 'Frisian'],
        ['Middle Danish', 'Danish'],
        ['Middle Swedish', 'Swedish'],
        ['Middle Norwegian', 'Norwegian'],
        ['Old Norse', 'Faroese'],
        ['Old Icelandic', 'Icelandic'],
        ['Baltic', 'Old Prussian'],
        ['Baltic', 'Lithuanian'],
        ['Baltic', 'Latvian'],
        ['West Slavic', 'Polish'],
        ['West Slavic', 'Slovak'],
        ['West Slavic', 'Czech'],
        ['West Slavic', 'Wendish'],
        ['East Slavic', 'Bulgarian'],
        ['East Slavic', 'Old Church Slavonic'],
        ['East Slavic', 'Macedonian'],
        ['East Slavic', 'Serbo-Croatian'],
        ['East Slavic', 'Slovene'],
        ['South Slavic', 'Russian'],
        ['South Slavic', 'Ukrainian'],
        ['South Slavic', 'Belarusian'],
        ['South Slavic', 'Rusyn']
      ]
    }]
  }
};

export const organization = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/sankey.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/organization.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      height: 600,
      inverted: true
    },

    title: {
      text: 'Highcharts Org Chart'
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var nodeName = point.toNode.name,
            nodeId = point.toNode.id,
            nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
            parentDesc = point.fromNode.id;
          return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
        }
      }
    },

    series: [{
      type: 'organization',
      name: 'Highsoft',
      keys: ['from', 'to'],
      data: [
        ['Shareholders', 'Board'],
        ['Board', 'CEO'],
        ['CEO', 'CTO'],
        ['CEO', 'CPO'],
        ['CEO', 'CSO'],
        ['CEO', 'HR'],
        ['CTO', 'Product'],
        ['CTO', 'Web'],
        ['CSO', 'Sales'],
        ['HR', 'Market'],
        ['CSO', 'Market'],
        ['HR', 'Market'],
        ['CTO', 'Market']
      ],
      levels: [{
        level: 0,
        color: 'silver',
        dataLabels: {
          color: 'black'
        },
        height: 25
      }, {
        level: 1,
        color: 'silver',
        dataLabels: {
          color: 'black'
        },
        height: 25
      }, {
        level: 2,
        color: '#980104'
      }, {
        level: 4,
        color: '#359154'
      }],
      nodes: [{
        id: 'Shareholders'
      }, {
        id: 'Board'
      }, {
        id: 'CEO',
        title: 'CEO',
        name: 'Grethe Hjetland',
        image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131126/Highsoft_03862_.jpg'
      }, {
        id: 'HR',
        title: 'HR/CFO',
        name: 'Anne Jorunn Fjærestad',
        color: '#007ad0',
        image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'
      }, {
        id: 'CTO',
        title: 'CTO',
        name: 'Christer Vasseng',
        image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
      }, {
        id: 'CPO',
        title: 'CPO',
        name: 'Torstein Hønsi',
        image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
      }, {
        id: 'CSO',
        title: 'CSO',
        name: 'Anita Nesse',
        image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg'
      }, {
        id: 'Product',
        name: 'Product developers'
      }, {
        id: 'Web',
        name: 'Web devs, sys admin'
      }, {
        id: 'Sales',
        name: 'Sales team'
      }, {
        id: 'Market',
        name: 'Marketing team',
        column: 5
      }],
      colorByPoint: false,
      color: '#007ad0',
      dataLabels: {
        color: 'white'
      },
      borderColor: 'white',
      nodeWidth: 65
    }],
    tooltip: {
      outside: true
    },
    exporting: {
      allowHTML: true,
      sourceWidth: 800,
      sourceHeight: 600
    }

  }
};

export const pyramid = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/funnel.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      type: 'pyramid'
    },
    title: {
      text: 'Sales pyramid',
      x: -50
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          softConnector: true
        },
        center: ['40%', '50%'],
        width: '80%'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Unique users',
      data: [
        ['Website visits',      15654],
        ['Downloads',            4064],
        ['Requested price list', 1987],
        ['Invoice sent',          976],
        ['Finalized',             846]
      ]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            series: {
              dataLabels: {
                inside: true
              },
              center: ['50%', '50%'],
              width: '100%'
            }
          }
        }
      }]
    }
  }
};

export const spiderweb = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts-more.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {

    chart: {
      polar: true,
      type: 'line'
    },

    accessibility: {
      description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
      text: 'Budget vs spending',
      x: -80
    },

    pane: {
      size: '80%'
    },

    xAxis: {
      categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
        'Information Technology', 'Administration'],
      tickmarkPlacement: 'on',
      lineWidth: 0
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
    },

    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },

    series: [{
      name: 'Allocated Budget',
      data: [43000, 19000, 60000, 35000, 17000, 10000],
      pointPlacement: 'on'
    }, {
      name: 'Actual Spending',
      data: [50000, 39000, 42000, 31000, 26000, 14000],
      pointPlacement: 'on'
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          pane: {
            size: '70%'
          }
        }
      }]
    }

  }
};

export const timeline = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/timeline.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      type: 'timeline'
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h5>{chartTitle}</h5>' +
          '<div>{typeDescription}</div>' +
          '<div>{chartSubtitle}</div>' +
          '<div>{chartLongdesc}</div>' +
          '<div>{viewTableButton}</div>'
      },
      point: {
        valueDescriptionFormat: '{index}. {point.label}. {point.description}.'
      }
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    title: {
      text: 'Timeline of Space Exploration'
    },
    subtitle: {
      text: 'Info source: <a href="https://en.wikipedia.org/wiki/Timeline_of_space_exploration">www.wikipedia.org</a>'
    },
    colors: [
      '#4185F3',
      '#427CDD',
      '#406AB2',
      '#3E5A8E',
      '#3B4A68',
      '#363C46'
    ],
    series: [{
      data: [{
        name: 'First dogs',
        label: '1951: First dogs in space',
        description: '22 July 1951 First dogs in space (Dezik and Tsygan) '
      }, {
        name: 'Sputnik 1',
        label: '1957: First artificial satellite',
        description: '4 October 1957 First artificial satellite. First signals from space.'
      }, {
        name: 'First human spaceflight',
        label: '1961: First human spaceflight (Yuri Gagarin)',
        description: 'First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight'
      }, {
        name: 'First human on the Moon',
        label: '1969: First human on the Moon',
        description: 'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon'
      }, {
        name: 'First space station',
        label: '1971: First space station',
        description: 'Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971.'
      }, {
        name: 'Apollo–Soyuz Test Project',
        label: '1975: First multinational manned mission',
        description: 'The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station.'
      }]
    }]
  }
};

export const wordcloud = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/wordcloud.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/export-data.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.',
      lines = text.split(/[,\. ]+/g),
      data = lines.reduce((arr, word) => {
        let obj = Highcharts.find(arr, obj => obj.name === word);
        if (obj) {
          obj.weight += 1;
        } else {
          obj = {
            name: word,
            weight: 1
          };
          arr.push(obj);
        }
        return arr;
      }, []);

    return {
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h5>{chartTitle}</h5>' +
          '<div>{chartSubtitle}</div>' +
          '<div>{chartLongdesc}</div>' +
          '<div>{viewTableButton}</div>'
      }
    },
    series: [{
      type: 'wordcloud',
      data,
      name: 'Occurrences'
    }],
    title: {
      text: 'Wordcloud of Lorem Ipsum'
    }
  };
  }
};

export const xrange = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/highcharts.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/xrange.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: {
    chart: {
      type: 'xrange'
    },
    title: {
      text: 'Highcharts X-range'
    },
    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var ix = point.index + 1,
            category = point.yCategory,
            from = new Date(point.x),
            to = new Date(point.x2);
          return ix + '. ' + category + ', ' + from.toDateString() +
            ' to ' + to.toDateString() + '.';
        }
      }
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: ''
      },
      categories: ['Prototyping', 'Development', 'Testing'],
      reversed: true
    },
    series: [{
      name: 'Project 1',
      // pointPadding: 0,
      // groupPadding: 0,
      borderColor: 'gray',
      pointWidth: 20,
      data: [{
        x: Date.UTC(2014, 10, 21),
        x2: Date.UTC(2014, 11, 2),
        y: 0,
        partialFill: 0.25
      }, {
        x: Date.UTC(2014, 11, 2),
        x2: Date.UTC(2014, 11, 5),
        y: 1
      }, {
        x: Date.UTC(2014, 11, 8),
        x2: Date.UTC(2014, 11, 9),
        y: 2
      }, {
        x: Date.UTC(2014, 11, 9),
        x2: Date.UTC(2014, 11, 19),
        y: 1
      }, {
        x: Date.UTC(2014, 11, 10),
        x2: Date.UTC(2014, 11, 23),
        y: 2
      }],
      dataLabels: {
        enabled: true
      }
    }]

  }
};

export const gantt = {
  libs: [
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/gantt/highcharts-gantt.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/exporting.js',
    'https://ccmjs.github.io/akless-components/libs/highcharts-10/accessibility.js'
  ],
  settings: () => {

    let today = new Date(),
    day = 1000 * 60 * 60 * 24,
    // Utility functions
    dateFormat = Highcharts.dateFormat,
    defined = Highcharts.defined,
    isObject = Highcharts.isObject;

    // Set to 00:00:00:000 today
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
    today = today.getTime();

    return {
    series: [{
      name: 'Offices',
      data: [{
        name: 'New offices',
        id: 'new_offices',
        owner: 'Peter'
      }, {
        name: 'Prepare office building',
        id: 'prepare_building',
        parent: 'new_offices',
        start: today - (2 * day),
        end: today + (6 * day),
        completed: {
          amount: 0.2
        },
        owner: 'Linda'
      }, {
        name: 'Inspect building',
        id: 'inspect_building',
        dependency: 'prepare_building',
        parent: 'new_offices',
        start: today + 6 * day,
        end: today + 8 * day,
        owner: 'Ivy'
      }, {
        name: 'Passed inspection',
        id: 'passed_inspection',
        dependency: 'inspect_building',
        parent: 'new_offices',
        start: today + 9.5 * day,
        milestone: true,
        owner: 'Peter'
      }, {
        name: 'Relocate',
        id: 'relocate',
        dependency: 'passed_inspection',
        parent: 'new_offices',
        owner: 'Josh'
      }, {
        name: 'Relocate staff',
        id: 'relocate_staff',
        parent: 'relocate',
        start: today + 10 * day,
        end: today + 11 * day,
        owner: 'Mark'
      }, {
        name: 'Relocate test facility',
        dependency: 'relocate_staff',
        parent: 'relocate',
        start: today + 11 * day,
        end: today + 13 * day,
        owner: 'Anne'
      }, {
        name: 'Relocate cantina',
        dependency: 'relocate_staff',
        parent: 'relocate',
        start: today + 11 * day,
        end: today + 14 * day
      }]
    }, {
      name: 'Product',
      data: [{
        name: 'New product launch',
        id: 'new_product',
        owner: 'Peter'
      }, {
        name: 'Development',
        id: 'development',
        parent: 'new_product',
        start: today - day,
        end: today + (11 * day),
        completed: {
          amount: 0.6,
          fill: '#e80'
        },
        owner: 'Susan'
      }, {
        name: 'Beta',
        id: 'beta',
        dependency: 'development',
        parent: 'new_product',
        start: today + 12.5 * day,
        milestone: true,
        owner: 'Peter'
      }, {
        name: 'Final development',
        id: 'finalize',
        dependency: 'beta',
        parent: 'new_product',
        start: today + 13 * day,
        end: today + 17 * day
      }, {
        name: 'Launch',
        dependency: 'finalize',
        parent: 'new_product',
        start: today + 17.5 * day,
        milestone: true,
        owner: 'Peter'
      }]
    }],
    tooltip: {
      pointFormatter: function () {
        var point = this,
          format = '%e. %b',
          options = point.options,
          completed = options.completed,
          amount = isObject(completed) ? completed.amount : completed,
          status = ((amount || 0) * 100) + '%',
          lines;

        lines = [{
          value: point.name,
          style: 'font-weight: bold;'
        }, {
          title: 'Start',
          value: dateFormat(format, point.start)
        }, {
          visible: !options.milestone,
          title: 'End',
          value: dateFormat(format, point.end)
        }, {
          title: 'Completed',
          value: status
        }, {
          title: 'Owner',
          value: options.owner || 'unassigned'
        }];

        return lines.reduce(function (str, line) {
          var s = '',
            style = (
              defined(line.style) ? line.style : 'font-size: 0.8em;'
            );
          if (line.visible !== false) {
            s = (
              '<span style="' + style + '">' +
              (defined(line.title) ? line.title + ': ' : '') +
              (defined(line.value) ? line.value : '') +
              '</span><br/>'
            );
          }
          return str + s;
        }, '');
      }
    },
    title: {
      text: 'Gantt Project Management'
    },
    xAxis: {
      currentDateIndicator: true,
      min: today - 3 * day,
      max: today + 18 * day
    },
    accessibility: {
      keyboardNavigation: {
        seriesNavigation: {
          mode: 'serialize'
        }
      },
      point: {
        descriptionFormatter: function (point) {
          var completedValue = point.completed ?
              point.completed.amount || point.completed : null,
            completed = completedValue ?
              ' Task ' + Math.round(completedValue * 1000) / 10 + '% completed.' :
              '',
            dependency = point.dependency &&
              point.series.chart.get(point.dependency).name,
            dependsOn = dependency ? ' Depends on ' + dependency + '.' : '';

          return Highcharts.format(
            point.milestone ?
              '{point.yCategory}. Milestone at {point.x:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}' :
              '{point.yCategory}.{completed} Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}. Owner: {point.owner}.{dependsOn}',
            { point, completed, dependsOn }
          );
        }
      }
    },
    lang: {
      accessibility: {
        axis: {
          xAxisDescriptionPlural: 'The chart has a two-part X axis showing time in both week numbers and days.'
        }
      }
    }
  };
  }
};
