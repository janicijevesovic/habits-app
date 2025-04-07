<template>
	<slot v-if="authStore.user"></slot>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>
