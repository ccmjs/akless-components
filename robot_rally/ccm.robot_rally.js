/**
 * @overview ccmjs-based web component for a robot rally boardgame
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (24.02.2021)
 */

( () => {

  const category = {
    0: "space",
    1: "start",
    2: "arrow",
    3: "express",

    4: "left",
    5: "right",
    6: "up",
    7: "down",

    8: "turn-left",
    9: "turn-right",
    10: "vertical",
    11: "horizontal",

    12: "wall-left",
    13: "wall-right",
    14: "wall-up",
    15: "wall-down",

    16: "r1",
    17: "r2",
    18: "r3",
    19: "r4",

    20: "r5",
    21: "l1",
    22: "l2",
    23: "l3",

    24: "energy"
  };

  const phase = {
    0: "UPGRA",
    1: "PROGR",
    2: "TWONK",
    3: "HULKX",
    4: "HAMER",
    5: "SMASH",
    6: "ZOOMB",
    7: "SPINB"
  };

  const component = {
    name: 'robot_rally',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.1.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/robot_rally/resources/default.css" ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/robot_rally/resources/templates.mjs" ],

      "img": "./resources/img/",
      "fields": {
        "BLANK": 0,
        "START": 2,
        "DAR_L": 28,
        "ARR_R": 36,
        "DAR_R": 44,
        "DAR_U": 76,
        "DAR_D": 140,
        "DALUL": 284,
        "DARDR": 300,
        "DAURU": 332,
        "DADLD": 396,
        "DALDL": 540,
        "DARUR": 556,
        "DAULU": 588,
        "DADRD": 652,
        "WALLR": 8192,
        "WALLU": 16384,
        "WALLD": 32768,
        "WL_LH": 2103296,
        "WR_LH": 2107392,
        "WD_LV": 2130944,
        "WU_LV": 2114560,
        "POWER": 16777216
      },
      "explanation": {
        "starter": "If you’re playing for the first time, start here!",
        "beginner": "Comfortable with the basic ROBO RALLY rules? Try these courses, where you’ll need to interact with the board elements more than you did in Dizzy Highway.",
        "intermediate": "Feel like you can take on any board element any time? Well, you can’t escape them in the intermediate courses. You’ll get stuck. You’ll get shot. You’ll chase moving checkpoints.",
        "advanced": "These are for players looking for a strategic challenge. Cramped spaces mean near-constant interaction with board elements and rival robots.",
        "crazy": "We don’t know who designed these. They’re just mean.",
        "duration": "This is the typical amount of time it’ll take players who are familiar with the ROBO RALLY rules to get through the course. A short game may take about thirty minutes; a medium game may take about one hour; and a long game may take an hour and a half or more. The actual game time will depend on the number of players.",
        "rules": "Some racing courses include rules you’ll need to follow in addition to the core ROBO RALLY rules."
      },
      "racetracks": {
        "DIZZY": {
          "id": "DIZZY",
          "name": "DIZZY HIGHWAY",
          "difficulty": "STARTER COURSE",
          "duration": "Short",
          "rules": "None",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "DAR_D", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DADLD", "DALDL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DALUL", "DAR_L" ],
            [ "BLANK", "WALLU", "BLANK", "BLANK", "DAR_D", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAULU", "DAR_L" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "WU_LV", "BLANK", "WL_LH", "WR_LH", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WALLR", "BLANK", "DAR_D", "BLANK", "WD_LV", "BLANK", "POWER", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WALLR", "BLANK", "DAR_D", "BLANK", "BLANK", "POWER", "BLANK", "WU_LV", "BLANK", "DAR_U", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "WL_LH", "WR_LH", "BLANK", "WD_LV", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "WALLD", "BLANK", "DAR_R", "DADRD", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "DARDR", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DARUR", "DAURU", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "width": 64,
              "height": 64,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 7,
              "y": 3,
              "width": 74,
              "height": 74,
              "direction": 1,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "CHECK",
              "nr": 1,
              "x": 12,
              "y": 3,
              "width": 74,
              "height": 74
            }
          ],
          "direction": 0
        }
      },
      "objects": {
        "ANTEN": {
          "id": "ANTEN",
          "name": "Priority Antenna"
        },
        "CHECK": {
          "id": "CHECK",
          "name": "Checkpoint Token"
        },
        "ECUBE": {
          "id": "ECUBE",
          "name": "Energy Cube"
        },
        "REBOT": {
          "id": "REBOT",
          "name": "Reboot Token"
        }
      },
      "robots": {
        "TWONK": {
          "id": "TWONK",
          "name": "TWONKY"
        },
        "HULKX": {
          "id": "HULKX",
          "name": "HULK x90"
        },
        "HAMER": {
          "id": "HAMER",
          "name": "HAMMER BOT"
        },
        "SMASH": {
          "id": "SMASH",
          "name": "SMASH BOT"
        },
        "ZOOMB": {
          "id": "ZOOMB",
          "name": "ZOOM BOT"
        },
        "SPINB": {
          "id": "SPINB",
          "name": "SPIN BOT"
        }
      },
      "cards": {
        "MOVE1": {
          "id": "MOVE1",
          "name": "MOVE 1",
          "amount": 5,
          "effect": "Move your robot in the direction it is facing the number of spaces indicated."
        },
        "MOVE2": {
          "id": "MOVE2",
          "name": "MOVE 2",
          "amount": 3,
          "effect": "Move your robot in the direction it is facing the number of spaces indicated."
        },
        "MOVE3": {
          "id": "MOVE3",
          "name": "MOVE 3",
          "amount": 1,
          "effect": "Move your robot in the direction it is facing the number of spaces indicated."
        },
        "RIGHT": {
          "id": "RIGHT",
          "name": "TURN RIGHT",
          "amount": 3,
          "effect": "Turn your robot 90 degrees to the right. The robot remains in its current space."
        },
        "TLEFT": {
          "id": "TLEFT",
          "name": "TURN LEFT",
          "amount": 3,
          "effect": "Turn your robot 90 degrees to the left. The robot remains in its current space."
        },
        "UTURN": {
          "id": "UTURN",
          "name": "U-TURN",
          "amount": 1,
          "effect": "Turn your robot 180 degrees so it faces the opposite direction. The robot remains in its current space."
        },
        "BACK1": {
          "id": "BACK1",
          "name": "BACK UP",
          "amount": 1,
          "effect": "Move your robot one space back. The robot does not change the direction it is facing."
        },
        "POWUP": {
          "id": "POWUP",
          "name": "POWER UP",
          "amount": 1,
          "effect": "Take one energy cube, and place it on your player mat."
        },
        "AGAIN": {
          "id": "AGAIN",
          "name": "AGAIN",
          "amount": 2,
          "effect": "Repeat the programming in your previous register. If your previous register was a damage card, draw a card from the top of your deck, and play that card this register. If you used an upgrade in your previous register that allowed you to play multiple programming cards, re-execute the second card. This card cannot be played in the first register."
        }
      },
      "damage": {
        "SPAMD": {
          "id": "SPAMD",
          "name": "SPAM",
          "amount": 38,
          "effect": "This is the simplest form of damage. Robots must take a SPAM damage card when they are shot by a board or robot laser."
        },
        "WORMD": {
          "id": "WORMD",
          "name": "WORM",
          "amount": 6,
          "effect": "When you program a worm damage card, you must immediately reboot your robot."
        },
        "TROJA": {
          "id": "TROJA",
          "name": "TROJAN HOURSE",
          "amount": 12,
          "effect": "When you program a Trojan horse damage card, you must immediately take two SPAM damage cards."
        },
        "VIRUS": {
          "id": "VIRUS",
          "name": "VIRUS",
          "amount": 18,
          "effect": "When you program a virus damage card, any robot on the board within a six-space radius of you must immediately take a virus card from the draw pile."
        }
      },
      "special": {
        "EROUT": {
          "id": "EROUT",
          "name": "ENERGY ROUTINE",
          "effect": "Take one energy cube, and place it on your player mat."
        },
        "SBOXR": {
          "id": "SBOXR",
          "name": "SANDBOX ROUTINE",
          "effect": "Choose one of the following actions to perform this register: MOVE 1, MOVE 2, MOVE 3, BACK UP, TURN LEFT, TURN RIGHT, U-TURN"
        },
        "WEASR": {
          "id": "WEASR",
          "name": "WEASEL ROUTINE",
          "effect": "Choose one of the following actions to perform this register: TURN LEFT, TURN RIGHT, U-TURN."
        },
        "SPEED": {
          "id": "SPEED",
          "name": "SPEED ROUTINE",
          "effect": "Move your robot 3 spaces in the direction it is facing."
        },
        "SPAMF": {
          "id": "SPAMF",
          "name": "SPAM FILTER",
          "effect": "Permanently discard one SPAM damage card from your discard pile to the SPAM damage card draw pile."
        },
        "REPAT": {
          "id": "REPAT",
          "name": "REPEAT ROUTINE",
          "effect": "Repeat the programming in your previous register. If your previous register was a damage card, draw a card from the top of your deck, and play that card this register. If you used an upgrade in your previous register that allowed you to play multiple programming cards, re-execute the second card."
        }
      },
      "upgrades": {
        "ADMIN": {
          "id": "ADMIN",
          "name": "ADMIN PRIVILEGE",
          "cost": 3,
          "permanent": true,
          "effect": "Once per round, you may give your robot priority for one register."
        },
        "CWAVE": {
          "id": "CWAVE",
          "name": "CORRUPTION WAVE",
          "cost": 4,
          "permanent": true,
          "effect": "You may put SPAM damage cards you deal on top of opponents’ decks."
        },
        "SCREN": {
          "id": "SCREN",
          "name": "BLUE SCREEN OF DEATH",
          "cost": 4,
          "permanent": true,
          "effect": "When you shoot or push an adjacent robot, you may give that player one worm damage card instead of one SPAM damage card."
        },
        "CLEGS": {
          "id": "CLEGS",
          "name": "CRAB LEGS",
          "cost": 5,
          "permanent": true,
          "effect": "When executing a Move 1 card, you may move one space forward then one space right or left, without rotating and regardless of the direction you are facing. Then move forward one additional space in the direction you are facing."
        },
        "BRAKE": {
          "id": "BRAKE",
          "name": "BRAKES",
          "cost": 3,
          "permanent": true,
          "effect": "You may treat your Move 1’s as Move 0’s."
        },
        "SHILD": {
          "id": "SHILD",
          "name": "DEFLECTOR SHIELD",
          "cost": 2,
          "permanent": true,
          "effect": "At the beginning of a register, you may spend one energy to negate any robot lasers that would hit you that register."
        },
        "CACHE": {
          "id": "CACHE",
          "name": "CACHE MEMORY",
          "cost": 4,
          "permanent": true,
          "effect": "You may discard cards from your hand and place them on the top of your deck. Do not draw replacement cards."
        },
        "DEFRA": {
          "id": "DEFRA",
          "name": "DEFRAG GIZMO",
          "cost": 5,
          "permanent": true,
          "effect": "Once during each round, you may permanently discard one damage card from your hand. Draw a replacement card from the top of your deck."
        },
        "DBLAS": {
          "id": "DBLAS",
          "name": "DOUBLE BARREL LASER",
          "cost": 2,
          "permanent": true,
          "effect": "Deal one additional SPAM damage card to any robot you shoot."
        },
        "MODCH": {
          "id": "MODCH",
          "name": "MODULAR CHASSIS",
          "cost": 1,
          "permanent": true,
          "effect": "When you push another robot, give that player this card, and take one of their installed upgrades. That player keeps this card until they use it."
        },
        "FIREW": {
          "id": "FIREW",
          "name": "FIREWALL",
          "cost": 3,
          "permanent": true,
          "effect": "Take no SPAM damage cards when rebooting."
        },
        "PBEAM": {
          "id": "PBEAM",
          "name": "PRESSOR BEAM",
          "cost": 3,
          "permanent": true,
          "effect": "You may push any robot you shoot one space in the direction you are shooting."
        },
        "HUNIT": {
          "id": "HUNIT",
          "name": "HOVER UNIT",
          "cost": 1,
          "permanent": true,
          "effect": "Your robot can pass over, but not land on, pits. If you end your move on a pit, you fall in. You can’t turn off Hover Unit, and you can’t hover above another robot."
        },
        "RAILG": {
          "id": "RAILG",
          "name": "RAIL GUN",
          "cost": 2,
          "permanent": true,
          "effect": "You may shoot through any number of walls and/or robots. Robots in the line of fire take one SPAM damage card."
        },
        "MEMOR": {
          "id": "MEMOR",
          "name": "MEMORY STICK",
          "cost": 3,
          "permanent": true,
          "effect": "Draw one additional programming card at the start of each round."
        },
        "RGEAR": {
          "id": "RGEAR",
          "name": "RAMMING GEAR",
          "cost": 2,
          "permanent": true,
          "effect": "Deal one SPAM damage card when you push a robot."
        },
        "MINIH": {
          "id": "MINIH",
          "name": "MINI HOWITZER",
          "cost": 2,
          "permanent": true,
          "effect": "Once per register, when you shoot, you may pay one energy to deal two additional SPAM damage cards and push the attacked robot one space in the direction you are shooting."
        },
        "REARL": {
          "id": "REARL",
          "name": "REAR LASER",
          "cost": 2,
          "permanent": true,
          "effect": "Your robot may shoot backward as well as forward."
        },
        "SCRAM": {
          "id": "SCRAM",
          "name": "SCRAMBLER",
          "cost": 3,
          "permanent": true,
          "effect": "If you attack a robot, that player replaces the card in their next register with the top card of their deck, unless it is the final register."
        },
        "TBEAM": {
          "id": "TBEAM",
          "name": "TRACTOR BEAM",
          "cost": 3,
          "permanent": true,
          "effect": "When you shoot a robot, you may pull it toward you one space. Tractor beam may not be used on adjacent robots."
        },
        "SARMS": {
          "id": "SARMS",
          "name": "SIDE ARMS",
          "cost": 3,
          "permanent": true,
          "effect": "When you push a robot, you may choose to push it to the left or right instead of the direction you are facing."
        },
        "TRONE": {
          "id": "TRONE",
          "name": "TROJAN NEEDLER",
          "cost": 3,
          "permanent": true,
          "effect": "When you shoot or push a robot, target robot receives damage in the form of one Trojan horse damage card instead of one SPAM damage card."
        },
        "TELEP": {
          "id": "TELEP",
          "name": "TELEPORTER",
          "cost": 3,
          "permanent": true,
          "effect": "You may pay one energy to ignore obstacles when moving. This includes walls, pits, the priority antenna, and robots; however, you may not end your move on a wall, pit, or the priority antenna. If you move to a space with another robot, swap places with that robot."
        },
        "VIMOD": {
          "id": "VIMOD",
          "name": "VIRUS MODULE",
          "cost": 2,
          "permanent": true,
          "effect": "When you push a robot, give that player a virus damage card."
        },
        "BOINK": {
          "id": "BOINK",
          "name": "BOINK",
          "cost": 1,
          "permanent": false,
          "effect": "Move to an adjacent space. Do not change direction."
        },
        "HACKR": {
          "id": "HACKR",
          "name": "HACK",
          "cost": 1,
          "permanent": false,
          "effect": "Execute the programming in your current register again. This action does not replace any existing programming."
        },
        "ENROT": {
          "id": "ENROT",
          "name": "ENERGY ROUTINE",
          "cost": 3,
          "permanent": false,
          "effect": "Add the Energy Routine programming card to your discard pile. It is now permanently part of your deck. The Energy Routine programming card acts as an extra Power Up card in your programming deck."
        },
        "MSORT": {
          "id": "MSORT",
          "name": "MANUAL SORT",
          "cost": 1,
          "permanent": false,
          "effect": "You may give your robot priority for this register. This card overrides Admin Privilege."
        },
        "MSWAP": {
          "id": "MSWAP",
          "name": "MEMORY SWAP",
          "cost": 1,
          "permanent": false,
          "effect": "Draw three cards. Then choose three from your hand to put on top of your deck."
        },
        "REPRO": {
          "id": "REPRO",
          "name": "REPEAT ROUTINE",
          "cost": 3,
          "permanent": false,
          "effect": "Add the Repeat Routine programming card to your discard pile. It is now permanently part of your deck. The Repeat Routine programming card acts as an extra Again card in your programming deck."
        },
        "REBOT": {
          "id": "REBOT",
          "name": "REBOOT",
          "cost": 1,
          "permanent": false,
          "effect": "Reboot your robot, but take no damage."
        },
        "SBOXR": {
          "id": "SBOXR",
          "name": "SANDBOX ROUTINE",
          "cost": 5,
          "permanent": false,
          "effect": "Add the Sandbox Routine programming card to your discard pile. It is now permanently part of your deck. The Sandbox Routine programming card allows you to choose one of the following actions to perform in the register where it is programmed: MOVE 1, MOVE 2, MOVE 3, BACK UP, TURN LEFT, TURN RIGHT, U-TURN."
        },
        "RECHA": {
          "id": "RECHA",
          "name": "RECHARGE",
          "cost": 0,
          "permanent": false,
          "effect": "Gain three energy."
        },
        "SPAMB": {
          "id": "SPAMB",
          "name": "SPAM BLOCKER",
          "cost": 3,
          "permanent": false,
          "effect": "Replace each SPAM damage card in your hand with a card from the top of your deck. Immediately discard the SPAM damage cards by placing them in the SPAM damage card draw pile. If you draw new SPAM damage cards from your deck, keep them in your hand for this round."
        },
        "RECOM": {
          "id": "RECOM",
          "name": "RECOMPILE",
          "cost": 1,
          "permanent": false,
          "effect": "Discard your entire hand. Draw a new one. If you need to reshuffle your discard pile to replenish your deck, you may."
        },
        "SPFOR": {
          "id": "SPFOR",
          "name": "SPAM FOLDER ROUTINE",
          "cost": 2,
          "permanent": false,
          "effect": "Add the SPAM Folder programming card to your discard pile. It is now permanently part of your deck. The SPAM Folder programming card allows you to permanently discard one SPAM damage card from your discard pile."
        },
        "REFRE": {
          "id": "REFRE",
          "name": "REFRESH",
          "cost": 2,
          "permanent": false,
          "effect": "Change the programming in your current register to any of the following: MOVE 1, MOVE 2, MOVE 3, TURN LEFT, TURN RIGHT, U-TURN, BACK UP, AGAIN. If you’re replacing a damage card, you may permanently discard the damage card."
        },
        "SPEER": {
          "id": "SPEER",
          "name": "SPEED ROUTINE",
          "cost": 3,
          "permanent": false,
          "effect": "Add the Speed Routine programming card to your discard pile. It is now permanently part of your deck. The Speed Routine programming card acts as an extra Move 3 card in your programming deck."
        },
        "WEASR": {
          "id": "WEASR",
          "name": "WEASEL ROUTINE",
          "cost": 3,
          "permanent": false,
          "effect": "Add the Weasel Routine programming card to your discard pile. It is now permanently part of your deck. The Weasel Routine programming card allows you to choose one of the following actions to perform in the register where it is programmed: TURN LEFT, TURN RIGHT, U-TURN."
        },
        "ZOOPR": {
          "id": "ZOOPR",
          "name": "ZOOP",
          "cost": 1,
          "permanent": false,
          "effect": "Rotate to face any direction."
        }
      }
    },

    Instance: function () {
      let $, robot, player, game, n = 0;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // listen to game changes => update content
        this.data.store.onchange = dataset => {
          if ( dataset.key !== this.data.key ) return;
          game = dataset;
          this.refresh();
        }

      };

      this.start = async () => {

        // render main HTML structure
        this.html.render( this.html.main(), this.element );

        // load existing game state data
        game = await $.dataset( this.data );

        // empty game state data? => reset
        if ( !game.players ) game = undefined;

        // render current game state
        this.refresh();

      };

      this.refresh = async () => {

        // no game state data? => set initial game state data
        if ( !game ) newGame();

        // current player has no robot? => choose robot
        if ( robot === undefined ) await chooseRobot();

        // no racetrack? => choose racetrack
        if ( !game.racetrack ) {
          chooseRacetrack();
          await render();
          this.refresh();
          return;
        }

        player = game.players[ robot ];

        // current player has no start position? => choose start position
        if ( !player.start ) {
          chooseStart();
          await render();
          if ( ++n < 6 )
            robot = undefined;
          else
            game.phase = 1;
          this.refresh();
          return;
        }

        // upgrade phase?
        if ( game.phase === 1 ) {
          buyUpgrade();
          this.refresh();
          return;
        }

        console.log( game, robot );

//      this.onstart && this.onstart( this );  // trigger 'onstart' event
//      $.onFinish( this );

      };

      /**
       * returns current result data
       * @returns {Object} result data
       */
      this.getValue = () => game;

      /** sets initial game state data */
      const newGame = () => {
        game = {
          players: {},
          damage: {},
          special: Object.keys( this.special ),
          upgrades: Object.keys( this.upgrades )
        };
        for ( const id in this.damage )
          game.damage[ id ] = this.damage[ id ].amount;
        $.shuffleArray( game.special );
        $.shuffleArray( game.upgrades );
      };

      /**
       * let the user choose an available robot
       * @returns {Promise<void>}
       */
      const chooseRobot = () => new Promise( resolve => {
        const robots = Object.keys( this.robots ).filter( id => !game.players || !Object.keys( game.players ).includes( id ) );
        if ( !robots.length ) return '';
        robot = robots[ Math.floor( Math.random() * robots.length ) ];
        const player = game.players[ robot ] = { deck: [], energy: 5 };
        for ( const id in this.cards )
          for ( let i = 0; i < this.cards[ id ].amount; i++ )
            player.deck.push( this.cards[ id ].id );
        $.shuffleArray( player.deck );
        this.data.store.set( game );
        console.log( 'Chosen robot:', getRobotName() );
        resolve();
      } );

      /**
       * gets the name of a roboter
       * @param {string} [robot_id = robot] roboter ID (default: ID of the already chosen robot)
       * @returns {string} roboter name
       */
      const getRobotName = ( robot_id = robot ) => this.robots[ robot_id ].name;

      const buyUpgrade = () => {

        // no order of players? => set random order
        if ( !game.shop ) {
          game.shop = [];
          game.order = Object.keys( game.players );
          game.order.forEach( () => game.shop.push( game.upgrades.pop() ) );
          $.shuffleArray( game.order );
          this.data.store.set( game );
          console.log( 'Upgrade Phase: The players can buy', game.shop.map( upgrade => this.upgrades[ upgrade ].name ).join( ' or ' ) );
        }

        //
        if ( game.order[ game.order.length - 1 ] === robot ) {

        }

        game.phase = 2;
      };

      const chooseRacetrack = () => {
        const racetracks = Object.keys( this.racetracks );
        const racetrack_id = racetracks[ Math.floor( Math.random() * racetracks.length ) ];
        const racetrack = this.racetracks[ racetrack_id ];
        Object.assign( game, {
          racetrack: racetrack_id,
          objects: $.clone( racetrack.objects ),
        } );
        findFields( 'POWER' ).forEach( field => game.objects.push( {
          type: "ECUBE",
          x: field.x,
          y: field.y,
          width: 15,
          height: 15
        } ) );
        this.data.store.set( game );
        console.log( 'Choosed Racetrack:', racetrack.name );
      };

      const chooseStart = () => {
        const fields = findFields( 'START' ).filter( field => {
          for ( const id in game.players ) {
            const start = game.players[ id ].start;
            if ( start && start.x === field.x && start.y === field.y )
              return false;
          }
          return true;
        } );
        player.start = fields[ Math.floor( Math.random() * fields.length ) ];
        player.start.direction = this.racetracks[ game.racetrack ].direction;
        const robot_obj = {
          type: robot,
          x: player.start.x,
          y: player.start.y,
          direction: player.start.direction,
          width: 50,
          height: 50
        };
        game.objects.push( robot_obj );
        this.data.store.set( game );
        console.log( getRobotName(), 'has choosed a start position.' );
      };

      const findFields = field => {
        const racetrack = this.racetracks[ game.racetrack ].board;
        const fields = [];
        for ( let y = 0; y < racetrack.length; y++ )
          for ( let x = 0; x < racetrack[ y ].length; x++ )
            if ( racetrack[ y ][ x ] === field )
              fields.push( { x: x, y: y } );
        return fields;
      };

      const render = async () => {
        renderRacetrack();
        await $.sleep( 300 );
      };

      const renderRacetrack = () => {
        const element = $.html( this.element.querySelector( '#board' ) );
        const racetrack = this.racetracks[ game.racetrack ].board;
        if ( game.racetrack )
          racetrack.forEach( row => row.forEach( cell => element.appendChild( $.html( { class: 'field', style: 'background-image: url(' + this.img + 'fields/' + cell + '.jpg)' } ) ) ) );
        renderObjects();
      };

      const renderObjects = () => {
        this.element.querySelectorAll( '#board .obj' ).forEach( obj => $.remove( obj ) );
        game.objects.forEach( obj => renderObject( obj ) );
      };

      const renderObject = obj => {
        const racetrack = this.racetracks[ game.racetrack ].board;
        this.element.querySelector( '#board .field:nth-child(' + ( obj.x + 1 + obj.y * racetrack[ 0 ].length ) + ')' ).appendChild( $.html( { tag: 'img', class: 'obj', width: obj.width, height: obj.height, src: this.img + 'objects/' + obj.type + ( obj.nr || '' ) + '.png', style: 'transform: rotate(' + ( ( obj.direction || 0 ) * 90 ) + 'deg);' } ) );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();