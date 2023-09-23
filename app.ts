import db from './models';
import books_router from './routes/book_router';
import authors_router from './routes/author_router';
import genres_router from './routes/genre_router';
import auth_router from './routes/auth_routes';
import oauth_router from './routes/oauth_router'
import { initialize } from 'express-openapi';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import passport from 'passport';
import verifyToken from './middlewares/token_middleware';

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

require("dotenv")
  .config();

const config = require(__dirname + '/config/config.json')['development'];
const Sequelize = require('sequelize');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const myStore = new SequelizeStore({
  db: sequelize,
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: myStore
}));

myStore.sync();
app.use(passport.authenticate('session'));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/books', verifyToken, books_router);
app.use('/authors', verifyToken, authors_router);
app.use('/genres', verifyToken, genres_router);
app.use('/auth', auth_router);
app.use('/oauth', oauth_router);


app.listen(3030, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;