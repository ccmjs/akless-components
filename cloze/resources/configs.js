/**
 * @overview configurations of ccm component for rendering a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "css": [ "ccm.load", "../cloze/resources/default.css" ],
    "feedback": true,
    "time": 300,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "captions.finish": "Restart",
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "restart": true }
  },
  "localhost": {
    "css": [ "ccm.load", "../cloze/resources/default.css" ],
    "feedback": true,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "solutions": true,
    "captions.finish": "Save and Restart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js", { "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "local" ], "realm": "guest", "guest": "studentC" } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onfinish": {
      "log": true,
      "login": true,
      "store": {
        "settings": {
          "url": "http://localhost:8080",
          "method": "POST",
          "store": "cloze_results"
        },
        "key": "demo",
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
      "alert": "Saved!",
      "restart": true
    }
  },
  "demo": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/pbworks.css", { "context": "head", "url": "https://fonts.googleapis.com/css?family=Montserrat:200", "type": "css" } ],
    "feedback": true,
    "time": 300,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "captions.finish": "Restart",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "restart": true }
  },
  "lea": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/lea.css" ],
    "feedback": true,
    "time": 300,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
    "blank": true,
    "retry": true,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "lea" ] ],
    "onfinish": {
      "log": true,
      "login": true,
      "store": {
        "settings": {
          "url": "https://ccm-data.bib.h-brs.de",
          "method": "POST",
          "store": "cloze_demo_results"
        },
        "user": true,
        "permissions": {
          "realm": "LEA",
          "access": {
            "get": "all",
            "set": "creator",
            "del": "creator"
          }
        }
      },
      "alert": "Saved!",
      "restart": true
    }
  }
};