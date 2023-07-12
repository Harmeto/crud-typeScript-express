import express from 'express'
import { router as diarieRouter } from './routes/diaries'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here !!! ')
  res.send('pong')
})

app.use('/api/diaries', diarieRouter)

app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`)
})
