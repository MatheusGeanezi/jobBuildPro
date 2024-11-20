import { Request, Response } from 'express'
import { patchUserService } from '../services/patchUsersService'


export const patchUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await patchUserService(req.params.id,req.body)
    res.status(200).json({ message: 'Funcionario alterado' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}
