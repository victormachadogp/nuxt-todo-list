<template>
  <div class="max-w-2xl lg:mx-auto px-4 py-6 my-12 mx-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>

    <TodoInput placeholder="Adicionar nova tarefa" @submit="handleAddTodo" />

    <TodoList v-memo="[todos.length, loading, error]" :items="todos" :loading="loading" :error="error"
      @toggle="toggleTodo" @update="updateTodo" @delete="deleteTodo" />

    <div v-if="todos.length === 0" class="flex justify-center py-5 text-sm text-gray-400">Adicione uma tarefa para
      começar</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodos } from '../src/composables/todoService'
import { debounce } from '../src/composables/utils'

const { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()

const handleAddTodo = debounce(async (text) => {
  await addTodo(text)
}, 300)

onMounted(() => {
  fetchTodos()
})
</script>