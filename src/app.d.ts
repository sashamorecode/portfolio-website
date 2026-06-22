// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Locale } from '$lib/i18n/locale';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
		}
		interface PageData {
			locale?: Locale;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
