import { findUserRepository } from "../repository/findUsersRepository"
import { IUsers } from "../schema/users"



export const listUserService = async (): Promise<IUsers[]> => {
    return await findUserRepository({active: true})
}