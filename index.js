import _ from 'lodash'
import { CronJob } from 'cron'
import { StihiApiRequests } from './stihi_ru/api_requests.js'
import { wall } from './vk/index.js'
import { serializeError } from 'serialize-error'
import { vkConfig } from './env.js'

async function script () {
  try {
    const api = new StihiApiRequests()
    const poems = await api.getAvailablePoemList()
    const randomIndex = Math.floor(Math.random() * poems.length)
    const { poemUri, authorUri } = poems[randomIndex]
    const { title, author, poem } = await api.getPoem(poemUri)

    if (
      [title, author, poem, authorUri].some(v => _.isNil(v) || _.isNaN(v))
    ) return console.log({ title, author, poem, authorUri })

    const message = [`${title}`, '', `${poem}`, '', `${author} / ${api.baseUrl}${authorUri}`].join('\n')
    console.log(message)
    const response = await wall.post({ owner_id: vkConfig.VK_GROUP_ID, message })
    console.log(response)
  } catch (e) {
    console.log(serializeError(e))
  }
}

const job = new CronJob('23 3 * * * *', script)
job.start()