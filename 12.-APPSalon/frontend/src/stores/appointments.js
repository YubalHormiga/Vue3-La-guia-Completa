import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO } from '../helpers/date'

export const useAppointmentStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const toast = inject('toast')
    const router = useRouter()
    const appointmentsByDate = ref([])

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
        if(date.value === '') return
        // Obtenemos las citas
        const { data } = await AppointmentAPI.getByDate(date.value)
        appointmentsByDate.value = data
        console.log(data)
    })

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

    async function createApointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        // console.log(data)
        try {
            const { data } = await AppointmentAPI.create(appointment)
            clearAppoinmentData()
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({
                name: 'my_appointments'
            })
        } catch (error) {
            console.log(error)
        }

    }

    function clearAppoinmentData() {

        services.value = [],
            date.value = '',
            time.value = ''
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
        onServiceSelected,
        isServiceSelected,
        totalAmount,
        noServiceSelected,
        isValidReservation,
        createApointment,
        isDateSelected,
        disableTime
    }
})