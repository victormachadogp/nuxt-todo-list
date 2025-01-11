<template>
    <div v-if="!loading && !error">
        <TodoFilter :current-filter="currentFilter" :todos="items" @update="updateFilter" />
        <ul class="space-y-2">
            <TodoItem v-for="todo in filteredItems" :key="todo.id" :todo="todo" @toggle="$emit('toggle', todo.id)"
                @update="(title) => $emit('update', todo.id, title)" @delete="$emit('delete', todo.id)" />
        </ul>
    </div>
    <div v-else-if="loading" class="text-center">Carregando...</div>
    <div v-else class="text-red-500">{{ error }}</div>
</template>

<script setup lang="ts">
import type { Todo, TodoFilter } from '../types/todo'
import { computed, ref } from 'vue'
import { sortTodosByDate, filterTodosByStatus } from '../services/utils'

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

const currentFilter = ref<TodoFilter>('all')

const updateFilter = (filter: TodoFilter) => {
    currentFilter.value = filter
}

const sortedItems = computed(() => {
    return sortTodosByDate(props.items)
})

const filteredItems = computed(() => {
    return filterTodosByStatus(sortedItems.value, currentFilter.value)
})
</script>