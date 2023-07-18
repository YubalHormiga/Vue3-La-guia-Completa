<script setup>
import { onMounted, reactive } from "vue";
import ClienteService from "../services/ClienteService";
import { FormKit } from "@formkit/vue";
import { useRouter, useRoute } from "vue-router";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";

const router = useRouter();
const route = useRoute();

const { id } = route.params;

const formData = reactive({
  //no es necesario, se puede inicializar con un objeto vacio
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  empresa: "",
  puesto: "",
});

onMounted(() => {
  ClienteService.obtenerCliente(id)
    .then(({ data }) => {
      // Object.assign(formData, data) resumida
      formData.nombre = data.nombre;
      formData.apellido = data.apellido;
      formData.email = data.email;
      formData.telefono = data.telefono;
      formData.empresa = data.empresa;
      formData.puesto = data.puesto;
    })
    .catch((error) => console.log(error));
});

const props = defineProps({
  titulo: {
    type: String,
  },
});

const handleSubmit = (data) => {
  ClienteService.actualizarCliente(id, data)
  .then(()=> router.push({name:'listado-clientes'}))
  .catch(error=> console.log(error))

};
</script>
<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="listado-clientes"> Volver </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Guardar Cambios"
          incomplete-message="No se puedo enviar, revisa los mensajes"
          @submit="handleSubmit"
          :value="formData"
        >
          <!-- //Podemos añadir :actions="false" en el FormKit del form, quitamos el boton y por lo tanto lo
          debemos añadir nosotros -->
          <FormKit
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del Cliente"
            validation="required"
            :validation-messages="{
              required: 'El Nombre del Cliente es Obligatorio',
            }"
            v-model="formData.nombre"
          />
          <FormKit
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del Cliente"
            validation="required"
            :validation-messages="{
              required: 'El Apellido del Cliente es Obligatorio',
            }"
            v-model="formData.apellido"
          />
          <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email del Cliente"
            validation="required | email"
            :validation-messages="{
              required: 'El Email del Cliente es Obligatorio',
              email: 'Introduce un mail válido',
            }"
            v-model="formData.email"
          />
          <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono del Cliente: XXX-XXX-XXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
            :validation-messages="{ matches: 'El formato no es correcto' }"
            v-model="formData.telefono"
          />
          <FormKit
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa de Cliente"
            v-model="formData.empresa"
          />
          <FormKit
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto de Cliente"
            v-model="formData.puesto"
          />
          <!-- <FormKit 
          type="submit" 
          label="Agregar Cliente" 
          /> -->
        </FormKit>
      </div>
    </div>
  </div>
</template>
<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
