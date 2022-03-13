const LoginRouter = require('./Login-router')
const MissingParamError = require('../helpers/Missing-param-error')

const makeSut = () => {
  return new LoginRouter()
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@teste.com'
      }
    }
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if httpRequest is provided', () => {
    const sut = makeSut()
    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })

  // test('Should call AuthUseCase with correct params', () => {
  //   const sut = new LoginRouter()
  //   const httpRequest = {}
  //   const httpReponse = sut.route(httpRequest)
  //   expect(httpReponse.statusCode).toBe(500)
  // })
})
