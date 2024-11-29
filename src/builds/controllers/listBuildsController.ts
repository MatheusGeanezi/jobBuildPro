import { Request, Response } from 'express'
import { listBuildsService } from '../services/listBuildsService'


export const listBuildsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const response = await listBuildsService(page,limit)
    res.status(201).json(response)
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}