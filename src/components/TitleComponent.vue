<template>
    <h1>{{ value }}</h1>
</template>
<script setup lang="ts">
import { onMounted } from "vue"

export interface TitleComponentProps {
    value?: String
}

const emit = defineEmits<{(e: 'on-mounted') : void}>()
defineProps<TitleComponentProps>()
onMounted(() => {
    emit('on-mounted')
})
</script>