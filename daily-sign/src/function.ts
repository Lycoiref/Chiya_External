import { chromium } from 'playwright'
import { Context } from 'koishi'
import { } from 'koishi-plugin-database-postgres'


class User {
    prisma: any
    constructor(ctx: Context) {
        this.prisma = ctx.postgres.client
    }
    generateRandomNum = (mean: number, variance: number) => {
        let symbol = Math.random() > 0.5 ? 1 : -1
        let random_num = (3 / (Math.random() * mean)) * symbol + Math.random() * variance;
        return random_num
    }
    getSignImage = async (random_num: string, checkin_time_last_str: string, impression: string, user: any, userInfo: any) => {
        // 拼接查询字符串
        let query = ''
        console.log(userInfo);
        for (let key in user) {
            if (user[key] === null) {
                user[key] = ''
            }
            query += `${key}=${user[key]}&`
        }
        const browser = await chromium.launch({ headless: true })
        const context = await browser.newContext({ viewport: { width: 2000, height: 1600 } })
        const page = await context.newPage()
        let signURL = `http://127.0.0.1:5140/sign?random_num=${random_num}&checkin_time_last_str=${checkin_time_last_str}&impression=${impression}&${query}&user_avatar=${userInfo.avatar}&user_name=${userInfo.username}`
        // console.log(signURL)
        await page.goto(signURL)
        // 等待图片加载
        await page.waitForSelector('#avatar-ok')
        let img = await page.locator('.sign-card').screenshot()
        await browser.close()
        return new Promise((resolve, reject) => {
            resolve(img)
        })
    }

    getUserInfo = async (user_qq: string, group_id: string) => {
        try {
            let user = await this.prisma.sign_group_users.findUnique({
                where: {
                    user_qq_group_id: {
                        user_qq: user_qq,
                        group_id: group_id
                    }
                }
            })
            return user
        } catch (e) {
            console.log(e);
        }
    }

    getLastCheckInTime = (user) => {
        let checkin_time_last = user.checkin_time_last
        // 将checkin_time_last转换为年月日形式
        let checkin_time_last_year = checkin_time_last.getFullYear()
        let checkin_time_last_month = checkin_time_last.getMonth() + 1
        let checkin_time_last_day = checkin_time_last.getDate()
        let checkin_time_last_str = `${checkin_time_last_year}-${checkin_time_last_month}-${checkin_time_last_day}`
        return checkin_time_last_str
    }

    updateUser = async (user_qq: string, group_id: string, impression: number, checkin_count: number, now: Date) => {
        await this.prisma.sign_group_users.update({
            where: {
                user_qq_group_id: {
                    user_qq: user_qq,
                    group_id: group_id
                }
            },
            data: {
                impression: impression,
                checkin_count: checkin_count + 1,
                checkin_time_last: now
            }
        })
    }

    createUser = async (user_qq: string, group_id: string) => {
        await this.prisma.sign_group_users.create({
            data: {
                user_qq: user_qq,
                group_id: group_id,
                impression: 0,
                checkin_count: 0,
                checkin_time_last: new Date(),
                add_probability: 0,
                specify_probability: 0
            }
        })
    }
}

export default User
