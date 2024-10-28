<script setup lang="ts">
import { ref } from 'vue'

const titulo = ref<string>('Prueba 2024')
const contador = ref<number>(0)

function incrementar() {
  contador.value++
}
</script>

<template>
  <div>
    <h1>{{ titulo }} - {{ contador }}</h1>
    Cambiar Titulo: <input type="text" v-model="titulo" /><br />
    <button v-on:click="incrementar">Incrementar</button>

    <p v-if="contador % 2 == 0">Es par</p>
    <p v-else>Es impar</p>
  </div>
</template>

<style></style>
