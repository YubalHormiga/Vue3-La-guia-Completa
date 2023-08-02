<script setup>
import Link from "./Link.vue";
import Logo from "./Logo.vue";
</script>
<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
    </div>
    <nav>
      <Link to="admin"> Administrar</Link>
    </nav>
  </header>
</template>
