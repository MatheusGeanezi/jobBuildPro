import { Router } from 'express';
import { postUserController } from '../controllers/postUserController';
import { listUserController } from '../controllers/listUsersController';
import { patchUserController } from '../controllers/patchUserController';


const usersRouter = Router();

usersRouter
.get('/', listUserController)
.post('/', postUserController)
.patch('/:id', patchUserController)


export default usersRouter