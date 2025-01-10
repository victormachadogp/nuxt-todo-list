<template>
    <ul v-if="!loading && !error" class="space-y-2">
        <TodoItem v-for="todo in items" :key="todo.id" :todo="todo" @toggle="$emit('toggle', todo.id)"
            @update="(title) => $emit('update', todo.id, title)" @delete="$emit('delete', todo.id)" />
    </ul>
    <div v-else-if="loading" class="text-center">Carregando...</div>
    <div v-else class="text-red-500">{{ error }}</div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/todo'

defineProps<{
    items: Todo[]
    loading: boolean
    error: string | null
}>()

defineEmits<{
    toggle: [id: string]
    update: [id: string, title: string]
    delete: [id: string]
}>()
</script>