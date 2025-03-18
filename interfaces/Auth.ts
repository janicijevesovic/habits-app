import type { UserCredential } from 'firebase/auth';

export interface AuthState {
	user: UserCredential['user'] | null;
	loginError: string | null;
	signupError: string | null;
}
