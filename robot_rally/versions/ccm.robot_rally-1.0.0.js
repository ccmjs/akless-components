/**
 * @overview ccmjs-based web component for a robot rally boardgame
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (30.11.2021)
 */

( () => {

  const category = {
    0: "space",       // 1
    1: "start",       // 2
    2: "arrow",       // 4
    3: "express",     // 8

    4: "left",        // 16
    5: "right",       // 32
    6: "up",          // 64
    7: "down",        // 128

    8: "turn-left",   // 256
    9: "turn-right",  // 512
    10: "vertical",   // 1024
    11: "horizontal", // 2048

    12: "wall-left",  // 4096
    13: "wall-right", // 8192
    14: "wall-up",    // 16384
    15: "wall-down",  // 32768

    16: "r1",         // 65536
    17: "r2",         // 131072
    18: "r3",         // 262144
    19: "r4",         // 524288

    20: "r5",         // 1048576
    21: "l1",         // 2097152
    22: "l2",         // 4194304
    23: "l3",         // 8388608

    24: "energy"      // 16777216
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
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.js',
    config: {
      "chat": [ "ccm.component", "https://ccmjs.github.io/akless-components/chat/versions/ccm.chat-2.3.2.js", {
        "data": { "store": [ "ccm.store" ] },
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/users/versions/ccm.users-1.0.0.js" ]
      } ],
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/robot_rally/resources/styles.css" ],
      "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/robot_rally/resources/templates.mjs" ],
      "fields": {
        "_____": 0,
        "AL_LV": 0,
        "AR_DL": 0,
        "AR_DR": 0,
        "AR_LD": 0,
        "AR_LU": 0,
        "AR_LV": 0,
        "AR_RD": 0,
        "AR_RU": 0,
        "AR_UL": 0,
        "AR_UR": 0,
        "ARR_D": 0,
        "ARR_L": 0,
        "ARR_R": 0,
        "ARR_U": 0,
        "BLANK": 0,
        "D_DLD": 0,
        "D_DRD": 0,
        "D_LDL": 0,
        "D_LUL": 0,
        "D_RDR": 0,
        "D_RUR": 0,
        "D_ULU": 0,
        "D_URU": 0,
        "DA_DL": 0,
        "DA_DR": 0,
        "DA_LD": 0,
        "DA_LU": 0,
        "DA_RD": 0,
        "DA_RU": 0,
        "DA_UL": 0,
        "DA_UR": 0,
        "DAR_D": 0,
        "DAR_L": 0,
        "DAR_R": 0,
        "DAR_U": 0,
        "DD_LH": 0,
        "DDLLH": 0,
        "DL_LV": 0,
        "DLULH": 0,
        "DR_LV": 0,
        "DU_LH": 0,
        "L1S_D": 0,
        "L1S_L": 0,
        "L1S_R": 0,
        "L1S_U": 0,
        "L2S_D": 0,
        "L3SLW": 0,
        "LA1_H": 0,
        "LA1_V": 0,
        "P24_D": 0,
        "P24_L": 0,
        "P24_R": 0,
        "P24_U": 0,
        "P135D": 0,
        "P135L": 0,
        "P135R": 0,
        "P135U": 0,
        "POWER": 0,
        "ROT_L": 0,
        "ROT_R": 0,
        "SPACE": 0,
        "START": 0,
        "WA_LD": 0,
        "WA_LU": 0,
        "WA_RD": 0,
        "WA_UR": 0,
        "WAL_D": 0,
        "WAL_L": 0,
        "WAL_R": 0,
        "WAL_U": 0,
        "WD_PO": 0,
        "WDL1V": 0,
        "WDL_P": 0,
        "WL_PO": 0,
        "WLL1H": 0,
        "WLU_P": 0,
        "WRD_P": 0,
        "WRL1H": 0,
        "WU_PO": 0,
        "WUL1V": 0,
        "WUL2V": 0,
        "WUR_P": 0
      },
      "racetracks": [
        {
          "name": "DIZZY HIGHWAY",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "DAR_D", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER" ],
            [ "BLANK", "START", "BLANK", "BLANK", "D_DLD", "D_LDL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "D_LUL", "DAR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "DAR_D", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "D_ULU", "DAR_L" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "L1S_U", "BLANK", "WLL1H", "L1S_R", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "WDL1V", "BLANK", "POWER", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "POWER", "BLANK", "WUL1V", "BLANK", "DAR_U", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "L1S_L", "WRL1H", "BLANK", "L1S_D", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "DAR_R", "D_DRD", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "D_RDR", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_RUR", "D_URU", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 7,
              "y": 3,
              "direction": 1,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 12,
              "y": 3
            }
          ],
          "direction": 0
        },
        {
          "name": "RISKANTE KREUZUNG",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_LD", "ARR_L", "AR_UL", "BLANK", "DA_LU", "DAR_L", "DAR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "DAR_L", "DA_DL", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "AR_LD", "AR_DL", "BLANK", "AR_LU", "ARR_L", "ARR_L", "AR_UL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "AR_LD", "AR_DL", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "AR_UR", "AR_RU", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "AR_DR", "ARR_R", "ARR_R", "AR_RD", "BLANK", "AR_UR", "AR_RU", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "DA_UR", "DAR_R" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "DAR_R", "DA_RD", "BLANK", "AR_DR", "ARR_R", "AR_RU", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 4,
              "y": 9,
              "direction": 3,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 8,
              "y": 7
            },
            {
              "type": "GOAL2",
              "x": 11,
              "y": 0
            }
          ],
          "direction": 0
        },
        {
          "name": "POWER PARCOURS",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "POWER", "WAL_D", "P24_D", "WAL_D", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "POWER" ],
            [ "BLANK", "START", "BLANK", "BLANK", "BLANK", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_URU", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "WLU_P", "BLANK", "BLANK", "WUR_P", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "WDL_P", "BLANK", "BLANK", "WRD_P", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE" ],
            [ "BLANK", "START", "BLANK", "BLANK", "D_DLD", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "POWER", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "WAL_U", "P24_U", "WAL_U", "POWER" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 7,
              "y": 0,
              "direction": 2,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 12,
              "y": 3
            },
            {
              "type": "GOAL2",
              "x": 5,
              "y": 6
            }
          ],
          "direction": 0
        },
        {
          "name": "KREISEL-SPRINT",
          "board": [
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_LD", "ARR_L", "AR_UL", "BLANK", "DA_LU", "DAR_L", "DAR_L" ],
            [ "START", "BLANK", "WA_RD", "DAR_L", "DA_DL", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "AR_LD", "AR_DL", "BLANK", "AR_LU", "ARR_L", "ARR_L", "AR_UL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "AR_LD", "AR_DL", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "AR_UR", "AR_RU", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "AR_DR", "ARR_R", "ARR_R", "AR_RD", "BLANK", "AR_UR", "AR_RU", "BLANK", "BLANK" ],
            [ "START", "BLANK", "WA_UR", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "DA_UR", "DAR_R" ],
            [ "BLANK", "WAL_D", "BLANK", "DAR_R", "DAR_R", "DA_RD", "BLANK", "AR_DR", "ARR_R", "AR_RU", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 12,
              "y": 0,
              "direction": 1,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 12,
              "y": 8
            },
            {
              "type": "GOAL2",
              "x": 5,
              "y": 2
            },
            {
              "type": "GOAL3",
              "x": 4,
              "y": 9
            }
          ],
          "direction": 0
        },
        {
          "name": "LASER SQUARE",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "POWER", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "BLANK", "ARR_L", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "BLANK", "WUL1V", "L1S_L", "LA1_H", "LA1_H", "LA1_H", "WRL1H", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "LA1_V", "DA_UR", "DAR_R", "DAR_R", "DA_RD", "L1S_U", "BLANK", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "POWER", "LA1_V", "DAR_U", "BLANK", "BLANK", "DAR_D", "LA1_V", "SPACE", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "SPACE", "LA1_V", "DAR_U", "ROT_R", "POWER", "DAR_D", "LA1_V", "POWER", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "L1S_D", "DA_LU", "DAR_L", "DAR_L", "DA_DL", "LA1_V", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "BLANK", "WLL1H", "LA1_H", "LA1_H", "LA1_H", "L1S_R", "WDL1V", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK", "BLANK", "BLANK", "ARR_R" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "POWER" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 3,
              "y": 5,
              "direction": 3,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 8,
              "y": 1
            },
            {
              "type": "GOAL2",
              "x": 9,
              "y": 8
            }
          ],
          "direction": 0
        },
        {
          "name": "ROCK'N REBOOT",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "POWER", "AR_UR", "ARR_R", "AR_RU", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DA_DR", "DAR_R", "DAR_R", "SPACE", "BLANK", "ARR_U", "BLANK", "DA_LD", "DAR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "DAR_D", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "DAR_D", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "POWER", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "ARR_D", "BLANK", "BLANK", "ARR_R", "ARR_R", "ARR_R", "AR_RD" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "DAR_U", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_D" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "DA_RU", "POWER", "ARR_D", "BLANK", "SPACE", "DAR_L", "DAR_L", "DA_UL", "AR_DR" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "AR_LD", "ARR_L", "AR_DL", "BLANK", "BLANK", "BLANK", "POWER", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 5,
              "y": 4,
              "direction": 0,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 12,
              "y": 9
            },
            {
              "type": "GOAL2",
              "x": 12,
              "y": 0
            },
            {
              "type": "GOAL3",
              "x": 9,
              "y": 9
            }
          ],
          "direction": 0
        },
        {
          "name": "BURN-OUT",
          "board": [
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "POWER" ],
            [ "BLANK", "WAL_U", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "SPACE", "POWER", "BLANK", "BLANK", "BLANK", "DAR_L" ],
            [ "START", "BLANK", "WA_RD", "BLANK", "BLANK", "WUL1V", "L1S_L", "LA1_H", "LA1_H", "LA1_H", "WRL1H", "BLANK", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "LA1_V", "DA_UR", "DAR_R", "DAR_R", "DA_RD", "L1S_U", "BLANK", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "LA1_V", "DAR_U", "ROT_R", "BLANK", "DAR_D", "LA1_V", "SPACE", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "SPACE", "LA1_V", "DAR_U", "POWER", "BLANK", "DAR_D", "LA1_V", "BLANK", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "L1S_D", "DA_LU", "DAR_L", "DAR_L", "DA_DL", "LA1_V", "BLANK", "BLANK" ],
            [ "START", "BLANK", "WA_UR", "BLANK", "BLANK", "WLL1H", "LA1_H", "LA1_H", "LA1_H", "L1S_R", "WDL1V", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "DAR_R", "BLANK", "BLANK", "BLANK", "POWER", "SPACE", "BLANK", "BLANK", "BLANK", "ARR_R" ],
            [ "BLANK", "START", "WAL_R", "POWER", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "REBOT",
              "x": 0,
              "y": 6,
              "direction": 0,
              "range": [ 0, 0, 12, 9 ]
            },
            {
              "type": "GOAL1",
              "x": 11,
              "y": 5
            },
            {
              "type": "GOAL2",
              "x": 3,
              "y": 0
            },
            {
              "type": "GOAL3",
              "x": 12,
              "y": 9
            }
          ],
          "direction": 0
        },
        {
          "name": "CHAOS RALLYE",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "BLANK", "ARR_L", "AR_DL", "BLANK", "ARR_L", "ARR_L", "ARR_R", "ARR_R", "BLANK", "AR_LU", "ARR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "BLANK", "POWER", "SPACE", "BLANK", "BLANK", "SPACE", "POWER", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "WLL1H", "LA1_H", "LA1_H", "L1S_R", "DAR_D", "BLANK", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "ROT_L", "BLANK", "POWER", "ROT_L", "BLANK", "ROT_R", "P135R", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "P135L", "ROT_R", "BLANK", "ROT_R", "POWER", "BLANK", "ROT_L", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "L1S_L", "LA1_H", "LA1_H", "WRL1H", "DAR_U", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "BLANK", "POWER", "SPACE", "BLANK", "BLANK", "SPACE", "POWER", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "ARR_R", "AR_RD", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "AR_UR", "ARR_R" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 11,
              "y": 4
            },
            {
              "type": "GOAL2",
              "x": 4,
              "y": 5
            },
            {
              "type": "GOAL3",
              "x": 8,
              "y": 2
            },
            {
              "type": "GOAL4",
              "x": 8,
              "y": 7
            },
            {
              "type": "REBOT",
              "x": 0,
              "y": 0,
              "direction": 0,
              "range": [ 0, 0, 12, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "ÜBERHOLSPUR",
          "board": [
            [ "BLANK", "START", "WAL_R", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK", "POWER", "POWER", "DAR_D", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "DAR_L", "D_LUL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "BLANK", "BLANK", "BLANK", "WAL_L", "BLANK", "D_DLD", "D_LDL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "D_LUL", "DAR_L" ],
            [ "START", "BLANK", "WA_RD", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "P24_L", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "D_ULU", "DAR_L" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "WLU_P", "BLANK", "BLANK", "WUR_P", "BLANK", "DAR_D", "WAL_L", "BLANK", "DAR_D", "BLANK", "L1S_U", "BLANK", "WLL1H", "L1S_R", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "DAR_D", "BLANK", "WDL1V", "POWER", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "POWER", "WUL1V", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "WAL_R", "DAR_U", "BLANK", "WDL_P", "BLANK", "BLANK", "WRD_P", "BLANK", "DAR_D", "BLANK", "BLANK", "DAR_D", "BLANK", "L1S_L", "WRL1H", "BLANK", "L1S_D", "BLANK", "DAR_U", "BLANK" ],
            [ "START", "BLANK", "WA_UR", "P24_R", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "DAR_R", "D_DRD", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "WAL_R", "BLANK", "BLANK", "BLANK", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_RDR", "DAR_R", "DAR_R", "D_RDR", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_RUR", "D_URU", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "POWER", "BLANK", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "DAR_U", "POWER" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 17,
              "y": 3
            },
            {
              "type": "GOAL2",
              "x": 6,
              "y": 6
            },
            {
              "type": "GOAL3",
              "x": 22,
              "y": 7
            },
            {
              "type": "REBOT",
              "x": 10,
              "y": 9,
              "direction": 3,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "REBOT",
              "x": 18,
              "y": 0,
              "direction": 1,
              "range": [ 12, 0, 22, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "CHECKPOINT-JAGD",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "WLL1H", "L1S_R", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DA_UR", "DAR_R", "DA_RD", "BLANK", "BLANK", "DA_UR", "DAR_R", "DA_RD", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "DAR_U", "POWER", "DAR_D", "BLANK", "BLANK", "DAR_U", "POWER", "DAR_D", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DA_LU", "DAR_L", "DA_DL", "BLANK", "BLANK", "DA_LU", "DAR_L", "DA_DL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "L1S_U", "BLANK", "BLANK", "BLANK", "WD_PO", "WAL_L", "BLANK", "BLANK", "BLANK", "WUL1V" ],
            [ "BLANK", "START", "WAL_R", "WDL1V", "BLANK", "BLANK", "BLANK", "WAL_R", "WU_PO", "BLANK", "BLANK", "BLANK", "L1S_D" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DA_UR", "DAR_R", "DA_RD", "BLANK", "BLANK", "DA_UR", "DAR_R", "DA_RD", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "DAR_U", "POWER", "DAR_D", "BLANK", "BLANK", "DAR_U", "POWER", "DAR_D", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DA_LU", "DAR_L", "DA_DL", "BLANK", "BLANK", "DA_LU", "DAR_L", "DA_DL", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "L1S_L", "WRL1H", "BLANK", "BLANK", "BLANK", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 10,
              "y": 1
            },
            {
              "type": "GOAL2",
              "x": 6,
              "y": 7
            },
            {
              "type": "GOAL3",
              "x": 5,
              "y": 3
            },
            {
              "type": "GOAL4",
              "x": 9,
              "y": 7
            },
            {
              "type": "REBOT",
              "x": 0,
              "y": 7,
              "direction": 0,
              "range": [ 0, 0, 12, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "AUSWEICHMANÖVER",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "WAL_L", "WAL_R", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "L1S_U", "DAR_R", "DAR_R", "DA_RD", "POWER", "BLANK", "DA_LD", "DAR_L", "DAR_L", "DAR_L" ],
            [ "BLANK", "WAL_U", "BLANK", "LA1_V", "BLANK", "WLL1H", "DD_LH", "LA1_H", "LA1_H", "DD_LH", "L1S_R", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "WDL1V", "BLANK", "SPACE", "SPACE", "WAL_U", "ROT_L", "SPACE", "SPACE", "AR_UL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "POWER", "BLANK", "BLANK", "WUL1V", "BLANK", "BLANK", "L1S_U", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "L1S_D", "BLANK", "POWER", "WDL1V", "BLANK", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "AR_DR", "SPACE", "SPACE", "ROT_R", "WAL_D", "SPACE", "SPACE", "BLANK", "WUL1V" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "BLANK", "L1S_L", "DU_LH", "LA1_H", "LA1_H", "DU_LH", "WRL1H", "BLANK", "LA1_V" ],
            [ "BLANK", "START", "BLANK", "DAR_R", "DAR_R", "DAR_R", "DA_RU", "BLANK", "BLANK", "DA_LU", "DAR_L", "DAR_L", "L1S_D" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "WL_PO", "WAL_R", "BLANK", "BLANK", "BLANK", "POWER" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 8,
              "y": 6
            },
            {
              "type": "GOAL2",
              "x": 12,
              "y": 9
            },
            {
              "type": "GOAL3",
              "x": 8,
              "y": 3
            },
            {
              "type": "REBOT",
              "x": 4,
              "y": 9,
              "direction": 3,
              "range": [ 3, 0, 12, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "PUSHER-PANIK",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "ARR_L", "ARR_L", "ARR_L", "AR_UL", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "WUL1V", "BLANK", "BLANK", "ROT_L", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "P135U", "BLANK", "WAL_D", "AR_LU", "ARR_L", "BLANK", "SPACE", "P135R", "BLANK", "BLANK", "BLANK", "SPACE", "POWER", "L1S_D", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "SPACE", "P24_L", "SPACE", "BLANK", "BLANK", "POWER", "P24_U", "BLANK", "ARR_U", "ROT_L", "BLANK", "BLANK", "DA_LD", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "ARR_U", "POWER" ],
            [ "START", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "P135L", "SPACE", "BLANK", "SPACE", "WAL_L", "ARR_U", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_UR", "ARR_R", "ARR_R", "AR_RU", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "POWER", "P24_R", "BLANK", "P24_L", "POWER", "AR_UR", "AR_RU", "BLANK", "L2S_U", "P135R", "DAR_D", "POWER", "ARR_U", "P24_L", "BLANK", "ROT_R", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "AR_LD", "AR_DL", "BLANK", "BLANK", "WAL_L", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "BLANK", "WDL2V", "BLANK", "DAR_D", "BLANK", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "START", "BLANK", "BLANK", "ARR_D", "WAL_R", "SPACE", "BLANK", "SPACE", "P135R", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "DAR_D", "BLANK", "ARR_U", "BLANK", "BLANK", "WLL1H", "L1S_R" ],
            [ "BLANK", "WAL_D", "BLANK", "ARR_D", "BLANK", "P24_D", "POWER", "BLANK", "BLANK", "SPACE", "P24_R", "SPACE", "BLANK", "ROT_R", "BLANK", "DAR_L", "DA_DL", "L1S_U", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "START", "BLANK", "ARR_D", "P135L", "SPACE", "BLANK", "ARR_R", "AR_RD", "WAL_U", "BLANK", "P135D", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_R", "AR_LV", "AR_RU", "SPACE", "POWER", "ROT_L", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "AR_DR", "ARR_R", "ARR_R", "ARR_R", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "WDL1V", "BLANK", "BLANK", "WAL_U", "BLANK", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 6,
              "y": 6
            },
            {
              "type": "GOAL2",
              "x": 10,
              "y": 4
            },
            {
              "type": "GOAL3",
              "x": 14,
              "y": 7
            },
            {
              "type": "GOAL4",
              "x": 22,
              "y": 1
            },
            {
              "type": "GOAL5",
              "x": 17,
              "y": 3
            },
            {
              "type": "GOAL6",
              "x": 22,
              "y": 9
            },
            {
              "type": "REBOT",
              "x": 4,
              "y": 9,
              "direction": 0,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "REBOT",
              "x": 15,
              "y": 0,
              "direction": 2,
              "range": [ 10, 0, 22, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "CHAOS MANIA",
          "board": [
            [ "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "BLANK", "WUL1V", "BLANK", "BLANK", "ROT_L", "BLANK", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "SPACE", "POWER", "L1S_D", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "ROT_L", "BLANK", "BLANK", "DA_LD", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "ARR_U", "POWER", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_UR", "ARR_R", "ARR_R", "AR_RU", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "L2S_U", "P135R", "DAR_D", "POWER", "ARR_U", "P24_L", "BLANK", "ROT_R", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "WDL2V", "BLANK", "DAR_D", "BLANK", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "POWER", "WLL1H", "LA1_H", "L1S_R", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "POWER", "BLANK", "DAR_D", "BLANK", "ARR_U", "BLANK", "BLANK", "WLL1H", "L1S_R", "BLANK", "DAR_D", "BLANK", "AR_LD", "ARR_L", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK" ],
            [ "START", "BLANK", "WA_RD", "ROT_R", "BLANK", "DAR_L", "DA_DL", "L1S_U", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "L1S_U", "SPACE", "BLANK", "BLANK", "SPACE", "WUL1V", "DAR_D", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_R", "AR_LV", "AR_RU", "SPACE", "POWER", "ROT_L", "BLANK", "BLANK", "DA_DR", "DR_LV", "SPACE", "L1S_L", "WRL1H", "SPACE", "DL_LV", "DA_DL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "BLANK", "BLANK", "WDL1V", "BLANK", "BLANK", "WAL_U", "BLANK", "BLANK", "WU_PO", "BLANK", "LA1_V", "ROT_R", "BLANK", "BLANK", "WAL_R", "LA1_V", "POWER", "WAL_U" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "WAL_D", "BLANK", "LA1_V", "WAL_L", "POWER", "BLANK", "ROT_L", "LA1_V", "BLANK", "WAL_D" ],
            [ "BLANK", "BLANK", "BLANK", "ARR_L", "AR_DL", "BLANK", "BLANK", "P135U", "BLANK", "BLANK", "BLANK", "AR_LU", "ARR_L", "BLANK", "DA_UR", "DR_LV", "SPACE", "WLL1H", "L1S_R", "SPACE", "DL_LV", "DA_UL", "BLANK" ],
            [ "START", "BLANK", "WA_UR", "BLANK", "BLANK", "POWER", "DAR_R", "ROT_R", "ROT_L", "DAR_L", "POWER", "BLANK", "BLANK", "BLANK", "DAR_U", "WDL1V", "SPACE", "BLANK", "BLANK", "SPACE", "L1S_D", "DAR_U", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "BLANK", "SPACE", "L1S_U", "BLANK", "BLANK", "WUL1V", "SPACE", "ARR_U", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "ARR_R", "AR_RU", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "BLANK", "LA1_V", "ROT_R", "POWER", "LA1_V", "BLANK", "ARR_U", "BLANK", "POWER", "L1S_L", "LA1_H", "WRL1H", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "LA1_V", "POWER", "ROT_L", "LA1_V", "BLANK", "ARR_D", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "SPACE", "WDL1V", "BLANK", "BLANK", "L1S_D", "SPACE", "ARR_D", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "POWER", "DAR_R", "ROT_L", "ROT_R", "DAR_L", "POWER", "BLANK", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "ARR_R", "AR_RD", "BLANK", "BLANK", "BLANK", "P135D", "BLANK", "BLANK", "AR_UR", "ARR_R", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 9,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 8,
              "y": 1
            },
            {
              "type": "GOAL2",
              "x": 22,
              "y": 8
            },
            {
              "type": "GOAL3",
              "x": 8,
              "y": 16
            },
            {
              "type": "GOAL4",
              "x": 5,
              "y": 11
            },
            {
              "type": "GOAL5",
              "x": 20,
              "y": 13
            },
            {
              "type": "REBOT",
              "x": 4,
              "y": 2,
              "direction": 0,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "REBOT",
              "x": 3,
              "y": 16,
              "direction": 3,
              "range": [ 3, 10, 12, 19 ]
            },
            {
              "type": "REBOT",
              "x": 17,
              "y": 14,
              "direction": 3,
              "range": [ 13, 5, 22, 14 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "IMMER IN BEWEGUNG",
          "board": [
            [ "BLANK", "ARR_D", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "SPACE", "BLANK", "BLANK", "ARR_L", "BLANK", "BLANK" ],
            [ "ARR_L", "AR_DL", "WLL2H", "L2S_R", "DA_LD", "DA_UL", "DA_LD", "DAR_L", "DAR_L", "DAR_L", "BLANK", "START", "BLANK" ],
            [ "BLANK", "DA_UR", "DAR_R", "DA_RD", "DAR_D", "DAR_U", "DAR_D", "POWER", "WAL_R", "BLANK", "BLANK", "WAL_U", "BLANK" ],
            [ "BLANK", "DAR_U", "BLANK", "DAR_D", "DAR_D", "DAR_U", "DA_DR", "DAR_R", "DA_RD", "BLANK", "BLANK", "BLANK", "START" ],
            [ "L2S_U", "DAR_U", "ARR_U", "DAR_D", "DAR_D", "DAR_U", "BLANK", "WUL1V", "DAR_D", "BLANK", "WAL_L", "START", "BLANK" ],
            [ "WRL2V", "DAR_U", "POWER", "DAR_D", "DAR_D", "DA_LU", "DAR_L", "DL_LV", "DA_DL", "POWER", "WAL_L", "START", "BLANK" ],
            [ "WDL2V", "DAR_U", "ARR_D", "DAR_D", "DAR_D", "POWER", "BLANK", "LA1_V", "ROT_L", "BLANK", "BLANK", "BLANK", "START" ],
            [ "BLANK", "DAR_U", "BLANK", "SPACE", "DA_DR", "DAR_R", "DAR_R", "DRDLV", "BLANK", "BLANK", "BLANK", "WAL_D", "BLANK" ],
            [ "BLANK", "DA_LU", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DDLLV", "AR_UR", "ARR_R", "BLANK", "START", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "WL_PO", "BLANK", "BLANK", "BLANK", "L1S_D", "ARR_U", "BLANK", "ARR_L", "BLANK", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 12,
              "y": 5,
              "direction": 2
            },
            {
              "type": "GOAL1",
              "x": 2,
              "y": 9
            },
            {
              "type": "GOAL2",
              "x": 6,
              "y": 4
            },
            {
              "type": "GOAL3",
              "x": 9,
              "y": 9
            },
            {
              "type": "GOAL4",
              "x": 0,
              "y": 0
            },
            {
              "type": "REBOT",
              "x": 12,
              "y": 7,
              "direction": 2,
              "range": [ 0, 0, 12, 9 ]
            }
          ],
          "direction": 2
        },
        {
          "name": "TODESFALLE",
          "board": [
            [ "BLANK", "BLANK", "ARR_L", "ARR_L", "AR_UL", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_L", "BLANK", "BLANK" ],
            [ "BLANK", "P135U", "BLANK", "WAL_D", "AR_LU", "ARR_L", "BLANK", "SPACE", "P135R", "ARR_U", "BLANK", "START", "BLANK" ],
            [ "BLANK", "SPACE", "P24_L", "SPACE", "POWER", "BLANK", "POWER", "P24_U", "BLANK", "ARR_U", "BLANK", "WAL_U", "BLANK" ],
            [ "BLANK", "BLANK", "POWER", "BLANK", "P24_D", "BLANK", "BLANK", "SPACE", "WAL_L", "ARR_U", "BLANK", "BLANK", "START" ],
            [ "BLANK", "ARR_D", "BLANK", "SPACE", "BLANK", "BLANK", "P135U", "BLANK", "AR_UR", "AR_RU", "WAL_L", "START", "BLANK" ],
            [ "AR_LD", "AR_DL", "BLANK", "P135D", "P24_U", "WAL_D", "SPACE", "BLANK", "ARR_U", "BLANK", "WAL_L", "START", "BLANK" ],
            [ "ARR_D", "WAL_R", "SPACE", "BLANK", "POWER", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "START" ],
            [ "ARR_D", "BLANK", "P24_D", "POWER", "BLANK", "BLANK", "SPACE", "P24_R", "SPACE", "BLANK", "BLANK", "WAL_D", "BLANK" ],
            [ "ARR_D", "P135L", "SPACE", "BLANK", "ARR_R", "AR_RD", "WAL_U", "BLANK", "P135D", "BLANK", "BLANK", "START", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "AR_DR", "ARR_R", "ARR_R", "ARR_R", "BLANK", "ARR_L", "BLANK", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 12,
              "y": 5,
              "direction": 2
            },
            {
              "type": "GOAL1",
              "x": 1,
              "y": 7
            },
            {
              "type": "GOAL2",
              "x": 4,
              "y": 4
            },
            {
              "type": "GOAL3",
              "x": 7,
              "y": 8
            },
            {
              "type": "GOAL4",
              "x": 8,
              "y": 2
            },
            {
              "type": "GOAL5",
              "x": 0,
              "y": 1
            },
            {
              "type": "REBOT",
              "x": 12,
              "y": 9,
              "direction": 2,
              "range": [ 0, 0, 12, 9 ]
            }
          ],
          "direction": 2
        },
        {
          "name": "PFAD DER VERWÜSTUNG",
          "board": [
            [ "BLANK", "DAR_D", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK", "POWER", "BLANK", "ARR_D", "L1S_U", "BLANK", "BLANK", "BLANK", "WR_PO", "BLANK", "BLANK", "BLANK" ],
            [ "BLANK", "D_DLD", "D_LDL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "D_LUL", "DAR_L", "DAR_L", "D_LUL", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "BLANK", "BLANK", "BLANK", "WAL_L", "ARR_L", "AR_DL", "DURLV", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DA_RD", "BLANK" ],
            [ "BLANK", "DAR_D", "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "D_ULU", "DAR_L", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "P24_L", "BLANK", "BLANK", "DLULV", "DAR_L", "DAR_L", "DA_UL", "SPACE", "BLANK", "DAR_D", "BLANK" ],
            [ "BLANK", "DAR_D", "BLANK", "L1S_U", "BLANK", "WLL1H", "L1S_R", "BLANK", "DAR_U", "BLANK", "BLANK", "DAR_U", "BLANK", "WLU_P", "BLANK", "BLANK", "WUR_P", "BLANK", "DAR_D", "WAL_L", "BLANK", "ROT_L", "LA1_V", "BLANK", "POWER", "DAR_U", "DAR_U", "ARR_U", "DAR_D", "WUL2V" ],
            [ "BLANK", "DAR_D", "BLANK", "WDL1V", "BLANK", "POWER", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "POWER", "DA_UR", "DR_LV", "DAR_R", "DA_RD", "DAR_U", "DAR_U", "POWER", "DAR_D", "WLL2V" ],
            [ "BLANK", "DAR_D", "BLANK", "BLANK", "POWER", "BLANK", "WUL1V", "BLANK", "DAR_U", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "DAR_U", "WDL1V", "BLANK", "DAR_D", "DAR_U", "DAR_U", "ARR_D", "DAR_D", "L2S_D" ],
            [ "BLANK", "DAR_D", "BLANK", "L1S_L", "WRL1H", "BLANK", "L1S_D", "BLANK", "DAR_U", "BLANK", "WAL_R", "DAR_U", "BLANK", "WDL_P", "BLANK", "BLANK", "WRD_P", "BLANK", "DAR_D", "BLANK", "BLANK", "DA_LU", "DAR_L", "DA_UL", "DAR_D", "DAR_U", "DAR_U", "BLANK", "DAR_D", "BLANK" ],
            [ "DAR_R", "D_DRD", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "DAR_U", "BLANK", "P24_R", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK", "WAL_R", "BLANK", "POWER", "DAR_U", "DAR_D", "DAR_U", "DA_LU", "DAR_L", "DA_DL", "BLANK" ],
            [ "DAR_R", "D_RDR", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_RUR", "D_URU", "BLANK", "WAL_R", "BLANK", "BLANK", "BLANK", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_RDR", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DA_RU", "DA_DR", "DA_RU", "L2S_L", "WRL2H", "BLANK", "BLANK" ],
            [ "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "DAR_U", "BLANK", "POWER", "BLANK", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "SPACE", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "BLANK" ],
            [ "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "ARR_U", "BLANK", "BLANK", "BLANK", "WAL_U", "WAL_U", "BLANK", "BLANK", "BLANK", "ARR_U", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "BLANK", "START", "WAL_L", "BLANK", "START", "START", "BLANK", "WAL_R", "START", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "START", "BLANK", "BLANK", "START", "BLANK", "BLANK", "BLANK", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____", "_____" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 14,
              "y": 12,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 7,
              "y": 1
            },
            {
              "type": "GOAL2",
              "x": 13,
              "y": 8
            },
            {
              "type": "GOAL3",
              "x": 21,
              "y": 4
            },
            {
              "type": "REBOT",
              "x": 5,
              "y": 5,
              "direction": 0,
              "range": [ 0, 0, 9, 9 ]
            },
            {
              "type": "REBOT",
              "x": 13,
              "y": 4,
              "direction": 0,
              "range": [ 10, 0, 19, 9 ]
            },
            {
              "type": "REBOT",
              "x": 23,
              "y": 9,
              "direction": 3,
              "range": [ 20, 0, 29, 9 ]
            }
          ],
          "direction": 3
        },
        {
          "name": "TORNADO CHALLENGE",
          "board": [
            [ "BLANK", "BLANK", "POWER", "AR_UR", "ARR_R", "ARR_R", "ARR_R", "ARR_R", "ARR_R", "AR_RD", "BLANK", "ARR_D", "BLANK", "BLANK", "POWER", "BLANK", "BLANK", "SPACE", "BLANK", "BLANK" ],
            [ "BLANK", "ROT_R", "L1S_U", "ARR_U", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DA_RD", "ARR_D", "ARR_L", "AR_DL", "WLL2H", "L2S_R", "DA_LD", "DA_UL", "DA_LD", "DAR_L", "DAR_L", "DAR_L" ],
            [ "BLANK", "BLANK", "WDL1V", "ARR_U", "AR_UR", "ARR_R", "ARR_R", "AR_RD", "BLANK", "ARR_D", "BLANK", "DA_UR", "DAR_R", "DA_RD", "DAR_D", "DAR_U", "DAR_D", "POWER", "WAL_R", "BLANK" ],
            [ "BLANK", "WUL1V", "BLANK", "ARR_U", "ARR_U", "POWER", "BLANK", "ARR_D", "L3SLW", "ARR_D", "BLANK", "DAR_U", "BLANK", "DAR_D", "DAR_D", "DAR_U", "DA_DR", "DAR_R", "DA_RD", "BLANK" ],
            [ "BLANK", "LA1_V", "ROT_L", "ARR_U", "ARR_U", "SPACE", "ARR_L", "AR_DL", "POWER", "ARR_D", "L2S_U", "DAR_U", "ARR_U", "DAR_D", "DAR_D", "DAR_U", "BLANK", "WUL1V", "DAR_D", "BLANK" ],
            [ "BLANK", "L1S_D", "BLANK", "ARR_U", "ARR_U", "BLANK", "DAR_R", "DAR_R", "DA_RU", "ARR_D", "WRL2V", "DAR_U", "POWER", "DAR_D", "DAR_D", "DA_LU", "DAR_L", "DL_LV", "DA_DL", "POWER" ],
            [ "BLANK", "ARR_D", "BLANK", "ARR_U", "AR_LU", "ARR_L", "ARR_L", "ARR_L", "ARR_L", "AR_DL", "WDL2V", "DAR_U", "ARR_D", "DAR_D", "DAR_D", "POWER", "BLANK", "LA1_V", "ROT_L", "BLANK" ],
            [ "BLANK", "ARR_D", "SPACE", "ARR_U", "BLANK", "ROT_L", "POWER", "ROT_R", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "SPACE", "DA_DR", "DAR_R", "DAR_R", "DRDLV", "BLANK", "BLANK" ],
            [ "BLANK", "AR_DR", "ARR_R", "AR_RU", "SPACE", "BLANK", "L1S_L", "LA1_H", "WRL1H", "BLANK", "BLANK", "DA_LU", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DDLLV", "AR_UR", "ARR_R" ],
            [ "POWER", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "WL_PO", "BLANK", "BLANK", "BLANK", "L1S_D", "ARR_U", "BLANK" ],
            [ "_____", "_____", "_____", "_____", "_____", "ARR_U", "BLANK", "BLANK", "BLANK", "WAL_U", "WAL_U", "BLANK", "BLANK", "BLANK", "ARR_U", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "_____", "_____", "BLANK", "START", "WAL_L", "BLANK", "START", "START", "BLANK", "WAL_R", "START", "BLANK", "_____", "_____", "_____", "_____", "_____" ],
            [ "_____", "_____", "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "START", "BLANK", "BLANK", "START", "BLANK", "BLANK", "BLANK", "_____", "_____", "_____", "_____", "_____" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 9,
              "y": 12,
              "direction": 3
            },
            {
              "type": "GOAL1",
              "x": 1,
              "y": 6
            },
            {
              "type": "GOAL2",
              "x": 19,
              "y": 1
            },
            {
              "type": "GOAL3",
              "x": 5,
              "y": 3
            },
            {
              "type": "REBOT",
              "x": 1,
              "y": 2,
              "direction": 0,
              "range": [ 0, 0, 9, 9 ]
            },
            {
              "type": "REBOT",
              "x": 10,
              "y": 9,
              "direction": 2,
              "range": [ 10, 0, 19, 9 ]
            }
          ],
          "direction": 3
        },
        {
          "name": "KURZER PROZESS",
          "board": [
            [ "BLANK", "BLANK", "ARR_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "POWER", "WLL1H", "LA1_H", "L1S_R", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_LD", "ARR_L", "BLANK", "BLANK", "BLANK", "DAR_D", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "DAR_D", "L1S_U", "SPACE", "BLANK", "BLANK", "SPACE", "WUL1V", "DAR_D", "BLANK" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DA_DR", "DR_LV", "SPACE", "L1S_L", "WRL1H", "SPACE", "DL_LV", "DA_DL", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "WU_PO", "BLANK", "LA1_V", "ROT_R", "BLANK", "BLANK", "WAL_R", "LA1_V", "POWER", "WAL_U" ],
            [ "BLANK", "START", "WAL_R", "WAL_D", "BLANK", "LA1_V", "WAL_L", "POWER", "BLANK", "ROT_L", "LA1_V", "BLANK", "WAL_D" ],
            [ "START", "BLANK", "BLANK", "BLANK", "DA_UR", "DR_LV", "SPACE", "WLL1H", "L1S_R", "SPACE", "DL_LV", "DA_UL", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "BLANK", "DAR_U", "WDL1V", "SPACE", "BLANK", "BLANK", "SPACE", "L1S_D", "DAR_U", "BLANK" ],
            [ "BLANK", "START", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "ARR_R", "AR_RU", "BLANK", "DAR_U", "BLANK" ],
            [ "BLANK", "BLANK", "ARR_R", "POWER", "L1S_L", "LA1_H", "WRL1H", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 10,
              "y": 2
            },
            {
              "type": "GOAL2",
              "x": 5,
              "y": 7
            },
            {
              "type": "GOAL3",
              "x": 10,
              "y": 7
            },
            {
              "type": "GOAL4",
              "x": 5,
              "y": 2
            },
            {
              "type": "REBOT",
              "x": 0,
              "y": 0,
              "direction": 0,
              "range": [ 0, 0, 12, 9 ]
            }
          ],
          "direction": 0
        },
        {
          "name": "DAS GROSSE RENNEN",
          "board": [
            [ "BLANK", "START", "WAL_R", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "WAL_U", "BLANK", "BLANK", "DAR_D", "BLANK", "AR_LD", "ARR_L", "AR_UL", "BLANK", "DA_LU", "DAR_L", "DAR_L", "ARR_L", "AR_DL", "BLANK", "BLANK", "P135U", "BLANK", "BLANK", "BLANK", "AR_LU", "ARR_L" ],
            [ "START", "BLANK", "WA_RD", "DAR_L", "DA_DL", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "DAR_R", "ROT_R", "ROT_L", "DAR_L", "POWER", "BLANK", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "AR_LD", "AR_DL", "BLANK", "AR_LU", "ARR_L", "ARR_L", "AR_UL", "BLANK", "BLANK", "BLANK", "SPACE", "L1S_U", "BLANK", "BLANK", "WUL1V", "SPACE", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "AR_LD", "AR_DL", "BLANK", "BLANK", "BLANK", "POWER", "BLANK", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "LA1_V", "ROT_R", "POWER", "LA1_V", "BLANK", "ARR_U", "BLANK" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "ARR_D", "BLANK", "POWER", "BLANK", "BLANK", "BLANK", "AR_UR", "AR_RU", "BLANK", "BLANK", "BLANK", "BLANK", "LA1_V", "POWER", "ROT_L", "LA1_V", "BLANK", "ARR_D", "BLANK" ],
            [ "BLANK", "BLANK", "BLANK", "BLANK", "AR_DR", "ARR_R", "ARR_R", "AR_RD", "BLANK", "AR_UR", "AR_RU", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "WDL1V", "BLANK", "BLANK", "L1S_D", "SPACE", "ARR_D", "BLANK" ],
            [ "START", "BLANK", "WA_UR", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_D", "POWER", "ARR_U", "BLANK", "DA_UR", "DAR_R", "BLANK", "BLANK", "POWER", "DAR_R", "ROT_L", "ROT_R", "DAR_L", "POWER", "BLANK", "BLANK" ],
            [ "BLANK", "WAL_D", "BLANK", "DAR_R", "DAR_R", "DA_RD", "BLANK", "AR_DR", "ARR_R", "AR_RU", "BLANK", "DAR_U", "BLANK", "ARR_R", "AR_RD", "BLANK", "BLANK", "BLANK", "P135D", "BLANK", "BLANK", "AR_UR", "ARR_R" ],
            [ "BLANK", "START", "WAL_R", "BLANK", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK" ],
            [ "_____", "_____", "_____", "POWER", "WAL_D", "P135D", "WAL_D", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "POWER", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "POWER", "AR_UR", "ARR_R", "AR_RU", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "DAR_R", "D_URU", "BLANK", "AR_UL", "DA_DR", "DAR_R", "DAR_R", "SPACE", "BLANK", "ARR_U", "BLANK", "DA_LD", "DAR_L" ],
            [ "_____", "_____", "_____", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "ARR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_U", "BLANK", "DAR_D", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "BLANK", "BLANK", "WLU_P", "BLANK", "BLANK", "WUR_P", "BLANK", "DAR_U", "BLANK", "AR_LU", "ARR_L", "ARR_L", "ARR_L", "BLANK", "BLANK", "ARR_U", "BLANK", "DAR_D", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "POWER", "SPACE", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "POWER", "BLANK" ],
            [ "_____", "_____", "_____", "BLANK", "DAR_D", "BLANK", "WDL_P", "BLANK", "BLANK", "WRD_P", "BLANK", "BLANK", "BLANK", "BLANK", "DAR_U", "BLANK", "ARR_D", "BLANK", "BLANK", "ARR_R", "ARR_R", "ARR_R", "AR_RD" ],
            [ "_____", "_____", "_____", "BLANK", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "SPACE", "BLANK", "DAR_U", "BLANK", "ARR_D", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "ARR_D" ],
            [ "_____", "_____", "_____", "BLANK", "D_DLD", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "DAR_L", "BLANK", "BLANK", "BLANK", "DAR_R", "DA_RU", "POWER", "ARR_D", "BLANK", "SPACE", "DAR_L", "DAR_L", "DA_UL", "AR_DR" ],
            [ "_____", "_____", "_____", "POWER", "DAR_D", "BLANK", "BLANK", "BLANK", "BLANK", "WAL_U", "P135U", "WAL_U", "POWER", "BLANK", "AR_LD", "ARR_L", "AR_DL", "BLANK", "BLANK", "BLANK", "POWER", "DAR_U", "BLANK" ]
          ],
          "objects": [
            {
              "type": "ANTEN",
              "x": 0,
              "y": 4,
              "direction": 0
            },
            {
              "type": "GOAL1",
              "x": 7,
              "y": 19
            },
            {
              "type": "GOAL2",
              "x": 17,
              "y": 16
            },
            {
              "type": "GOAL3",
              "x": 19,
              "y": 1
            },
            {
              "type": "GOAL4",
              "x": 7,
              "y": 3
            },
            {
              "type": "GOAL5",
              "x": 5,
              "y": 12
            },
            {
              "type": "GOAL6",
              "x": 20,
              "y": 12
            },
            {
              "type": "REBOT",
              "x": 12,
              "y": 9,
              "direction": 3,
              "range": [ 3, 0, 12, 9 ]
            },
            {
              "type": "REBOT",
              "x": 20,
              "y": 0,
              "direction": 2,
              "range": [ 13, 0, 22, 9 ]
            },
            {
              "type": "REBOT",
              "x": 3,
              "y": 11,
              "direction": 0,
              "range": [ 3, 10, 12, 19 ]
            },
            {
              "type": "REBOT",
              "x": 13,
              "y": 19,
              "direction": 3,
              "range": [ 13, 10, 22, 19 ]
            }
          ],
          "direction": 0
        }
      ],
      "objects": {
        "ANTEN": {
          "id": "ANTEN",
          "size": 80
        },
        "ECUBE": {
          "id": "ECUBE",
          "size": 20
        },
        "GOAL1": {
          "id": "GOAL1",
          "size": 92.5
        },
        "GOAL2": {
          "id": "GOAL2",
          "size": 92.5
        },
        "GOAL3": {
          "id": "GOAL3",
          "size": 92.5
        },
        "GOAL4": {
          "id": "GOAL4",
          "size": 92.5
        },
        "GOAL5": {
          "id": "GOAL5",
          "size": 92.5
        },
        "GOAL6": {
          "id": "GOAL6",
          "size": 92.5
        },
        "REBOT": {
          "id": "REBOT",
          "size": 92.5
        }
      },
      "path": "https://ccmjs.github.io/akless-components/robot_rally/resources/",
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
      "size": 71,
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
        "VIRUS": {
          "id": "VIRUS",
          "name": "VIRUS",
          "amount": 18,
          "effect": "When you program a virus damage card, any robot on the board within a six-space radius of you must immediately take a virus card from the draw pile."
        },
        "TROJA": {
          "id": "TROJA",
          "name": "TROJAN HOURSE",
          "amount": 12,
          "effect": "When you program a Trojan horse damage card, you must immediately take two SPAM damage cards."
        },
        "WORMD": {
          "id": "WORMD",
          "name": "WORM",
          "amount": 6,
          "effect": "When you program a worm damage card, you must immediately reboot your robot."
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
      let $, chat, robot, game, n = 0;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // listen to game changes => update content
        this.data.store.onchange = dataset => {
          if ( dataset.key !== this.data.key ) return;
          game = dataset;
          this.play();
        }

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // load existing game state data
        game = await $.dataset( this.data );

        // perform next game step
        await play();

      };

      /**
       * returns current result data
       * @returns {Object} result data
       */
      this.getValue = () => $.clone( game );

      /**
       * performs the next game step
       * @returns {Promise<void>}
       */
      const play = async () => {

        // empty game state data? => start new game
        if ( !game.robots ) await helper.newGame();

        // player has no robot? => choose robot
        if ( robot === undefined ) return render.chooseRobot();

        // no racetrack? => choose racetrack
        if ( !game.racetrack ) return render.chooseRacetrack();

        // render main HTML template
        render.board();

        console.log( 'finish' );
        return;

        // render chat
        if ( !chat )
          chat = await this.chat.instance( {
            'data.store.1.realm': null,
            'data.key': this.data.key + '-chat',
            'data.permissions': null,
            hide_login: true,
            'user.2.store': [ 'ccm.store', Object.keys( this.robots ).map( robot => { return {
              key: robot,
              user: robot,
              token: '',
              name: getRobotName( robot ),
              picture: this.img + 'robots/' + robot + '.png'
            } } ) ]
          } );

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

        $.setContent( this.element.querySelector( '#chat' ), chat.root );
        await chat.user.login( robot );
        await chat.start();

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
       * contains all render functions
       * @type {Object.<string,Function>}
       */
      const render = {

        /** lets the user choose a robot */
        chooseRobot: () => this.html.render( this.html.chooseRobot( Object.values( this.robots ), this.path, events.onSelectedRobot ), this.element ),

        /** lets the user choose a racetrack */
        chooseRacetrack: () => {
          this.html.render( this.html.chooseRacetrack( this.racetracks, this.path, this.size / 2, events.onSelectedRacetrack ), this.element );
          this.racetracks.forEach( ( racetrack, i ) =>
            render.objects( this.element.querySelectorAll( '.board' )[ i ], racetrack.objects, racetrack.board[ 0 ].length )
          );
        },

        /** renders the game board */
        board: () => {
          const board = this.racetracks[ game.racetrack - 1 ].board;
          this.html.render( this.html.board( board, game.objects, this.path, this.size ), this.element );
          this.element.querySelectorAll( '.board .obj' ).forEach( obj => $.remove( obj ) );
          render.objects( this.element.querySelector( '.board' ), game.objects, board[ 0 ].length );
        },

        objects: ( element, objects, width ) => {
          objects.forEach( obj => {
            const field = element.querySelector( '.field:nth-child(' + ( obj.x + 1 + obj.y * width ) + ')' );
            const size = this.objects[ obj.type ].size;
            field.appendChild( $.html( {
              tag: 'img',
              class: 'obj',
              src: this.path + 'images/objects/' + obj.type + ( obj.nr || '' ) + '.png',
              style: 'transform: rotate(' + ( ( obj.direction || 0 ) * 90 ) + 'deg); width: ' + size + '%; height: ' + size + '%'
            } ) );
          } );
        }

      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when a robot has been selected
         * @param {string} robot_id - ID of the selected robot
         * @returns {Promise<void>}
         */
        onSelectedRobot: async robot_id => {
          robot = robot_id;
          if ( !game.master ) game.master = robot;
          const player = game.robots[ robot ] = { deck: [], energy: 5 };
          for ( const id in this.cards )
            for ( let i = 0; i < this.cards[ id ].amount; i++ )
              player.deck.push( this.cards[ id ].id );
          $.shuffleArray( player.deck );
          await helper.save();
          console.log( helper.getRobotName() + ' wurde als Roboter ausgewählt.' );
          await play();
        },

        /**
         * when a racetrack has been selected
         * @param {number} nr - racetrack number
         * @returns {Promise<void>}
         */
        onSelectedRacetrack: async nr => {
          Object.assign( game, {
            racetrack: nr,
            objects: $.clone( this.racetracks[ nr - 1 ].objects )
          } );
          helper.findFields( nr, 'POWER' ).forEach( field => game.objects.push( {
            type: "ECUBE",
            x: field.x,
            y: field.y,
            width: this.size / 5,
            height: this.size / 5
          } ) );
          await helper.save();
          console.log( 'Die ' + nr + '. Rennstrecke wurde ausgewählt.' );
          await play();
        }

      };

      /**
       * contains all app specific help functions
       * @type {Object.<string,Function>}
       */
      const helper = {

        /**
         * finds all fields of a certain type in a racetrack
         * @param {number} racetrack - racetrack number
         * @param {string} field - field type
         */
        findFields: ( racetrack, field ) => {
          const board = this.racetracks[ racetrack - 1 ].board;
          const fields = [];
          for ( let y = 0; y < board.length; y++ )
            for ( let x = 0; x < board[ y ].length; x++ )
              if ( board[ y ][ x ] === field )
                fields.push( { x: x, y: y } );
          return fields;
        },

        /**
         * gets the name of a robot
         * @param {string} [robot_id = robot] roboter ID (default: ID of the selected robot)
         * @returns {string} robot name
         */
        getRobotName: ( robot_id = robot ) => this.robots[ robot_id ].name,

        /** sets initial game state data */
        newGame: async () => {
          game = {
            robots: {},
            damage: {},
            special: Object.keys( this.special ),
            upgrades: Object.keys( this.upgrades )
          };
          for ( const id in this.damage )
            game.damage[ id ] = this.damage[ id ].amount;
          $.shuffleArray( game.special );
          $.shuffleArray( game.upgrades );
          await helper.save();
        },

        /** saves game state data */
        save: async () => this.data.store.set( game )

      };

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

      const _render = async () => {
        renderRacetrack();
        await $.sleep( 300 );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();