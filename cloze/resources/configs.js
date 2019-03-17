/**
 * @overview configurations of ccm component for rendering a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "css": [ "ccm.load", "../cloze/resources/default.css" ],
    "feedback": true,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "captions.finish": "Restart",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "restart": true }
  },

  "localhost": {
    "key": "localhost",
    "css": [ "ccm.load", "../cloze/resources/default.css" ],
    "feedback": true,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "solutions": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "../user/ccm.user.js", [ "ccm.get", "../user/resources/configs.js", "guest" ] ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "store": {
        "settings": {
          "url": "http://localhost:8080",
          "method": "POST",
          "store": "cloze_results"
        },
        "key": "localhost",
        "user": true,
        "unique": true,
        "permissions": {
          "creator": "teacher",
          "realm": "guest",
          "group": [ "%user%" ],
          "access": {
            "get": "group",
            "set": "creator",
            "del": "creator"
          }
        }
      },
      "alert": "Saved!",
      "restart": true
    }
  },

  "demo": {
    "key": "demo",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "feedback": true,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true
  },

  "demo_old": {
    "key": "demo_old",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "cloze_results", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
      "key": "demo"
    },
    "feedback": true,
    "time": 300,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "captions.finish": "Save and Restart",
    "onfinish": {
      "store": {
        "settings": {
          "url": "https://ccm2.inf.h-brs.de",
          "method": "POST",
          "store": "cloze_results"
        },
        "key": "demo"
      },
      "alert": "Saved!",
      "restart": true
    }
  },

  "lea": {
    "key": "lea",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/lea.css" ],
    "data": {
      "store": [ "ccm.store", { "store": "cloze_results", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
      "key": "demo",
      "user": true
    },
    "feedback": true,
    "time": 300,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "lea" ] ],
    "onfinish": {
      "log": true,
      "login": true,
      "store": {
        "settings": {
          "url": "https://ccm2.inf.h-brs.de",
          "method": "POST",
          "store": "cloze_results"
        },
        "key": "demo",
        "user": true,
        "permissions": {
          "creator": "teacher",
          "realm": "LEA",
          "group": [ "%user%" ],
          "access": {
            "get": "group",
            "set": "group",
            "del": "creator"
          }
        }
      },
      "alert": "Saved!",
      "restart": true
    }
  },

  "demo1": {
    "key": "demo1",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo1",
      "login": true,
      "user": true,
      "permissions": {
        "creator": "teacher",
        "realm": "guest",
        "group": [ "%user%" ],
        "access": {
          "get": "group",
          "set": "group",
          "del": "creator"
        }
      }
    },
    "keywords": true,
    "feedback": true,
    "blank": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
    "retry": true,
    "onfinish": {
      "store": true,
      "alert": "Saved!",
      "restart": true
    },
    "text": "<h2><strong style=\"color: rgb(0, 0, 0);\">Fill in the correct words from the box above.</strong></h2><p><span style=\"color: rgb(0, 0, 0);\">The practice of starting new organizations, particularly new businesses, generally in response to identified opportunities. → *entrepreneurship* </span></p><p><span style=\"color: rgb(0, 0, 0);\">A person who owns and operates a business enterprise, and who takes all the risks involved in the operation of the business. → *entrepreneur* </span></p><p><span style=\"color: rgb(0, 0, 0);\">A business venture or activity that provides customers with a product (goods/ service= with a view to making a profit). → *enterprise*</span></p><p><span style=\"color: rgb(0, 0, 0);\">To start or set-up a new organization, institution or company. → *to found*</span></p><p><span style=\"color: rgb(0, 0, 0);\">This is an independently owned and operated enterprise which is not dominant in its field of operations. The standards are determined by the number of employees, the start-up investment or the turnover. → *small business*</span></p><p><span style=\"color: rgb(0, 0, 0);\">The process of planning, organizing, leading, coordinating and controlling resources to produce goods and services to satisfy customer needs. → *business management*</span></p><p><span style=\"color: rgb(0, 0, 0);\">Is defined as an enterprise, commercial entity, or firm in either private or public sector, concerned with providing products (goods or services) to satisfy customer requirements. → *business*</span></p><p><span style=\"color: rgb(0, 0, 0);\">A newly founded enterprise. → *start-up business/start-up company*</span></p><p><span style=\"color: rgb(0, 0, 0);\">An intangible good. → *service*</span></p><p><span style=\"color: rgb(0, 0, 0);\">A business undertaking involving risk. → *business venture* </span></p>"
  },

  "demo2": {
    "key": "demo2",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo2",
      "login": true,
      "user": true,
      "unique": true,
      "permissions": {
        "creator": "teacher",
        "realm": "guest",
        "group": [ "%user%" ],
        "access": {
          "get": "group",
          "set": "group",
          "del": "creator"
        }
      }
    },
    "keywords": true,
    "feedback": true,
    "retry": false,
    "blank": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
    "onfinish": {
      "store": true,
      "alert": "Saved!",
      "restart": true
    },
    "text": "<h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Fill in the correct words from the box above.</strong></h2><ol><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Waste of a product used again for other purposes. → *to reuse*</span></li><li><em style=\"color: rgb(0, 0, 0); background-color: transparent;\">to</em><span style=\"color: rgb(0, 0, 0); background-color: transparent;\"> give something to a charity or a person for a good cause. → *to donate*</span></li><li><em style=\"color: rgb(0, 0, 0); background-color: transparent;\">to </em><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">take food scraps for a natural fertilizer. → *to compost*</span></li><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Using parts of a product after its processing. → *to recycle*</span></li><li><em style=\"color: rgb(0, 0, 0); background-color: transparent;\">to </em><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">connect → *to plug into*</span></li><li><em style=\"color: rgb(0, 0, 0); background-color: transparent;\"><span class=\"ql-cursor\">\ufeff\ufeff</span>to </em><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">use jointly → *to share*</span></li><li><em style=\"color: rgb(0, 0, 0); background-color: transparent;\">to </em><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">remove by force → *to extract*</span></li></ol>"
  },

  "demo3": {
    "key": "demo3",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo3",
      "login": true,
      "user": true,
      "permissions": {
        "creator": "teacher",
        "realm": "guest",
        "group": [ "%user%" ],
        "access": {
          "get": "group",
          "set": "group",
          "del": "creator"
        }
      }
    },
    "keywords": true,
    "feedback": true,
    "retry": false,
    "solutions": true,
    "blank": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "pseudo" ] ],
    "onfinish": {
      "store": true,
      "alert": "Saved!",
      "restart": true
    },
    "text": "<h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Editing skills: Read the following paragraph divided into different lines. Fill in the correct prepositions.</strong></h2><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">\ufeff\ufeff\ufeffRecycling and Reuse</strong></p><ol><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Recycling refers *to* recovery of useful materials such as</span></li><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">glass, paper, plastics, wood *and* metals from the</span></li><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">waste stream so they may be incorporated *into* the fabrication of new products.</span></li><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">with greater incorporation *of* recycled materials, the required use of raw materials</span></li><li><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">*for* identical applications is reduced</span></li></ol>"
  }

};