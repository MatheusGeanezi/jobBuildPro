// src/routes/index.ts
import { Router } from 'express'
import usersRouter from '../src/users/routes'

const router = Router()

router.use('/users', usersRouter)

export default router