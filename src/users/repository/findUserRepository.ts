import Users, { IUsers } from '../schema/users'

export const findUserRepository = async (filter: object): Promise<IUsers | null> => {
  return await Users.findOne(filter)
}
