import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/', async () => {
  return { application: 'fesoares.io' }
})

Route.post('/contact', async ({ request, response }) => {
  const mailService = require('@sendgrid/mail')
  const key = Env.get('SENDGRID_API_KEY') as string

  const body = request.input('email')

  mailService.setApiKey(key)

  const msg = {
    to: 'felipe4dev@gmail.com',
    from: 'felipe4dev@gmail.com',
    subject: 'New contact received',
    text: `new contact received from site email: ${body}`,
    html: `<strong>new contact received from site <br/>email: ${body}</strong>`,
  }
  const result = await mailService.send(msg)

  if(result[0].statusCode === 202) {
    return response.status(200).send({
      message: 'Mail suscefully sent!',
    })
  } else {
    return response.status(400).send({
      message: {
        error: 'Failed to send mail, please try again!',
      },
    })
  }
})
