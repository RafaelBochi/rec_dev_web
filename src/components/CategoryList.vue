<script setup>
import { reactive, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const newCategory = reactive({
  name: '',
  icon: ''
})

async function addCategory() {
  await categoryStore.createCategory(newCategory)
  newCategory.name = ''
  newCategory.icon = ''
}

onMounted(async () => {
  await categoryStore.getCategories()
})
</script>

<template>
  <section>
    <div class="form">
      <input type="text" v-model="newCategory.name" placeholder="Nome" />
      <input type="text" v-model="newCategory.icon" placeholder="Ícone" />
      <button @click="addCategory">Adicionar</button>
    </div>

    <div class="list">
      <div v-if="categoryStore.categories.length === 0">
        <p>Categorias não encontradas!!!</p>
      </div>
      <div class="category" v-for="category in categoryStore.categories" :key="category.id">
        <span class="mdi" :class="category.icon"></span>
        <p>{{ category.name }}</p>
        <span class="mdi mdi-delete" @click="categoryStore.deleteCategory(category.id)" />
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
.category {
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

.category p {
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.category .mdi-delete {
  cursor: pointer;
  color: red;
}
</style>
