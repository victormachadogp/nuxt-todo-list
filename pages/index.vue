<template>
    <div class="max-w-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Todo List</h1>
      
      <div class="mb-4">
        <input
          v-model="newTodo"
          @keyup.enter="handleAddTodo"
          type="text"
          placeholder="Adicionar nova tarefa"
          class="w-full p-2 border rounded"
        >
      </div>
  
      <div v-if="loading" class="text-center">Carregando...</div>
      
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      
      <ul v-else class="space-y-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between p-2 border rounded"
        >
          <div class="flex items-center gap-2">
            
            <span :class="{ 'line-through': todo.completed }">
              {{ todo.title }}
            </span>
          </div>
          
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTodos } from '~/services/todoService'
  
  const newTodo = ref('')
  const { todos, loading, error, fetchTodos, addTodo, toggleTodo } = useTodos()
  
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