import { findOneUserRepository } from '../repository/findOneUserRepository'
import { patchUserRepository } from '../repository/patchUserRepository'
import { Types } from 'mongoose'
import { patchUserService } from '../services/patchUsersService'

jest.mock('../repository/findOneUserRepository')
jest.mock('../repository/patchUserRepository')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedPatchUserRepository = patchUserRepository as jest.Mock

const makesut = (body: any) => {
    return patchUserService(body)
  }

describe('patchUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if _id is not provided', async () => {
    const { service } = makesut()
    await expect(service('', { name: 'John', phone: '123456789' }))
      .rejects.toThrow("O 'id' do usuário é obrigatório para a atualização.")
  })

  it('should throw an error if user is not found', async () => {
    const { service, findOneUserRepository } = makesut()
    const _id = new Types.ObjectId().toString()
    findOneUserRepository.mockResolvedValue(null)

    await expect(service(_id, { name: 'John', phone: '123456789' }))
      .rejects.toThrow('Usuário não foi encontrado.')
  })

  it('should throw an error if name is invalid', async () => {
    const { service, findOneUserRepository } = makesut()
    const _id = new Types.ObjectId().toString()
    findOneUserRepository.mockResolvedValue({})

    await expect(service(_id, { name: '', phone: '123456789' }))
      .rejects.toThrow('O campo nome é obrigatório!')
  })

  it('should throw an error if phone is invalid', async () => {
    const { service, findOneUserRepository } = makesut()
    const _id = new Types.ObjectId().toString()
    findOneUserRepository.mockResolvedValue({})

    await expect(service(_id, { name: 'John', phone: '' }))
      .rejects.toThrow('O campo telefone é obrigatório!')
  })

  it('should call patchUserRepository with correct data when inputs are valid', async () => {
    const { service, findOneUserRepository, patchUserRepository } = makesut()
    const _id = new Types.ObjectId().toString()
    const body = { name: 'John', phone: '123456789' }
    const filter = { _id: new Types.ObjectId(_id) }

    findOneUserRepository.mockResolvedValue({ _id })
    patchUserRepository.mockResolvedValue(null)

    await service(_id, body)

    expect(findOneUserRepository).toHaveBeenCalledWith(filter)
    expect(patchUserRepository).toHaveBeenCalledWith(filter, body)
  })
})
