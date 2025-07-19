import sql from 'sqlite3'

// TODO: drizzle ORM

const sqlite3 = sql.verbose()

const db = new sqlite3.Database('users.db')

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS clients(
    id INTEGER PRIMARY KEY,
    cardNumber TEXT UNIQUE,
    pin TEXT,
    balance INTEGER
  )
`)

  db.run(
    `
  INSERT INTO clients(cardNumber, pin, balance)
  VALUES($cardNumber, $pin, $balance)
`,
    {
      $cardNumber: '700',
      $pin: '1110',
      $balance: 2500,
    },
  )

  db.close()
})

// import express from "express"

// const app = express()
// const port = 3000

// app.get('/', (_req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
