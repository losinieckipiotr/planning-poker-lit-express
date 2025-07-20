import express from 'express'
import * as z from 'zod'

export const getUserRouter = express.Router()

getUserRouter.post('/api/get-user', (req, res) => {
  try {
    const json = getUserReq.parse(req.body)
    // TODO: read from database
    const user = getUser(json.data.id)

    res.json(user)
  } catch (error: any) {
    res.status(400).send(JSON.stringify(errorRsp(error)))
  }
})

function getUser(id: number): GetUserRspOk {
  return {
    status: 'ok',
    id: id,
    name: 'John Doe',
    email: 'john@example.com',
  }
}

// TODO: error response could be the same for all API
function errorRsp(error: any): GetUserRspErr {
  return {
    status: 'errror',
    error: error instanceof Error ? error.message : error.toString(),
  }
}

const getUserReq = z.object({
  data: z.object({
    id: z.number(),
  }),
})
export type GetUserReq = z.infer<typeof getUserReq>

const getUserRspOk = z.object({
  status: z.literal('ok'),
  id: z.number(),
  name: z.string(),
  email: z.email(),
})
export type GetUserRspOk = z.infer<typeof getUserRspOk>

const getUserRspErr = z.object({
  status: z.literal('errror'),
  error: z.string(),
})
export type GetUserRspErr = z.infer<typeof getUserRspErr>

const getUserRsp = z.discriminatedUnion('status', [getUserRspOk, getUserRspErr])
export type GetUserRsp = z.infer<typeof getUserRsp>
