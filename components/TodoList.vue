<template>
    <ul v-if="!loading && !error" class="space-y-2">
        <TodoItem v-for="todo in sortedItems" :key="todo.id" track-by="id" :todo="todo"
            @toggle="$emit('toggle', todo.id)" @update="(title) => $emit('update', todo.id, title)"
            @delete="$emit('delete', todo.id)" />
    </ul>
    <div v-else-if="loading" class="text-center">Carregando...</div>
    <div v-else class="text-red-500">{{ error }}</div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/todo'
import { computed } from 'vue'

const props = defineProps<{
    items: Todo[]
    loading: boolean
    error: string | null
}>()

defineEmits<{
    toggle: [id: string]
    update: [id: string, title: string]
    delete: [id: string]
}>()

const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
    })
})
</script>