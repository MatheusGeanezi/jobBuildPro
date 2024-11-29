// src/routes/index.ts
import { Router } from 'express'
import usersRouter from '../src/users/routes'
import buildsRouter from './builds/routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/builds', buildsRouter)

export default router