import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_POST,
        process.env.EMIAL_USER,
        process.env.EMAIL_PASS
    )
    //Enviar el mail
    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `<p>Hola: ${name}, has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>
    `

    })
    // console.log('mensaje enviado', info.messageId)
}