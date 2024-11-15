import { Request, Response } from 'express'
import { listUserService } from '../services/listUsersService'

export const listUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await listUserService()
    res.status(201).json(response)
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}