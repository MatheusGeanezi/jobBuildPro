import { Types } from 'mongoose'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import { patchUserRepository } from '../repository/patchUserRepository'
import { IUsers } from '../schema/users'

export const patchUserService = async (
  _id: string,
  body: Partial<IUsers>
): Promise<void> => {
  if (!_id) {
    throw new Error("O 'id' do usuário é obrigatório para a atualização.")
  }
  const filter = { _id: new Types.ObjectId(_id) }
  const updatedUser = await findOneUserRepository(filter)

  if (!updatedUser) {
    throw new Error(`Usuário não foi encontrado.`)
  }

  const { name, phone } = body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('O campo nome é obrigatório!')
  }

  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    throw new Error('O campo telefone é obrigatório!')
  }

  await patchUserRepository(filter, body)
}
