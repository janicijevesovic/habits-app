<template>
	<div class="max-w-2xl p-6 mx-auto">
		<HabitForm />
		<HabitList v-if="habitStore.habits" :habits="habitStore.habits" />
	</div>
</template>

<script setup lang="ts">
const habitStore = useHabitStore();
habitStore.fetchHabits();
</script>
