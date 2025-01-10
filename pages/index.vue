<template>
  <div class="max-w-lg mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>

    <div class="mb-4">
      <input v-model="newTodo" @keyup.enter="handleAddTodo" type="text" placeholder="Adicionar nova tarefa"
        class="w-full p-2 border rounded">
    </div>

    <TodoList :items="todos" :loading="loading" :error="error" @toggle="toggleTodo" @update="updateTodo"
      @delete="deleteTodo" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodos } from '~/services/todoService'

const newTodo = ref('')
const { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()

const handleAddTodo = async () => {
  if (newTodo.value.trim()) {
    await addTodo(newTodo.value)
    newTodo.value = ''
  }
}

onMounted(() => {
  fetchTodos()
})
</script>

<style>
input[type=checkbox]:checked+span {
  background-color: #10B981;
  border-color: #10B981;
  color: #fff;
}

.line-through {
  color: #9CA3AF;
}
</style>