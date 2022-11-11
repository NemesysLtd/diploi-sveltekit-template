import { Pool } from 'pg';
import sql, { SQLStatement } from 'sql-template-strings';
import { env } from '$env/dynamic/private';

export const pool = new Pool({
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	host: env.POSTGRES_HOST,
	port: parseInt(env.POSTGRES_PORT!) || 5432,
	database: env.POSTGRES_DB
});

export const query = async <Row = any>(statement: string | SQLStatement) => {
	try {
		return (await pool.query(statement)).rows;
	} catch (error: any) {
		throw new Error(`DB error: ${error.message}`);
	}
};

// Create database if it doesn't exist
// NOTE! Not the ideal place/way of doing this, but works for now
const initDb = async () => {
	try {
		// await query(sql`DROP TABLE IF EXISTS todo`);
		const exists = (await query(sql`SELECT to_regclass('public.todo') as exists`))[0].exists;
		if (!exists) {
			console.log(new Date().toISOString(), 'Initializing database');
			await query(
				sql`CREATE TABLE todo (id SERIAL PRIMARY KEY, name TEXT NOT NULL, checked BOOLEAN NOT NULL, sort INTEGER, time_update TIMESTAMP WITH TIME ZONE NOT NULL)`
			);
			await query(
				sql`INSERT INTO todo (checked, name, sort, time_update) VALUES (TRUE, 'Bananas', 1, now()), (FALSE, 'Milk', 2, now()),  (FALSE, 'Noodles', 3, now())`
			);
		}
	} catch (createError) {
		console.log(new Date().toISOString(), 'Error initializing database', createError);
	}
};

initDb();
