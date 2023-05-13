import axion from 'axios'

// 定义请求头
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
  "Referer": "https://www.pixiv.net",
}

// 定义搜索图片的url函数
export async function search_pixpv_urls(keyword: string, page: number, r18: number) {
  let params = {
    "word": keyword,
    "page": page,
    "r18": r18
  }
  let search_url = 'https://api.obfs.dev/api/pixiv/search'
  let result = await parser_data(search_url, params, r18)
  return result
}

async function parser_data(url: string, params: Object, r18: number) {
  try {
    let data = await axion.get(url, {
      headers: headers,
      params: params,
    })
    // console.log(data)
    // console.log("get后 "+data.data)
    let imgsarr = data.data.illusts
    let urls = []
    if (imgsarr) {
      imgsarr.forEach(element => {
        console.log(element.tags)
        let tags = []
        if (element.tags) {
          element.tags.forEach(tag => {
            tags.push(tag.name)
          })
        } else {
          tags = []
        }
        let obj = {
          id: element.id,
          title: element.title,
          urls: element.image_urls.large.replace('i.pximg.net', 'i.pixiv.re'),
          tag: tags
        }
        urls.push(obj)
      })
      console.log(urls)
      return urls
    } else {
      return '没有找到此类型图片'
    }
  } catch (e) {
    return e
  }
  // return urls
}

