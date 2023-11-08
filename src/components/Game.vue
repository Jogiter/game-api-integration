<template>
  <div class="w-screen h-screen">
    <iframe :src="src" class="w-full h-full border-none"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>