import { findOneUserRepository } from '../repository/findOneUserRepository'
import { Types } from 'mongoose'
import { updateUserAttendanceRepository } from '../repository/updateUserAttendanceRepository'
import { sendNotification } from '../../integrations/rabbitmq/sendNotification'

interface UpdateAttendanceInput {
  userId: string
  present: boolean
}

export const updateUserAttendanceService = async ({
  userId,
  present
}: UpdateAttendanceInput) => {
  if (!userId) {
    throw new Error('Usuário obrigatorio')
  }

  const user = await findOneUserRepository(
    { _id: new Types.ObjectId(userId) },
    { attendace: 1, name: 1 }
  )

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const today = new Date().toISOString().split('T')[0]

  const existingAttendance = user.attendance?.find(
    (att) => att.date.toString().split('T')[0] === today
  )

  if (existingAttendance) {
    return {
      message: `A presença para hoje já foi ${existingAttendance.present ? 'confirmada' : 'marcada como ausência'}.`,
      result: user.attendance
    }
  }

  const userAttendance = user.attendance ?? []

  const result = await updateUserAttendanceRepository({
    userId: user._id as Types.ObjectId,
    attendance: [
      ...userAttendance,
      {
        date: new Date(),
        present
      }
    ]
  })

  const message = present
    ? `Funcionario ${user.name} registrou presença hoje.`
    : `Funcionario ${user.name} foi marcado como ausente hoje.`
  await sendNotification(message)

  return {
    message: `Presença ${present ? 'confirmada' : 'marcada como ausência'} para hoje.`,
    result
  }
}
