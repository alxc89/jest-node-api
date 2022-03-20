const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor (LoadUserByEmailRepositorySpy) {
    this.LoadUserByEmailRepositorySpy = LoadUserByEmailRepositorySpy
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    await this.LoadUserByEmailRepositorySpy.load(email)
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth() // retirnado o await pq o jest não suporta. Então vai receber uma promise
    expect(promise).rejects.toThrow(new MissingParamError('email'))// pegando o rejects da promise e verificando se é uma execeção
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com') // retirnado o await pq o jest não suporta. Então vai receber uma promise
    expect(promise).rejects.toThrow(new MissingParamError('password'))// pegando o rejects da promise e verificando se é uma execeção
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }

    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
    await sut.auth('any_email@email.com', 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })
})
