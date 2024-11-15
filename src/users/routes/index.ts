import { Router } from 'express';
import { postUserController } from '../controllers/postUserController';
import { listUserController } from '../controllers/listUsersController';


const usersRouter = Router();

usersRouter
.get('/', listUserController)
.post('/', postUserController)


export default usersRouter