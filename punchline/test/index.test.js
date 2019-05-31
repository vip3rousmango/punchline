const {expect, test} = require('@oclif/test')
const cmd = require('..')

describe('punchline', () => {
  test
  .nock('https://icanhazdadjoke.com', api => api
  .get('/') // something
  .reply(200, {joke: 'I hate perforated lines, they\'re tearable.'})
  )
  .stdout()
  .do(() => cmd.run([]))
  .it('returns a random punchline', ctx => {
    expect(ctx.stdout).to.equal('I hate perforated lines, they\'re tearable.\n')
  })

  // TODO: Complete Search Feature Testing
  // test
  // .nock('https://icanhazdadjoke.com', api => api
  // .get('/search?query=') // something
  // .reply(200)
  // )
  // .stdout()
  // .do(() => cmd.run(['--search', 'poop']))
  // .it('searches for a relevant punchline --s poop', ctx => {
  //   expect(ctx.stdout).to.equal('I hate perforated lines, they\'re tearable.\n')
  // })
})
