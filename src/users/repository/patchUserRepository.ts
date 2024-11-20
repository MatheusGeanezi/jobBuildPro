import Users, { IUsers } from '../schema/users'

export const patchUserRepository = async (filter: Object, set: Partial<IUsers>): Promise<void> => {
  await Users.updateOne(
    filter, 
    { $set: set },
  )

}