import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import PubController from '../controllers/PubController';

const routes = Router();

routes.get('/', (req, res) => res.status(200).send('Olá Teste'));
routes.post('/user', UserController.store);
routes.post('/pub', PubController.store);
routes.post('/session', SessionController.store);

export default routes;
