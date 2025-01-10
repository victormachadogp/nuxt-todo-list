<template>
    <li class="flex items-center justify-between p-2 rounded hover:bg-gray-100">
        <div class="flex items-center gap-4">
            <div class="flex items-center">
                <input type="checkbox" :checked="todo.completed" class="hidden">
                <span @click="$emit('toggle')"
                    class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full cursor-pointer">
                    <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </div>
            <input type="text" v-if="isEditing" v-model="editText" @keyup.enter="handleUpdate" @blur="handleUpdate"
                class="border rounded px-2 text-sm" ref="editInput">
            <span v-else @dblclick="startEdit" :class="{ 'line-through': todo.completed }" class="text-sm">
                {{ todo.title }}
            </span>
        </div>
        <div class="flex gap-2">
            <button v-if="!isEditing" @click="startEdit"
                class="text-blue-400 p-0.5 border rounded border-blue-400 hover:bg-blue-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button @click="$emit('delete')"
                class="text-red-400 p-0.5 border rounded border-red-400 hover:bg-red-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/todo'
import { ref, nextTick } from 'vue'

const props = defineProps<{
    todo: Todo
}>()

const emit = defineEmits<{
    toggle: []
    update: [title: string]
    delete: []
}>()

const isEditing = ref(false)
const editText = ref(props.todo.title)
const editInput = ref(null)

const startEdit = () => {
    isEditing.value = true
    editText.value = props.todo.title
    nextTick(() => {
        editInput.value?.focus()
    })
}

const handleUpdate = () => {
    if (editText.value.trim() && editText.value !== props.todo.title) {
        emit('update', editText.value)
    }
    isEditing.value = false
}
</script>