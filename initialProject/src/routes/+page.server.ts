import type { Actions, Load } from '@sveltejs/kit';
import sql from 'sql-template-strings';
import { query } from '../lib/db';

export interface Item {
	id: number;
	checked: boolean;
	name: string;
	time_update: string;
}

export const load: Load = async (event) => {
	const list: Item[] = await query(sql`
		SELECT id, checked, name, time_update FROM todo ORDER BY sort
	`);

  return {
    list,
  };
}

export const actions: Actions = {
	add: async () => {
		const [{ id }] = await query(sql`
      INSERT INTO todo (checked, name, sort, time_update)
      VALUES (FALSE, '', (SELECT coalesce(max(sort), 0) + 1 FROM todo), now())
      RETURNING id
    `);

		return { id, name: '', checked: false };
	},

	update: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const checked = data.get('checked') === 'on';
		const name = data.get('name');

		console.log('Called UPDATE', { id, name, checked });

		await query(sql`
      UPDATE todo SET checked = ${checked}, name = ${name}, time_update = NOW() WHERE id = ${id}
    `);

		return { id, name, checked };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);

		console.log('Called DELETE', { id });

		await query(sql`
      DELETE FROM todo WHERE id=${id}
    `);

		return { id };
	}
};
