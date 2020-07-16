import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/contact', async () => {
  const mailService = require('@sendgrid/mail')
  const key = Env.get('SENDGRID_API_KEY') as string

  mailService.setApiKey(key)
  const msg = {
    to: 'felipe4dev@gmail.com',
    from: 'felipe4dev@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  mailService.send(msg).then(() => {
    return 'Message sent'
  }).catch((error) => {
    console.log(error.response.body)
    return 'Error on sent'
  })
})
