import Users, { IUsers } from '../schema/users'

export const findOneUserRepository = async (filter: object, project?: object): Promise<IUsers | null> => {
  return await Users.findOne(filter,project)
}
