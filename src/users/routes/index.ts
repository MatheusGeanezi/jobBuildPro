import { Router } from 'express';
import { postUserController } from '../controllers/postUserController';


const usersRouter = Router();

usersRouter
.post('/', postUserController)


export default usersRouter