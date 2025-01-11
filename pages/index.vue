<template>
  <div class="max-w-2xl lg:mx-auto px-4 py-6 my-12 mx-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>

    <TodoInput placeholder="Adicionar nova tarefa" @submit="handleAddTodo" />

    <TodoList :items="todos" :loading="loading" :error="error" @toggle="toggleTodo" @update="updateTodo"
      @delete="deleteTodo" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodos } from '~/services/todoService'

const { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()

const handleAddTodo = async (text) => {
  await addTodo(text)
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