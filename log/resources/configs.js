/**
 * @overview configurations of ccm component for data logging
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "greedy": {
    "key": "greedy",
    "logging": {
      "data": true,
      "browser": true,
      "parent": true,
      "root": true,
      "user": true,
      "website": true
    },
    "onfinish": { "log": true }
  },

  "se_ws17_pdf_viewer": {
    "key": "se_ws17_pdf_viewer",
    "only": {
      "data": [ "path_to_pdf" ]
    },
    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
    "onfinish": {
      "store": {
        "settings": { "store": "se_ws17_pdf_viewer_log", "url": "https://ccm2.inf.h-brs.de" },
        "permissions": {
          "creator": "akless2m",
          "group": {
            "mkaul2m": true,
            "akless2m": true
          },
          "access": {
            "get": "group",
            "set": "creator",
            "del": "creator"
          }
        }
      }
    }
  },

  "se_ws17_youtube": {
    "key": "se_ws17_youtube",
    "only": {
      "data": [ "video" ]
    },
    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
    "onfinish": {
      "store": {
        "settings": { "store": "se_ws17_youtube_log", "url": "https://ccm2.inf.h-brs.de" },
        "permissions": {
          "creator": "mkaul2m",
          "group": {
            "mkaul2m": true,
            "akless2m": true
          },
          "access": {
            "get": "group",
            "set": "creator",
            "del": "creator"
          }
        }
      }
    }
  },

  "se_ws17_teambuild": {  // created for ccm.log-1.0.0.js, ccm.teambuild-1.0.0.js, ccm.user-2.0.0.js
    "key": "se_ws17_teambuild",
    "events": {
      "ready": {
        "browser": true,
        "user": true,
        "website": true
      },
      "start": {
        "data": true,
        "user": true
      },
      "join": {
        "data": true,
        "user": true
      },
      "leave": {
        "data": true,
        "user": true
      },
      "rename": {
        "data": true,
        "user": true
      }
    },
    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
    "onfinish": {
      "store_settings": { "store": "se_ws17_teambuild_log", "url": "https://ccm2.inf.h-brs.de" },
      "permissions": {
        "creator": "akless2m",
        "group": {
          "mkaul2m": true,
          "akless2m": true
        },
        "access": {
          "get": "group",
          "set": "creator",
          "del": "creator"
        }
      }
    }
  },

  "sks_ws17_teambuild": {  // created for ccm.log-1.0.0.js, ccm.teambuild-1.0.0.js, ccm.user-2.0.0.js
    "key": "sks_ws17_teambuild",
    "events": {
      "ready": {
        "browser": true,
        "user": true,
        "website": true
      },
      "start": {
        "data": true,
        "user": true
      },
      "join": {
        "data": true,
        "user": true
      },
      "leave": {
        "data": true,
        "user": true
      },
      "rename": {
        "data": true,
        "user": true
      }
    },
    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
    "onfinish": {
      "store_settings": { "store": "sks_ws17_teambuild_log", "url": "https://ccm2.inf.h-brs.de" },
      "permissions": {
        "creator": "akless2m",
        "group": {
          "mkaul2m": true,
          "akless2m": true
        },
        "access": {
          "get": "group",
          "set": "creator",
          "del": "creator"
        }
      }
    }
  }

};