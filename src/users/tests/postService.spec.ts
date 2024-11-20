import { findOneUserRepository } from "../repository/findOneUserRepository"
import { postUserRepository } from "../repository/postUserRepository"
import { postUserService } from "../services/postUsersService"


jest.mock('../repository/findOneUserRepository')
jest.mock('../repository/postUserRepository')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedPostUserRepository = postUserRepository as jest.Mock

const makeSUT = (body: any) => {
  return postUserService(body)
}

describe('postUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks() 
  })

  it('Should create a user if not exists', async () => {
    const userData = { name: 'João', phone: '123456789' }

    mockedFindOneUserRepository.mockResolvedValue(null) 
    mockedPostUserRepository.mockResolvedValue(null) 

    await expect(makeSUT(userData)).resolves.toBeUndefined()

    expect(mockedFindOneUserRepository).toHaveBeenCalledWith({ phone: '123456789' })
    expect(mockedPostUserRepository).toHaveBeenCalledWith(userData)
  })

  it('Should throw an error if phone already exists', async () => {
    const userData = { name: 'João', phone: '123456789' }

    mockedFindOneUserRepository.mockResolvedValue({ id: '1', ...userData }) 

    await expect(makeSUT(userData)).rejects.toThrow('Usuário com o telefone 123456789 já existe')

    expect(mockedFindOneUserRepository).toHaveBeenCalledWith({ phone: '123456789' })
    expect(mockedPostUserRepository).not.toHaveBeenCalled()
  })

  it('Should throw an error if name is missing', async () => {
    const invalidData = { phone: '123456789' } as any 

    await expect(makeSUT(invalidData)).rejects.toThrow('O campo nome é obrigatório!')

    expect(mockedFindOneUserRepository).not.toHaveBeenCalled()
    expect(mockedPostUserRepository).not.toHaveBeenCalled()
  })
})