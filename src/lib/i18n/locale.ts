import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Locale = 'en' | 'de';

export const LOCALES: Locale[] = ['en', 'de'];

const COOKIE_KEY = 'locale';
const STORAGE_KEY = 'locale';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const locale = writable<Locale>('en');

export function isLocale(value: unknown): value is Locale {
	return value === 'en' || value === 'de';
}

function persist(value: Locale) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// storage may be unavailable (e.g. private mode); ignore
	}
	document.cookie = `${COOKIE_KEY}=${value};path=/;max-age=${ONE_YEAR};samesite=lax`;
	document.documentElement.lang = value;
}

export function setLocale(value: Locale) {
	locale.set(value);
	persist(value);
}

export function toggleLocale() {
	locale.update((current) => {
		const next: Locale = current === 'en' ? 'de' : 'en';
		persist(next);
		return next;
	});
}

let initialized = false;

export function initLocale(initial: Locale) {
	// On the client, only seed the store once so a later user toggle isn't
	// overwritten on subsequent navigations. On the server the module is shared
	// across requests, so always apply the per-request value.
	if (browser) {
		if (initialized) return;
		initialized = true;
		document.documentElement.lang = initial;
	}
	locale.set(initial);
}
