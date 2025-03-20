<template>
	<div class="flex justify-center my-10">
		<div class="w-full max-w-sm p-8 bg-white rounded shadow-md">
			<h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Log In</h2>

			<form @submit.prevent="handleLogin">
				<input
					type="email"
					v-model="email"
					placeholder="Email"
					required
					class="w-full p-3 mb-4 border rounded-sm border-gray- 300"
				/>

				<input
					type="password"
					v-model="password"
					placeholder="Password"
					required
					class="w-full p-3 mb-4 border rounded-sm border-gray- 300"
				/>

				<button
					type="submit"
					class="w-full py-2 text-white bg-purple-500 rounded-sm"
				>
					Log In
				</button>

				<p v-if="authStore.loginError" class="mt-4 text-center text-red-500">
					{{ authStore.loginError }}
				</p>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
	await authStore.login(email.value, password.value);
};
</script>
