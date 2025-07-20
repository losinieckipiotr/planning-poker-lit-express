import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import path from 'node:path'
import { getUserRouter } from './api/getUser.api.ts'

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT

console.log({
  NODE_ENV,
  PORT,
})

var app = express()
app.set('port', PORT)

app.use(logger('dev'))
app.use(express.json())

app.use(getUserRouter)

app.use(express.static(path.join(path.dirname('../'), 'dist')))

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`)
})
