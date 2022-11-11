import type { Actions } from '@sveltejs/kit';
import sql from 'sql-template-strings';
import { query } from '../lib/db';

export const actions: Actions = {
	add: async () => {
		const [{ id }] = await query(sql`
      INSERT INTO todo (checked, name, sort, time_update)
      VALUES (FALSE, '', (SELECT coalesce(max(sort), 0) + 1 FROM todo), now())
      RETURNING id
    `);

		return { id };
	},

	list: async () => {
		const list = await query(sql`
      SELECT id, checked, name, time_update FROM todo ORDER BY sort
    `);

		return { list };
	},

	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const checked = data.get('checked');
		const name = data.get('name');

		await query(sql`
      UPDATE todo SET checked = ${checked}, name = ${name}, time_update = NOW() WHERE id = ${id}
    `);

		return { id };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await query(sql`
      DELETE FROM todo WHERE id=${id}
    `);

		return { id };
	}
};
