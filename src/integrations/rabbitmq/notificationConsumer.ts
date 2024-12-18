import amqp from 'amqplib'

export const startNotificationConsumer = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  const queue = 'attendance_notifications'

  await channel.assertQueue(queue, { durable: true })

  console.log('Aguardando notificações...')

  channel.consume(queue, (msg) => {
    if (msg) {
      console.log(`Notificação recebida: ${msg.content.toString()}`)
      channel.ack(msg)
    }
  })
}
