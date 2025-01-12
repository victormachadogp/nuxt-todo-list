<template>
    <div class="flex gap-2 mb-4">
        <button v-for="option in filterOptions" :key="option.value" @click="$emit('update', option.value)" :class="[
            'px-3 py-1 rounded text-sm',
            currentFilter === option.value
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]">
            {{ option.label }}
            <span class="ml-1 text-xs">
                ({{ getFilterCount(option.value) }})
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Todo, TodoFilter } from '../types/todo'
import { filterTodosByStatus } from '../composables/utils'

const props = defineProps<{
    currentFilter: TodoFilter
    todos: Todo[]
}>()

const emit = defineEmits<{
    update: [filter: TodoFilter]
}>()

const filterOptions = [
    { value: 'all' as TodoFilter, label: 'Todas' },
    { value: 'active' as TodoFilter, label: 'Pendentes' },
    { value: 'completed' as TodoFilter, label: 'Completas' }
]

const getFilterCount = (filter: TodoFilter) => {
    return filterTodosByStatus(props.todos, filter).length
}
</script>