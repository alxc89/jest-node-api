class UnauthorizedError extends Error {
  constructor (paramName) {
    super('Internal error')
    this.name = 'ServerError'
  }
}

module.exports = UnauthorizedError
