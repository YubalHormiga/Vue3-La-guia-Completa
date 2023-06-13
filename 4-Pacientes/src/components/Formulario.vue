<script setup>
import { reactive, computed } from "vue";
import MensajeAlerta from "./MensajeAlerta.vue";

const alerta = reactive({
  mensaje: "",
  tipo: "",
});

const emit = defineEmits([
  "update:nombre",
  "update:propietario",
  "update:email",
  "update:alta",
  "update:sintomas",
  "guardar-paciente",
]);

const props = defineProps({
  id:{
    type: [String, null],
    require:true
  },
  nombre: {
    type: String,
    riquire: true,
  },
  propietario: {
    type: String,
    riquire: true,
  },
  email: {
    type: String,
    riquire: true,
  },
  alta: {
    type: String,
    riquire: true,
  },
  sintomas: {
    type: String,
    riquire: true,
  },
});

const validar = () => {
  if (Object.values(props).includes("")) {
    alerta.mensaje = "Todos los campos son obligatorios";
    alerta.tipo = "error";
    return;
  }

  emit("guardar-paciente");

  alerta.mensaje = "Paciente Almacenado correctamente";
  alerta.tipo = "exito";

  setTimeout(() => {
    // alerta.mensaje = "";
    // alerta.tipo = "";
    // Otra forma
    Object.assign(alerta, {
      mensaje: "",
      tipo: "",
    });
  }, 3000);
};

const editando = computed(()=>{
  return props.id
})
</script>
<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Seguimientos Paciente</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Añade Pacientes y
      <span class="text-indigo-600 font-bold">Adminitralos</span>
    </p>

    <MensajeAlerta v-if="alerta.mensaje" :alerta="alerta" />
    <form
      @submit.prevent="validar"
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
    >
      <div class="mb-5">
        <label for="mascota" class="block text-gray-700 uppercase font-bold">
          Nombre Mascota
        </label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400"
          id="mascota"
          type="text"
          placeholder="Nombre de la mascota"
          :value="nombre"
          v-on:input="$emit('update:nombre', $event.target.value)"
        />
      </div>
      <div class="mb-5">
        <label
          for="propietario"
          class="block text-gray-700 uppercase font-bold"
        >
          Nombre Propietario
        </label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400"
          id="propietario"
          type="text"
          placeholder="Nombre del propietario"
          :value="propietario"
          v-on:input="$emit('update:propietario', $event.target.value)"
        />
      </div>
      <div class="mb-5">
        <label for="email" class="block text-gray-700 uppercase font-bold">
          E-mail
        </label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400"
          id="email"
          type="email"
          placeholder="Email del Propietario"
          :value="email"
          v-on:input="$emit('update:email', $event.target.value)"
        />
      </div>
      <div class="mb-5">
        <label for="alta" class="block text-gray-700 uppercase font-bold">
          Fecha de alta
        </label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400"
          id="alta"
          type="date"
          :value="alta"
          v-on:input="$emit('update:alta', $event.target.value)"
        />
      </div>
      <div class="mb-5">
        <label for="sintomas" class="block text-gray-700 uppercase font-bold">
          Sintomas
        </label>
        <textarea
          class="border-2 w-full p-2 mt-2 placeholder-gray-400"
          id="sintomas"
          placeholder="Describe los síntomas"
          :value="sintomas"
          v-on:input="$emit('update:sintomas', $event.target.value)"
        />
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-900 cursor-pointer transition-colors"
        :value="[editando ? 'Guardar Cambios' : 'Registrar Paciente']"
      />
    </form>
  </div>
</template>
