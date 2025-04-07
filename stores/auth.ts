import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import type { AuthState } from '~/interfaces/Auth';

export const useAuthStore = defineStore('authStore', {
	state: (): AuthState => ({
		user: null,
		loginError: null,
		signupError: null,
		initialAuthValueReady: false,
	}),

	actions: {
		// Realtime
		setupAuthListener() {
			const { $auth } = useNuxtApp();
			if ($auth) {
				onAuthStateChanged($auth, (user) => {
					this.user = user;
					this.initialAuthValueReady = true;
					console.log('User State Changed:', this.user);
				});
			} else {
				console.log('Firebase auth is not initialized!');
			}
		},
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
		},
		// Login
		async login(email: string, password: string) {
			const { $auth } = useNuxtApp();

			this.loginError = null;

			try {
				const credentials = await signInWithEmailAndPassword(
					$auth,
					email,
					password
				);
			} catch (error) {
				if (error instanceof FirebaseError) {
					this.loginError = error.message;
				}
			}
		},
	},
});
