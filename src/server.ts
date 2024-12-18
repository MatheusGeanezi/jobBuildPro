import express from 'express'
import cors from 'cors'
import connectDB from './config/db'
import { startNotificationConsumer } from './integrations/rabbitmq/notificationConsumer'

import routes from './routes'
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem-vindo')
})

app.use('/api', routes)

startNotificationConsumer()
  .then(() => console.log('Consumer iniciado.'))
  .catch((err) => console.error('Erro ao iniciar o consumer:', err))

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})

export default app
