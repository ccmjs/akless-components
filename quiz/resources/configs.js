/**
 * @overview configurations of ccm component for rendering a quiz
 * @author André Kless <andre.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "test": {
    "key": "test",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://akless.github.io/ccm-components/libs/weblysleekui/font.css" } ],
    "feedback": true,
    "start_button": true,
    "navigation": true,
    "anytime_finish": true,
    "random": true,
    "onfinish": { "restart": true },
    "placeholder": {
      "start": "Quiz starten",
      "question": "Frage",
      "prev": "Zurück",
      "submit": "Auflösung",
      "next": "Nächste Frage",
      "finish": "Beenden"
    },
    "questions": [
      /*
      {
        "text": "Was ist ein HTML-Tag?",
        "description": "Wählen Sie unter den folgenden Antworten die richtige Antwort aus.",
        "input": "radio",
        "answers": [
          {
            "text": "ein Auszeichnungselement",
            "comment": "Reflektieren Sie was <a target=\"_blank\" href=\"https://de.wikipedia.org/w/index.php?title=Auszeichnungselement\">Auszeichnungselement</a> in Bezug auf HTML genau bedeutet."
          },
          "ein Befehl",
          "ein Feiertag",
          "ein Platzhalter",
          "ein Sonderzeichen",
          "eine Anweisung",
          "eine Eigenschaft",
          "eine Instruktion",
          "eine Variable"
        ],
        "correct": 0
      },
      {
        "text": "Wofür nutzt man einen HTML-Tag?",
        "description": "<b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "answers": [
          {
            "text": "Für eine darstellungsorientierte Textauszeichnung",
            "comment": "Ein HTML-Tag dient nur zur beschreibenden und nicht zur verfahrens- oder darstellungsorientierten Textauszeichnung."
          },
          {
            "text": "Um Angaben zur Textpräsentation zu machen",
            "comment": "Ein HTML-Tag dient vielmehr zur strukturierenden Auszeichnung, um Textbereichen eine Bedeutung zu geben."
          },
          {
            "text": "Um dynamische Abläufe zu beschreiben",
            "comment": "HTML-Tags beschreiben die Struktur und Semantik der Inhalte eines digitalen Dokuments."
          },
          {
            "text": "Zur Einbettung weiterer Inhalte, die über Text hinausgehen",
            "comment": "Über HTML-Tags können beispielsweise weitere Inhalte wie Bilder, Audios und Videos in die Webseite eingebettet werden."
          },
          {
            "text": "Zum Markieren von Feiertagen",
            "comment": "Ein HTML-Tag dient zur Markierung von Textbereichen in digitalen Dokumenten, um ihnen eine Bedeutung zu geben."
          },
          {
            "text": "Zur Formatierung von Texten",
            "comment": "Ein HTML-Tag dient nur der reinen semantischen Strukturierung von Texten und nicht zu dessen Formatierung."
          },
          {
            "text": "Zur Identifizierung von Textzeilen",
            "comment": "HTML-Tags dienen zur Identifizierung von Inhaltstypen. Also welche Textbereiche beispielsweise vom Typ Überschrift sind."
          },
          {
            "text": "Zur Steuerung des Webbrowsers",
            "comment": "Mit HTML-Tags steuert man den strukturellen Aufbau einer Webseite."
          },
          "Zur Strukturierung von Webseiteninhalten"
        ],
        "correct": [ 3, 8 ]
      },
      */
      {
        "text": "Woraus besteht ein HTML-Tag und wie setzt man ihn ein?",
        "description": "Geben Sie für die folgenden HTML-Codes an, in welchen davon die enthaltenen HTML-Tags korrekt eingesetzt werden.<br><br><b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "escape": true,
        "answers": [
          {
            "text": "<h1>Überschrift<h1>",
            "comment": "Hier fehlt beim schließenden <h1>-Tag der Schrägstrich."
          },
          "<h2>Überschrift</h2>",
          {
            "text": "<h3>Überschrift</h4>",
            "comment": "Hier werden zwei HTML-Tags mit unterschiedlichem Namen verwendet."
          },
          {
            "text": "<p>Paragraph",
            "comment": "Hier fehlt der schließende <p>-Tag."
          },
          {
            "text": "<p>Paragraph<p>",
            "comment": "Hier fehlt beim schließenden <p>-Tag der Schrägstrich."
          },
          "<p>Paragraph</p>",
          "Hallo Welt!<br>Willkommen.",
          {
            "text": "Hallo Welt!<br/>Willkommen.",
            "comment": "Die Schreibweise <br/> gibt es in HTML5 nicht mehr."
          },
          {
            "text": "Hallo Welt!<br></br>Willkommen.",
            "comment": "Bei <br>-Tags wird nur ein öffnender HTML-Tag benötigt."
          }
        ],
        "correct": [ 1, 5, 6 ]
      },
      {
        "text": "Welche HTML-Tags dienen zur Markierung von Überschriften?",
        "description": "<b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": [ 2, 3, 4, 5, 6, 7 ]
      },
      {
        "text": "Welcher HTML-Tag dient zur Markierung von Paragraphen?",
        "input": "radio",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": 8
      },
      {
        "text": "Welcher HTML-Tag dient zur Markierung von Zeilenumbrüchen?",
        "input": "radio",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": 0
      },
      {
        "text": "Wie schreibt man einen Kommentar in HTML?",
        "input": "radio",
        "answers": [
          {
            "text": "! Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Fortran\">Fortran</a>"
          },
          {
            "text": "# Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Perl_(Programmiersprache)\">Perl</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Python_(Programmiersprache)\">Python</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/R_(Programmiersprache)\">R</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Ruby_(Programmiersprache)\">Ruby</a>."
          },
          {
            "text": "' Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/BASIC\">BASIC</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Visual_Basic\">Visual Basic</a>."
          },
          {
            "text": "/* Kommentar */",
            "comment": "So schreibt man einen Blockkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C_(Programmiersprache)\">C</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C%2B%2B\">C++</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C-Sharp\">C#</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/D_(Programmiersprache)\">D</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/PHP\">PHP</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a>."
          },
          {
            "text": "/** Kommentar */",
            "comment": "So schreibt man einen Dokumentationskommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>."
          },
          {
            "text": "// Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C_(Programmiersprache)\">C</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C%2B%2B\">C++</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C-Sharp\">C#</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/PHP\">PHP</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a>."
          },
          {
            "text": "; Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Assemblersprache\">Assembler</a>."
          },
          "&lt;!-- Kommentar -->",
          {
            "text": "{ Kommentar }",
            "comment": "So schreibt man einen Blockkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>."
          }
        ],
        "correct": 7
      }
    ]
  },

  "local": {
    "key": "local",
    "css": [ "ccm.load", "../quiz/resources/weblysleek.css", { "context": "head", "url": "../libs/weblysleekui/font.css" } ],
    "user": [ "ccm.instance", "../user/ccm.user.js" ],
    "logger": [ "ccm.instance", "../log/ccm.log.js", [ "ccm.get", "../log/resources/configs.js", "greedy" ] ],
    "questions": [
      {
        "text": "How many of these answers are correct?",
        "description": "Select the correct answer from the following answers.",
        "answers": [
          {
            "text": "one",
            "comment": "Because you can't choose more than one answer."
          },
          "two",
          "three"
        ],
        "input": "radio",
        "correct": 0
      },
      {
        "text": "How many answers can be correct here?",
        "description": "Pay attention to the input field type.",
        "answers": [
          "absolutely none",
          {
            "text": "maximum of one",
            "comment": "Because you can choose more than one answer."
          },
          "more than one"
        ],
        "correct": [ true, false, true ]
      },
      {
        "text": "What is the solution to the following arithmetical tasks?",
        "description": "Please enter the solutions into the input fields.",
        "answers": [
          "=&nbsp; 1 + 1",
          "=&nbsp; 1 - 1",
          "=&nbsp;-1 - 1"
        ],
        "input": "number",
        "attributes": {
          "min": -2,
          "max": 2
        },
        "correct": [ 2, 0, -2 ]
      }
    ],
    "feedback": true,
    "navigation": true,
    "placeholder.finish": "Restart",
    "onfinish": { "restart": true }
  },

  "demo": {
    "key": "demo",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "questions": [
      {
        "text": "How many of these answers are correct?",
        "description": "Select the correct answer from the following answers.",
        "answers": [
          {
            "text": "one",
            "correct": true,
            "comment": "Because you can't choose more than one answer."
          },
          { "text": "two" },
          { "text": "three" }
        ],
        "input": "radio"
      },
      {
        "text": "How many answers can be correct here?",
        "description": "Pay attention to the input field type.",
        "answers": [
          {
            "text": "absolutely none",
            "correct": true
          },
          {
            "text": "maximum of one",
            "comment": "Because you can choose more than one answer."
          },
          {
            "text": "more than one",
            "correct": true
          }
        ]
      },
      {
        "text": "What is the solution to the following arithmetical tasks?",
        "description": "Please enter the solutions into the input fields.",
        "answers": [
          {
            "text": "=&nbsp; 1 + 1",
            "correct": 2
          },
          {
            "text": "=&nbsp; 1 - 1",
            "correct": 0
          },
          {
            "text": "=&nbsp;-1 - 1",
            "correct": -2
          }
        ],
        "input": "number",
        "attributes": {
          "min": -2,
          "max": 2
        }
      }
    ],
    "feedback": true,
    "navigation": true,
    "placeholder.finish": "Restart",
    "onfinish": { "log": true, "restart": true }
  },

  "se_ws17_testabdeckung": {
    "key": "se_ws17_testabdeckung",
    "quiz_key": "quiz_testabdeckung",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-2.0.1.js", [ "ccm.get", "https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js", "se_ws17_quiz" ] ],
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", {
      "context": "head",
      "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css"
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.1.js", {
      "sign_on": "hbrsinfkaul",
      "logged_in": true
    } ],
    "feedback": true,
    "navigation": true,
    "skippable": true,
    "anytime_finish": true,
    "start_button": true,
    "onfinish": { "restart": true },
    "placeholder.finish": "Close",
    "placeholder.correct": "Korrekte Lösung: ",
    "questions": [
      {
        "text": "Welche Testverfahren gibt es?",
        "answers": [
          {
            "text": "statische Datenflusstests",
            "comment": "Es gibt zwar statische Datenflussanalysen, aber keine statischen Datenflusstests."
          },
          {
            "text": "dynamische Verifikation",
            "comment": "Tests sind dynamisch. Verifikation ist statisch."
          },
          {
            "text": "dynamische Kontrollflusstestverfahren",
            "comment": "Tests sind dynamisch. Kontrollfluss ist eines der Testabdeckungsmaße."
          },
          {
            "text": "White Box-Verfahren Anweisungsüberdeckung",
            "comment": "Zur Messung der Anweisungsüberdeckung benötigt man den Einblick in den Quellcode. Also White Box."
          }
        ],
        "correct": [ false, false, true, true ]
      },
      {
        "text": "Welche Art von Testverfahren werden in der Praxis bei Unit-Tests hauptsächlich eingesetzt?",
        "answers": [
          {
            "text": "formale Verfahren",
            "comment": "Formale Verfahren wie Verifikation benötigen selbst keine Unit-Tests."
          },
          {
            "text": "Verifikation",
            "comment": "Verifikation zielt auf einen mathematischen Beweis der Korrektheit und nicht auf die Erfüllung von Unit-Tests."
          },
          {
            "text": "statische Analysen",
            "comment": "Statische Analysen werden aufgrund der statischen Quellcode-Struktur durchgeführt, nicht durch Unit-Tests."
          },
          {
            "text": "dynamische Testverfahren",
            "comment": "Ja. Mit Unit-Tests kann man verschiedene dynamische Testverfahren durchführen."
          }
        ],
        "correct": [ false, false, false, true ]
      },
      {
        "text": "Welches ist das effektivste Testverfahren? (gemessen in Anzahl der gefundenen Defekte pro investierter Arbeitsstunde)",
        "answers": [
          {
            "text": "Code lesen / Code inspizieren",
            "comment": "Gefundene Defekte pro Stunde: 1,057"
          },
          {
            "text": "White Box",
            "comment": "Gefundene Defekte pro Stunde: 0,322"
          },
          {
            "text": "Black Box",
            "comment": "Gefundene Defekte pro Stunde: 0,282"
          },
          {
            "text": "Normale Nutzung",
            "comment": "Gefundene Defekte pro Stunde: 0,210"
          }
        ],
        "input": "radio",
        "correct": 0
      },
      {
        "text": "Wie ist Testabdeckung (<i>code coverage</i>) definiert?",
        "answers": [
          {
            "text": "Testabdeckung ist eine Metrik zur Qualitätssicherung von Software",
            "comment": "Das ist keine Definition. Außerdem ist Testabdeckung eine Metrik zur Qualitätssicherung von Tests, nicht von Software allgemein."
          },
          {
            "text": "Die Anzahl getesteter Fälle dividiert durch die Anzahl aller möglichen Fälle",
            "comment": "Richtig, das ist die allgemeinste Definition von Testabdeckung (<i>code coverage</i>). Wobei die Anzahl aller möglichen Fälle unterschiedlich definiert sein kann."
          },
          {
            "text": "Testabdeckung ist das Maß der Abdeckung von Testfunktionen.",
            "comment": "Das ist keine Definition. Außerdem werden nicht die Testfunktionen abgedeckt, sondern die zu testende Software durch Tests."
          }
        ],
        "input": "radio",
        "correct": 1
      },
      {
        "text": "Wie ist Metrik definiert?",
        "answers": [
          {
            "text": "Eine Metrik definiert ein metrisches Maß (also in Meter statt in Inches).",
            "comment": "Es gibt verschiedene Maßeinheiten (Meter und Inches). Die Meter-Maßeinheit nennt man auch metrisch. Aber Metrik ist etwas anderes."
          },
          {
            "text": "Eine Metrik ist eine asymmetrische Funktion, die je zwei Elemente vergleicht und einen Wert zwischen -1 und +1 zuordnet.",
            "comment": "Das wäre bestenfalls eine Comparator-Funktion."
          },
          {
            "text": "Eine Metrik ist eine symmetrische Funktion, die je zwei Punkte eines Datenraums einen nicht negativen reellen Wert zuordnet, der immer kleiner oder gleich ist der Summe der Abstände zu einem dritten Punkt.",
            "comment": "Metrik heißt auch Abstandsfunktion, die den Abstand zweier Punkte misst. Es gelten 3 Axiome: (1.) Positive Definitheit, (2.) Symmetrie, (3.) Dreiechsungleichung: Ein Umweg über einen dritten Punkt kann nie kürzer sein als der direkte Weg."
          },
          {
            "text": "Eine Metrik ist eine Funktion, die je zwei Elemente in Beziehung setzt und den Prozentanteil des ersten Elements im Verhältnis zum zweiten Element als Wert zuordnet.",
            "comment": "Das wäre nur simple Prozentrechnung, aber keine Metrik."
          }
        ],
        "input": "radio",
        "correct": 2
      },
      {
        "text": "Wie viele Pfade müssen beim Pfadüberdeckungstestverfahren in folgendem Code-Beispiel durchlaufen werden? <br><pre style=\"background-color:#ffffff;color:#000000;font-family:'Menlo';\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><span style=\"color:#808080;font-style:italic;\">// Eingabe: a:int, b:int, c:int<br></span><span style=\"color:#808080;font-style:italic;\">// Ergebnis: |a| + |b| + |c|<br></span><span style=\"color:#000080;font-weight:bold;\">int </span>manhattan(<span style=\"color:#000080;font-weight:bold;\">int </span>a, <span style=\"color:#000080;font-weight:bold;\">int </span>b, <span style=\"color:#000080;font-weight:bold;\">int </span>c) {<br> <span style=\"color:#000080;font-weight:bold;\">if </span>(a &lt; <span style=\"color:#0000ff;\">0</span>)<br> a = -a;<br> <span style=\"color:#000080;font-weight:bold;\">if </span>(b &lt; <span style=\"color:#0000ff;\">0</span>)<br> b = -b;<br> <span style=\"color:#000080;font-weight:bold;\">if </span>(c &lt; <span style=\"color:#0000ff;\">0</span>)<br> c = -c;<br> <span style=\"color:#000080;font-weight:bold;\">return </span>a+b+c;<br>}</pre>",
        "answers": [
          {
            "text": "Antwort:",
            "comment": "Weil 3-mal binäre Verzweigung: 2 * 2 * 2 = 8"
          }
        ],
        "input": "number",
        "attributes": { "min": 0 },
        "swap": true,
        "correct": 8
      },
      {
        "text": "Wie viele Testdaten benötigt man minimal für den <i>Boundary Interior</i>-Test in folgendem Code-Beispiel? <br><pre style=\"background-color:#ffffff;color:#000000;font-family:'Menlo';\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><span style=\"color:#000080;font-weight:bold;\">int </span>foobar( <span style=\"color:#000080;font-weight:bold;\">int</span>[] a, <span style=\"color:#000080;font-weight:bold;\">int </span>i ){<br> <span style=\"color:#000080;font-weight:bold;\">while </span>( i &lt; a.<span style=\"color:#660e7a;font-weight:bold;\">length </span>&amp;&amp; a[i] &gt; <span style=\"color:#0000ff;\">0 </span>) {<br> <span style=\"color:#000080;font-weight:bold;\">if </span>( a[i] &lt; <span style=\"color:#0000ff;\">100 </span>)<br> foo( a[i] );<br> <span style=\"color:#000080;font-weight:bold;\">else<br></span><span style=\"color:#000080;font-weight:bold;\"> </span>bar(<span style=\"color:#0000ff;\">100 </span>* i / a[i]);<br> i++;<br> }<br> <span style=\"color:#000080;font-weight:bold;\">return </span>i;<br>}</pre>\n",
        "answers": [
          {
            "text": "Antwort:",
            "comment": "3 Fälle: exterior (Schleife nicht betreten), boundary (Schleife betreten, aber nicht wiederholen), interior (Schleife wiederholen)"
          }
        ],
        "input": "number",
        "attributes": { "min": 0 },
        "swap": true,
        "correct": 3
      },
      {
        "text": "Welches Testüberdeckungskriterium ist schärfer (d.h. verlangt mehr Tests)? (vgl. Subsumptionsheterarchie)",
        "answers": [
          {
            "text": "C0 ist schärfer als C1",
            "comment": "Umgekehrt: C1 ist schärfer als C0. Bei C0 muss jede Anweisung, bei C1 jeder Zweig getestet sein. Das kann sehr viel mehr Testdaten erfordern."
          },
          {
            "text": "Bedingungs-/Entscheidungsüberdeckung ist schärfer als Zweigüberdeckung (C1)",
            "comment": "weil die Zweigüberdeckung ein Teil davon ist"
          },
          {
            "text": "Minimaler Mehrfach-Bedingungsüberdeckung ist schärfer als Mehrfach- Bedingungsüberdeckung",
            "comment": "Umgekehrt: Mehrfach-Bedingungsüberdeckung ist schärfer als die Minimale Mehrfach-Bedingungsüberdeckung"
          },
          {
            "text": "Minimaler Mehrfach-Bedingungsüberdeckung ist schärfer als Bedingungs-/Entscheidungsüberdeckung",
            "comment": "Richtig, weil bei der Mehrfach-Bedingungsüberdeckung auch Kombinationen der Bedingungen geprüft werden."
          },
          {
            "text": "Modifizierter Boundary Interior-Test ist schärfer als Pfadüberdeckung",
            "comment": "Umgekehrt: Pfadüberdeckung ist das Maximum, das man fordern kann."
          },
          {
            "text": "Pfadüberdeckung ist schärfer als Zweigüberdeckung (C1)",
            "comment": "Richtig: Pfadüberdeckung ist das Maximum, das man fordern kann."
          },
          {
            "text": "Strukturierter Pfadtest ist schärfer als Modifizierter Boundary Interior-Test",
            "comment": "Kann man so nicht sagen. Beide Kriterien liegen quer zu einander."
          },
          {
            "text": "Strukturierter Pfadtest ist schärfer als Boundary Interior-Test",
            "comment": "Richtig."
          },
          {
            "text": "Strukturierter Pfadtest ist schärfer als Mehrfach- Bedingungsüberdeckung",
            "comment": "Kann man so nicht sagen. Beide Kriterien liegen quer zu einander."
          },
          {
            "text": "Mehrfach- Bedingungsüberdeckung ist schärfer als Anweisungsüberdeckung (C0)",
            "comment": "Anweisungsüberdeckung ist das schwächste Kriterium"
          }
        ],
        "correct": [ false, true, false, true, false, true, false, true, false, true ]
      },
      {
        "text": "Mit wie vielen Testdaten kann man bei folgendem Code-Beispiel C1 erreichen? Was ist das Minimum?<br><pre style=\"background-color:#ffffff;color:#000000;font-family:'Menlo';\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"><span style=\"color:#000080;font-weight:bold;\">void </span>minimum(<span style=\"color:#000080;font-weight:bold;\">int </span>i){<br> <span style=\"color:#000080;font-weight:bold;\">while </span>(i &gt; <span style=\"color:#0000ff;\">0</span>){<br> <span style=\"color:#000080;font-weight:bold;\">if </span>(i&gt;<span style=\"color:#0000ff;\">100</span>) i -= <span style=\"color:#0000ff;\">100</span>;<br> <span style=\"color:#000080;font-weight:bold;\">if </span>(i&gt;<span style=\"color:#0000ff;\">10</span>) i -= <span style=\"color:#0000ff;\">10</span>;<br> System.<span style=\"color:#660e7a;font-weight:bold;font-style:italic;\">out</span>.println(i);<br> i--;<br> }<br>}</pre>",
        "answers": [
          {
            "text": "Antwort:",
            "comment": "z.B. mit 0 und 101. Wegen i-- würden alle Zweige ebenfalls durchlaufen. "
          }
        ],
        "input": "number",
        "attributes": { "min": 0 },
        "swap": true,
        "correct": 2
      },
      {
        "text": "Welches Testüberdeckungskriterium erfüllt die Tests mit 1,2,6 bei folgender Funktion:",
        "answers": [
          {
            "text": "C0",
            "comment": "Anweisungsüberdeckung (C0) wird erfüllt, da jede Anweisung durchlaufen wird."
          },
          {
            "text": "C1",
            "comment": "Zweigüberdeckung (C1) wird nicht erfüllt, da der Zweig i%2==0 && i%3!=0 nie durchlaufen wird."
          },
          {
            "text": "Einfache Bedingungsüberdeckung",
            "comment": "Einfache Bedingungsüberdeckung wird erfüllt, da jede Bedingung einmal zu true und ein anderes Mal zu false wird. "
          },
          {
            "text": "Bedingungs-/Entscheidungsüberdeckung",
            "comment": "Bedingungs-/Entscheidungsüberdeckung wird nicht erfüllt, da die Zweigüberdeckung (C1) ebenfalls nicht erfüllt wird und die Zweigüberdeckung ein Teil davon ist."
          },
          {
            "text": "Minimaler Mehrfach-Bedingungsüberdeckung",
            "comment": "Minimaler Mehrfach- Bedingungsüberdeckung wird erfüllt, weil jeder Teilausdruck einmal zu true und ein anderes Mal zu false wird."
          },
          {
            "text": "Mehrfach-Bedingungsüberdeckung",
            "comment": "Mehrfach-Bedingungsüberdeckung ist ebenfalls erfüllt, weil es keine komplexen Bedingungen gibt und die Einfache Bedingungsüberdeckung erfüllt ist. "
          },
          {
            "text": "Boundary Interior-Test",
            "comment": "Boundary Interior-Test ist erfüllt, da keine Schleifen vorhanden sind."
          },
          {
            "text": "Modifizierter Boundary Interior-Test",
            "comment": "Modifizierter Boundary Interior-Test ist nicht erfüllt, da die Zweigüberdeckung (C1) ebenfalls nicht erfüllt wird und die Zweigüberdeckung ein Teil davon ist."
          },
          {
            "text": "Pfadüberdeckung",
            "comment": "Pfadüberdeckung ist nicht erfüllt, da die Zweigüberdeckung (C1) ebenfalls nicht erfüllt wird und die Zweigüberdeckung ein Teil davon ist."
          }
        ],
        "correct": [ true, false, true, false, true, true, true, false, false ]
      }
    ]
  },

  "was-ist-html": {
    "key": "was-ist-html",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "feedback": true,
    "start_button": true,
    "navigation": true,
    "anytime_finish": true,
    "random": true,
    "onfinish": { "restart": true },
    "placeholder": {
      "start": "Quiz starten",
      "question": "Frage",
      "prev": "Zurück",
      "submit": "Auflösung",
      "next": "Nächste Frage",
      "finish": "Beenden"
    },
    "questions": [
      {
        "text": "Was ist HTML?",
        "description": "Wählen Sie unter den folgenden Antworten die richtige Antwort aus.",
        "input": "radio",
        "answers": [
          "ein internetfähiges Gerät",
          "ein Programm",
          "ein Web-Service",
          "eine Auszeichnungssprache",
          "eine Forschungseinrichtung",
          "eine Programmiersprache",
          "eine Skriptspache",
          "eine Stylesheet-Sprache",
          "etwas essbares"
        ],
        "correct": 3
      },
      {
        "text": "Wofür steht HTML?",
        "input": "radio",
        "answers": [
          "High-level Technology Media Language",
          "Home Technology Media Language",
          "Home Tool Markup Language",
          "How To Miss Without Laugh",
          "Hyperlink Media Language",
          "Hyperlinks and Text Markup Language",
          "Hypertext Markup Language",
          "Hypertext Markup Level",
          "Hypertext Media Language"
        ],
        "correct": 6
      },
      {
        "text": "Wofür wird HTML eingesetzt?",
        "input": "radio",
        "answers": [
          {
            "text": "für den Aufruf von Webseiten",
            "comment": "Zum Aufrufen von Webseiten nutzt man einen <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Webbrowser\">Webbrowser</a>."
          },
          {
            "text": "für die Beschreibung zusätzlicher Element-Eigenschaften",
            "comment": "Zur Beschreibung zusätzlicher Eigenschaften von Elementen werden in Auszeichnungssprachen <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Attribut_(Auszeichnungssprache)\">Attribute</a> genutzt."
          },
          {
            "text": "für die dynamische Manipulation von Webseiten",
            "comment": "Zur dynamischen Manipulation von Webseiten nutzt man <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>."
          },
          {
            "text": "für die elektronische Datenverwaltung",
            "comment": "Zur elektronischen Datenverwaltung nutzt man <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Datenbank\">Datenbanken</a>."
          },
          {
            "text": "für die Gestaltung von Layout und Design von Webseiten",
            "comment": "Zur Gestaltung von Layout und Design einer Webseite nutzt man <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Cascading_Style_Sheets\">Cascading Style Sheets (CSS)</a>."
          },
          {
            "text": "für die Programmierung von Webseiten",
            "comment": "HTML ist keine Programmiersprache, sondern eine reine <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Auszeichnungssprache\">Auszeichnungssprache</a>."
          },
          "für die Strukturierung digitaler Dokumente",
          {
            "text": "für die Übertragung von Daten im Internet",
            "comment": "Im Internet nutzt man zur Übertragung von Daten üblicherweise das <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Hypertext_Transfer_Protocol\">Hypertext Transfer Protocol (HTTP)</a>."
          },
          "um morgens aus dem Bett zu kommen"
        ],
        "correct": 6
      },
      {
        "text": "Was ist ein Hyperlink und wofür setzt man ihn ein?",
        "description": "Ein Hyperlink ist...",
        "input": "radio",
        "answers": [
          "der Künstername des Erfinders des Web.",
          "ein Dateiformat für digitale Dokumente.",
          "ein Gremium zur Ausarbeitung von Web-Standards.",
          "ein Querverweis zum Springen an andere Textstellen in Hypertexten.",
          "ein Modewort zur Vermarktung des Web.",
          "ein Portal in das digitale Zeitalter.",
          "ein Web-Standard zur einheitlichen Verbreitung von Informationen.",
          "eine Arbeitsgruppe zur Weiterentwicklung von HTML.",
          "eine Markierung zum Hervorheben interessanter Textstellen."
        ],
        "correct": 3
      },
      {
        "text": "Wer hat HTML erfunden?",
        "input": "radio",
        "answers": [
          {
            "text": "Bill Gates",
            "comment": "Bill Gates ist der Gründer von Microsoft."
          },
          {
            "text": "Fred Feuerstein",
            "comment": "Fred Feuerstein ist der Vater in der Familie Feuerstein aus der gleichnamigen Zeichentrickserie."
          },
          {
            "text": "Jeff Bezos",
            "comment": "Jeff Bezos ist der Gründer von Amazon."
          },
          {
            "text": "Larry Page",
            "comment": "Larry Page ist einer der Google-Gründer."
          },
          {
            "text": "Mark Zuckerberg",
            "comment": "Mark Zuckerberg ist der Gründer von Facebook."
          },
          {
            "text": "Mike Sandel",
            "comment": "Mike Sandel war der Chef von Tim Berners-Lee."
          },
          {
            "text": "Robert Cailliau",
            "comment": "Robert Cailliau ist der erste Web-Surfer und Freund von Tim-Berners-Lee."
          },
          {
            "text": "Steve Jobs",
            "comment": "Steve Jobs ist der Gründer von Apple."
          },
          {
            "text": "Tim Berners-Lee",
            "comment": "Tim Berners-Lee ist der Erfinder von HTML und der Begründer des World Wide Web (WWW)."
          }
        ],
        "correct": 8
      },
      {
        "text": "Zu welchem ursprünglichen Zweck wurde HTML erfunden?",
        "input": "radio",
        "answers": [
          "für das Sammeln von Daten",
          "für das Streamen von Filmen",
          "für den Aufbau sozialer Netze",
          "für den Aufbau von Tauschbörsen im Internet",
          "für den Austausch wissenschaftlicher Publikationen",
          "für die digitalen Lehre",
          "für die Stärkung von Demokratie",
          "für die Verbreitung von Unterhaltungselektronik",
          "für militärische Zwecke"
        ],
        "correct": 4
      },
      {
        "text": "Wer arbeitet alles an der Weiterentwicklung von HTML?",
        "description": "<b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "answers": [
          "das World Wide Web Consortium (W3C)",
          "die Europäische Union (EU)",
          "die offene Gesellschaft",
          "die Organisation des Nordatlantikvertrags (NATO)",
          "die Nationale Sicherheitsbehörde (NSA)",
          "die Vereinten Nationen (UN)",
          "die Web Hypertext Application Technology Working Group (WHATWG)",
          "Facebook",
          "Youtube"
        ],
        "correct": [ 0, 6 ]
      },
      {
        "text": "In welcher Version liegt HTML aktuell vor?",
        "input": "radio",
        "answers": [
          "HTML+",
          "HTML 2",
          "HTML 3",
          "HTML 4",
          "HTML5",
          "HTML6",
          "HTML10",
          "XHTML 1",
          "XHTML 2"
        ],
        "correct": 4
      }
    ]
  },

  "erste-webseite": {
    "key": "erste-webseite",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "feedback": true,
    "start_button": true,
    "navigation": true,
    "anytime_finish": true,
    "random": true,
    "onfinish": { "restart": true },
    "placeholder": {
      "start": "Quiz starten",
      "question": "Frage",
      "prev": "Zurück",
      "submit": "Auflösung",
      "next": "Nächste Frage",
      "correct": "Korrekte Lösung: ",
      "finish": "Beenden"
    },
    "questions": [
      {
        "text": "Sind Sie in der Lage eine neue Webseite mit dem Inhalt \"Hallo Welt!\" über ein HTML-basiertes digitales Dokument zu erstellen?",
        "description": "Im Folgenden sind einzelne Arbeitsschritte aufgeführt. Geben Sie für die zutreffenden Arbeitsschritte die richtige Reihenfolge an. Markieren Sie also den ersten Schritt mit \"1\", den Zweiten mit \"2\" u.s.w.. Markieren Sie die Schritte die nicht zutreffen mit \"0\".",
        "input": "number",
        "attributes": {
          "min": 0,
          "max": 9
        },
        "answers": [
          "Änderungen an der Datei speichern",
          "Angabe der Dokumenttypdefinition",
          "Datei einen Namen geben",
          "Datei zum Bearbeiten öffnen",
          "Dateiendung \".html\" festlegen",
          "Fertigbaukasten wählen",
          "Inhalt \"Hallo Welt!\" festlegen",
          "Neue Datei anlegen",
          "Registrierung im Internet"
        ],
        "correct": [ 7, 5, 2, 4, 3, 0, 6, 1, 0 ]
      },
      {
        "text": "Mit welchem Programm kann der Inhalt eines HTML-basierten digitalen Dokuments als Webseite dargestellt werden?",
        "description": "Wählen Sie unter den folgenden Antworten die richtige Antwort aus.",
        "input": "radio",
        "answers": [
          "mit dem Papierkorb",
          "mit einem Bildbearbeitungsprogramm",
          "mit einem Dateimanager",
          "mit einem Kommandozeilen-Tool",
          "mit einem Online-Editor",
          "mit einem Texteditor",
          "mit einem Video-Player",
          "mit einem Webbrowser",
          "mit einer Entwicklungsumgebung"
        ],
        "correct": 7
      },
      {
        "text": "Was hat es mit der Dokumenttyp-Deklaration in HTML auf sich?",
        "description": "Die Dokumenttyp-Deklaration...",
        "input": "radio",
        "answers": [
          "deklariert die Korrektheit des Dokumenttyps.",
          "deklariert Meta-Informationen zur Webseite.",
          "dient zur Festlegung von Titel und Zeichenkodierung der Webseite.",
          "enthält alle Daten des gesamten HTML-Dokuments.",
          "enthält das Veröffentlichungsdatum und den Namen des Authoren der Webseite.",
          "enthält die Inhalte, die vom Webbrowser in der Webseite dargestellt werden.",
          "gibt an in welcher Sprache das HTML-Dokument zu interpretieren ist.",
          "gibt an mit welchem Programm das HTML-Dokument auszuführen ist.",
          "gibt an unter welchen Bedingungen das HTML-Dokument zu öffnen ist."
        ],
        "correct": 6
      },
      {
        "text": "Wie sieht die Dokumenttyp-Deklaration für HTML5 aus?",
        "input": "radio",
        "answers": [
          {
            "text": "&lt;!DOCTYPE HTML&gt;",
            "comment": "Seit HTML5 ist die Dokumenttyp-Deklaration endlich kürzer, unkomplizierter und verständlicher."
          },
          "&lt;!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\"&gt;",
          "&lt;!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"&gt;",
          "&lt;!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"&gt;",
          "&lt;!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"&gt;",
          "&lt;!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"&gt;",
          "&lt;!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"&gt;",
          "&lt;!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\"&gt;",
          {
            "text": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
            "escape": true
          }
        ],
        "correct": 0
      }
    ]
  },

  "html-tag": {
    "key": "html-tag",
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "feedback": true,
    "start_button": true,
    "navigation": true,
    "anytime_finish": true,
    "random": true,
    "onfinish": { "restart": true },
    "placeholder": {
      "start": "Quiz starten",
      "question": "Frage",
      "prev": "Zurück",
      "submit": "Auflösung",
      "next": "Nächste Frage",
      "finish": "Beenden"
    },
    "questions": [
      {
        "text": "Was ist ein HTML-Tag?",
        "description": "Wählen Sie unter den folgenden Antworten die richtige Antwort aus.",
        "input": "radio",
        "answers": [
          {
            "text": "ein Auszeichnungselement",
            "comment": "Reflektieren Sie was <a target=\"_blank\" href=\"https://de.wikipedia.org/w/index.php?title=Auszeichnungselement\">Auszeichnungselement</a> in Bezug auf HTML genau bedeutet."
          },
          "ein Befehl",
          "ein Feiertag",
          "ein Platzhalter",
          "ein Sonderzeichen",
          "eine Anweisung",
          "eine Eigenschaft",
          "eine Instruktion",
          "eine Variable"
        ],
        "correct": 0
      },
      {
        "text": "Wofür nutzt man einen HTML-Tag?",
        "description": "<b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "answers": [
          {
            "text": "Für eine darstellungsorientierte Textauszeichnung",
            "comment": "Ein HTML-Tag dient nur zur beschreibenden und nicht zur verfahrens- oder darstellungsorientierten Textauszeichnung."
          },
          {
            "text": "Um Angaben zur Textpräsentation zu machen",
            "comment": "Ein HTML-Tag dient vielmehr zur strukturierenden Auszeichnung, um Textbereichen eine Bedeutung zu geben."
          },
          {
            "text": "Um dynamische Abläufe zu beschreiben",
            "comment": "HTML-Tags beschreiben die Struktur und Semantik der Inhalte eines digitalen Dokuments."
          },
          {
            "text": "Zur Einbettung weiterer Inhalte, die über Text hinausgehen",
            "comment": "Über HTML-Tags können beispielsweise weitere Inhalte wie Bilder, Audios und Videos in die Webseite eingebettet werden."
          },
          {
            "text": "Zum Markieren von Feiertagen",
            "comment": "Ein HTML-Tag dient zur Markierung von Textbereichen in digitalen Dokumenten, um ihnen eine Bedeutung zu geben."
          },
          {
            "text": "Zur Formatierung von Texten",
            "comment": "Ein HTML-Tag dient nur der reinen semantischen Strukturierung von Texten und nicht zu dessen Formatierung."
          },
          {
            "text": "Zur Identifizierung von Textzeilen",
            "comment": "HTML-Tags dienen zur Identifizierung von Inhaltstypen. Also welche Textbereiche beispielsweise vom Typ Überschrift sind."
          },
          {
            "text": "Zur Steuerung des Webbrowsers",
            "comment": "Mit HTML-Tags steuert man den strukturellen Aufbau einer Webseite."
          },
          "Zur Strukturierung von Webseiteninhalten"
        ],
        "correct": [ 3, 8 ]
      },
      {
        "text": "Woraus besteht ein HTML-Tag und wie setzt man ihn ein?",
        "description": "Geben Sie für die folgenden HTML-Codes an, in welchen davon die enthaltenen HTML-Tags korrekt eingesetzt werden.<br><br><b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "answers": [
          {
            "text": "&lt;h1&gt;Überschrift&lt;h1&gt;",
            "comment": "Hier fehlt beim schließenden &lt;h1&gt;-Tag der Schrägstrich."
          },
          "&lt;h2&gt;Überschrift&lt;/h2&gt;",
          {
            "text": "&lt;h3&gt;Überschrift&lt;/h4&gt;",
            "comment": "Hier werden zwei HTML-Tags mit unterschiedlichem Namen verwendet."
          },
          {
            "text": "&lt;p&gt;Paragraph",
            "comment": "Hier fehlt der schließende &lt;p&gt;-Tag."
          },
          {
            "text": "&lt;p&gt;Paragraph&lt;p&gt;",
            "comment": "Hier fehlt beim schließenden &lt;p&gt;-Tag der Schrägstrich."
          },
          "&lt;p&gt;Paragraph&lt;/p&gt;",
          "Hallo Welt!&lt;br&gt;Willkommen.",
          {
            "text": "Hallo Welt!&lt;br/&gt;Willkommen.",
            "comment": "Die Schreibweise &lt;br/&gt; gibt es in HTML5 nicht mehr."
          },
          {
            "text": "Hallo Welt!&lt;br&gt;&lt;/br&gt;Willkommen.",
            "comment": "Bei &lt;br&gt;-Tags wird nur ein öffnender HTML-Tag benötigt."
          }
        ],
        "correct": [ 1, 5, 6 ]
      },
      {
        "text": "Welche HTML-Tags dienen zur Markierung von Überschriften?",
        "description": "<b style='color: orangered;'>Mehrfachauswahl möglich</b>",
        "input": "checkbox",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": [ 2, 3, 4, 5, 6, 7 ]
      },
      {
        "text": "Welcher HTML-Tag dient zur Markierung von Paragraphen?",
        "input": "radio",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": 8
      },
      {
        "text": "Welcher HTML-Tag dient zur Markierung von Zeilenumbrüchen?",
        "input": "radio",
        "escape": true,
        "answers": [
          "<br>",
          "<h>",
          "<h1>",
          "<h2>",
          "<h3>",
          "<h4>",
          "<h5>",
          "<h6>",
          "<p>"
        ],
        "correct": 0
      },
      {
        "text": "Wie schreibt man einen Kommentar in HTML?",
        "input": "radio",
        "answers": [
          {
            "text": "! Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Fortran\">Fortran</a>"
          },
          {
            "text": "# Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Perl_(Programmiersprache)\">Perl</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Python_(Programmiersprache)\">Python</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/R_(Programmiersprache)\">R</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Ruby_(Programmiersprache)\">Ruby</a>."
          },
          {
            "text": "' Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/BASIC\">BASIC</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Visual_Basic\">Visual Basic</a>."
          },
          {
            "text": "/* Kommentar */",
            "comment": "So schreibt man einen Blockkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C_(Programmiersprache)\">C</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C%2B%2B\">C++</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C-Sharp\">C#</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/D_(Programmiersprache)\">D</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/PHP\">PHP</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a>."
          },
          {
            "text": "/** Kommentar */",
            "comment": "So schreibt man einen Dokumentationskommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>."
          },
          {
            "text": "// Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C_(Programmiersprache)\">C</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C%2B%2B\">C++</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/C-Sharp\">C#</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/JavaScript\">JavaScript</a>, <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/PHP\">PHP</a> und <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Java_(Programmiersprache)\">Java</a>."
          },
          {
            "text": "; Kommentar",
            "comment": "So schreibt man einen Zeilenkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Assemblersprache\">Assembler</a>."
          },
          "&lt;!-- Kommentar -->",
          {
            "text": "{ Kommentar }",
            "comment": "So schreibt man einen Blockkommentar in Programmiersprachen wie <a target=\"_blank\" href=\"https://de.wikipedia.org/wiki/Pascal_(Programmiersprache)\">Pascal</a>."
          }
        ],
        "correct": 7
      }
    ]
  }

};