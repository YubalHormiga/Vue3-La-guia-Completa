import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "1fbab41bf9d842",
        "c163eb9f115a3d"
    )
    //Enviar el mail
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `<p>Hola: ${name}, has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:</p>
        <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
        <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>
    `

    })
    // console.log('mensaje enviado', info.messageId)
}