/**
 * @overview configurations of ccm component for user input
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    "key": "demo",
    "form": true,
    "button": true,
    "inputs": [
      {
        "label": "Username",
        "name": "username",
        "input": "text",
        "placeholder": "JohnDoe"
      },
      {
        "label": "Password",
        "name": "password",
        "input": "password",
        "pattern": "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{3,}",
        "title": "At least three characters with at least one digit, one capital letter and one lower case letter.",
        "maxlength": "5",
        "size": "3",
        "required": true
      },
      {
        "label": "I'am...",
        "name": "destination",
        "input": "radio",
        "values": [
          { "value": "here" },
          { "value": "there" },
          { "value": "disabled", "caption": "somewhere", "disabled": true, "title": "disabled" }
        ]
      },
      {
        "label": "General terms and conditions",
        "name": "gtc",
        "input": "checkbox",
        "caption": "Accept"
      },
      {
        "label": "Available?",
        "name": "available",
        "input": "checkbox",
        "values": [
          { "name": "private_life", "caption": "Private Live" },
          { "name": "working_life", "caption": "Working Life" },
          { "name": "free", "value": "free_time", "caption": "Free Time" }
        ]
      },
      {
        "label": "Role",
        "name": "role",
        "input": "select",
        "options": [
          {
            "value": "thinker",
            "caption": "Thinker"
          },
          {
            "value": "investigator",
            "caption": "Investigator"
          },
          {
            "value": "coordinator",
            "caption": "Coordinator"
          },
          {
            "value": "shaper",
            "caption": "Shaper"
          },
          {
            "value": "evaluator",
            "caption": "Evaluator"
          },
          {
            "value": "teamworker",
            "caption": "Teamarbeiter"
          },
          {
            "value": "implementer",
            "caption": "Implementer"
          },
          {
            "value": "completer",
            "caption": "Completer"
          },
          {
            "value": "specialist",
            "caption": "Specialist"
          }
        ]
      },
      {
        "label": "Story",
        "name": "story",
        "placeholder": "A long time ago in a galaxy far, far away...",
        "input": "textarea",
        "rows": "2",
        "cols": "18"
      },
      {
        "label": "Magic Number",
        "name": "nr",
        "input": "number",
        "min": "1",
        "max": "9",
        "step": "2"
      },
      {
        "label": "Date",
        "name": "date",
        "input": "date",
        "min": "1984-06-11",
        "max": "2030-01-01"
      },
      {
        "label": "Colour",
        "name": "colour",
        "input": "color"
      },
      {
        "label": "Years of Service",
        "name": "years_of_service",
        "input": "range",
        "value": "15",
        "min": "0",
        "max": "65"
      },
      {
        "label": "Month",
        "name": "month",
        "input": "month"
      },
      {
        "label": "Week",
        "name": "week",
        "input": "week"
      },
      {
        "label": "Time",
        "name": "time",
        "input": "time"
      },
      {
        "label": "Sidereal Time",
        "name": "datetime",
        "input": "datetime"
      },
      {
        "label": "Local Time",
        "name": "localtime",
        "input": "datetime-local"
      },
      {
        "label": "Email",
        "name": "email",
        "input": "email"
      },
      {
        "label": "Search",
        "name": "search",
        "input": "search"
      },
      {
        "label": "Phone",
        "name": "phone",
        "input": "tel"
      },
      {
        "label": "Homepage",
        "name": "homepage",
        "input": "url"
      }
    ],
    "initial": {
      "username": "JohnDoe",
      "password": "1aA",
      "destination": "there",
      "gtc": true,
      "available": {
        "private_life": true,
        "working_life": true
      },
      "role": "coordinator",
      "story": "my story..",
      "nr": 3,
      "date": "2017-03-11",
      "colour": "#0000FF",
      "years_of_service": 32,
      "month": "2017-03",
      "week": "2017-W10",
      "time": "08:15",
      "localtime": "2017-03-11T08:15"
    },
    "onfinish": { "log": true }
  },

  "test": {
    "key": "test",
    "form": true,
    "button": true,
    "inputs": [
      {
        "label": "FooBar",
        "name": "foo.bar",
        "input": "text"
      },
      {
        "label": "FooBaz",
        "name": "foo.baz",
        "input": "text"
      },
      {
        "label": "AbcXyz",
        "name": "abc.xyz",
        "input": "text"
      },
      {
        "label": "Alphabet",
        "name": "a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z",
        "input": "text"
      }
    ],
    "initial": {
      "key": "test",
      "foo": {
        "bar": "FooBar",
        "baz": "FooBaz"
      },
      "abc": {
        "xyz": "AbcXyz"
      },
      "a": {
        "b": {
          "c": {
            "d": {
              "e": {
                "f": {
                  "g": {
                    "h": {
                      "i": {
                        "j": {
                          "k": {
                            "l": {
                              "m": {
                                "n": {
                                  "o": {
                                    "p": {
                                      "q": {
                                        "r": {
                                          "s": {
                                            "t": {
                                              "u": {
                                                "v": {
                                                  "w": {
                                                    "x": {
                                                      "y": {
                                                        "z": "Alphabet"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "onfinish": { "log": true }
  }

};