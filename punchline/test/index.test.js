/* eslint-disable camelcase */
const {expect, test} = require('@oclif/test')
const cmd = require('..')
// const HTTPS = require('https')

describe('punchline', () => {
  // Get RANDOM PUNCHLINE
  test
  .nock('https://icanhazdadjoke.com', api => api
  .get('/') // specifing nothing returns a random joke
  .reply(200, {joke: 'I hate perforated lines, they\'re tearable.'})
  )
  .stdout()
  .do(() => cmd.run([]))
  .it('returns a random punchline', ctx => {
    expect(ctx.stdout).to.equal('I hate perforated lines, they\'re tearable.\n')
  })

  // eslint-disable-next-line no-warning-comments
  // TODO: Complete Search Feature Testing
  test
  .nock('https://icanhazdadjoke.com', api => api
  .get('/search?term=pizza')
  .reply(200, {
    results: [
      {
        id: 'haMJRfF6hFd',
        joke: 'How do you fix a broken pizza? With tomato paste.',
      },
      {
        id: 'xc21Lmbxcib',
        joke: 'How did the hipster burn the roof of his mouth? He ate the pizza before it was cool.',
      },
      {
        id: 'rc2E6EdiNe',
        joke: 'Want to hear my pizza joke? Never mind, it\'s too cheesy.',
      },
      {
        id: '51DAA5Tfaxc',
        joke: 'What did Romans use to cut pizza before the rolling cutter was invented? Lil Caesars',
      },
    ],
  })
  )
  .stdout()
  .do(() => cmd.run(['--search', 'pizza']))
  // .it('', async () => {
  //   const {body: response} = await HTTPS.get('https://icanhazdadjoke.com/search?term=pizza')
  //   expect(response.results[0])
  // })
  .it('searches for a relevant punchline using: -s=pizza', ctx => {
    expect(ctx.stdout).to.equal('---\nYou searched for: pizza\n')
  })
})
