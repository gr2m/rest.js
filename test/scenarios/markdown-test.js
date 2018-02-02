const chai = require('chai')

const GitHub = require('../../')

chai.should()

describe('api.github.com', () => {
  it('github.misc.renderMarkdown() & .renderMarkdownRaw()', () => {
    const github = new GitHub({
      protocol: 'http',
      host: 'localhost:3000'
    })

    github.plugin(require('../../lib/plugins/endpoint-methods'))

    return github.misc.renderMarkdown({
      text: `### Hello

b597b5d`,
      context: 'octokit-fixture-org/hello-world',
      mode: 'gfm',
      headers: {
        accept: 'text/html'
      }
    })

    .then((response) => {
      response.data.should.equal(`<h3>Hello</h3>
<p><a href="https://github.com/octokit-fixture-org/hello-world/commit/b597b5d6eead8f1a9e9d3243cd70a890a6155ca8" class="commit-link"><tt>b597b5d</tt></a></p>`)

      return github.misc.renderMarkdownRaw({
        data: `### Hello

b597b5d`,
        headers: {
          accept: 'text/html',
          'content-type': 'text/plain; charset=utf-8'
        }
      })
    })
  })
})
