import User from '../models/User.js'

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
    if(userExist){
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
        await user.save()
        res.json({
            msg: 'El usuario se creó correctamente'
        })

    } catch (error) {
        console.log(error)
    }


}

export {
    register

}