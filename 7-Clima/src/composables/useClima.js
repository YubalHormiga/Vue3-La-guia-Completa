import axios from 'axios'
import { ref, computed } from 'vue'

const clima = ref({})
const cargando = ref(false)
const error = ref('')

export default function useClima() {
    const obtenerClima = async ({ ciudad, pais }) => {
        //Importar el API key
        const key = import.meta.env.VITE_API_KEY
        cargando.value = true
        clima.value = {}
        error.value = ''
        try {
            //Obtener latitud y longitud
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
            const { data } = await axios(url)// Destructuramos ya que tiene otro data
            const { lat, lon } = data[0]
            //Obetner el Clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const { data: resultado } = await axios(urlClima)
            clima.value = resultado

        } catch {
            error.value = 'Ciudad No Encontrada'
        } finally {
            cargando.value = false
           
        }
    };

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0
    })

    const formatearTemperatura = temperatura => parseInt(temperatura - 273.15)
    return {
        obtenerClima,
        clima,
        mostrarClima,
        formatearTemperatura,
        cargando,
        error
    };
}
