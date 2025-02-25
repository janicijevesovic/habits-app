<template>
	<div>
		<ul class="space-y-4">
			<li
				v-for="habit in props.habits"
				:key="habit.id"
				class="px-3 py-2 bg-white rounded-sm"
			>
				<div class="flex items-center justify-between mb-4">
					<p class="font-bold text-purple-500">
						<span
							:class="{ 'line-through': habit.completions.includes(today) }"
						>
							{{ habit.name }}
						</span>
					</p>
					<button
						class="text-gray-800"
						@click="habitStore.deleteHabit(habit.id)"
					>
						Delete
					</button>
				</div>

				<div class="flex items-center">
					<input
						type="checkbox"
						class="mr-2 accent-purple-500"
						@change="habitStore.toggleCompletion(habit)"
						:checked="habit.completions.includes(today)"
					/>
					<p class="text-sm text-gray-500">I did this today.</p>
				</div>

				<p class="mt-2 text-sm text-gray-500">
					Current Streak: {{ habit.streak }} days.
				</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { Habit } from '~/interfaces/Habit';
import { format } from 'date-fns';

const props = defineProps<{
	habits: Habit[];
}>();

const habitStore = useHabitStore();

const today = format(new Date(), 'yyyy-MM-dd');
</script>
