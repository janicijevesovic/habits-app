<template>
	<div class="max-w-2xl p-6 mx-auto">
		<HabitForm />
		<HabitList v-if="habitStore.habits" :habits="habitStore.habits" />
	</div>
</template>

<script setup lang="ts">
const habitStore = useHabitStore();

onMounted(async () => {
	habitStore.fetchHabits();
});

definePageMeta({
	middleware: ['auth'],
});
</script>
