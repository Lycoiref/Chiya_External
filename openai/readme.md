# koishi-plugin-openai

[![npm](https://img.shields.io/npm/v/koishi-plugin-openai?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-openai)

## openai 插件
默认模型为gpt3.5 
发送# <内容> 为无记忆内容发送
发送# <内容> 1 为有记忆内容发送 上下文维持30分钟之后会被清理掉

## 设定性格
可以在openai/src/role.ts 中替换你想要的角色性格 默认为山田凉