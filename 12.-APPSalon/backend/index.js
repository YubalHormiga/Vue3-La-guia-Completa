import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import ServicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'

//𝕍𝕒𝕣𝕚𝕒𝕓𝕝𝕖𝕤 𝕕𝕖 𝕖𝕟𝕥𝕠𝕣𝕟𝕠
dotenv.config()
//ℂ𝕠𝕟𝕗𝕚𝕘𝕦𝕣𝕒𝕣 𝕝𝕒 𝔸𝕡𝕡
const app = express()

//𝕃𝕖𝕖𝕣 𝕕𝕒𝕥𝕠𝕤 𝕧𝕚𝕒 𝔹𝕠𝕕𝕪
app.use(express.json())

//ℂ𝕠𝕟𝕖𝕔𝕥𝕒𝕣 𝕒 𝕓𝕒𝕤𝕖 𝕕𝕖 𝕕𝕒𝕥𝕠𝕤
db()

// ⁡⁢⁣⁢𝗖𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝗿 𝗖𝗼𝗿𝘀 se instala iniciado el Frondend para permitir el acceso a datos 

const whiteList = [process.env.FRONTEND_URL, undefined] //Se añade undefined para poder seguir trabajando con POSTMAN PERO HAY QUE QUITARLO ANTES DE MANDARLO A PRODUCCIÓN
const corsOption = {
    origin: function(origin, callback){
        // console.log(origin)
        if (whiteList.includes(origin)) {
            //Permitimos la conexión
            callback(null,true)
        } else {
            //No permitimos la conexión
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOption))

//𝔻𝕖𝕗𝕚𝕟𝕚𝕣 𝕣𝕦𝕥𝕒 𝕞𝕠𝕧𝕚𝕕𝕠 𝕙𝕒𝕤 𝕤𝕖𝕣𝕧𝕚𝕔𝕖𝕤 ℝ𝕠𝕦𝕥𝕖𝕤
// en vez de get se usa .use pq se trata de un midelware pq abarca todas las pETICONES
app.use('/api/services', ServicesRoutes) 
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
//𝔻𝕖𝕗𝕚𝕟𝕚𝕣 ℙ𝕦𝕖𝕣𝕥𝕠
const PORT = process.env.PORT || 4000 // aquí le decimos si existe esa partible inyéctala si no el puerto 4000

//𝔸𝕣𝕣𝕒𝕟𝕔𝕒𝕣 𝕝𝕒 𝕒𝕡𝕡

app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El servidor se está ejecuentando en el puerto:', PORT))
})