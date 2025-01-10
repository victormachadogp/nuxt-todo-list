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
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
            >
            <input
              v-if="editingId === todo.id"
              v-model="editingText"
              @keyup.enter="handleUpdateTodo(todo.id)"
              @blur="handleUpdateTodo(todo.id)"
              class="border rounded px-2"
              ref="editInput"
            >
            <span
              v-else
              :class="{ 'line-through': todo.completed }"
              @dblclick="startEditing(todo)"
            >
              {{ todo.title }}
            </span>
          </div>
          <div class="flex gap-2">
            <button
              v-if="editingId !== todo.id"
              @click="startEditing(todo)"
              class="text-blue-500"
            >
              Editar
            </button>
            <button
              @click="deleteTodo(todo.id)"
              class="text-red-500"
            >
              Deletar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTodos } from '~/services/todoService'
  
  const newTodo = ref('')
  const editingId = ref(null)
  const editingText = ref('')
  const editInput = ref(null)
  
  const { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()
  
  const handleAddTodo = async () => {
    if (newTodo.value.trim()) {
      await addTodo(newTodo.value)
      newTodo.value = ''
    }
  }
  
  const startEditing = (todo) => {
    editingId.value = todo.id
    editingText.value = todo.title
    nextTick(() => {
      editInput.value?.focus()
    })
  }
  
  const handleUpdateTodo = async (todoId) => {
    if (editingText.value.trim() && editingText.value !== todos.value.find(t => t.id === todoId).title) {
      await updateTodo(todoId, editingText.value)
    }
    editingId.value = null
  }
  
  onMounted(() => {
    fetchTodos()
  })
  </script>