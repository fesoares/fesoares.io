"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
Route_1.default.get('/', async () => {
    return { application: 'fesoares.io' };
});
Route_1.default.post('/contact', async ({ request, response }) => {
    const mailService = require('@sendgrid/mail');
    const key = Env_1.default.get('SENDGRID_API_KEY');
    const body = request.input('email');
    mailService.setApiKey(key);
    const msg = {
        to: 'felipe4dev@gmail.com',
        from: 'felipe4dev@gmail.com',
        subject: 'New contact received',
        text: `new contact received from site email: ${body}`,
        html: `<strong>new contact received from site <br/>email: ${body}</strong>`,
    };
    const result = await mailService.send(msg);
    if (result[0].statusCode === 202) {
        return response.status(200).send({
            message: 'Mail suscefully sent!',
        });
    }
    else {
        return response.status(400).send({
            message: {
                error: 'Failed to send mail, please try again!',
            },
        });
    }
});
//# sourceMappingURL=routes.js.map