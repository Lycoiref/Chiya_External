import { Context, Schema } from 'koishi'
import xlsx from 'node-xlsx'
import path from 'path'

export const name = 'hdu-exam-query'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
    // write your plugin here
    const dataPath = path.join(__dirname, '../data/0526.xlsx')
    const excel = xlsx.parse(dataPath)
    let data = excel[0].data

    /*
    * data[i] => [课程号: string, 课程名称: string, 考试时间: string]
    */
    ctx.command('exam <name>', '查询考试信息')
        .action(async ({ session }, name) => {
            // 取data[2:-1]的数据
            data = data.slice(2, data.length - 1)
            let msg = ''
            for (let i = 0; i < data.length; i++) {
                if (data[i][1].match(new RegExp(`${name}`))) {
                    msg += `${data[i][0]} ${data[i][1]} ${data[i][2]}\n`
                }
            }
            await session.send(msg)
        })
    ctx.command('examid <id>', '查询考试信息')
        .action(async ({ session }, id) => {
            // 取data[2:-1]的数据
            data = data.slice(2, data.length - 1)
            let msg = ''
            for (let i = 0; i < data.length; i++) {
                if (data[i][0] === id) {
                    msg += `${data[i][0]} ${data[i][1]} ${data[i][2]}\n`
                }
            }
            await session.send(msg)
        })

}
