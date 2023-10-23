import User from '../models/User.js'
import { sendEmailVerification } from '../emails/authEmailService.js'

const register = async (req, res) => {
    // console.log(req.body)
    //Valida todos los campos
    if (Object.values(req.body).includes('')) {

        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }

    const { email, password, name } = req.body
    //Evitar duplicados

    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error('El usuario ya existe')
        return res.status(400).json({
            msg: error.message
        })
    }


    //Validar la extensión del password
    // console.log(password.trim().length)
    const MIN_PASSWORD_LENGTH = 8

    if (password.trim().length < 8) {
        const error = new Error(`El password debe de contener: ${MIN_PASSWORD_LENGTH} caracteres`)
        return res.status(400).json({
            msg: error.message
        })
    }



    try {
        const user = new User(req.body)
        // console.log(service)
        const result = await user.save()
        // console.log(result)

        const { name, email, token } = result
        sendEmailVerification({ name, email, token })


        res.json({
            msg: 'El usuario se creó correctamente, revisa tu email'
        })

    } catch (error) {
        console.log(error)
    }

}
const verifyAccount = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })
    // console.log(user)
    if (!user) {
        const error = new Error('Hubo un error, token no válido')
        return res.status(401).json({ msg: error.message })
    }
    //Si el token es valido, confirmar cuenta

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({ msg: 'Usuario confirmado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    // console.log('Desde Login')
    //Revisar que el usuario exista
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).json({ msg: error.message })
    }

    //Revisar si el usuario confirma su cuenta
    if(!user.verified){
        const error = new Error('Tu cuenta no ha sido revisada aún')
        return res.status(401).json({ msg: error.message })
    }

    //Comprobar el password
    if (await user.checkPassword(password)) {
        res.json({
            msg: 'Usuario atenticado'
        })
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(401).json({ msg: error.message })
    }
}

export {
    register,
    verifyAccount,
    login

}