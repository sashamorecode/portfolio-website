import { derived } from 'svelte/store';
import { locale, type Locale } from './locale';

const en = {
	hero: {
		greeting: "Hi, I'm Sasha👋"
	},
	sections: {
		about: 'About',
		work: 'Work Experience',
		education: 'Education',
		skills: 'Skills',
		contact: 'Contact'
	},
	contact: {
		heading: 'Get in Touch',
		lead: 'Want to chat? Just shoot me an',
		emailWord: 'email',
		tail: "and I'll respond whenever I can."
	},
	projects: {
		badge: 'My Projects',
		heading: "Things I've built",
		lead: 'Production systems built at HumanityLink, from NGO outreach over SMS and WhatsApp to climate advisories for smallholder farmers.'
	},
	resume: {
		present: 'Present'
	},
	a11y: {
		toggleTheme: 'Toggle theme',
		toggleLanguage: 'Toggle language'
	},
	tooltip: {
		theme: 'Theme',
		language: 'Language'
	}
};

const de: typeof en = {
	hero: {
		greeting: 'Hi, ich bin Sasha👋'
	},
	sections: {
		about: 'Über mich',
		work: 'Berufserfahrung',
		education: 'Ausbildung',
		skills: 'Fähigkeiten',
		contact: 'Kontakt'
	},
	contact: {
		heading: 'Kontakt aufnehmen',
		lead: 'Lust auf einen Austausch? Schreib mir einfach eine',
		emailWord: 'E-Mail',
		tail: 'und ich melde mich, sobald ich kann.'
	},
	projects: {
		badge: 'Meine Projekte',
		heading: 'Was ich gebaut habe',
		lead: 'Produktionssysteme, die ich bei HumanityLink gebaut habe – von NGO-Kontakt über SMS und WhatsApp bis zu Klimaberatung für Kleinbauern.'
	},
	resume: {
		present: 'Heute'
	},
	a11y: {
		toggleTheme: 'Design wechseln',
		toggleLanguage: 'Sprache wechseln'
	},
	tooltip: {
		theme: 'Design',
		language: 'Sprache'
	}
};

export const messages = { en, de } satisfies Record<Locale, typeof en>;

export const t = derived(locale, ($locale) => messages[$locale]);
