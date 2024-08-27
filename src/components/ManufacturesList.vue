<script setup>
import { useManufacturesStore } from '@/stores/manufactures'
import { reactive, onMounted } from 'vue'

const manufacturesStore = useManufacturesStore()

const manufacture = reactive({
  name: '',
  country: ''
})

function createManufacture() {
  manufacturesStore.createManufacture(manufacture)
  manufacture.name = ''
  manufacture.country = ''
}

onMounted(() => {
  manufacturesStore.getManufactures()
})
</script>

<template>
  <section>
    <div class="form">
      <input type="text" placeholder="Nome" v-model="manufacture.name" />
      <input type="text" placeholder="Pais" v-model="manufacture.country" />
      <button @click="createManufacture">Adicionar</button>
    </div>

    <div class="list">
      <div
        v-for="manufacture in manufacturesStore.manufactures"
        :key="manufacture.id"
        class="manufacture"
      >
        <p class="name">
          {{ manufacture.name }}
        </p>
        <p>
          {{ manufacture.country }}
        </p>

        <span class="mdi mdi-delete" @click="manufacturesStore.deleteManufacture(manufacture.id)" />
      </div>

      <div v-if="manufacturesStore.manufactures.length == 0">
        <p>Manufaturas não encontradas!!!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 20px;
}

.form {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.form input {
  all: unset;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 10px;
  width: 300px;
}

.form button {
  all: unset;
  background-color: blue;
  color: white;
  font-weight: bolder;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 80%;
}
.manufacture {
  width: 100%;
  min-width: 300px;
  max-width: 500px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
}

.manufacture .name {
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.manufacture .mdi-delete {
  cursor: pointer;
  color: red;
}
</style>
