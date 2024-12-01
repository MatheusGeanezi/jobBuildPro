import { Request, Response } from 'express'
import { updateUserAttendanceService } from '../services/updateUserAttendanceService'

export const updateUserAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, present } = req.body

    const result = await updateUserAttendanceService({
      userId,
      present
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro desconhecido' })
  }
}
