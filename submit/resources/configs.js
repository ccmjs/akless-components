/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  /** test (relative paths) */
  "local": {
    "key": "local",
//  "inner": [ "ccm.load", { "url": "../submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "demo.data" ],
    "css": [ "ccm.load",
      { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
      "../libs/bootstrap/css/bootstrap.css",
      "../submit/resources/default.css"
    ],
    "data": {
      "store": [ "ccm.store", { "name": "submit_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "../content/ccm.content.js" ],
    "helper": [ "ccm.load", { "url": "../modules/helper.mjs" } ],
    "json_builder": [ "ccm.component", "../json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
    "onfinish": {
      "store": true,
      "alert": "Saved!"
    }
  },

  /** demo */
  "demo": {
    "key": "demo",
//  "inner": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/submit/resources/demo.html", "type": "data" } ],
    "entries": [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/datasets.js", "demo.data" ],
    "data": {
      "store": [ "ccm.store", { "name": "submit_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.3.1.js" ],
    "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-1.0.0.mjs" } ],
    "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.3.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "onfinish": {
      "store": true,
      "alert": "Saved!"
    }
  },

  /** create of app metadata */
  "app_meta_create": {
    "entries": [
      "<div class='page-header'><h3>Publish App</h3></div>",
      "<div class='well'>The more information about your app you type here, the better your app can be found by others.</div>",
      {
        "label": "<span style='color:red'>*</span>Title",
        "name": "title",
        "type": "text",
        "info": "Title of the app. As understandable and short as possible.",
        "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "Icon",
        "name": "icon",
        "type": "url",
        "info": "The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
      },
      {
        "label": "Abstract",
        "name": "subject",
        "type": "text",
        "info": "A short description of your app. Ideally in title case",
        "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      "<div class='well'><p>I agree that all software of my app is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content of my app will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span>I Agree",
        "type": "checkbox",
        "info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
        "required": true
      },
      { "type": "submit" }
    ]
  },

  /** edit of app metadata */
  "app_meta_edit": {
    "entries": [
      "<div class='page-header'><h3>Edit of App Information</h3></div>",
      "<div class='well'>The more information about your app you type here, the better your app can be found by others.</div>",
      {
        "label": "<span style='color:red'>*</span>Title",
        "name": "title",
        "type": "text",
        "info": "Title of the app. As understandable and short as possible.",
        "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "Icon",
        "name": "icon",
        "type": "url",
        "info": "The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/component.png"
      },
      {
        "label": "Abstract",
        "name": "subject",
        "type": "text",
        "info": "A short description of your app. Ideally in title case",
        "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      {
        "label": "Description",
        "name": "description",
        "type": "textarea",
        "info": "A detailed description of your app. Try to make as understandable as possible what you can do with the help of your app.",
        "placeholder": "Component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in this Digital Makerspace is free software and all content is public domain."
      },
      {
        "label": "Category",
        "name": "category",
        "type": "text",
        "info": "What kind of app is it? Define the category that best fits the context of your app.",
        "placeholder": "Makerspace",
        "maxlength": 35
      },
      {
        "label": "Tags",
        "type": "several",
        "info": "Here you can define any tags through which your app can be found. Only one tag per input field. Via +/- you can add/remove additional input fields.",
        "item": {
          "name": "tags",
          "type": "text"
        }
      },
      {
        "label": "Language",
        "name": "language",
        "type": "multi-checkbox",
        "info": "Which languages ​​are supported by the app? Choose multiple languages ​​if the app supports multilingualism.",
        "items": [
          {
            "label": "English",
            "value": "en"
          },
          {
            "label": "German",
            "value": "de"
          }
        ]
      },
      "<div class='well'><p>I agree that all software of my app is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content of my app will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span>I Agree",
        "type": "checkbox",
        "info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
        "required": true
      },
      { "type": "submit" }
    ]
  },

  /** create of component metadata */
  "component_meta_create": {
    "entries": [
      "<div class='page-header'><h3 data-lang='headline_create'>Publish Component</h3></div>",
      "<div class='well' data-lang='intro_create'>Are you a component developer? Have you developed a useful component that you would like to offer to the world? Great! Then you can use this form to publish your component. The more information about the published component you type here, the better your component can be found and reused by others.</div>",
      {
        "label": "<span style='color:red'>*</span><span data-lang='title'>Title</span>",
        "name": "title",
        "type": "text",
        "info": "<span data-lang='title_info'>Title of the component. As understandable and short as possible.</span>",
//      "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "<span style='color:red'>*</span><span data-lang='url'>URL</span>",
        "name": "path",
        "type": "url",
        "info": "<span data-lang='url_info'>Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. Never publish the latest version of your component, but always a concrete version whose code does not change anymore.</span>",
//      "placeholder": "https://ccmjs.github.io/akless-components/dms/versions/ccm.dms-3.0.1.js",
        "required": true,
        "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)$",
        "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.dms-1.0.0.js"
      },
      /*
            {
              "label": "<span style='color:red'>*</span>SRI Hash",
              "name": "sri",
              "type": "text",
              "info": "To guarantee that the code of your component does not change, we need the component's so-called SRI hash. The required SRI hash can be generated via a <a href='https://www.srihash.org/' target='_blank'>free online tool</a>. More information can be found on the Web under the keyword <a href='https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity' target='_blank'>Subresource Integrity</a>.",
              "placeholder": "sha384-eBCG79vlakZs8qCC6yARu2oQSMB946XWO/x4uhwpGFl9AQZllpXZdqGq/3f2Mu9N",
              "required": true,
              "pattern": "sha384-.+",
              "title": "An SRI hash always starts with \"sha384-\"."
            },
      */
      {
        "label": "<span data-lang='icon'>Icon</span>",
        "name": "icon",
        "type": "url",
        "info": "<span data-lang='icon_info'>The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.</span>",
//      "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png"
      },
      {
        "label": "<span data-lang='abstract'>Abstract</span>",
        "name": "subject",
        "type": "text",
        "info": "<span data-lang='abstract_info'>A short description of your component. Ideally in title case</span>",
//      "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      "<div class='well' data-lang='license_info'><p>I agree that all software is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span><span data-lang='agree'>I Agree</span>",
        "type": "checkbox",
        "info": "<span data-lang='agree_info'>Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.</span>",
        "required": true
      },
      { "type": "submit" }
    ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "lang" ] ],
  },

  /** edit of component metadata */
  "component_meta_edit": {
    "entries": [
      "<div class='page-header'><h3 data-lang='headline_edit'>Edit of Published Component</h3></div>",
      "<div class='well' data-lang='intro_edit'>The more information about the published component you type here, the better your component can be found and reused by others.</div>",
      {
        "label": "<span style='color:red'>*</span><span data-lang='title'>Title</span>",
        "name": "title",
        "type": "text",
        "info": "<span data-lang='title_info'>Title of the component. As understandable and short as possible.</span>",
//      "placeholder": "Digital Makerspace",
        "required": true,
        "maxlength": 35
      },
      {
        "label": "<span style='color:red'>*</span>URL",
        "name": "path",
        "type": "url",
        "info": "<span data-lang='url_info'>Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. Never publish the latest version of your component, but always a concrete version whose code does not change anymore.</span>",
        "placeholder": "https://ccmjs.github.io/akless-components/dms/versions/ccm.dms-2.0.0.js",
        "required": true,
        "pattern": ".+/ccm\\.([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))(\\.js)$",
        "title": "The filename of the component must start with 'ccm.' followed by the unique component name and then a '-' followed by the component version number and a '.js' in the end. Example: ccm.dms-1.0.0.js"
      },
/*
      {
        "label": "<span style='color:red'>*</span>SRI Hash",
        "name": "sri",
        "type": "text",
        "info": "To guarantee that the code of your component does not change, we need the component's so-called SRI hash. The required SRI hash can be generated via a <a href='https://www.srihash.org/' target='_blank'>free online tool</a>. More information can be found on the Web under the keyword <a href='https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity' target='_blank'>Subresource Integrity</a>.",
        "placeholder": "sha384-eBCG79vlakZs8qCC6yARu2oQSMB946XWO/x4uhwpGFl9AQZllpXZdqGq/3f2Mu9N",
        "required": true,
        "pattern": "sha384-.+",
        "title": "An SRI hash always starts with \"sha384-\"."
      },
 */
      {
        "label": "<span data-lang='icon'>Icon</span>",
        "name": "icon",
        "type": "url",
        "info": "<span data-lang='icon_info'>The icon file must be accessible via a public URL on the web and is ideally a 64x64 SVG file. The icon will be published under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>. Make sure the icon is compatible with this license.</span>",
//      "placeholder": "https://ccmjs.github.io/akless-components/dms/resources/img/component.png"
      },
      {
        "label": "<span data-lang='abstract'>Abstract</span>",
        "name": "subject",
        "type": "text",
        "info": "<span data-lang='abstract_info'>A short description of your component. Ideally in title case</span>",
//      "placeholder": "Provides Components for Creating Apps.",
        "maxlength": 70
      },
      {
        "label": "<span data-lang='description'>Description</span>",
        "name": "description",
        "type": "textarea",
        "info": "<span data-lang='description_info'>A detailed description of your component. Try to make as understandable as possible what kind of apps you can create with the help of your component.</span>",
//      "placeholder": "Enables you to create your own Digital Makerspace, where component developers can publish, find, try, and rate components, and app creators can create their own apps from components without programming skills. With the built-in App Store, the created apps can be found, tried, rated, reused and shared by others. Everything in a Digital Makerspace is free software and all content is public domain."
      },
      {
        "label": "<span data-lang='category'>Category</span>",
        "name": "category",
        "type": "radio",
        "info": "<span data-lang='category_info'>What kind of component is it? Choose the category that best fits the type of your component.<br>In the case of <code>App Creation</code>, the component is provided as a digital tool for creating apps.<br>The component can be used as an <code>Configuration Builder</code> if an app created from the component can be used to create an app configuration.<br>A <code>Utility</code> component is not for creating apps, but provides useful functionality that can be optionally used by other apps.</span>",
        "items": [
          {
            "label": "<span data-lang='app_creation'>App Creation</span>",
            "value": "App Creation",
            "checked": true
          },
          {
            "label": "<span data-lang='configuration_builder'>Configuration Builder</span>",
            "value": "Configuration Builder"
          },
          {
            "label": "<span data-lang='utility'>Utility</span>",
            "value": "Utility"
          }
        ]
      },
      {
        "label": "<span data-lang='tags'>Tags</span>",
        "type": "several",
        "info": "<span data-lang='tags_info'>Here you can define any tags through which your component can be found. Only one tag per input field. Via +/- you can add/remove additional input fields.</span>",
        "item": {
          "name": "tags",
          "type": "text"
        }
      },
      {
        "label": "<span data-lang='demos'>Demos</span>",
        "name": "demos",
        "type": "several",
        "info": "<span data-lang='demos_info'>Enter your own title and app ID for each app to be demo-listed. Only one value per input field. Via +/- you can add/remove additional input fields.</span>",
        "items": [
          {
            "label": "<span data-lang='title'>Title</span>",
            "name": "title",
            "type": "text",
            "info": "<span data-lang='title_info_demo'>Title of the demo in the demo menu.</span>",
            "required": true
          },
          {
            "label": "<span data-lang='app_id'>App ID</span>",
            "name": "app",
            "type": "text",
            "info": "<span data-lang='app_id_info_demo'>App ID of the app created from this component to be used as a demo.</span>",
            "pattern": "[a-zA-Z0-9_-]+",
            "title": "An App ID can only contain letters, numbers, and no special characters except \"-\" and \"_\".",
            "required": true
          }
        ]
      },
      {
        "label": "<span data-lang='builders'>Builders</span>",
        "name": "builders",
        "type": "several",
        "info": "<span data-lang='builders_info'>Enter the title, component index, and app ID for each builder app to be listed in the app creation section of the builder menu. Only one value per input field. Via +/- you can add/remove additional input fields.</span>",
        "items": [
          {
            "label": "<span data-lang='title'>Title</span>",
            "name": "title",
            "type": "text",
            "info": "<span data-lang='title_info_builder'>Title of the builder app in the builder menu of the app creation section.</span>",
            "required": true
          },
          {
            "label": "<span data-lang='component_index'>Component Index</span>",
            "name": "component",
            "type": "text",
            "info": "<span data-lang='component_index_info'>Index of the component from which the builder app is created. How to know the index? The index can be found in the overview section of the component.</span>",
//          "placeholder": "json_builder-1-4-1",
            "required": true,
//          "pattern": "([a-z][a-z0-9_]*)(-(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*))",
            "title": "The index of a component starts with the unique component name and then a '-' followed by the component version number. Example: json_builder-1.4.1"
          },
          {
            "label": "<span data-lang='app_id'>App ID</span>",
            "name": "app",
            "type": "text",
            "info": "<span data-lang='app_id_info_builder'>App ID of the builder app to be used for app creation.</span>",
//          "placeholder": "1559859507011X17772030423968155",
            "pattern": "[a-zA-Z0-9_-]+",
            "title": "An App ID can only contain letters, numbers, and no special characters except \"-\" and \"_\".",
            "required": true
          }
        ]
      },
      "<div class='well' data-lang='license_info'><p>I agree that all software is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.</div>",
      {
        "label": "<span style='color:red'>*</span><span data-lang='agree'>I Agree</span>",
        "type": "checkbox",
        "info": "<span data-lang='agree_info'>Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.</span>",
        "required": true
      },
      { "type": "submit" }
    ],
    "lang": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/submit/resources/configs.js", "lang" ] ],
  },

  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
        "abstract": "Kurzbeschreibung",
        "abstract_info": "Eine kurze Beschreibung Ihrer Komponente.",
        "agree": "Ich stimme zu",
        "agree_info": "Alles in einem Digital Makerspace ist freie Software und alle Inhalte sind gemeinfrei. Sie können also nur dann etwas veröffentlichen, wenn diese Voraussetzung erfüllt ist.",
        "app_creation": "App-Erstellung",
        "app_id": "App-ID",
        "app_id_info_builder": "App-ID der Konfigurations-Generator-App, die für die App-Erstellung verwendet werden soll.",
        "app_id_info_demo": "App-ID der aus dieser Komponente erstellten App, die als Demo verwendet werden soll",
        "builders": "Konfigurations-Generatoren",
        "builders_info": "Geben Sie den Titel, den Komponentenindex und die App-ID für jeden Konfigurations-Generator ein, der in der Sektion zur App-Erstellung im Menü aufgeführt werden soll. Nur ein Wert pro Eingabefeld. Über +/- können Sie zusätzliche Eingabefelder hinzufügen/entfernen.",
        "category": "Kategorie",
        "category_info": "Um was für eine Komponente handelt es sich? Wählen Sie die Kategorie, die am besten zum Typ Ihrer Komponente passt.<br>Bei der <code>App-Erstellung</code> wird die Komponente als digitales Tool zum Erstellen von Apps bereitgestellt.<br>Die Komponente kann als <code>Konfigurations-Generator</code> verwendet werden, wenn eine aus der Komponente erstellte App zur Erzeugung von App-Konfigurationen verwendet werden kann. Eine <code>Nützliche Erweiterung</code> dient nicht zum Erstellen von Apps, sondern bietet nützliche Funktionen, die optional von anderen Apps verwendet werden können.",
        "component_index": "Index der Komponente",
        "component_index_info": "Index der Komponente, aus der die Konfigurations-Generator-App erstellt wurde. Woher weiß man den Index? Der Index steht bei der Komponente in der Sektion \"Übersicht\".",
        "configuration_builder": "Konfigurations-Generator",
        "demos": "Demos",
        "demos_info": "Geben Sie einen Titel und eine App-ID für jede App ein, die als Demo aufgeführt werden soll. Nur ein Wert pro Eingabefeld. Über +/- können Sie zusätzliche Eingabefelder hinzufügen/entfernen.",
        "description": "Beschreibung",
        "description_info": "Eine detaillierte Beschreibung Ihrer Komponente. Versuchen Sie so verständlich wie möglich zu machen, welche Art von Apps mit Hilfe Ihrer Komponente erstellt werden können.",
        "intro_create": "Sind Sie ein Komponentenentwickler? Haben Sie eine nützliche Komponente entwickelt, die Sie der Welt anbieten möchten? Toll! Dann können Sie dieses Formular verwenden, um Ihre Komponente zu veröffentlichen. Je mehr Informationen Sie hier über die veröffentlichte Komponente eingeben, desto besser kann sie von anderen gefunden und wiederverwendet werden.",
        "intro_edit": "Je mehr Informationen Sie hier über die veröffentlichte Komponente eingeben, desto besser kann sie von anderen gefunden und wiederverwendet werden.",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg",
        "headline_create": "Komponente veröffentlichen",
        "headline_edit": "Bearbeiten der veröffentlichten Komponente",
        "icon": "Icon",
        "icon_info": "Das Icon muss über eine öffentliche URL im Web zugänglich sein und ist idealerweise eine 64x64-SVG-Datei. Stellen Sie sicher, dass das Icon mit der <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0-Lizenz</a> kompatibel ist.",
        "license_info": "<p>Ich bin damit einverstanden, dass die gesamte Software als freie Software unter der <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT-Lizenz</a> veröffentlicht wird.</p><p>Ich bin damit einverstanden, dass alle Inhalte als gemeinfrei unter der <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0-Lizenz</a> veröffentlicht werden.</p>Ich bestätige, dass dadurch keine Urheberrechte Dritter verletzt werden.",
        "tags": "Schlagworte",
        "tags_info": "Hier können Sie beliebige Schlagwörter definieren, über die Ihre Komponente gefunden werden kann. Nur ein Schlagwort pro Eingabefeld. Über +/- können Sie zusätzliche Eingabefelder hinzufügen´/entfernen.",
        "title": "Titel",
        "title_info": "Titel der Komponente. So verständlich und kurz wie möglich.",
        "title_info_builder": "Titel des Konfigurations-Generators im Menü der Sektion zur App-Erstellung.",
        "title_info_demo": "Titel der Demo im Demo-Menü.",
        "url": "URL",
        "url_info": "Ihre Komponentendatei muss über eine öffentliche URL im Web zugänglich sein. Die meisten Entwickler verwenden dazu <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>. Für die Transparenz veröffentlichen Sie bitte keinen minimierten Code. Veröffentlichen Sie niemals die \"latest\"-Version Ihrer Komponente, sondern immer eine konkrete Version, deren Code sich nicht mehr ändert.",
        "utility": "Nützliche Erweiterung"
      },
      "en": {
        "abstract": "Abstract",
        "abstract_info": "A short description of your component. Ideally in title case.",
        "agree": "I Agree",
        "agree_info": "Everything in a Digital Makerspace is free software and all content is public domain. So you can only publish anything if this requirement is fulfilled.",
        "app_creation": "App Creation",
        "app_id": "App ID",
        "app_id_info_builder": "App ID of the configuration builder app to be used for app creation.",
        "app_id_info_demo": "App ID of the app created from this component to be used as a demo.",
        "builders": "Builders",
        "builders_info": "Enter the title, component index, and app ID for each configuration builder to be listed in the menu of the app creation section. Only one value per input field. Via +/- you can add/remove additional input fields.",
        "category": "Category",
        "category_info": "What kind of component is it? Choose the category that best fits the type of your component.<br>In the case of <code>App Creation</code>, the component is provided as a digital tool for creating apps.<br>The component can be used as an <code>Configuration Builder</code> if an app created from the component can be used to create an app configuration.<br>A <code>Utility</code> component is not for creating apps, but provides useful functionality that can be optionally used by other apps.",
        "component_index": "Component Index",
        "component_index_info": "Index of the component from which the builder app is created. How to know the index? The index can be found in the overview section of the component.",
        "configuration_builder": "Configuration Builder",
        "demos": "Demos",
        "demos_info": "Enter a title and app ID for each app to be demo-listed. Only one value per input field. Via +/- you can add/remove additional input fields.",
        "description": "Description",
        "description_info": "A detailed description of your component. Try to make as understandable as possible what kind of apps you can create with the help of your component.",
        "intro_create": "Are you a component developer? Have you developed a useful component that you would like to offer to the world? Great! Then you can use this form to publish your component. The more information about the published component you type here, the better your component can be found and reused by others.",
        "intro_edit": "The more information about the published component you type here, the better your component can be found and reused by others.",
        "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg",
        "headline_create": "Publish Component",
        "headline_edit": "Edit of Published Component",
        "icon": "Icon",
        "icon_info": "The icon must be accessible via a public URL on the web and is ideally a 64x64 SVG file. Make sure the icon is compatible with the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.",
        "license_info": "<p>I agree that all software is released as free software under the <a href='https://en.wikipedia.org/wiki/MIT_License' target='_blank'>MIT license</a>.</p><p>I agree that all content will be released as public domain under the <a href='https://creativecommons.org/share-your-work/public-domain/cc0/' target='_blank'>CC0 license</a>.</p>I confirm that this does not violate the copyright of third parties.",
        "tags": "Tags",
        "tags_info": "Here you can define any tags through which your component can be found. Only one tag per input field. Via +/- you can add/remove additional input fields.",
        "title": "Title",
        "title_info": "Title of the component. As understandable and short as possible.",
        "title_info_builder": "Title of the builder app in the menu of the app creation section.",
        "title_info_demo": "Title of the demo in the demo menu.",
        "url": "URL",
        "url_info": "Your component file must be accessible via a public URL on the web. Most developers use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a> for this. For the transparency please do not publish minimized code. Never publish the latest version of your component, but always a concrete version whose code does not change anymore.",
        "utility": "Utility"
      }
    },
    "active": "en"
  }

};