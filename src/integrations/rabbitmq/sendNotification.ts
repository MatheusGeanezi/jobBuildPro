import amqp from 'amqplib'

export const sendNotification = async (message: string) => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  const queue = 'attendance_notifications'

  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(message))

  console.log(`Mensagem enviada: ${message}`)

  setTimeout(() => {
    connection.close()
  }, 500)
}
