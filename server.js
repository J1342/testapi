const app = require("./app");
const port = 3030;
const {initialize} =  require('express-openapi');
const swaggerUi = require('swagger-ui-express');

initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths",
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://localhost:3030/api-docs`,
    },
  })
);

app.listen(3030, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});