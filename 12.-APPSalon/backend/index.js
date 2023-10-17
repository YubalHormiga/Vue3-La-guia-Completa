import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import ServicesRoutes from './routes/servicesRoutes.js'

//𝕍𝕒𝕣𝕚𝕒𝕓𝕝𝕖𝕤 𝕕𝕖 𝕖𝕟𝕥𝕠𝕣𝕟𝕠
dotenv.config()
//ℂ𝕠𝕟𝕗𝕚𝕘𝕦𝕣𝕒𝕣 𝕝𝕒 𝔸𝕡𝕡
const app = express()

//𝕃𝕖𝕖𝕣 𝕕𝕒𝕥𝕠𝕤 𝕧𝕚𝕒 𝔹𝕠𝕕𝕪
app.use(express.json())

//ℂ𝕠𝕟𝕖𝕔𝕥𝕒𝕣 𝕒 𝕓𝕒𝕤𝕖 𝕕𝕖 𝕕𝕒𝕥𝕠𝕤
db()

//𝔻𝕖𝕗𝕚𝕟𝕚𝕣 𝕣𝕦𝕥𝕒 𝕞𝕠𝕧𝕚𝕕𝕠 𝕙𝕒𝕤 𝕤𝕖𝕣𝕧𝕚𝕔𝕖𝕤 ℝ𝕠𝕦𝕥𝕖𝕤
app.use('/api/services', ServicesRoutes) // en vez de get se usa .use pq se trata de un midelware pq abarca todas las pETICONES

//𝔻𝕖𝕗𝕚𝕟𝕚𝕣 ℙ𝕦𝕖𝕣𝕥𝕠
const PORT = process.env.PORT || 4000 // aquí le decimos si existe esa partible inyéctala si no el puerto 4000

//𝔸𝕣𝕣𝕒𝕟𝕔𝕒𝕣 𝕝𝕒 𝕒𝕡𝕡

app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El servidor se está ejecuentando en el puerto:', PORT))
})