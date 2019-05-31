const {Command, flags} = require('@oclif/command')
const axios = require('axios')

class PunchlineCommand extends Command {
  async run() {
    // const {flags} = this.parse(PunchlineCommand)
    // const joke = 'j/' + flags.joke || 'R7UfaahVfFd'
    // const search = 'search?term=' + flags.search || 'poop'
    // let returnPunchline

    // Simple Get Request
    try {
      const response = await axios.get('https://icanhazdadjoke.com/',
      responseType: 'stream',
      )
      this.log(response)
    } catch (error) {
      console.error(error)
    }
    // this.log(returnPunchline)
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
