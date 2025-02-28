<template>
  <h1>{{ msg }}</h1>
  <title-component 
    v-show="msg" 
    :value="prefixedMessage" 
    @on-mounted="handleTitleMounted"
  />

  <div class="card" :class="{'card-success': !msg}" @click="handleCardClick">
    <button type="button" @click="increment">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
</template>

<script setup lang="ts">
import TitleComponent from './TitleComponent.vue'
import { computed, ref, watch,defineProps } from 'vue'
import axios from 'axios'

export interface HelloWorldProps {
  msg?: String
}


const props = defineProps<HelloWorldProps>()
const emit = defineEmits<{
  (e: 'card-clicked'): void
  (e: 'up', count: number): void
}>()
const prefixedMessage = computed(() => `My title: ${props.msg}`)
const count = ref(0)

const increment = () => {
  count.value++
}

const handleTitleMounted = () => {
  emit('up', count.value)
}

const handleCardClick = () => {
  emit('card-clicked');
}

watch(() => props.msg, (value) => {
  if(!value) return;
  axios.get('https://httpbin.org/get')
})
</script>