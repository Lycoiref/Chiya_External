import { Context } from '@koishijs/client'
import Page from './sign_in.vue'
export default (ctx: Context) => {
    // 此 Context 非彼 Context
    // 我们只是在前端同样实现了一套插件逻辑
    ctx.page({
        name: '签到',
        path: '/sign',
        component: Page,
    })
}