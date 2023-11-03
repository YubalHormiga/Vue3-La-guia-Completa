import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO, convertToDDMMYY } from '../helpers/date'
import { useUserStore } from '../stores/user'

export const useAppointmentStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const time = ref('')
    const appointmentsByDate = ref([])
    const hours = ref([])

    const toast = inject('toast')
    const router = useRouter()
    const user = useUserStore()

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            // console.log(hour + ':00' )
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if (date.value === '') return
        // Obtenemos las citas
        const { data } = await AppointmentAPI.getByDate(date.value)

        // console.log(data)

        if (appointmentId.value) {
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
            console.log(time.value)
        } else {
            appointmentsByDate.value = data
        }
    })

    function setSelectedAppointment(appointment) {
        // console.log(appointment)
        services.value = appointment.services
        date.value = convertToDDMMYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
        // console.log(appointmentId.value)

        // console.log(time.value)
    }

    function onServiceSelected(service) {

        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length === 2) {
                alert('Máximo 2 servicios')
                return
            }
            // console.log('no está la cita')
            services.value.push(service)
        }

    }

    async function saveAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        // console.log(data)
        if (appointmentId.value) {
            try {
                const { data } = await AppointmentAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error)
            }

        } else {

            try {
                const { data } = await AppointmentAPI.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error)
            }
        }
        clearAppoinmentData()
        user.getUserAppointments()

        router.push({
            name: 'my_appointments'
        })
    }

    function clearAppoinmentData() {

        appointmentId.value = ''
        services.value = [],
            date.value = '',
            time.value = ''
    }

    async function cancelAppointment(id) {

        if (confirm('¿Deseas cancelar esta cita?')) {

            try {

                const { data } = await AppointmentAPI.delete(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                user.getUserAppointments()
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServiceSelected = computed(() => {
        return services.value.length === 0
    })

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })
    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })
    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        clearAppoinmentData,
        cancelAppointment,
        isServiceSelected,
        noServiceSelected,
        totalAmount,
        isValidReservation,
        isDateSelected,
        disableTime
    }
})