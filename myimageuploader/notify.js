const amqp = require('amqplib/callback_api')

const sendImage = (fileName) => {
    amqp.connect('amqp://mybroker', function(error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1
            }

            var queue = 'messages'
            var msg = fileName

            channel.assertQueue(queue, {
                durable: true
            })
            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
            })
        console.log(" [x] Sent %s", msg)
        })
    })
        
}

module.exports = {
    sendImage
}