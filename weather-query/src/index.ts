import { Context, Schema } from 'koishi'
import axios from 'axios'
export const name = 'weather-query'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('查询天气')
    .usage('查询天气 -c [cityName:string] -d [days:number]')
    .option('cityName', '-c <value:string>', { fallback: '杭州' })
    .option('days', '-d <value:string>', { fallback: 1 })
    .alias('天气')
    .example('查询天气 -c 杭州 -d 1')
    .action(async ({ options }) => {
      console.log(options)
      let cityID = await queryLocalId(options.cityName)
      let weather = await queryWeather(cityID, options.days)
      // console.log(cityID)
      if (options.days == '1') {
        let weathercontent = `当前温度${weather.temp}℃\n体感温度${weather.feelsLike}℃\n天气${weather.text}\n风向${weather.windDir}\n风力${weather.windScale}级\n湿度${weather.humidity}%\n`
        return weathercontent
      } else {
        let daysWeather = weather.daily
        let dayscontent = ''
        // console.log()
        for (let dayWeather of daysWeather) {
          let weatherContent = `日期:${dayWeather.fxDate},最高温度:${dayWeather.tempMax}℃,最低温度:${dayWeather.tempMin}℃,白天天气:${dayWeather.textDay},夜间天气:${dayWeather.textNight},湿度:${dayWeather.humidity}%\n`
          dayscontent += weatherContent + '\n'
        }
        return dayscontent
      }
      // console.log(weather)
      // return weather
    })
}

async function queryLocalId(cityName: string) {
  // console.log('cityName',cityName)
  // console.log('process.env.WEATHER_API_KEY',process.env.WEATHER_API_KEY)
  const res = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${process.env.WEATHER_API_KEY}&location=${cityName}`)
  if (res.data.code !== '200') {
    return '请输入正确的城市名'
  }
  return res.data.location[0].id
}

async function queryWeather(cityID: string, days: string) {
  if (days == '1') {
    const res = await axios.get(`https://devapi.qweather.com/v7/weather/now?key=${process.env.WEATHER_API_KEY}&location=${cityID}`)
    if (res.data.code !== '200') {
      return '请检查参数是否正确'
    }
    return res.data.now
  } else {
    const res = await axios.get(`https://devapi.qweather.com/v7/weather/${days}d?key=${process.env.WEATHER_API_KEY}&location=${cityID}`)
    console.log(`https://devapi.qweather.com/v7/weather/${days}d?key=${process.env.WEATHER_API_KEY}&location=${cityID}`)
    if (res.data.code !== '200') {
      return '请输入正确的时间目前可查询3day | 7day'
    }
    return res.data
  }
}

