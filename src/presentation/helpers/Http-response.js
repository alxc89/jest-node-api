const MissingParamError = require('./Missing-param-error')

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

module.exports = HttpReponse
