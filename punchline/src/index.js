const {Command, flags} = require('@oclif/command')
const axios = require('axios')
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.get['User-Agent'] = 'Punchline (https://github.com/vip3rousmango/punchline)'

class PunchlineCommand extends Command {
  async run() {
    // const {flags} = this.parse(PunchlineCommand)
    // const joke = 'j/' + flags.joke || 'R7UfaahVfFd'
    // const search = 'search?term=' + flags.search || 'poop'

    // Simple Get Request
    try {
      const response = await axios.get('https://icanhazdadjoke.com/')
      this.log(response.data.joke)
    } catch (error) {
      console.error('There was an error: ' + error)
    }
  }
}

PunchlineCommand.description = `A little CLI that returns... a punchline.
...
What it actually does - Uses icanhazdadjoke.com to return a random dad joke.
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
  // joke: flags.string({
  //   char: 'j',
  //   description: 'enter Joke ID. Ex, R7UfaahVfFd',
  // }),
  // search: flags.string({
  //   char: 's',
  //   description: 'enter a search term. Ex, poop',
  // }),
}

module.exports = PunchlineCommand
