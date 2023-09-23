const apiDoc = {
    swagger: "2.0",
    basePath: "/",
    info: {
      title: "Library app API.",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        name: "Authorization",
        in: "header",
        type: "apiKey",
        description: "JWT Authorization header"
      }
    },
    definitions: {
      Book: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          title: {
            type: "string",
          },
          publicationDate: {
            type: "string"
          },
          editOffice: {
            type: "string"
          }
        },
        required: ["title"],
      },
      Author: {
        type: "object",
        properties: {
            id: {
              type: "number"
            },
            name: {
              type: "string"
            },
            dateOfBirth: {
              type: "string"
            }
        },
        required: ["name"],
      },
      Genre: {
        type: "object",
        properties: {
            id: {
              type: "number"
            },
            name: {
              type: "string"
            }
        },
        required: ["name"],
      },
      BookAndAuthors: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          title: {
            type: "string",
          },
          publicationDate: {
            type: "string"
          },
          editOffice: {
            type: "string"
          },
          authors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "number"
                },
                name: {
                  type: "string",
                },
                dateOfBirth: {
                  type: "string"
                }
              },
              required: ["name"]
            }
          }
        },
        required: ["title", "name"]
      },
      AuthorAndBooks: {
        type: "object",
        properties: {
          id: {
            type: "number"
          },
          name: {
            type: "string"
          },
          dateOfBirth: {
            type: "string"
          },
          books: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                title: {
                  type: "string",
                },
                publicationDate: {
                  type: "string"
                },
                editOffice: {
                  type: "string"
                },
              },
              required: ["title", "name"]
            }
          }
        },
        required: ["name"]
      },
      SignUpData: {
        type: "object",
        properties: {
          username: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          confirmPassword: {
            type: 'string'
          }
        },
        required: ["username", "email", "password", "confirmPassword"]
      },
      SignInData: {
        type: "object",
        properties: {
          username: {
            type: "string"
          },
          password: {
            type: "string"
          }
        },
        required: ["username", "password"]
      },
      User: {
        type: "object",
        properties: {
           id: {
             type: "number"
           },
           email: {
             type: "string"
           },
           username: {
             type: "string"
           },
           token: {
             type: "string"
           },
           message: {
             type: "string"
           },
           error: {
            type: "boolean"
           }
        }
      },
      AuthenticationError: {
        type: "object",
        properties: {
          error: {
            type: "boolean"
          },
          message: {
            type: "string"
          }
        }
      },
      AuthErrors: {
         type: "array",
         items: {
           type: "object",
           properties: {
             message: {
               type: "string"
             }
           }
         }
      }
    },
    paths: {},
  };
  
  module.exports = apiDoc;