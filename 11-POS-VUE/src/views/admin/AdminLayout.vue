<script setup>
import AdminNav from '@/components/AdminNav.vue';
</script>
<template>
    <AdminNav/>
    <!--añadimos la clase para que se vea ya que el header lo tenemos como absolute -->
    <div class="pt-32 container mx-auto lg:min-h-screen">  
        <RouterView />
    </div>
</template>