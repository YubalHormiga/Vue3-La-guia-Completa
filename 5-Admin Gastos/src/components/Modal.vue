<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";
import cerrarModal from "../assets/img/cerrar.svg";

const error = ref("");

const emit = defineEmits([
  "ocultar-modal",
  "update:nombre",
  "update:cantidad",
  "update:categoria",
  "guardar-gasto"
]);

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: [Number, String],
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

const agregarGasto = () => {
  const { nombre, cantidad, categoria } = props;
  if ([nombre, cantidad, categoria].includes("")) {
    error.value = "Todos los campos son obligatorios";
    setTimeout(() => {
      error.value = "";
    }, 2000);
    return;
  }
  if (cantidad <= 0) {
    error.value = "Cantidad no válida";
    setTimeout(() => {
      error.value = "";
    }, 2000);
    return;
  }

  emit("guardar-gasto")
};
</script>
<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
        @click="$emit('ocultar-modal')"
        :src="cerrarModal"
        alt="cerrarModal"
      />
    </div>
    <div
      class="contenedor contenedor-formulario"
      :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <form class="nuevo-gasto" @submit.prevent="agregarGasto">
        <legend>Añadir Gasto</legend>
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="campo">
          <label for="nombre">Nombre Gasto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade nombre del gasto"
            :value="nombre"
            @input="$emit('update:nombre', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del Gasto"
            :value="cantidad"
            @input="$emit('update:cantidad', Number($event.target.value))"
          />
        </div>

        <div class="campo">
          <label for="categoria">Categoria:</label>
          <select
            id="categoria"
            value="categoria"
            @input="$emit('update:categoria', $event.target.value)"
          >
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="supcripciones">Supcripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0/0.9);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cerrar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}

.contenedor-formulario {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}
.contenedor.animar {
  opacity: 1;
}
.contenedor.cerrar {
  opacity: 0;
}
.nuevo-gasto {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.nuevo-gasto legend {
  text-align: center;
  color: var(--blanco);
  font-size: 3rem;
  font-weight: 700;
}
.campo {
  display: grid;
  gap: 2rem;
}
.campo select {
  text-align: center;
}

.nuevo-gasto input,
.nuevo-gasto select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}
.nuevo-gasto label {
  color: var(--blanco);
  font-size: 3rem;
}
.nuevo-gasto input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}
</style>
