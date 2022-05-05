import { load } from 'cheerio'

export class StihiParser {
  constructor () {}

  parsePoemList (html) {
    const $ = load(html)
    const poems = $('ul[type=square] > li').toArray().map(poemNode => {
      const $poem = load($(poemNode).html())
      return {
        poemUri: $poem('.poemlink').attr('href'),
        authorUri: $poem('.authorlink').attr('href')
      }
    })
    return poems
  }

  async parsePoemPage (html) {
    const $ = load(html)
    const title = $('h1').text().trim()
    const author = $('.titleauthor').text().trim()
    const poem = $('.text').text().trim()
    return { title, author, poem }
  }
}