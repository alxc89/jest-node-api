class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpReponse.badRequest('email')
    }
    if (!password) {
      return HttpReponse.badRequest('password')
    }
  }
}

class HttpReponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })
})
