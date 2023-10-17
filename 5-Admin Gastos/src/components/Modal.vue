<script setup>
import { ref, computed } from "vue";
import Alerta from "./Alerta.vue";
import { formatearCantidad } from "../helpers";
import cerrarModal from "../assets/img/cerrar.svg";

const error = ref("");

const emit = defineEmits([
  "ocultar-modal",
  "update:nombre",
  "update:cantidad",
  "update:categoria",
  "guardar-gasto",
  "eliminar-gasto"
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
  disponible: {
    type: Number,
    required: true,
  },
  id: {
    type: [String, null],
    required: true,
  },
});

const old = props.cantidad;
const agregarGasto = () => {
  const { nombre, cantidad, categoria, disponible, id } = props;
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

  if (id) {
    if (cantidad > old + disponible) {
      error.value = `Saldo insuficiente tu disponible es: ${formatearCantidad(
        disponible
      )}  `;
      setTimeout(() => {
        error.value = "";
      }, 2000);
      return;
    }
  } else {
    if (cantidad > disponible) {
      error.value = `Saldo insuficiente tu disponible es: ${formatearCantidad(
        disponible
      )}  `;
      setTimeout(() => {
        error.value = "";
      }, 2000);
      return;
    }
  }

  emit("guardar-gasto");
};

const editando = computed(() => {
  return props.id;
});
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
        <legend>{{ editando ? "Guardar Cambios" : "Añadir Gasto" }}</legend>
        <p>Tu diposnible es de: {{ formatearCantidad(disponible + old) }}</p>
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
            :value="categoria"
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
        
        <input
          type="submit"
          :value="[editando ? 'Guardar Cambios' : 'Añadir Gasto']"
        />
      </form>
      <button 
      v-if="editando"
      type="button"
      class="btn-eleminar"
      @click="$emit('eliminar-gasto',id)"
      >

        Eliminar Gasto
      </button>
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

.nuevo-gasto legend,
.nuevo-gasto p {
  text-align: center;
  color: var(--blanco);
  font-size: 3rem;
  font-weight: 700;
}
.noDisponible {
  color: red;
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
.btn-eleminar{
  border: none;
  padding: 1rem;
  width: 100%;
  background-color: #ef4444;
  font-weight: 700;
  font-size:1.2rem ;
  color: var(--blanco);
  margin-top: 10rem;
  cursor: pointer;
}
</style>
