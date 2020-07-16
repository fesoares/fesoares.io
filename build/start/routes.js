"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.post('/contact', async () => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'felipe4dev@gmail.com',
        from: 'felipe4dev@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then(() => {
        return 'Message sent';
    }).catch((error) => {
        console.log(error.response.body);
        return 'Error on sent';
    });
    return { hello: 'world' };
});
//# sourceMappingURL=routes.js.map