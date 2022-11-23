# Diploi SvelteKit ToDo template

A simple starter ToDo app template implemented with SvelteKit.   
Includes an optional PostgreSQL database.

Features full TypeScript support, out-of-the-box DB connection, HMR support, and much more!   
Implements a backed CRUD API with SvelteKit form actions.

- 💻 [SvelteKit](https://kit.svelte.dev/)
- 💿 [PostgreSQL](https://www.postgresql.org/)

## SvelteKit

Available at `/`.

## PostgreSQL

Available with a VSCode extension ([SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)) or by CLI.

### Connect via SQLTools

1. Open VSCode remote connection to your deployment.
2. Install the [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools) and [SQLTools PostgreSQL/Redshift Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg) extensions.
3. Open the "SQLTools" tab in the sidebar and click "Strapi".

### Connect via CLI

```bash
su postgres -c 'psql'
```
