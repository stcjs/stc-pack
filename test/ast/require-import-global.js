module.exports.code = `
global.a = 123;
var abc = require('./abc.css');
import fs from './fs';
`;

module.exports.ast =
{
  "type": "File",
  "start": 0,
  "end": 70,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 3,
      "column": 22
    }
  },
  "program": {
    "type": "Program",
    "start": 0,
    "end": 70,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 3,
        "column": 22
      }
    },
    "sourceType": "module",
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 15,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 15
          }
        },
        "expression": {
          "type": "AssignmentExpression",
          "start": 0,
          "end": 14,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "operator": "=",
          "left": {
            "type": "MemberExpression",
            "start": 0,
            "end": 8,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "object": {
              "type": "Identifier",
              "start": 0,
              "end": 6,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 6
                }
              },
              "name": "global"
            },
            "property": {
              "type": "Identifier",
              "start": 7,
              "end": 8,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 7
                },
                "end": {
                  "line": 1,
                  "column": 8
                }
              },
              "name": "a"
            },
            "computed": false
          },
          "right": {
            "type": "Literal",
            "start": 11,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 11
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "value": 123,
            "rawValue": 123,
            "raw": "123"
          }
        }
      },
      {
        "type": "VariableDeclaration",
        "start": 16,
        "end": 47,
        "loc": {
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 31
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 20,
            "end": 46,
            "loc": {
              "start": {
                "line": 2,
                "column": 4
              },
              "end": {
                "line": 2,
                "column": 30
              }
            },
            "id": {
              "type": "Identifier",
              "start": 20,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 4
                },
                "end": {
                  "line": 2,
                  "column": 7
                }
              },
              "name": "abc"
            },
            "init": {
              "type": "CallExpression",
              "start": 26,
              "end": 46,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 10
                },
                "end": {
                  "line": 2,
                  "column": 30
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 26,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 10
                  },
                  "end": {
                    "line": 2,
                    "column": 17
                  }
                },
                "name": "require"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 34,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 18
                    },
                    "end": {
                      "line": 2,
                      "column": 29
                    }
                  },
                  "value": "./abc.css",
                  "rawValue": "./abc.css",
                  "raw": "'./abc.css'"
                }
              ]
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "ImportDeclaration",
        "start": 48,
        "end": 70,
        "loc": {
          "start": {
            "line": 3,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 22
          }
        },
        "specifiers": [
          {
            "type": "ImportDefaultSpecifier",
            "start": 55,
            "end": 57,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 9
              }
            },
            "local": {
              "type": "Identifier",
              "start": 55,
              "end": 57,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 9
                }
              },
              "name": "fs"
            }
          }
        ],
        "importKind": "value",
        "source": {
          "type": "Literal",
          "start": 63,
          "end": 69,
          "loc": {
            "start": {
              "line": 3,
              "column": 15
            },
            "end": {
              "line": 3,
              "column": 21
            }
          },
          "value": "./fs",
          "rawValue": "./fs",
          "raw": "'./fs'"
        }
      }
    ]
  },
  "comments": [],
  "tokens": [
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "global",
      "start": 0,
      "end": 6,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 6
        }
      }
    },
    {
      "type": {
        "label": ".",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 6,
      "end": 7,
      "loc": {
        "start": {
          "line": 1,
          "column": 6
        },
        "end": {
          "line": 1,
          "column": 7
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "a",
      "start": 7,
      "end": 8,
      "loc": {
        "start": {
          "line": 1,
          "column": 7
        },
        "end": {
          "line": 1,
          "column": 8
        }
      }
    },
    {
      "type": {
        "label": "=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": true,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "=",
      "start": 9,
      "end": 10,
      "loc": {
        "start": {
          "line": 1,
          "column": 9
        },
        "end": {
          "line": 1,
          "column": 10
        }
      }
    },
    {
      "type": {
        "label": "num",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": 123,
      "start": 11,
      "end": 14,
      "loc": {
        "start": {
          "line": 1,
          "column": 11
        },
        "end": {
          "line": 1,
          "column": 14
        }
      }
    },
    {
      "type": {
        "label": ";",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 14,
      "end": 15,
      "loc": {
        "start": {
          "line": 1,
          "column": 14
        },
        "end": {
          "line": 1,
          "column": 15
        }
      }
    },
    {
      "type": {
        "label": "var",
        "keyword": "var",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "var",
      "start": 16,
      "end": 19,
      "loc": {
        "start": {
          "line": 2,
          "column": 0
        },
        "end": {
          "line": 2,
          "column": 3
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "abc",
      "start": 20,
      "end": 23,
      "loc": {
        "start": {
          "line": 2,
          "column": 4
        },
        "end": {
          "line": 2,
          "column": 7
        }
      }
    },
    {
      "type": {
        "label": "=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": true,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "=",
      "start": 24,
      "end": 25,
      "loc": {
        "start": {
          "line": 2,
          "column": 8
        },
        "end": {
          "line": 2,
          "column": 9
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "require",
      "start": 26,
      "end": 33,
      "loc": {
        "start": {
          "line": 2,
          "column": 10
        },
        "end": {
          "line": 2,
          "column": 17
        }
      }
    },
    {
      "type": {
        "label": "(",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
      },
      "start": 33,
      "end": 34,
      "loc": {
        "start": {
          "line": 2,
          "column": 17
        },
        "end": {
          "line": 2,
          "column": 18
        }
      }
    },
    {
      "type": {
        "label": "string",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "./abc.css",
      "start": 34,
      "end": 45,
      "loc": {
        "start": {
          "line": 2,
          "column": 18
        },
        "end": {
          "line": 2,
          "column": 29
        }
      }
    },
    {
      "type": {
        "label": ")",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
      },
      "start": 45,
      "end": 46,
      "loc": {
        "start": {
          "line": 2,
          "column": 29
        },
        "end": {
          "line": 2,
          "column": 30
        }
      }
    },
    {
      "type": {
        "label": ";",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 46,
      "end": 47,
      "loc": {
        "start": {
          "line": 2,
          "column": 30
        },
        "end": {
          "line": 2,
          "column": 31
        }
      }
    },
    {
      "type": {
        "label": "import",
        "keyword": "import",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "import",
      "start": 48,
      "end": 54,
      "loc": {
        "start": {
          "line": 3,
          "column": 0
        },
        "end": {
          "line": 3,
          "column": 6
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "fs",
      "start": 55,
      "end": 57,
      "loc": {
        "start": {
          "line": 3,
          "column": 7
        },
        "end": {
          "line": 3,
          "column": 9
        }
      }
    },
    {
      "type": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "from",
      "start": 58,
      "end": 62,
      "loc": {
        "start": {
          "line": 3,
          "column": 10
        },
        "end": {
          "line": 3,
          "column": 14
        }
      }
    },
    {
      "type": {
        "label": "string",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "value": "./fs",
      "start": 63,
      "end": 69,
      "loc": {
        "start": {
          "line": 3,
          "column": 15
        },
        "end": {
          "line": 3,
          "column": 21
        }
      }
    },
    {
      "type": {
        "label": ";",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 69,
      "end": 70,
      "loc": {
        "start": {
          "line": 3,
          "column": 21
        },
        "end": {
          "line": 3,
          "column": 22
        }
      }
    },
    {
      "type": {
        "label": "eof",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
      },
      "start": 70,
      "end": 70,
      "loc": {
        "start": {
          "line": 3,
          "column": 22
        },
        "end": {
          "line": 3,
          "column": 22
        }
      }
    }
  ]
}