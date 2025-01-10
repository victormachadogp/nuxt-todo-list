<template>
    <div class="mb-4">
        <input v-model="inputText" @keyup.enter="handleSubmit" type="text" :placeholder="placeholder"
            class="w-full pl-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    placeholder?: string
}>()

const emit = defineEmits<{
    submit: [text: string]
}>()

const inputText = ref('')

const handleSubmit = () => {
    const text = inputText.value.trim()
    if (text) {
        emit('submit', text)
        inputText.value = ''
    }
}
</script>