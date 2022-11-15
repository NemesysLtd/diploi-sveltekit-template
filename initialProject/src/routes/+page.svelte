<script type="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import type { Item } from './+page.server';

	export let data: PageData;

	/**
	 * Helper to programmatically submit the parent form from an input change event
	 */
	const submitForm = (event: { currentTarget: EventTarget & HTMLInputElement }) => {
		event.currentTarget.closest('form')?.requestSubmit();
	};

	/**
	 * Handle progressive enhancement on the item form
	 * @see https://kit.svelte.dev/docs/form-actions#progressive-enhancement
	 */
	const itemUpdate = ({ form, action }: { form: HTMLFormElement; action: URL }) => {
		return async ({ result }: { result: ActionResult }) => {
			const item = (result as any).data as Item;
			if (!item) return;

			const isDelete = action.searchParams.has('/delete');
			if (isDelete) {
				data.list = data.list.filter((existing) => existing.id !== item.id);
				return;
			}

			const existing = data.list.find((existing) => existing.id === item.id);
			if (!existing) return;
			existing.name = item.name;
			existing.checked = item.checked;
		};
	};
</script>

<svelte:head>
	<title>Diploi SvelteKit To-Do App</title>
</svelte:head>

<section>
	<h1>What To Do?</h1>
	<ol>
		{#each data.list as item (item.id)}
			<li data-id={item.id}>
				<form method="POST" action="?/update" use:enhance={itemUpdate}>
					<input type="hidden" name="id" value={item.id} />
					<input type="checkbox" name="checked" checked={item.checked} on:change={submitForm} />
					<input type="text" name="name" value={item.name} placeholder="…" on:change={submitForm} />
				</form>

				<!-- Delete button -->
				<form method="POST" action="?/delete" use:enhance={itemUpdate}>
					<input type="hidden" name="id" value={item.id} />
					<button>×</button>
				</form>
			</li>
		{/each}
	</ol>

	<!-- Add button -->
	<form method="POST" use:enhance action="?/add">
		<button class="add" type="submit">Add Item</button>
	</form>

	<footer>
		<p>
			You are looking at a <a href="#">SvelteKit To-Do example</a> for
			<a href="https://diploi.dev">Diploi</a>,<br />the easy-to-use app development platform.
		</p>
	</footer>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 64px 0;
	}

	h1 {
		margin: 0;
		font-size: 64px;
		line-height: 1.15;
		text-align: center;
	}

	ol {
		margin: 32px 0;
		padding: 0;
		width: 65ch;
		list-style: none;
	}

	ol > li,
	ol > li > form {
		display: flex;
		align-items: center;
	}

	ol > li > form:first-of-type {
		flex: 1;
	}

	ol > li:not(:last-of-type) {
		margin-bottom: 2px;
		padding-bottom: 2px;
		border-bottom: 2px solid var(--app-border-color);
	}

	ol > li input[type='checkbox'] {
		margin: 0;
		margin-right: 4px;
		width: 16px;
		height: 16px;
		accent-color: var(--app-link-color);
	}

	ol > li input[type='text'] {
		flex: 1;
		padding: 8px;
		font-size: 16px;
		background: none;
		border: none;
	}

	ol > li button {
		padding: 0;
		width: 16px;
		height: 16px;
		font-size: 24px;
		line-height: 0;
		background: none;
		border: none;
		color: gray;
		cursor: pointer;
	}

	ol > li button:hover {
		color: var(--app-link-color);
	}

	.add {
		padding: 8px 16px;
		font-size: 16px;
		font-weight: bold;
		border: none;
		border-radius: 36px;
		cursor: pointer;
	}

	footer > p {
		margin-top: 32px;
		text-align: center;
		line-height: 1.35;
	}

	footer > p > a {
		font-weight: bold;
		text-align: center;
		text-decoration: underline;
		color: var(--app-link-color);
	}
</style>
