import { Context, Schema } from 'koishi'
import { askChatGPT } from './request'
import { liangxianbei } from './role'
export const name = 'openai'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})
const messagearr: any[] = []
export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('# <query> [isCompletion]')
    .action(async ({ session }, query, isCompletion) => {
      // 默认不开启上下文模式,不开启人格设定
      let message = [{ "role": 'system', 'content': liangxianbei }]
      // 设定三十分钟的上下文,如果不设定,则默认为一次对话
      if (isCompletion) {
        // 将session.userId作为唯一标识
        if (messagearr.find(item => item.userId = session.userId)) {
          let index = messagearr.findIndex(item => item.userId = session.userId)
          message = messagearr[index].message
          message = await Completion(message, query, undefined)
          messagearr[index].message = message
        } else {
          message = await Completion(message, query, undefined)
          messagearr.push({ userId: session.userId, message: message, time: new Date().getTime() })
        }
      }
      else {
        message = [{ "role": 'system', 'content': liangxianbei }]
        let user = { "role": 'user', 'content': query }
        message.push(user)
      }
      try {
        let result = await askChatGPT(message)
        if (isCompletion) {
          let index = messagearr.findIndex(item => item.userId = session.userId)
          message = messagearr[index].message
          message = await Completion(message, undefined, result)
          messagearr[index].message = message
        }
        // 如果超过30分钟,则清除上下文
        if (messagearr.length > 0) {
          messagearr.forEach((item, index) => {
            if (new Date().getTime() - item.time > 30 * 60 * 1000) {
              messagearr.splice(index, 1)
            }
          })
        }
        return result
      } catch (e) {
        console.log('error', e)
        return e
      }
    })
    .usage('注意发送 # [query] query为对话内容 例如 # 你好 \n 如果需要上下文,请在query后面加上isCompletion 例如 # 你好 isCompletion(只需要保证isCompletion不为空就行)')
    .example('# 你好')
    .example('# 你好 1')
}

// 组装上下文
async function Completion(message, query, response) {
  if (!message) return
  if (query) {
    message.push({ "role": 'user', 'content': query })
  }
  if (response) {
    message.push({ "role": 'assistant', 'content': response })
  }
  return message
}