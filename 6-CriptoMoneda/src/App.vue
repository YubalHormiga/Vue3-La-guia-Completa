<script setup>
import { ref, reactive, onMounted } from "vue";
import Alert from "./components/Alert.vue";
const monedas = ref([
  { codigo: "USD", texto: "Dolar de Estados Unidos" },
  { codigo: "MXN", texto: "Peso Mexicano" },
  { codigo: "EUR", texto: "Euro" },
  { codigo: "GBP", texto: "Libra Esterlina" },
]);

const criptomonedas = ref([]);
const error = ref("");

const cotizar = reactive({
  moneda: "",
  criptomoneda: "",
});

const cotizacion = ref({})
onMounted(() => {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
  fetch(url)
    .then((res) => res.json())
    .then((data) => criptomonedas.value = data.Data);
});

const cotizarCripto = () => {
  if (Object.values(cotizar).includes("")) {
    error.value = "Todos los campos son obligatorios";
    setTimeout(() => {
      error.value = "";
    }, 2000);

    return;
  }
  error.value = "";
  obtenerCotizacon();
};

const obtenerCotizacon = async() => {
    const {criptomoneda, moneda} = cotizar
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  const respuesta = await fetch(url)
  const data = await respuesta.json()
  cotizacion.value = data.DISPLAY[criptomoneda][moneda]
// 𝕆𝕥𝕣𝕒 𝔽𝕠𝕣𝕞𝕒
// fetch(url)
//     .then(respuesta => respuesta.json())
//     .then(data => 
//      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
//     )
};
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
    </div>
  </div>
</template>
