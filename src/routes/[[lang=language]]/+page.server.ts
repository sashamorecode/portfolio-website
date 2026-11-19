import type { PageServerLoad } from './$types';
import en from '$lib/homepage/en.json';
import de from '$lib/homepage/de.json';

// The page works as plain HTML. The two small browser scripts handle appearance and the signal plot.
export const csr = false;

export const load: PageServerLoad = ({ locals, params, setHeaders }) => {
	if (!params.lang) {
		setHeaders({ vary: 'Accept-Language, Cookie', 'cache-control': 'private, no-cache' });
	}
	return { edition: locals.locale, copy: locals.locale === 'de' ? de : en };
};
