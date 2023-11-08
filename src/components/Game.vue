<template>
  <div class="w-screen h-screen">
    <iframe :src="props.src" class="w-full h-full border-none"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>
