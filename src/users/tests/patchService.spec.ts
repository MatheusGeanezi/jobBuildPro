import { findOneUserRepository } from '../repository/findOneUserRepository'
import { patchUserRepository } from '../repository/patchUserRepository'
import { Types } from 'mongoose'
import { patchUserService } from '../services/patchUsersService'

jest.mock('../repository/findOneUserRepository')
jest.mock('../repository/patchUserRepository')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedPatchUserRepository = patchUserRepository as jest.Mock


const makesut = (id: string,body: any) => {
  return patchUserService(id,body)
}

describe('patchUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if _id is not provided', async () => {
    const body = { name: 'John', phone: '123456789' }
    await expect(makesut('',body))
      .rejects.toThrow("O 'id' do usuário é obrigatório para a atualização.")
  })

  it('should throw an error if user is not found', async () => {
    const body = { name: 'John', phone: '123456789' }
    const _id = new Types.ObjectId().toString()
    mockedFindOneUserRepository.mockResolvedValue(null)

    await expect(makesut(_id,body))
      .rejects.toThrow('Usuário não foi encontrado.')

    expect(mockedFindOneUserRepository).toHaveBeenCalledWith({ _id: new Types.ObjectId(_id) })
  })

  it('should throw an error if name is invalid', async () => {
    const _id = new Types.ObjectId().toString()
    const body = { name: '', phone: '123456789' }
 
    mockedFindOneUserRepository.mockResolvedValue({})

    await expect(makesut(_id,body))
      .rejects.toThrow('O campo nome é obrigatório!')
  })

  it('should throw an error if phone is invalid', async () => {
    const _id = new Types.ObjectId().toString()
    const body = { name: 'John', phone: '' }
    mockedFindOneUserRepository.mockResolvedValue({})

    await expect(makesut(_id,body))
      .rejects.toThrow('O campo telefone é obrigatório!')
  })

  it('should call patchUserRepository with correct data when inputs are valid', async () => {
    const _id = new Types.ObjectId().toString()
    const body = { name: 'John', phone: '123456789' }
    
    mockedFindOneUserRepository.mockResolvedValue({ _id })
    mockedPatchUserRepository.mockResolvedValue(null)
    
    makesut(_id,body)
  })
})
