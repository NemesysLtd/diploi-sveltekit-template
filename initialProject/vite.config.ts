import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';

export default ({ mode }: { mode: string; }) => {
	const env = loadEnv(mode, process.cwd());
	const port = parseInt(env.VITE_PORT) || 5173;

	return {
		plugins: [sveltekit()],
		server: {
			port,
		}
	};
}
