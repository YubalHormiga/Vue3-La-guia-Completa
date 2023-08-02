<script setup>
import Link from "../../components/Link.vue";
import Produc from "../../components/Product.vue";
import { useProductsStore } from "../../stores/products";

const products = useProductsStore();
</script>
<template>
  <div>
    <Link to="new-products"> Nuevo Producto </Link>
    <h1 class="text-4xl font-black my-10">Productos</h1>
    <p v-if="products.noResults">No hay resultados</p>
    <ul
      v-else
      role="list"
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
    >
      <Produc
        v-for="product in products.productsCollection"
        :product="product"
        :key="product.id"
      />
    </ul>
  </div>
</template>
