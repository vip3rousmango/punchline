const {Command, flags} = require('@oclif/command')
const axios = require('axios')
// eslint-disable-next-line dot-notation
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.get['User-Agent'] = 'Punchline (https://github.com/vip3rousmango/punchline)'
// Details
const url = 'https://icanhazdadjoke.com/'
let usedSearch = false
class PunchlineCommand extends Command {
  async run() {
    const {flags} = this.parse(PunchlineCommand)
    let searchURLparams = 'search?term='
    let searchTerm = flags.search || ''
    // Quick check to see if search was actually used?
    if (searchTerm.length > 0) {
      searchURLparams = url + searchURLparams + searchTerm
      usedSearch = true
    } else {
      searchURLparams = url
    }
    // Axios Get Request
    try {
      const response = await axios.get(searchURLparams)
      let jokeSearchResult = JSON.stringify(response.data)
      // USED SEARCH?
      if (usedSearch) {
        jokeSearchResult = response.data.results
        for (var i = 0; i < jokeSearchResult.length; i++) {
          this.log(jokeSearchResult[i].joke)
          this.log('---')
        }
        this.log(`You searched for: ${searchTerm}`)
      } else {
        // RANDO PUNCHLINE
        this.log(response.data.joke)
      }
    } catch (error) {
      this.log('There was an error: ' + error)
    }
  }
}

PunchlineCommand.description = `A little CLI that returns... a punchline.
...
What it actually does - Uses icanhazdadjoke.com to return a random dad joke.
Use the search flag to search for a joke on a particular topic.
`

PunchlineCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({
    char: 'v',
  }),
  // add --help flag to show CLI version
  help: flags.help({
    char: 'h',
  }),
  search: flags.string({
    char: 's',
    description: 'enter a search term. Ex, pizza',
  }),
}

module.exports = PunchlineCommand
