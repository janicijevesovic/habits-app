<template>
	<header
		class="flex items-center justify-between p-4 text-white bg-purple-500"
	>
		<nuxt-link to="/">
			<h1 class="text-xl font-semibold">Habit Tracker</h1>
		</nuxt-link>

		<HideFromGuest>
			<div class="flex items-center space-x-4">
				<button @click="handleLogout" class="px-3 py-1 text-black bg-gray-100">
					Logout
				</button>
			</div>
		</HideFromGuest>

		<HideFromUser>
			<div class="space-x-4">
				<nuxt-link to="/login" class="hover:underline">Login</nuxt-link>
				<nuxt-link to="/signup" class="hover:underline">Sign Up</nuxt-link>
			</div>
		</HideFromUser>
	</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const handleLogout = async () => {
	await authStore.logout();
};
</script>
