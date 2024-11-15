import { findOneUserRepository } from '../repository/findOneUserRepository'
import { postUserRepository } from '../repository/postUserRepository'
import { IUsers } from '../schema/users'

export const postUserService = async (body: IUsers): Promise<void> => {
  const { name, phone } = body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('O campo nome é obrigatório!')
  }

  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    throw new Error('O campo telefone é obrigatório!')
  }

  const findUser = await findOneUserRepository({ phone })

  if (!findUser) {
    await postUserRepository(body)
  } else {
    throw new Error(`Usuário com o telefone ${phone} já existe`)
  }
}
