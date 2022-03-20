const HttpReponse = require('../helpers/Http-response')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')

class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpReponse.badRequest(new MissingParamError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpReponse.badRequest(new InvalidParamError('email'))
      }

      if (!password) {
        return HttpReponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpReponse.unauthorizedError()
      }

      return HttpReponse.ok({ accessToken })
    } catch (error) {
      console.error(error)
      return HttpReponse.serverError()
    }
  }
}

module.exports = LoginRouter
