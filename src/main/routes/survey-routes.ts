import { Router } from 'express';
import adaptRoute from '../adapters/express/express-route-adapter';
import makeSurveyController from '../factories/controllers/survey/add-survey/add-survey-controller-factory';

export default (router: Router) => {
  router.post('/surveys', adaptRoute(makeSurveyController()));
};
