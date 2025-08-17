import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import express from 'express'
import * as z from 'zod'
import { usersSelectSchema, usersTable } from '../db/schema.ts'

export const getUserRouter = express.Router()

getUserRouter.post('/api/get-user', async (req, res) => {
  try {
    const json = getUserReq.parse(req.body)
    const { id } = json.data

    const db = drizzle(process.env.DB_FILE_NAME!)
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))

    if (!user) {
      throw new Error(`not found user with id: ${id}`)
    }

    const rsp: GetUserRspOk = {
      status: 'ok',
      data: {
        user,
      },
    }

    res.json(rsp)
  } catch (error: any) {
    const response: GetUserRspErr = {
      status: 'errror',
      error: error instanceof Error ? error.message : error.toString(),
    }
    res.status(400).send(JSON.stringify(response))
  }
})

const getUserReq = z.object({
  data: z.object({
    id: z.number(),
  }),
})
export type GetUserReq = z.infer<typeof getUserReq>

const getUserRspOk = z.object({
  status: z.literal('ok'),
  data: z.object({
    user: usersSelectSchema,
  }),
})

export type GetUserRspOk = z.infer<typeof getUserRspOk>

const getUserRspErr = z.object({
  status: z.literal('errror'),
  error: z.string(),
})

// TODO: error response could be the same for all API
export type GetUserRspErr = z.infer<typeof getUserRspErr>

// TODO: global helper function?
const getUserRsp = z.discriminatedUnion('status', [getUserRspOk, getUserRspErr])

export type GetUserRsp = z.infer<typeof getUserRsp>
