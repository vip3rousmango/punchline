const {Command, flags} = require('@oclif/command')
const axios = require('axios')
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.get['User-Agent'] = 'Punchline (https://github.com/vip3rousmango/punchline)'
const url = 'https://icanhazdadjoke.com/'
class PunchlineCommand extends Command {
  async run() {
    const {flags} = this.parse(PunchlineCommand)
    let searchURL = 'search?term='
    let searchTerm = flags.search || ''

    if (searchTerm.length > 0) {
      searchURL = url + searchURL + searchTerm
    } else {
      searchURL = url
    }
    // Simple Get Request
    try {
      const response = await axios.get(searchURL)
      this.log(response.data.joke)
      this.log('---')
      this.log(`You searched for: ${searchTerm}`)
    } catch (error) {
      console.error('There was an error: ' + error)
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
    description: 'enter a search term. Ex, poop',
  }),
}

module.exports = PunchlineCommand
