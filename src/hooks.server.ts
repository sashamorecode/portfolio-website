import type { Handle, RequestEvent } from '@sveltejs/kit';
import { isLocale, type Locale } from '$lib/i18n/locale';

function resolveLocale(event: RequestEvent): Locale {
	const cookie = event.cookies.get('locale');
	if (isLocale(cookie)) return cookie;

	const header = event.request.headers.get('accept-language') ?? '';
	const primary = header.split(',')[0]?.trim().toLowerCase() ?? '';
	if (primary.startsWith('de')) return 'de';

	return 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const locale = resolveLocale(event);
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
