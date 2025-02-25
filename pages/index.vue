<template>
	<div class="max-w-2xl p-6 mx-auto">
		<h1 class="mb-8 text-4xl font-bold text-center">Habit Tracker</h1>
		<HabitForm />
		<HabitList v-if="habitStore.habits" :habits="habitStore.habits" />
	</div>
</template>

<script setup lang="ts">
const habitStore = useHabitStore();
habitStore.fetchHabits();
</script>
