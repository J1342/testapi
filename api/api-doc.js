const apiDoc = {
    swagger: "2.0",
    basePath: "/",
    info: {
      title: "Library app API.",
      version: "1.0.0",
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
      }
    },
    paths: {},
  };
  
  module.exports = apiDoc;