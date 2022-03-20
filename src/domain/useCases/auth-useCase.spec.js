const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth() // retirnado o await pq o jest não suporta. Então vai receber uma promise
    expect(promise).rejects.toThrow(new MissingParamError('email'))// pegando o rejects da promise e verificando se é uma execeção
  })
})
