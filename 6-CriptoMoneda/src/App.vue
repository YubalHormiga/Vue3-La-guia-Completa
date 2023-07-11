<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Alert from "./components/Alert.vue";
import Spiner from "./components/Spiner.vue";
import Cotizacion from "./components/Cotizacion.vue";
import useCripto from "./composables/useCripto";

const {
  monedas,
  criptomonedas,
  cargando,
  cotizacion,
  obtenerCotizacion,
  mostrarResultado,
} = useCripto();

// 𝕃𝕠 𝕞𝕠𝕧𝕖𝕞𝕠𝕤 𝕒𝕝 𝕔𝕠𝕞𝕡𝕠𝕤𝕒𝕓𝕝𝕖
// const monedas = ref([
//   { codigo: "USD", texto: "Dolar de Estados Unidos" },
//   { codigo: "MXN", texto: "Peso Mexicano" },
//   { codigo: "EUR", texto: "Euro" },
//   { codigo: "GBP", texto: "Libra Esterlina" },
// ]);

// const criptomonedas = ref([]);
const error = ref("");

const cotizar = reactive({
  moneda: "",
  criptomoneda: "",
});

// const cotizacion = ref({});
// const cargando = ref(false);

// onMounted(() => {
//   const url =
//     "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => (criptomonedas.value = data.Data));
// });

const cotizarCripto = () => {
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son obligatorios";
    setTimeout(() => {
      error.value = "";
    }, 2000);

    return;
  }
  error.value = "";
  obtenerCotizacion(cotizar); // 𝔸ñ𝕒𝕕𝕚𝕞𝕠𝕤 𝕖𝕝 𝕠𝕓𝕛𝕖𝕣𝕠 𝕡𝕒𝕣𝕒 𝕡𝕠𝕕𝕖𝕣 𝕦𝕤𝕒𝕣𝕝𝕠 𝕖𝕟 𝕖𝕝 𝕔𝕠𝕞𝕡𝕠𝕤𝕒𝕓𝕝𝕖
};

// const obtenerCotizacion = async () => {
//   cargando.value = true;
//   cotizacion.value = {};
//   try {
//     const { criptomoneda, moneda } = cotizar;
//     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

//     const respuesta = await fetch(url);
//     const data = await respuesta.json();
//     cotizacion.value = data.DISPLAY[criptomoneda][moneda];
//     // 𝕆𝕥𝕣𝕒 𝔽𝕠𝕣𝕞𝕒
//     // fetch(url)
//     //     .then(respuesta => respuesta.json())
//     //     .then(data =>
//     //      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
//     //     )
//   } catch (error) {
//     console.log(error);
//   } finally {
//     cargando.value = false;
//   }
// };

// const mostrarResultado = computed(() => {
//   return Object.values(cotizacion.value).length > 0;
// });
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alert v-if="error">
        {{ error }}
      </Alert>

      <form class="formulario" v-on:submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">--Seleccion--</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Critomoneda:</label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="">--Seleccion--</option>
            <option
              v-for="criptomoneda in criptomonedas"
              :value="criptomoneda.CoinInfo.Name"
            >
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar" />
      </form>

      <Spiner v-if="cargando" />
      <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion" />
      <!-- <div v-if="mostrarResultado" class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
          <img
            :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL"
            alt="imagen cripto"
          />
          <div>
            <p>
              El precio es de: <span>{{ cotizacion.PRICE }}</span>
            </p>
            <p>
              Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span>
            </p>
            <p>
              Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span>
            </p>
            <p>
              Variación últimas 24hrs:
              <span>{{ cotizacion.CHANGEPCT24HOUR }} %</span>
            </p>
            <p>
              Última actualización <span>{{ cotizacion.LASTUPDATE }}</span>
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
