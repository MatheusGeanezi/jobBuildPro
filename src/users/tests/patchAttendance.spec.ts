import { Types } from 'mongoose'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import { updateUserAttendanceRepository } from '../repository/updateUserAttendanceRepository'
import { updateUserAttendanceService } from '../services/updateUserAttendanceService'
import { sendNotification } from '../../integrations/rabbitmq/sendNotification'

jest.mock('../repository/findOneUserRepository')
jest.mock('../repository/updateUserAttendanceRepository')
jest.mock('../../integrations/rabbitmq/sendNotification')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedUpdateUserAttendanceRepository =
  updateUserAttendanceRepository as jest.Mock
const mockedSendNotification = sendNotification as jest.Mock

const makesut = (userId: string, present: boolean) => {
  return updateUserAttendanceService({ userId, present })
}

describe('updateAttendanceService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if userId is not provided', async () => {
    const present = true
    await expect(makesut('', present)).rejects.toThrow('Usuário obrigatorio')
  })

  it('should throw an error if user is not found', async () => {
    const _id = new Types.ObjectId().toString()
    const present = true
    mockedFindOneUserRepository.mockResolvedValue(null)

    await expect(makesut(_id, present)).rejects.toThrow(
      'Usuário não encontrado'
    )
  })

  it('should return message if presence is already confirmed for today', async () => {
    const _id = new Types.ObjectId().toString()
    const present = true
    const today = new Date().toISOString().split('T')[0]

    const user = {
      _id,
      attendance: [{ date: today, present: true }]
    }
    mockedSendNotification.mockResolvedValue(null)
    mockedFindOneUserRepository.mockResolvedValue(user)

    const result = await makesut(_id, present)
    expect(result.message).toBe(`A presença para hoje já foi confirmada.`)
  })

  it('should update attendance and return success message when presence is not yet recorded for today', async () => {
    const _id = new Types.ObjectId()
    const present = true

    const user = {
      _id,
      attendance: []
    }

    mockedFindOneUserRepository.mockResolvedValue(user)
    mockedSendNotification.mockResolvedValue(null)
    mockedUpdateUserAttendanceRepository.mockResolvedValue(user)

    const result = await makesut(_id.toString(), present)

    expect(result.message).toBe(`Presença confirmada para hoje.`)
    expect(mockedUpdateUserAttendanceRepository).toHaveBeenCalledWith({
      userId: _id,
      attendance: [{ date: new Date(), present }]
    })
  })

  it('should return message when absence is marked for today', async () => {
    const _id = new Types.ObjectId()
    const present = false
    const today = new Date().toISOString().split('T')[0]

    const user = {
      _id,
      attendance: []
    }

    mockedFindOneUserRepository.mockResolvedValue(user)
    mockedUpdateUserAttendanceRepository.mockResolvedValue(user)

    const result = await makesut(_id.toString(), present)

    expect(result.message).toBe(`Presença marcada como ausência para hoje.`)
    expect(mockedUpdateUserAttendanceRepository).toHaveBeenCalledWith({
      userId: new Types.ObjectId(_id),
      attendance: [{ date: new Date(), present: false }]
    })
  })
})
