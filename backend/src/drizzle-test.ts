import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { usersTable } from './db/schema.ts'

console.log('drizzle-test')

const db = drizzle(process.env.DB_FILE_NAME!)

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john11@example.com',
  }

  await db.insert(usersTable).values(user)
  console.log('New user created!')

  const query = db.select().from(usersTable).toSQL()
  console.log(query)
  const p = db.select().from(usersTable).prepare()

  let users = await db.select().from(usersTable)

  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email))

  console.log('User info updated!')

  users = await db.select().from(usersTable)
  console.log('Getting all users from the database: ', users)

  await db.delete(usersTable).where(eq(usersTable.name, 'John'))

  console.log('Users deleted!')

  users = await db.select().from(usersTable)
  console.log('Getting all users from the database: ', users)
}

main()
