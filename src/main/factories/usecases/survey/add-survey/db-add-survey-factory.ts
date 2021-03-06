import DbAddSurvey from '../../../../../data/usecases/add-survey/db-add-survey';
import { AddSurvey } from '../../../../../domain/usecases/add-survey';
import SurveyMongoRepository from '../../../../../infra/db/mongodb/survey/survey-mongo-repository';

const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  const dbAddSurvey = new DbAddSurvey(
    surveyMongoRepository,
  );
  return dbAddSurvey;
};

export default makeDbAddSurvey;
