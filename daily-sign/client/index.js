"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sign_in_vue_1 = require("./sign_in.vue");
exports.default = (function (ctx) {
    // 此 Context 非彼 Context
    // 我们只是在前端同样实现了一套插件逻辑
    ctx.page({
        name: '签到',
        path: '/sign',
        component: sign_in_vue_1.default,
    });
});
