import axios from 'axios'
import { getPageHtml } from '../puppeteer/get_page_html.js'
import { StihiParser } from './parser.js'

export class StihiApiRequests {
  htmlParser = new StihiParser()

  constructor () {
    this.baseUrl = 'https://stihi.ru'
  }

  async getAvailablePoemList () {
    const response = await axios.get(`${this.baseUrl}/poems/list.html?topic=all`)
    const htmlPage = response.data
    const poems = this.htmlParser.parsePoemList(htmlPage)
    return poems
  }

  async getPoem (poemUri) {
    const pageHtml = await getPageHtml(`${this.baseUrl}${poemUri}`)
    return this.htmlParser.parsePoemPage(pageHtml)
  }
}