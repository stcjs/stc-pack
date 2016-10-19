module.exports.code = `
global.a = 123;
var abc = require('./abc.css');
require('./bbc');
require('./bbc')();
import fs from './fs';
import 'tf';
import * as t from 'lua';
`;

module.exports.ast =
{
  "type": "File",
  "start": 0,
  "end": 147,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 7,
      "column": 25
    }
  },
  "program": {
    "type": "Program",
    "start": 0,
    "end": 147,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 7,
        "column": 25
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
        "type": "ExpressionStatement",
        "start": 48,
        "end": 65,
        "loc": {
          "start": {
            "line": 3,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 17
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 48,
          "end": 64,
          "loc": {
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 16
            }
          },
          "callee": {
            "type": "Identifier",
            "start": 48,
            "end": 55,
            "loc": {
              "start": {
                "line": 3,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 7
              }
            },
            "name": "require"
          },
          "arguments": [
            {
              "type": "Literal",
              "start": 56,
              "end": 63,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 15
                }
              },
              "value": "./bbc",
              "rawValue": "./bbc",
              "raw": "'./bbc'"
            }
          ]
        }
      },
      {
        "type": "ExpressionStatement",
        "start": 66,
        "end": 85,
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 19
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 66,
          "end": 84,
          "loc": {
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 18
            }
          },
          "callee": {
            "type": "CallExpression",
            "start": 66,
            "end": 82,
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 16
              }
            },
            "callee": {
              "type": "Identifier",
              "start": 66,
              "end": 73,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 0
                },
                "end": {
                  "line": 4,
                  "column": 7
                }
              },
              "name": "require"
            },
            "arguments": [
              {
                "type": "Literal",
                "start": 74,
                "end": 81,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 15
                  }
                },
                "value": "./bbc",
                "rawValue": "./bbc",
                "raw": "'./bbc'"
              }
            ]
          },
          "arguments": []
        }
      },
      {
        "type": "ImportDeclaration",
        "start": 86,
        "end": 108,
        "loc": {
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 22
          }
        },
        "specifiers": [
          {
            "type": "ImportDefaultSpecifier",
            "start": 93,
            "end": 95,
            "loc": {
              "start": {
                "line": 5,
                "column": 7
              },
              "end": {
                "line": 5,
                "column": 9
              }
            },
            "local": {
              "type": "Identifier",
              "start": 93,
              "end": 95,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 7
                },
                "end": {
                  "line": 5,
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
          "start": 101,
          "end": 107,
          "loc": {
            "start": {
              "line": 5,
              "column": 15
            },
            "end": {
              "line": 5,
              "column": 21
            }
          },
          "value": "./fs",
          "rawValue": "./fs",
          "raw": "'./fs'"
        }
      },
      {
        "type": "ImportDeclaration",
        "start": 109,
        "end": 121,
        "loc": {
          "start": {
            "line": 6,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 12
          }
        },
        "specifiers": [],
        "source": {
          "type": "Literal",
          "start": 116,
          "end": 120,
          "loc": {
            "start": {
              "line": 6,
              "column": 7
            },
            "end": {
              "line": 6,
              "column": 11
            }
          },
          "value": "tf",
          "rawValue": "tf",
          "raw": "'tf'"
        }
      },
      {
        "type": "ImportDeclaration",
        "start": 122,
        "end": 147,
        "loc": {
          "start": {
            "line": 7,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 25
          }
        },
        "specifiers": [
          {
            "type": "ImportNamespaceSpecifier",
            "start": 129,
            "end": 135,
            "loc": {
              "start": {
                "line": 7,
                "column": 7
              },
              "end": {
                "line": 7,
                "column": 13
              }
            },
            "local": {
              "type": "Identifier",
              "start": 134,
              "end": 135,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 12
                },
                "end": {
                  "line": 7,
                  "column": 13
                }
              },
              "name": "t"
            }
          }
        ],
        "importKind": "value",
        "source": {
          "type": "Literal",
          "start": 141,
          "end": 146,
          "loc": {
            "start": {
              "line": 7,
              "column": 19
            },
            "end": {
              "line": 7,
              "column": 24
            }
          },
          "value": "lua",
          "rawValue": "lua",
          "raw": "'lua'"
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
      "start": 48,
      "end": 55,
      "loc": {
        "start": {
          "line": 3,
          "column": 0
        },
        "end": {
          "line": 3,
          "column": 7
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
      "start": 55,
      "end": 56,
      "loc": {
        "start": {
          "line": 3,
          "column": 7
        },
        "end": {
          "line": 3,
          "column": 8
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
      "value": "./bbc",
      "start": 56,
      "end": 63,
      "loc": {
        "start": {
          "line": 3,
          "column": 8
        },
        "end": {
          "line": 3,
          "column": 15
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
      "start": 63,
      "end": 64,
      "loc": {
        "start": {
          "line": 3,
          "column": 15
        },
        "end": {
          "line": 3,
          "column": 16
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
      "start": 64,
      "end": 65,
      "loc": {
        "start": {
          "line": 3,
          "column": 16
        },
        "end": {
          "line": 3,
          "column": 17
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
      "start": 66,
      "end": 73,
      "loc": {
        "start": {
          "line": 4,
          "column": 0
        },
        "end": {
          "line": 4,
          "column": 7
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
      "start": 73,
      "end": 74,
      "loc": {
        "start": {
          "line": 4,
          "column": 7
        },
        "end": {
          "line": 4,
          "column": 8
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
      "value": "./bbc",
      "start": 74,
      "end": 81,
      "loc": {
        "start": {
          "line": 4,
          "column": 8
        },
        "end": {
          "line": 4,
          "column": 15
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
      "start": 81,
      "end": 82,
      "loc": {
        "start": {
          "line": 4,
          "column": 15
        },
        "end": {
          "line": 4,
          "column": 16
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
      "start": 82,
      "end": 83,
      "loc": {
        "start": {
          "line": 4,
          "column": 16
        },
        "end": {
          "line": 4,
          "column": 17
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
      "start": 83,
      "end": 84,
      "loc": {
        "start": {
          "line": 4,
          "column": 17
        },
        "end": {
          "line": 4,
          "column": 18
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
      "start": 84,
      "end": 85,
      "loc": {
        "start": {
          "line": 4,
          "column": 18
        },
        "end": {
          "line": 4,
          "column": 19
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
      "start": 86,
      "end": 92,
      "loc": {
        "start": {
          "line": 5,
          "column": 0
        },
        "end": {
          "line": 5,
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
      "start": 93,
      "end": 95,
      "loc": {
        "start": {
          "line": 5,
          "column": 7
        },
        "end": {
          "line": 5,
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
      "start": 96,
      "end": 100,
      "loc": {
        "start": {
          "line": 5,
          "column": 10
        },
        "end": {
          "line": 5,
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
      "start": 101,
      "end": 107,
      "loc": {
        "start": {
          "line": 5,
          "column": 15
        },
        "end": {
          "line": 5,
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
      "start": 107,
      "end": 108,
      "loc": {
        "start": {
          "line": 5,
          "column": 21
        },
        "end": {
          "line": 5,
          "column": 22
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
      "start": 109,
      "end": 115,
      "loc": {
        "start": {
          "line": 6,
          "column": 0
        },
        "end": {
          "line": 6,
          "column": 6
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
      "value": "tf",
      "start": 116,
      "end": 120,
      "loc": {
        "start": {
          "line": 6,
          "column": 7
        },
        "end": {
          "line": 6,
          "column": 11
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
      "start": 120,
      "end": 121,
      "loc": {
        "start": {
          "line": 6,
          "column": 11
        },
        "end": {
          "line": 6,
          "column": 12
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
      "start": 122,
      "end": 128,
      "loc": {
        "start": {
          "line": 7,
          "column": 0
        },
        "end": {
          "line": 7,
          "column": 6
        }
      }
    },
    {
      "type": {
        "label": "*",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 10,
        "updateContext": null
      },
      "value": "*",
      "start": 129,
      "end": 130,
      "loc": {
        "start": {
          "line": 7,
          "column": 7
        },
        "end": {
          "line": 7,
          "column": 8
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
      "value": "as",
      "start": 131,
      "end": 133,
      "loc": {
        "start": {
          "line": 7,
          "column": 9
        },
        "end": {
          "line": 7,
          "column": 11
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
      "value": "t",
      "start": 134,
      "end": 135,
      "loc": {
        "start": {
          "line": 7,
          "column": 12
        },
        "end": {
          "line": 7,
          "column": 13
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
      "start": 136,
      "end": 140,
      "loc": {
        "start": {
          "line": 7,
          "column": 14
        },
        "end": {
          "line": 7,
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
      "value": "lua",
      "start": 141,
      "end": 146,
      "loc": {
        "start": {
          "line": 7,
          "column": 19
        },
        "end": {
          "line": 7,
          "column": 24
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
      "start": 146,
      "end": 147,
      "loc": {
        "start": {
          "line": 7,
          "column": 24
        },
        "end": {
          "line": 7,
          "column": 25
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
      "start": 147,
      "end": 147,
      "loc": {
        "start": {
          "line": 7,
          "column": 25
        },
        "end": {
          "line": 7,
          "column": 25
        }
      }
    }
  ]
}