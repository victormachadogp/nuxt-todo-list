<template>
    <form @submit.prevent="handleSubmit" class="flex gap-2 mb-6">
        <input type="text" v-model="text" :placeholder="placeholder"
            class="w-full pl-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">

    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps<{
    placeholder: string
}>()

const emit = defineEmits<{
    submit: [text: string]
}>()

const MIN_LENGTH = 3
const MAX_LENGTH = 100

const text = ref('')
const showError = ref(false)
const toast = useToast()

const handleSubmit = () => {
    const trimmedText = text.value.trim()

    if (!trimmedText) {
        toast.error('A tarefa não pode estar vazia!')
        showError.value = true
        return
    }

    if (trimmedText.length < MIN_LENGTH) {
        toast.error(`A tarefa deve ter no mínimo ${MIN_LENGTH} caracteres!`)
        showError.value = true
        return
    }

    if (trimmedText.length > MAX_LENGTH) {
        toast.error(`A tarefa deve ter no máximo ${MAX_LENGTH} caracteres!`)
        showError.value = true
        return
    }

    emit('submit', trimmedText)
    text.value = ''
    showError.value = false
}
</script>