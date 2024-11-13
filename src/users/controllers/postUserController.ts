import { Request, Response } from 'express'
import { postUserService } from '../services/postUsersService'

export const postUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await postUserService(req.body)
    res.status(201).json({ message: 'Funcionario adicionado' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}
