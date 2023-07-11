import { ref, onMounted, computed } from 'vue'

export default function useCripto() {

    const monedas = ref([
        { codigo: "USD", texto: "Dolar de Estados Unidos" },
        { codigo: "MXN", texto: "Peso Mexicano" },
        { codigo: "EUR", texto: "Euro" },
        { codigo: "GBP", texto: "Libra Esterlina" },
    ]);

    const criptomonedas = ref([]);


    const cotizacion = ref({});
    const cargando = ref(false);

    onMounted(() => {
        const url =
            "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
        fetch(url)
            .then((res) => res.json())
            .then((data) => (criptomonedas.value = data.Data));
    });

    const obtenerCotizacion = async (cotizar) => { // añadimos el objeto cotizar
        cargando.value = true;
        cotizacion.value = {};
        try {
            const { criptomoneda, moneda } = cotizar;
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

            const respuesta = await fetch(url);
            const data = await respuesta.json();
            cotizacion.value = data.DISPLAY[criptomoneda][moneda];
            // 𝕆𝕥𝕣𝕒 𝔽𝕠𝕣𝕞𝕒
            // fetch(url)
            //     .then(respuesta => respuesta.json())
            //     .then(data =>
            //      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
            //     )
        } catch (error) {
            console.log(error);
        } finally {
            cargando.value = false;
        }
    };
    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0;
    });
    return {
        monedas,
        criptomonedas,
        cotizacion,
        cargando,
        obtenerCotizacion,
        mostrarResultado
    }
}