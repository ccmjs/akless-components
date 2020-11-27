/**
 * @overview data-based resources of ccm component for fill-in-the-blank texts
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "blank": false,
    "css": [ "ccm.load", "./../cloze/resources/default.css" ],
    "data": {
      "store": [ "ccm.store", { "name": "cloze_results", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "feedback": true,
    "helper.1": "./../modules/helper.mjs",
    "html.1": "./../cloze/resources/templates.mjs",
    "keywords": true,
//  "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
//  "logger": [ "ccm.instance", "./../log/ccm.log.js", [ "ccm.get", "./../log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "restart": true, "alert": 'Finish!' },
//  "onreset": false,
    "progress_bar": true,
    "retry": true,
//  "start_button": true,
    "text": "<ol><li>To stay competitive companies must *evalu(ate)* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>",
//  "time": 10
  },

  "demo": {
    "blank": true,
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/cloze/resources/default.css" ],
    "feedback": true,
    "keywords": [ "convenience", "conducting", "objectives", "durable", "competitive", "breakdown", "reasons", "evaluate", "adding", "breakthroughs", "withdraw", "patterns", "non-durable", "deleting", "feasible", "making", "sources", "niche" ],
    "progress_bar": true,
    "retry": true,
    "text": "<ol><li>To stay competitive companies must *evaluate* their existing product line and make decisions about *deleting* or *adding* new products.</li><li>Innovation can have different *sources* e.g. “Discontinuous” innovation, which can change existing consumption *patterns*.</li><li>Innovations are of extreme importance for organizations; some innovations are caused by technical *breakthroughs*.</li><li>In order to be successful companies may need to look for a market *niche*.</li><li> It is assumed that *durable* goods last more than one year. *Non-durable*  goods are tangible but provide benefits only for a short period of time. *convenience* products are goods that consumers buy frequently like soft drinks, newspapers etc.</li><li>A business model identifies such things as *competitive* advantage, and how to become profitable. Some business models may not be *feasible* any longer.</li><li>One way to evaluate a product is by *conducting* a discrimination test.</li><li>When a product fails i.e. it does not meet the *objectives* that were set by the organization, the company may be forced to *withdraw* it from the market, as was the case with Walmart in Germany.</li></ol>"
  }

};