<template>
	<header
		class="flex items-center justify-between p-4 text-white bg-purple-500"
	>
		<nuxt-link to="/">
			<h1 class="text-xl font-semibold">Habit Tracker</h1>
		</nuxt-link>
		<div>
			<div class="space-x-4">
				<nuxt-link to="/login" class="hover:underline">Login</nuxt-link>
				<nuxt-link to="/signup" class="hover:underline">Sign Up</nuxt-link>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts"></script>
