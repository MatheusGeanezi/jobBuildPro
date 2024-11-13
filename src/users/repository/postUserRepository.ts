import Users, { IUsers } from '../schema/users'

export const postUserRepository = async (body: IUsers): Promise<void> => {
  await Users.create(body)
}
