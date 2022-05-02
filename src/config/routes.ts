import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

import { v1_ContactsController, v1_AuthController } from '../http/v1/controllers';

import JWTVerifyMiddleware from '../http/middlewares/JWTVerifyMiddleware';

const routes = Router();

const routes_v1 = (version = '/api/v1') => {
  routes.get(`${version}/(|healthcheck)`, (_, res) => {
    res.status(200).send({
      code: 200,
      message: "I'm alive 💓",
    });
  });

  routes.get(`${version}/contacts`, JWTVerifyMiddleware, v1_ContactsController.all);
  routes.post(`${version}/contacts`, JWTVerifyMiddleware, v1_ContactsController.store);

  routes.post(`${version}/register`, v1_AuthController.register);
  routes.post(`${version}/auth`, v1_AuthController.auth);

  routes.use(`${version}/docs`, swaggerUi.serve);
  routes.get(
    `${version}/docs`,
    swaggerUi.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
    })
  );
};

routes_v1();

export { routes };
