'use strict'
const BaseService = require('./base')

class TemplatesService extends BaseService {
  async getTemplate() {
    return this.run(async () => {
      const { ctx } = this
      const res = await ctx.model.Templates.findAll({})
      return res
    })
  }
}

module.exports = TemplatesService
