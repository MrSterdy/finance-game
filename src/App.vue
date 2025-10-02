<script setup lang="ts">
import { onMounted } from 'vue'
import { initializeProfile } from '@/lib/storage/profile'

// Инициализируем профиль при загрузке приложения
onMounted(() => {
  initializeProfile()
})
</script>

<template>
  <RouterView />
</template>
