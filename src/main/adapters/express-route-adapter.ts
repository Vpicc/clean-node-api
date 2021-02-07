import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';

const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };
  const httpResponse = await controller.handle(httpRequest);
  if (httpResponse.statusCode === 200) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};

export default adaptRoute;
