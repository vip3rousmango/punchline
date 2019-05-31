const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('punchline', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('returns random punchline', ctx => {
    // expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .do(() => cmd.run(['--search', 'poop']))
  .it('searches for a punchline --s poop', ctx => {
    // expect(ctx.stdout).to.contain('hello jeff')
  })
})
