import { VK } from 'vk-io'
import { vkConfig } from '../env.js'

console.log(vkConfig)

//https://oauth.vk.com/authorize?client_id=8109807&response_type=token&scope=wall,offline
const vk = new VK({ token: vkConfig.VK_TOKEN })
const { wall } = vk.api

export { wall }