import Users, { IUsers } from "../schema/users"

export const findUserRepository = async (filter: object, project?: object): Promise<IUsers[]> => {
    return await Users.find(filter,project)
  }