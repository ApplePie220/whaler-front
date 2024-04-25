<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <img v-if="name === 'reset'" src="@/assets/reset.png" alt="Reset" width="16" height="16" />

  <img v-if="name === 'changes'" src="@/assets/changes.png" alt="Update" width="16" height="16" />

  <img v-if="name === 'delete'" src="@/assets/delete.png" alt="Trash" width="16" height="16" />

  <img v-if="name === 'files'" src="@/assets/files.png" alt="Log" width="16" height="16" />
</template>

<style scoped>

</style>