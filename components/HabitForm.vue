<template>
	<form @submit.prevent="handleSubmit" class="flex items-center gap-2 mb-6">
		<input
			v-model="name"
			type="text"
			placeholder="Enter a new habit..."
			class="w-full p-3 border border-gray-300 rounded-sm"
		/>
		<button
			type="submit"
			class="w-full p-3 text-white bg-purple-500 rounded-sm"
		>
			Add Habit
		</button>
	</form>
</template>

<script setup lang="ts">
const name = ref('');
const habitStore = useHabitStore();

const handleSubmit = async () => {
	if (name.value.trim()) {
		await habitStore.addHabit(name.value);
		name.value = '';
	}
};
</script>
