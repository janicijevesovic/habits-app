import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import type { AuthState } from '~/interfaces/Auth';

export const useAuthStore = defineStore('authStore', {
	state: (): AuthState => ({
		user: null,
		loginError: null,
		signupError: null,
	}),

	actions: {
		// Signup
		async signup(email: string, password: string) {
			const { $auth } = useNuxtApp();

			this.signupError = null;

			try {
				const credentials = await createUserWithEmailAndPassword(
					$auth,
					email,
					password
				);
				this.user = credentials.user;
			} catch (error) {
				if (error instanceof FirebaseError) {
					this.signupError = error.message;
				}
			}
		},
		// Logout
		async logout() {
			const { $auth } = useNuxtApp();

			await signOut($auth);
			this.user = null;
		},
		// Login
	},
});
