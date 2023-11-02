import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'


const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        console.log(newAppointment)
        await newAppointment.save()

        res.json({
            msg: 'Tu reserva se ha realizado correctamente'
        })

    } catch (error) {
        console.log(error)
    }
}

const getAppointmentsByDate = async (req, res) => {
    const { date } = req.query
    // console.log(date)
    const newDate = parse(date, 'dd/MM/yyyy', new Date())
    if (!isValid(newDate)) {
        const error = new Error('Fecha no válida')
        return res.status(400).json({
            msg: error.message
        })
    }

    const isoDate = formatISO(newDate)
    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }
    }).select('time')

    res.json(appointments)
}


const getAppointmentById = async (req, res) => {
    const { id } = req.params
    //Validar por Object id
    if (validateObjectId(id, res)) return
    //Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if (!appointment) {
        return handleNotFoundError('La cita no existe', res)
    }

    // console.log(appointment.user.toString())
    // console.log(req.user._id.toString())
    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos')
        return res.status(403).json({ msg: error.message })
    }

    //Retornar la cita
    res.json(appointment)
}

const updateAppointment = async (req, res) => {
    const { id } = req.params
    //Validar por Object id
    if (validateObjectId(id, res)) return
    //Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if (!appointment) {
        return handleNotFoundError('La cita no existe', res)
    }

    // console.log(appointment.user.toString())
    // console.log(req.user._id.toString())
    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos')
        return res.status(403).json({ msg: error.message })
    }

    const { date, time, totalAmount, services } = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()
        res.json({
            msg: 'Cita actualizada correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}
export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentById,
    updateAppointment
}