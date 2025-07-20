import express from 'express'

export const getUserRouter = express.Router()

getUserRouter.get('/api/getUser', (_req, res) => {
  const user = {
    id: 5,
    name: 'John Doe',
    email: 'john@example.com',
  }

  // Respond with JSON
  res.json(user)
})
