/**
 * @overview components data
 * @author Tea Kless <tea.kless@web.de> 2018
 * @author André Kless <andre.kless@web.de> 2018
 * @license MIT License
 */

ccm.files[ 'datasets.js' ] = {
  "exercise": {
    "key": "exercise",
    "title": "Exercise",
    "abstract": "Free Text Task",
    "url": "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    /*
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/tkless-components/exercise/resources/configs.js", "demo" ]
      ],
      "builder": [
        {
          "url": "https://ccmjs.github.io/tkless-components/exercise_builder/versions/ccm.exercise_builder-1.0.0.js",
          "config": {}
        },
        {
          "url": "https://leoneck.github.io/ccm-factory/dist/ccm.factory-1.0.0.js",
          "config": {
            "url_to_modify": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-2.0.0.js",
            "preview": false,
            "display_final_component_and_config": false,
            "no_bootstrap_container": true
          }
        }
      ]
    }
    */
  },
  "difference_chart": {
    "key": "difference_chart",
    "title": "Difference Chart",
    "abstract": "To show the results of a questionaire for different groups",
    "url": "https://kaul.inf.h-brs.de/data/ccm/difference_chart/versions/ccm.difference_chart-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
  //    [ "ccm.get", "https://kaul.inf.h-brs.de/data/ccm/difference_chart/resources/configs.js", "research" ]
      ]
    }
  },
  "pdf_viewer": {
    "key": "pdf_viewer",
    "title": "PDF Viewer",
    "abstract": "For rendering a PDF",
    "url": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-3.0.0.js",
    "version": "3.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    /*
    "ignore": {
      "demos": [
        { pdf: //[ "ccm.get", { url: "https://ccm.inf.h-brs.de", store: "file_upload" }, "1517228670954X509252249813553" ],
            "//cdn.mozilla.net/pdfjs/tracemonkey.pdf"  }
      ],
      "builder": [
        {
          "url": "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/versions/ccm.pdf_viewer_builder-1.0.0.js",
          "config": {
            "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
              { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
              "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/resources/default.css"
            ],
            "target": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-2.1.0.js" ],
            //"submit_button": true,
            //"preview": true,
            "file_upload": [ "ccm.component", "https://ccmjs.github.io/tkless-components/file_upload/versions/ccm.file_upload-1.0.0.js", {
              data: { store: [ "ccm.store", { "store": "file_upload", "url": "https://ccm.inf.h-brs.de", "method": "POST" } ] }
            } ]
            //"start_values": {
            //  "pdf": [ "ccm.get", { url: "http://localhost:8080", store: "file_upload" }, "1518776028787X4201785986475841" ],
            //  "css": "['ccm.load','https://ccmjs.github.io/tkless-components/pdf_viewer/resources/default.css']",
            //  "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.0.js',{'sign_on':'demo'}]"
            //}

            //  onchange
            //  onfinish
          }
        }
        //{
        //  "url": "https://leoneck.github.io/ccm-factory/dist/ccm.factory-1.0.0.js",
        //  "config": {
        //    "url_to_modify": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-2.0.0.js",
        //    "preview": false,
        //    "display_final_component_and_config": false,
        //    "no_bootstrap_container": true
        //  }
        //}
      ]
    }
    */
  },
  "content": {
    "key": "content",
    "title": "Content",
    "abstract": "For rendering a predefined content.",
    "url": "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js",
    "version": "5.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/akless-components/content/resources/configs.js", "demo" ]
      ]
    }
  },
  "comment": {
    "key": "comment",
    "title": "Comment",
    "abstract": "For rendering a comment to any component.",
    "url": "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "eval": {
    "key": "eval",
    "title": "Eval",
    "abstract": "For interpreting a given JavaScript expression.",
    "url": "https://ccmjs.github.io/akless-components/eval/versions/ccm.eval-1.0.0.js",
    "version": "1.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/akless-components/eval/resources/configs.js", "demo" ]
      ]
    }
  },
  "cloze": {
    "key": "cloze",
    "title": "Fill-in-the-Blank Text",
    "abstract": "For rendering a fill-in-the-blank text.",
    "description": "The component supports solution hints, visual feedback, point allocation, time limitation, different layouts, authentication procedures, customization of buttons and learning analysis.",
    "url": "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-5.0.0.js",
    "version": "5.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/ccmjs/akless-components/",
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/akless-components/cloze/resources/configs.js", "demo" ]
      ],
      "builder": [
        {
          "url": "https://ccmjs.github.io/akless-components/cloze_builder/versions/ccm.cloze_builder-3.0.0.js",
          "config": { "submit_button": false }
        }
      ]
    }
  },
  "cloze_analytics": {
    "key": "cloze_analytics",
    "title": "Fill-in-the-Blank Text Analytics",
    "abstract": "For rendering fill-in-the-blank analytics.",
    "url": "https://ccmjs.github.io/akless-components/cloze_analytics/versions/ccm.cloze_analytics-1.3.0.js",
    "version": "1.3.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/ccmjs/akless-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/akless-components/cloze_analytics/resources/configs.js", "teacher" ]
      ]
    }
  },
  "editor": {
    "key": "editor",
    "title": "Quill Texteditor",
    "abstract": "For rendering a quill text editor.",
    "url": "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.0.0.js",
    "version": "3.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [ {} ]
    }
  },
  "fine_upload": {
    "key": "fine_upload",
    "title": "Fine Uploader Connector",
    "abstract": "Upload a file to a server via Fine Uploader",
    "description": "In order to embed the famous Fine Uploader software anywhere, use this connector. see <a href='https://fineuploader.com/' target='_blank'>https://fineuploader.com/</a>: 'Fine Uploader aims to make file-uploading on the web possible in every browser and mobile device. It is cross-browser, dependency-free, and 100% JavaScript. The product is highly customizable, and allows integrators to fine-tune every aspect of their users’ upload experience. Implementation requires only a single CSS file, a JavaScript file, and a server to upload to. Fine Uploader users enjoy widespread browser support and a suite of features, resulting in a smooth experience when uploading files to a website.'",
    "url": "https://ccmjs.github.io/mkaul-components/fine_upload/versions/ccm.fine_upload-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "forum": {
    "key": "forum",
    "title": "Forum",
    "abstract": "For rendering a forum.",
    "url": "https://ccmjs.github.io/tkless-components/forum/versions/ccm.forum-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "feedback": {
    "key": "feedback",
    "title": "Feedback",
    "abstract": "For rendering a feedback.",
    "url": "https://ccmjs.github.io/tkless-components/feedback/versions/ccm.feedback-2.0.0.js",
    "version": "2.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/tkless-components/feedback/resources/configs.js", "demo" ]
      ]
    }
  },
  "game_chooser": {
    "key": "game_chooser",
    "title": "Game Chooser",
    "abstract": "Game for quickly choosing one of two answers.",
    "description": "Game Chooser is a little game implemented in ccm. Game Rules: A number is given and the user has to decide, whether the sum of digits is even or odd as fast as possible. There are two buttons, which the user can press accordingly. The time for choosing is recorded. The range of the numbers can be adjusted via a slider.",
    "url": "https://ccmjs.github.io/akless-components/game_chooser/versions/ccm.game_chooser-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "geogebra": {
    "key": "geogebra",
    "title": "GeoGebra Connector",
    "abstract": "<i>ccm</i> connector for GeoGebra",
    "description": "In order to embed the famous GeoGebra software anywhere, use this connector. For GeoGebra see https://www.geogebra.org: 'GeoGebra is dynamic mathematics software for all levels of education that brings together geometry, algebra, spreadsheets, graphing, statistics and calculus in one easy-to-use package. GeoGebra is a rapidly expanding community of millions of users located in just about every country. GeoGebra has become the leading provider of dynamic mathematics software, supporting science, technology, engineering and mathematics (STEM) education and innovations in teaching and learning worldwide.'",
    "url": "https://ccmjs.github.io/mkaul-components/geogebra/versions/ccm.geogebra-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "highlight": {
    "key": "highlight",
    "title": "Code Highlighting",
    "abstract": "For Code Highlighting",
    "url": "https://ccmjs.github.io/mkaul-components/highlight/versions/ccm.highlight-2.0.0.js",
    "version": "2.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://ccmjs.github.io/mkaul-components",
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/mkaul-components/highlight/resources/configs.js", "demo" ]
      ],
      "builder": [
        /*
        {
          "url": "https://ccmjs.github.io/ccm-factory/dist/ccm.factory-1.0.0.min.js",
          "config": {
            "url_to_modify": "https://ccmjs.github.io/mkaul-components/highlight/ccm.highlight.js",
            "preview": true,
            "display_final_component_and_config": true,
            "no_bootstrap_container": true
          }
        }
        */
      ]
    }
  },
  "input": {
    "key": "input",
    "title": "Input",
    "abstract": "For user inputs.",
    "url": "https://ccmjs.github.io/akless-components/input/versions/ccm.input-1.0.0.js",
    "version": "1.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/akless-components/input/resources/configs.js", "demo" ]
      ]
    }
  },
  "kanban_board": {
    "key": "kanban_board",
    "title": "Kanban Board",
    "abstract": "For rendering a kanban board.",
    "url": "https://ccmjs.github.io/akless-components/kanban_board/versions/ccm.kanban_board-1.2.0.js",
    "version": "1.2.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_board/resources/configs.js", "demo" ]
      ]
    }
  },
  "kanban_card": {
    "key": "kanban_card",
    "title": "Kanban Card",
    "abstract": "For rendering a kanban card.",
    "url": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js",
    "version": "1.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      /*
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js", "realtime" ]
      ],
      "builder": [
        {
          "url": "https://leoneck.github.io/ccm-factory/dist/ccm.factory-1.0.0.js",
          "config": {
            "url_to_modify": "https://ccmjs.github.io/akless-components/kanban_card/versions/ccm.kanban_card-1.0.0.js",
            "external_config": "https://ccmjs.github.io/akless-components/kanban_card/resources/configs.js",
            "key_in_external_config": "realtime",
            "preview": false,
            "display_final_component_and_config": false,
            "no_bootstrap_container": true
          }
        }
      ]
      */
    }
  },
  "le": {
    "key": "le",
    "title": "Learning Unit",
    "abstract": "For rendering a learning unit.",
    "url": "https://ccmjs.github.io/akless-components/le/versions/ccm.le-3.0.0.js",
    "version": "3.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://akless.github.io/akless/ccm/ccm-overview/configs.js", "le" ]
      ]
    }
  },
  "learning_app": {
    "key": "learning_app",
    "title": "LearningApp Connector",
    "abstract": "<i>ccm</i> connector for learning apps",
    "description": "In order to embed the famous LearningApps software anywhere, use this connector. 'LearningApps.org is a Web 2.0 application, to support learning and teaching processes with small interactive modules. Those modules can be used directly in learning materials, but also for self studying. The aim is to collect reusable building blocks and make them available to everyone. Blocks (called Apps) include no specific framework or a specific learning scenario. The blocks are therefore not suitable as complete lessons or tasks, instead they must be embedded in an appropriate teaching scenario', see <a href='http://learningapps.org' target='_blank'>http://learningapps.org</a>.",
    "url": "https://ccmjs.github.io/mkaul-components/learning_app/versions/ccm.learning_app-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [ {} ]
    }
  },
  "log": {
    "key": "log",
    "title": "Logger",
    "abstract": "For data logging.",
    "url": "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
    "version": "4.0.1",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/"
  },
  "news": {
    "key": "news",
    "title": "News",
    "abstract": "For rendering a news.",
    "url": "https://ccmjs.github.io/tkless-components/news/versions/ccm.news-1.0.0.j",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "question": {
    "key": "question",
    "title": "Question",
    "abstract": "For rendering a question and given answers.",
    "url": "https://ccmjs.github.io/tkless-components/question/versions/ccm.question-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "quiz": {
    "key": "quiz",
    "title": "Quiz",
    "abstract": "For rendering a quiz.",
    "url": "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-2.1.1.js",
    "version": "2.1.1",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //[ "ccm.get", "https://ccmjs.github.io/akless-components/quiz/resources/configs.js", "demo" ]
      ]
    }
  },
  "star_rating": {
    "key": "star_rating",
    "title": "Star Rating",
    "abstract": "For rendering a star rating.",
    "url": "https://ccmjs.github.io/tkless-components/star_rating/versions/ccm.star_rating-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "star_rating_result": {
    "key": "star_rating_result",
    "title": "Star Rating Result",
    "abstract": "For rendering a star rating result.",
    "url": "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "slidecast": {
    "key": "slidecast",
    "title": "Slidecast",
    "abstract": "For rendering a slidecast.",
    "url": "https://ccmjs.github.io/tkless-components/slidecast/versions/ccm.slidecast-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "teambuild": {
    "key": "teambuild",
    "title": "Team Building",
    "abstract": "For team building.",
    "url": "https://ccmjs.github.io/akless-components/teambuild/versions/ccm.teambuild-3.0.0.js",
    "version": "3.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild/resources/configs.js", "demo" ]
      ],
      "builder": [
        {
          "url": "https://ccmjs.github.io/akless-components/teambuild_builder/versions/ccm.teambuild_builder-4.0.0.js",
          "config": [ "ccm.get", "https://ccmjs.github.io/akless-components/teambuild_builder/resources/configs.js", "crud" ]
        }
      ]
    }
  },
  "testsuite": {
    "key": "testsuite",
    "title": "Test Suite",
    "abstract": "For running unit tests.",
    "url": "https://ccmjs.github.io/akless-components/testsuite/versions/ccm.testsuite-1.0.0.js",
    "version": "1.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "thumb_rating": {
    "key": "thumb_rating",
    "title": "Thumb Rating",
    "abstract": "For rendering a thumb rating.",
    "url": "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "user": {
    "key": "user",
    "title": "User",
    "abstract": "For user authentication.",
    "url": "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
    "version": "8.0.0",
    "developer": "André Kless",
    "license": "MIT License",
    "website": "https://github.com/akless/ccm-components/",
    "ignore": {
      "demos": [
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    }
  },
  "uml": {
    "key": "uml",
    "title": "UML Connector",
    "abstract": "<i>ccm</i> connector for PlantUML",
    "description": "In order to embed the famous PlantUML software anywhere, use this connector. PlantUML.com is a web server that generates diagrams in the cloud. There are also various extensions or add-ons that incorporate PlantUML, see <a href='http://plantuml.com/' target='_blank'>http://plantuml.com/</a>",
    "url": "https://ccmjs.github.io/mkaul-components/uml/versions/ccm.uml.1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "upload": {
    "key": "upload",
    "title": "Upload",
    "abstract": "Upload a file to a server",
    "description": "With a file chooser you can choose any file from your computer. Upload lets you upload the file to a server.",
    "url": "https://ccmjs.github.io/mkaul-components/upload/versions/ccm.upload-1.0.0.js",
    "version": "1.0.0",
    "developer": "Manfred Kaul",
    "license": "MIT License",
    "website": "https://github.com/mkaul/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  },
  "voting": {
    "key": "voting",
    "title": "Voting",
    "abstract": "For rendering a voting.",
    "url": "https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-1.0.0.js",
    "version": "1.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/tkless/ccm-components/",
    "ignore": {
      "demos": [
        //{}
      ]
    }
  }
};