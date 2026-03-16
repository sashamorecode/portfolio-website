import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	throw redirect(307, '/');
}
