import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { isLocale, type Locale } from '$lib/i18n/locale';

const previousPages = new Map([
	['/index.html', '/en'],
	['/de.html', '/de'],
	['/anchor.html', '/en#anchor-for-farmers'],
	['/anchor-de.html', '/de#anchor-for-farmers']
]);

function resolveLocale(event: RequestEvent): Locale {
	if (isLocale(event.params.lang)) return event.params.lang;

	const cookie = event.cookies.get('locale');
	if (isLocale(cookie)) return cookie;

	const header = event.request.headers.get('accept-language') ?? '';
	const primary = header.split(',')[0]?.trim().toLowerCase() ?? '';
	if (primary.startsWith('de')) return 'de';

	return 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const previous = previousPages.get(event.url.pathname);
	if (previous) {
		const [path, section] = previous.split('#');
		redirect(308, path + event.url.search + (section ? '#' + section : ''));
	}

	const locale = resolveLocale(event);
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
