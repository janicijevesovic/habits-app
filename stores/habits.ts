import { defineStore } from 'pinia';
import {
	addDoc,
	collection,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';
import type { Habit } from '~/interfaces/Habit';
import { format, differenceInDays } from 'date-fns';

export const useHabitStore = defineStore('habitStore', {
	state: (): { habits: Habit[] } => ({
		habits: [],
	}),
	actions: {
		// Adding New Habits
		async addHabit(name: string) {
			const { $db } = useNuxtApp();

			const habit: Habit = {
				id: '',
				name,
				completions: [],
				streak: 0,
			};

			const docRef = await addDoc(collection($db, 'habits'), habit);
			this.habits.push({ ...habit, id: docRef.id });
		},

		// Fetching All Habits
		async fetchHabits() {
			const { $db } = useNuxtApp();
			const snapshot = await getDocs(collection($db, 'habits'));
			this.habits = snapshot.docs.map(
				(doc) =>
					({
						...doc.data(),
						id: doc.id,
					} as Habit)
			);
		},

		// Deleting Habits
		async deleteHabit(id: string) {
			const { $db } = useNuxtApp();
			const docRef = doc($db, 'habits', id);

			await deleteDoc(docRef);
			this.habits = this.habits.filter((habit) => habit.id !== id);
		},

		// Updating Habits
		async updateHabit(id: string, updates: Partial<Habit>) {
			const { $db } = useNuxtApp();
			const docRef = doc($db, 'habits', id);

			await updateDoc(docRef, updates);

			const index = this.habits.findIndex((habit) => habit.id === id);
			if (index !== -1) {
				this.habits[index] = { ...this.habits[index], ...updates };
			}
		},

		// Completing a Daily Habit
		toggleCompletion(habit: Habit) {
			const today = format(new Date(), 'yyyy-MM-dd');

			if (habit.completions.includes(today)) {
				habit.completions = habit.completions.filter((date) => date !== today);
			} else {
				habit.completions.push(today);
			}

			habit.streak = this.calculateStreak(habit.completions);

			this.updateHabit(habit.id, {
				completions: habit.completions,
				streak: habit.streak,
			});
		},

		// Calculate Streak
		calculateStreak(completions: string[]) {
			const sortedDates = completions.sort(
				(a, b) => +new Date(b) - +new Date(a)
			);
			let streak = 0;
			let currentDate = new Date();

			for (const date of sortedDates) {
				const diff = differenceInDays(currentDate, new Date(date));
				if (diff > 1) break;

				streak++;
				currentDate = new Date(date);
			}

			return streak;
		},
	},
});
