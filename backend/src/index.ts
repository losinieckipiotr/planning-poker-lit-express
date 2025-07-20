import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import path from 'node:path'
import { getUserRouter } from './api/get-user.api.ts'

const PORT = process.env.PORT

var app = express()
app.set('port', PORT)

app.use(logger('dev'))
app.use(express.json())

app.use(getUserRouter)

app.use(express.static(path.join(path.dirname('../'), 'dist')))

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`)
})
