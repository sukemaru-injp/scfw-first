import { Hono } from 'hono'
import { env } from 'hono/adapter'
// import { logger } from 'hono/logger'

const app = new Hono()
// app.use(logger());

app.get('/', (c) => {
  return c.text('Hello serverless container framework first!')
})

let count = 0

app.get('/count', (c) => {
  return c.text(`Count is ${count}`)
})

app.post('/increment', (c) => {
  count += 1
  return c.text(`Count incremented to ${count}`)
})

app.get('/env', (c) => {
  const { TEST } = env<{ TEST: string }>(c)
  return c.text(`Environment variable TEST is: ${TEST}`)
})

export default app
