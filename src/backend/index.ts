import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import { getUserRouter } from './api/get-user.api.ts'

// const DEV = process.env.NODE_ENV === 'development'

const PORT = process.env.PORT

var app = express()
app.set('port', PORT)

app.use(morgan('dev'))
app.use(express.json())
app.use(compression())

app.use(getUserRouter)

const dist_path = path.join(path.dirname('../'), 'dist')
app.use(express.static(dist_path))

app.use((_req, res, _next) => {
  const indexPath = path.resolve(
    path.join(path.dirname('../'), 'dist', 'index.html'),
  )

  res.sendFile(indexPath, (sendErr) => {
    if (sendErr) {
      res.status(500).send('index.html not found')
    }
  })
})

// TODO: I need some logic to always return index.html if file does not exist
// then i can remove this crazy regExp above

app.listen(PORT, () => {
  console.log(`server started on: http://localhost:${PORT}`)
})
