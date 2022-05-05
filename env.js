import dotenv from 'dotenv'
import env from 'env-var'

dotenv.config()

export const vkConfig = {
    VK_TOKEN: env.get('VK_TOKEN').asString(),
    VK_GROUP_ID: env.get('VK_GROUP_ID').asIntNegative()
}