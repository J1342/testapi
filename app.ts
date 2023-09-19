import db from './models';
import books_router from './routes/book_router';
import authors_router from './routes/author_router';
import genres_router from './routes/genre_router';
import { initialize } from 'express-openapi';
import swaggerUi from 'swagger-ui-express';

import express, { Request, Response , Application } from 'express';


const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/books', books_router);
app.use('/authors', authors_router);
app.use('/genres', genres_router);


app.listen(3030, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;