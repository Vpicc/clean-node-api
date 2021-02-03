import { Express } from 'express';
import { bodyParser, contentType, cors } from '../middlewares';

const setupMiddlewares = (app: Express) : void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};

export default setupMiddlewares;
