import User from './function'
import { Context, Schema, h } from 'koishi'
// 此处需要导入 @koishijs/plugin-console 以获取类型
import { } from '@koishijs/plugin-console'
import * as path from 'path'
import { } from 'koishi-plugin-puppeteer'

export const name = 'daily-sign'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
    // 使用控制台
    ctx.using(['console'], (ctx) => {
        ctx.console.addEntry({
            dev: path.resolve(__dirname, '../client/index.ts'),
            // prod: path.resolve(__dirname, '../client/index.ts'),
            prod: path.resolve(__dirname, '../dist'),
        })
    })
    // write your plugin here
    ctx.middleware(async (session, next) => {
        const postgres = new User(ctx)
        console.log('User Sign in')
        if (session.content === '签到') {
            try {
                let user_qq = session.userId
                let group_id = session.guildId
                console.log(user_qq, group_id)

                let user = await postgres.getUserInfo(user_qq, group_id)
                if (user) {
                    // 已有用户
                    let now = new Date()
                    let impression = user.impression.toNumber()
                    let checkin_count = user.checkin_count
                    let checkin_time_last_str = postgres.getLastCheckInTime(user)
                    // 生成随机数mean表示发散程度，variance表示随机数的波动范围
                    let random_num = postgres.generateRandomNum(200, 2)
                    impression += random_num
                    // session.send(`签到成功，好感度 + ${random_num.toFixed(2)}\n`
                    //     + `上次签到时间：${checkin_time_last_str}\n`
                    //     + `当前好感度：${impression.toFixed(2)}`)
                    let sign_image = await postgres.getSignImage(random_num.toFixed(2), checkin_time_last_str, impression.toFixed(2))
                    await session.send(h.image(sign_image as Buffer, 'image/png'))
                    await postgres.updateUser(user_qq, group_id, impression, checkin_count, now)
                    console.log('返回html');
                    await session.send('觉得签到太丑？来https://github.com/Lycoiref/Chiya_External提交PR！！')
                } else {
                    // 新建用户
                    await postgres.createUser(user_qq, group_id)
                    // 其实没成功
                    session.send('签到成功')
                }
            } catch (e) {
                console.log(e)
                return '签到失败'
                // let img_buffer = await getSignImage()
                // await session.send(h.image(img_buffer as Buffer, 'image/png'))
            }
        } else {
            return next()
        }
    })
}
