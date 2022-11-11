<script>
	const items = [
		{ id: 1, checked: true, name: 'Bananas', time_update: '2022-11-11T09:32:35.765Z' },
		{ id: 2, checked: false, name: 'Milk', time_update: '2022-11-11T09:32:35.765Z' },
		{ id: 3, checked: false, name: 'Noodles', time_update: '2022-11-11T09:32:35.765Z' }
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>What To Do?</h1>
	<ol>
		{#each items as item}
			<li>
				<input type="checkbox" checked={item.checked} /><input
					type="text"
					placeholder="…"
					value={item.name}
				/>
				<button>×</button>
			</li>
		{/each}
	</ol>
	<button class="Home_add__e9_Zr">Add Item</button>

	<footer class="Home_footer____T7K">
		<p>
			You are looking at a <a href="#">Next.js To-Do example</a> for<!-- -->
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
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
