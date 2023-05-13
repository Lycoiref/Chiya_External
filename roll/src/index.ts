import { Context, Schema, sleep, h } from 'koishi'
import axios from 'axios'
import { buffer } from 'stream/consumers'
// import { send } from 'process'

export const name = 'roll'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
}
