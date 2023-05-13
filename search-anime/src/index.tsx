import { Context, Schema, h } from 'koishi'
import { CQCode } from '@koishijs/plugin-adapter-onebot'
// import { type } from 'os'
// import { searchAnime } from './source'
import axios from 'axios'
const xml2js = require('xml2js')
let parser = new xml2js.Parser()
export const name = 'search-anime'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
    ctx.command('search-anime <keyword:string>')
        .usage('搜索动漫')
        .action(async (_, keyword): Promise<any> => {
            console.log(111222)
            let res = await searchAnime(ctx, keyword)
            let resArr: any[] = []
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                resArr.push(<message><author user-id="3514392356" nickname="bot" avatar="url" />{res[i]}</message>)
            }
            console.log(resArr)
            if (_.session.userId) {
                _.session.send(<> <message forward>
                    {resArr}
                </message></>)
            } else if (_.session.guildId) {
                _.session.onebot.sendGroupForwardMsg(_.session.guildId, [])
            }
        })
        .example('search-anime 五等分的花嫁')
}


interface objdata {
    title: string,
    dataurl: string
}

async function searchAnime(ctx: Context, keyword: string) {
    let response: any[] = []
    let url: string = `https://share.dmhy.org/topics/rss/rss.xml?keyword=${keyword}`
    try {
        // console.log('url',url)
        let result = await axios(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
            },
            proxy:{
                host:'127.0.0.1',
                port:7890,
                protocol:'http'
            }
        })
        let data = result.data
        let anime_arr: Array<any> = await ToData(data, 8)
        for (let item of anime_arr) {
            response.push(item.title + '\n' + item.dataurl)

        }
        return response
    } catch (e) {
        console.log('出错辣', e)
        return '出错'
    }
    // return result
}

// 处理xml的函数 主要将xml里的元素转化成对象
function ToData(xml, max): Array<object> {
    let arr = []
    parser.parseString(xml, function (err, result) {
        let data = result.rss.channel[0].item
        for (let i = 0; i < max; i++) {
            let obj = { ...data[i] }
            let obj2 = {
                title: obj.title[0],
                dataurl: obj.enclosure[0].$.url
            }
            arr.push(obj2)
        }
    })
    return arr
}