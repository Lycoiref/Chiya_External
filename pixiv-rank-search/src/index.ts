import { Context, Schema, h } from 'koishi'
import { search_pixpv_urls } from './resource'
export const name = 'pixiv-rank-search'
function myrandom(Arr) {
  let idx = Math.floor(Math.random() * Arr.length)
  return Arr[idx]
}
export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('pixiv <keyword> [page:number]', 'pixiv搜索')
    .action(async (_, keyword, page) => {
      try {
        let data = await search_pixpv_urls(keyword, page, 0)
        let selectimg = myrandom(data)
        _.session.send(`id:${selectimg.id}\n标题:${selectimg.title}\n` + h('image', { url: `${selectimg.urls}` }))
      } catch (e) {
        _.session.send('出错了')
      }
    })
    .usage('注意发送 pixiv [keyword] [page] keyword为关键词 page为页数 例如 pixiv cat 1')
    .example('pixiv cat 1 在第一页中随机返回title含有cat的图片')
}
