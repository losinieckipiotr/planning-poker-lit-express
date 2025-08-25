import compression from 'compression'
import express from 'express'
import logger from 'morgan'
import path from 'node:path'
import { getUserRouter } from './api/get-user.api.ts'

const DEV = process.env.NODE_ENV === 'development'

const PORT = process.env.PORT

var app = express()
app.set('port', PORT)

app.use(logger('dev'))
app.use(express.json())
app.use(compression())

app.use(getUserRouter)

const regExp = /^\/(?!.*\.[a-zA-Z0-9]+$).+$/

app.get(regExp, (req, rsp) => {
  console.log(req.url)
  const indexPath = path.resolve(
    path.join(path.dirname('../'), 'dist', 'index.html'),
  )

  console.log({ indexPath })

  rsp.sendFile(indexPath, (err) => {
    if (err) {
      rsp.status(500).send('File not found')
    }
  })
})

if (!DEV) {
  const dist_path = path.join(path.dirname('../'), 'dist')
  app.use(express.static(dist_path))
}

// TODO: I need some logic to always return index.html if file does not exist
// then i can remove this crazy regExp above

app.listen(PORT, () => {
  console.log(`server started on: http://localhost:${PORT}`)
})
