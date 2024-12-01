import { Router } from 'express'
import { postUserController } from '../controllers/postUserController'
import { listUserController } from '../controllers/listUsersController'
import { patchUserController } from '../controllers/patchUserController'
import { updateUserAttendanceController } from '../controllers/registerDailyAttendanceController'

const usersRouter = Router()

usersRouter
  .get('/', listUserController)
  .post('/', postUserController)
  .patch('/attendance', updateUserAttendanceController)
  .patch('/:id', patchUserController)

export default usersRouter
