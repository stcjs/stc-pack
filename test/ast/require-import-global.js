module.exports.code = `
global.a = 123;
var global = {};

global.b = 2222;
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
  "end": 164,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 8,
      "column": 25
    }
  },
  "program": {
    "type": "Program",
    "start": 0,
    "end": 164,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 8,
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
        "end": 32,
        "loc": {
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 16
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 20,
            "end": 31,
            "loc": {
              "start": {
                "line": 2,
                "column": 4
              },
              "end": {
                "line": 2,
                "column": 15
              }
            },
            "id": {
              "type": "Identifier",
              "start": 20,
              "end": 26,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 4
                },
                "end": {
                  "line": 2,
                  "column": 10
                }
              },
              "name": "global"
            },
            "init": {
              "type": "ObjectExpression",
              "start": 29,
              "end": 31,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 13
                },
                "end": {
                  "line": 2,
                  "column": 15
                }
              },
              "properties": []
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "VariableDeclaration",
        "start": 33,
        "end": 64,
        "loc": {
          "start": {
            "line": 3,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 31
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 37,
            "end": 63,
            "loc": {
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 3,
                "column": 30
              }
            },
            "id": {
              "type": "Identifier",
              "start": 37,
              "end": 40,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 3,
                  "column": 7
                }
              },
              "name": "abc"
            },
            "init": {
              "type": "CallExpression",
              "start": 43,
              "end": 63,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 10
                },
                "end": {
                  "line": 3,
                  "column": 30
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 43,
                "end": 50,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 10
                  },
                  "end": {
                    "line": 3,
                    "column": 17
                  }
                },
                "name": "require"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 51,
                  "end": 62,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 18
                    },
                    "end": {
                      "line": 3,
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
        "start": 65,
        "end": 82,
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 17
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 65,
          "end": 81,
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
            "start": 65,
            "end": 72,
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
              "start": 73,
              "end": 80,
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
        }
      },
      {
        "type": "ExpressionStatement",
        "start": 83,
        "end": 102,
        "loc": {
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 19
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 83,
          "end": 101,
          "loc": {
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 18
            }
          },
          "callee": {
            "type": "CallExpression",
            "start": 83,
            "end": 99,
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 16
              }
            },
            "callee": {
              "type": "Identifier",
              "start": 83,
              "end": 90,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 7
                }
              },
              "name": "require"
            },
            "arguments": [
              {
                "type": "Literal",
                "start": 91,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
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
        "start": 103,
        "end": 125,
        "loc": {
          "start": {
            "line": 6,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 22
          }
        },
        "specifiers": [
          {
            "type": "ImportDefaultSpecifier",
            "start": 110,
            "end": 112,
            "loc": {
              "start": {
                "line": 6,
                "column": 7
              },
              "end": {
                "line": 6,
                "column": 9
              }
            },
            "local": {
              "type": "Identifier",
              "start": 110,
              "end": 112,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 7
                },
                "end": {
                  "line": 6,
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
          "start": 118,
          "end": 124,
          "loc": {
            "start": {
              "line": 6,
              "column": 15
            },
            "end": {
              "line": 6,
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
        "start": 126,
        "end": 138,
        "loc": {
          "start": {
            "line": 7,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 12
          }
        },
        "specifiers": [],
        "source": {
          "type": "Literal",
          "start": 133,
          "end": 137,
          "loc": {
            "start": {
              "line": 7,
              "column": 7
            },
            "end": {
              "line": 7,
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
        "start": 139,
        "end": 164,
        "loc": {
          "start": {
            "line": 8,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 25
          }
        },
        "specifiers": [
          {
            "type": "ImportNamespaceSpecifier",
            "start": 146,
            "end": 152,
            "loc": {
              "start": {
                "line": 8,
                "column": 7
              },
              "end": {
                "line": 8,
                "column": 13
              }
            },
            "local": {
              "type": "Identifier",
              "start": 151,
              "end": 152,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 12
                },
                "end": {
                  "line": 8,
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
          "start": 158,
          "end": 163,
          "loc": {
            "start": {
              "line": 8,
              "column": 19
            },
            "end": {
              "line": 8,
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
      "value": "global",
      "start": 20,
      "end": 26,
      "loc": {
        "start": {
          "line": 2,
          "column": 4
        },
        "end": {
          "line": 2,
          "column": 10
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
      "start": 27,
      "end": 28,
      "loc": {
        "start": {
          "line": 2,
          "column": 11
        },
        "end": {
          "line": 2,
          "column": 12
        }
      }
    },
    {
      "type": {
        "label": "{",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
      },
      "start": 29,
      "end": 30,
      "loc": {
        "start": {
          "line": 2,
          "column": 13
        },
        "end": {
          "line": 2,
          "column": 14
        }
      }
    },
    {
      "type": {
        "label": "}",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
      },
      "start": 30,
      "end": 31,
      "loc": {
        "start": {
          "line": 2,
          "column": 14
        },
        "end": {
          "line": 2,
          "column": 15
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
      "start": 31,
      "end": 32,
      "loc": {
        "start": {
          "line": 2,
          "column": 15
        },
        "end": {
          "line": 2,
          "column": 16
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
      "start": 33,
      "end": 36,
      "loc": {
        "start": {
          "line": 3,
          "column": 0
        },
        "end": {
          "line": 3,
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
      "start": 37,
      "end": 40,
      "loc": {
        "start": {
          "line": 3,
          "column": 4
        },
        "end": {
          "line": 3,
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
      "start": 41,
      "end": 42,
      "loc": {
        "start": {
          "line": 3,
          "column": 8
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
      "value": "require",
      "start": 43,
      "end": 50,
      "loc": {
        "start": {
          "line": 3,
          "column": 10
        },
        "end": {
          "line": 3,
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
      "start": 50,
      "end": 51,
      "loc": {
        "start": {
          "line": 3,
          "column": 17
        },
        "end": {
          "line": 3,
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
      "start": 51,
      "end": 62,
      "loc": {
        "start": {
          "line": 3,
          "column": 18
        },
        "end": {
          "line": 3,
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
      "start": 62,
      "end": 63,
      "loc": {
        "start": {
          "line": 3,
          "column": 29
        },
        "end": {
          "line": 3,
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
      "start": 63,
      "end": 64,
      "loc": {
        "start": {
          "line": 3,
          "column": 30
        },
        "end": {
          "line": 3,
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
      "start": 65,
      "end": 72,
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
      "start": 72,
      "end": 73,
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
      "start": 73,
      "end": 80,
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
      "start": 80,
      "end": 81,
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
      "start": 81,
      "end": 82,
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
      "start": 83,
      "end": 90,
      "loc": {
        "start": {
          "line": 5,
          "column": 0
        },
        "end": {
          "line": 5,
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
      "start": 90,
      "end": 91,
      "loc": {
        "start": {
          "line": 5,
          "column": 7
        },
        "end": {
          "line": 5,
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
      "start": 91,
      "end": 98,
      "loc": {
        "start": {
          "line": 5,
          "column": 8
        },
        "end": {
          "line": 5,
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
      "start": 98,
      "end": 99,
      "loc": {
        "start": {
          "line": 5,
          "column": 15
        },
        "end": {
          "line": 5,
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
      "start": 99,
      "end": 100,
      "loc": {
        "start": {
          "line": 5,
          "column": 16
        },
        "end": {
          "line": 5,
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
      "start": 100,
      "end": 101,
      "loc": {
        "start": {
          "line": 5,
          "column": 17
        },
        "end": {
          "line": 5,
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
      "start": 101,
      "end": 102,
      "loc": {
        "start": {
          "line": 5,
          "column": 18
        },
        "end": {
          "line": 5,
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
      "start": 103,
      "end": 109,
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
      "start": 110,
      "end": 112,
      "loc": {
        "start": {
          "line": 6,
          "column": 7
        },
        "end": {
          "line": 6,
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
      "start": 113,
      "end": 117,
      "loc": {
        "start": {
          "line": 6,
          "column": 10
        },
        "end": {
          "line": 6,
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
      "start": 118,
      "end": 124,
      "loc": {
        "start": {
          "line": 6,
          "column": 15
        },
        "end": {
          "line": 6,
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
      "start": 124,
      "end": 125,
      "loc": {
        "start": {
          "line": 6,
          "column": 21
        },
        "end": {
          "line": 6,
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
      "start": 126,
      "end": 132,
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
      "start": 133,
      "end": 137,
      "loc": {
        "start": {
          "line": 7,
          "column": 7
        },
        "end": {
          "line": 7,
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
      "start": 137,
      "end": 138,
      "loc": {
        "start": {
          "line": 7,
          "column": 11
        },
        "end": {
          "line": 7,
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
      "start": 139,
      "end": 145,
      "loc": {
        "start": {
          "line": 8,
          "column": 0
        },
        "end": {
          "line": 8,
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
      "start": 146,
      "end": 147,
      "loc": {
        "start": {
          "line": 8,
          "column": 7
        },
        "end": {
          "line": 8,
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
      "start": 148,
      "end": 150,
      "loc": {
        "start": {
          "line": 8,
          "column": 9
        },
        "end": {
          "line": 8,
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
      "start": 151,
      "end": 152,
      "loc": {
        "start": {
          "line": 8,
          "column": 12
        },
        "end": {
          "line": 8,
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
      "start": 153,
      "end": 157,
      "loc": {
        "start": {
          "line": 8,
          "column": 14
        },
        "end": {
          "line": 8,
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
      "start": 158,
      "end": 163,
      "loc": {
        "start": {
          "line": 8,
          "column": 19
        },
        "end": {
          "line": 8,
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
      "start": 163,
      "end": 164,
      "loc": {
        "start": {
          "line": 8,
          "column": 24
        },
        "end": {
          "line": 8,
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
      "start": 164,
      "end": 164,
      "loc": {
        "start": {
          "line": 8,
          "column": 25
        },
        "end": {
          "line": 8,
          "column": 25
        }
      }
    }
  ]
}