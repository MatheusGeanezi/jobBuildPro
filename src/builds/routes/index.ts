import { Router } from 'express'
import { listBuildsController } from '../controllers/listBuildsController';


const buildsRouter = Router();

buildsRouter
.get('/', listBuildsController)

export default buildsRouter