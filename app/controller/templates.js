'use strict'

const Controller = require('egg').Controller

class TemplateController extends Controller {
  async getTemplate() {
    const { ctx, app } = this
    const res = await ctx.service.templates.getTemplate()
    ctx.body = res
  }
}

module.exports = TemplateController
