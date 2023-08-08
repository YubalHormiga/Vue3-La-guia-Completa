<script setup>
import { ref } from "vue";
import { useSalesStore } from "../../stores/sales";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import SaleDatails from "../../components/SaleDatails.vue";
import { formatCurrency } from "../../helpers/index";

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});

const sales = useSalesStore();
</script>
<template>
  <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>
  <div class="md:flex md:items-start gap-5">
    <div class="md:1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker
        i18n="es-es"
        as-single
        no-input
        v-model="sales.date"
        :formatter="formatter"
      />
    </div>
    <div
      class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32"
    >
      <p class="text-center text-lg" v-if="sales.isDateSelected">
        Ventas desde ka fecha:
        <span class="font-black">{{ sales.date }}</span>
      </p>
      <p v-else class="text-center text-lg">Selecciona una fecha</p>
      <div class="space-y-5" v-if="sales.salesCollection.length">
        <p class="text-rigt text-2xl">
          Total del día:
          <span class="font-black">
            {{ formatCurrency(sales.totalSalesOfDay) }}</span
          >
        </p>
        <SaleDatails
          v-for="sale in sales.salesCollection"
          :key="sale.id"
          :sale="sale"
        />
      </div>
      <p v-else-if="sales.noSales" class="text-lg text-center">
        No hay ventas este día
      </p>
    </div>
  </div>
</template>
