const HttpReponse = require('../helpers/Http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpReponse.badRequest('email')
      }
      if (!password) {
        return HttpReponse.badRequest('password')
      }
      const accessToken = this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpReponse.unauthorizedError()
      }

      return HttpReponse.ok({ accessToken })
    } catch (error) {
      return HttpReponse.serverError()
    }
  }
}

module.exports = LoginRouter
