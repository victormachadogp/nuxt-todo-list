<template>
  <div class="max-w-lg mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>

    <div class="mb-4">
      <input v-model="newTodo" @keyup.enter="handleAddTodo" type="text" placeholder="Adicionar nova tarefa"
        class="w-full p-2 border rounded">
    </div>

    <div v-if="loading" class="text-center">Carregando...</div>

    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <ul v-else>
      <li v-for="todo in todos" :key="todo.id" class="flex items-center justify-between p-2 rounded hover:bg-gray-100">
        <div class="flex items-center gap-4">
          <input type="checkbox" :checked="todo.completed" class="hidden">
          <span @click="toggleTodo(todo.id)"
            class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"></path>
            </svg>
          </span>
          <input v-if="editingId === todo.id" v-model="editingText" @keyup.enter="handleUpdateTodo(todo.id)"
            @blur="handleUpdateTodo(todo.id)" class="border rounded px-2 text-sm" ref="editInput">
          <span v-else :class="{ 'line-through': todo.completed }" class="text-sm" @dblclick="startEditing(todo)">
            {{ todo.title }}
          </span>
        </div>
        <div class="flex gap-2">
          <button v-if="editingId !== todo.id" @click="startEditing(todo)"
            class="text-blue-400 p-0.5 border rounded border-blue-400 hover:bg-blue-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
          <button @click="deleteTodo(todo.id)"
            class="text-red-400 p-0.5 border rounded border-red-400 hover:bg-red-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4 ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
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