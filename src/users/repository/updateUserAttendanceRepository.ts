import Users from '../schema/users'
import { Types } from 'mongoose'

export const updateUserAttendanceRepository = async ({
  userId,
  attendance
}: {
  userId: Types.ObjectId
  attendance: any[]
}) => {
  try {
    const result = await Users.findByIdAndUpdate(
      userId,
      { attendance },
      { new: true, runValidators: true }
    )
    return result
  } catch (error) {
    throw new Error('Erro ao atualizar a presença!')
  }
}
