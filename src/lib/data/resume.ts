import { CodeIcon, Github, Globe, HomeIcon, Youtube } from 'lucide-svelte';
// Navbar Icons
import GithubSvg from '$lib/imgs/github.svg';
import GithubDarkSvg from '$lib/imgs/github-dark.svg';

import GmailSvg from '$lib/imgs/gmail.svg';
import GmailDarkSvg from '$lib/imgs/gmail-dark.svg';

import LinkedinSvg from '$lib/imgs/linkedin.svg';
import LinkedinDarkSvg from '$lib/imgs/linkedin-dark.svg';

import HumanityLink from '$lib/imgs/humanityLink.jpg';
import DerTakt from '$lib/imgs/derTakt.png';
import WLZ from '$lib/imgs/WLZ.png';
import BeyondComunications from '$lib/imgs/bc.jpg';
import SvelteImg from '$lib/imgs/Svelte.png';
import Keras from '$lib/imgs/Keras.png';
import ShopifyImg from '$lib/imgs/shopify.svg';
import NvidiaImg from '$lib/imgs/nvidia.png';
import SplunkImg from '$lib/imgs/splunk.svg';
import LimeImg from '$lib/imgs/lime.svg';
import MitreMediaImg from '$lib/imgs/mitremedia.png';
import BuildSpaceImg from '$lib/imgs/buildspace.jpg';
import WaterLooImg from '$lib/imgs/waterloo.png';
import LaurierImg from '$lib/imgs/laurier.png';

import RWTH from '$lib/imgs/RWTH.jpeg';
import IBImg from '$lib/imgs/ib.png';
import { Description } from '$lib/components/ui/card';

import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/i18n/locale';

// Your resume data. Text that differs per language is wired through `tr(en, de)`;
// everything else (images, links, icons, proper nouns) is shared across locales.
export function getData(l: Locale) {
	const tr = (en: string, de: string) => (l === 'de' ? de : en);

	return {
		name: 'Sasha Salzano-Weir',
		initials: 'SSW',
		url: 'https://github.com/sashamorecode',
		img: 'https://i.pinimg.com/736x/9e/dc/a6/9edca66eba199828bda2dbaf35642154.jpg',
		location: 'Aachen, Germany',
		locationLink: 'https://www.google.com/maps/place/aachen',
		description: tr(
			'Software Developer and Computer Science Student.',
			'Softwareentwickler und Informatikstudent.'
		),
		subDescription: tr(
			'I love building things that help people.',
			'Ich liebe es, Dinge zu entwickeln, die Menschen helfen.'
		),
		summary: tr(
			'Since Oct 2025 I have been working on at [HumanityLink](https://www.humanity.link/about-us/) where I am developing a AI-enabled SAAS platform for client-outreach through WhatsApp and SMS. In the meantime im completing my BSc at [RWTH](https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/liste-aktuelle-studiengaenge/studiengangbeschreibung/~bnzs/informatik-b-sc-/?lidx=1).',
			'Seit Oktober 2025 arbeite ich bei [HumanityLink](https://www.humanity.link/about-us/), wo ich eine KI-gestützte SaaS-Plattform für die Kundenansprache über WhatsApp und SMS entwickle. Nebenbei schließe ich meinen BSc an der [RWTH](https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/liste-aktuelle-studiengaenge/studiengangbeschreibung/~bnzs/informatik-b-sc-/?lidx=1) ab.'
		),
		avatarUrl: '/Portrait.jpg',
		skills: [
			'Typescript',
			'Python',
			'Go',
			'Kubernetes',
			'Docker',
			'GCP',
			'Terraform',
			'Node.js',
			'Express',
			'Vault',
			'Twilio',
			'EspoCRM',
			'Monday.com',
			'ElevenLabs'
		],
		navbar: [
			{ href: '/', icon: HomeIcon, label: tr('Home', 'Start') },
		],
		contact: {
			email: 'sashasalzweir@gmail.com',
			tel: '+31680057194',
			social: {
				GitHub: {
					name: 'GitHub',
					url: 'https://github.com/sashamorecode',
					// // icon: Icons.github,
					icon: GithubSvg,
					navbar: true,
					dark_icon: GithubDarkSvg
				},
				LinkedIn: {
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/alexander-salzano-weir-966661221/',
					// // icon: Icons.linkedin,
					icon: LinkedinSvg,
					navbar: true,
					dark_icon: LinkedinDarkSvg
				},
				email: {
					name: tr('Send Email', 'E-Mail senden'),
					url: '#',
					// // icon: Icons.email,
					icon: GmailSvg,
					navbar: false,
					dark_icon: GmailDarkSvg
				}
			}
		},
		work: [
			{
				company: 'HumanityLink',
				href: 'https://humanity.link/',
				badges: [],
				location: 'Remote',
				title: tr('Junior Software Developmer', 'Junior-Softwareentwickler'),
				logoUrl: HumanityLink,
				start: tr('Oct 2025', 'Okt. 2025'),
				description: tr(
					"*Implemented* a multi-tenant **SAAS** platform that *enables* **NGO's** to reach out to their clients over **SMS** or **WhatsApp**. *instumentalized* **[EspoCRM](https://www.espocrm.com/)** to act as a frontend for a **Express** backend that *utilized* the **Twilio** platform to do batch messaging and surveys. I was also in charge of *deploying* the solution to **GCP** using **Kubernetes** and **Docker**.",
					'*Implementierte* eine mandantenfähige **SaaS**-Plattform, die es **NGOs** *ermöglicht*, ihre Klienten über **SMS** oder **WhatsApp** zu erreichen. *Setzte* **[EspoCRM](https://www.espocrm.com/)** als Frontend für ein **Express**-Backend ein, das die **Twilio**-Plattform für Massennachrichten und Umfragen nutzte. Außerdem war ich für das *Deployment* der Lösung auf **GCP** mit **Kubernetes** und **Docker** verantwortlich.'
				)
			},
			{
				company: 'Private Client',
				href: 'https://jonasschledorn.com/',
				badges: [],
				location: 'Remote',
				title: tr('Web Developer', 'Webentwickler'),
				logoUrl: SvelteImg,
				start: tr('Sep 2025', 'Sep. 2025'),
				end: tr('Oct 2025', 'Okt. 2025'),
				description: tr(
					'Built a portfolio website using **SvelteKit** and deployed it on a virtual private server using **Nginx** as a reverse proxy.',
					'Erstellte eine Portfolio-Website mit **SvelteKit** und stellte sie auf einem virtuellen privaten Server mit **Nginx** als Reverse Proxy bereit.'
				)
			},
			{
				company: 'Der TAkt',
				href: 'https://www.aachen.digital/news/smart-city-ideenwettbewerb-das-grosse-finale-und-die-sieger/',
				badges: [],
				location: 'Remote',
				title: tr('Augmented Reality Software Developer', 'Augmented-Reality-Softwareentwickler'),
				logoUrl: DerTakt,
				start: tr('Aug 2023', 'Aug. 2023'),
				end: tr('Jan 2024', 'Jan. 2024'),
				description: tr(
					'Independently built a browser-based augmented reality program with **A-Frame**, automated deployments via **GitHub Actions**, and created a live survey dashboard leading to a win in the *Smart City ideas competition* (10,000 EUR funding).',
					'Entwickelte eigenständig ein browserbasiertes Augmented-Reality-Programm mit **A-Frame**, automatisierte Deployments über **GitHub Actions** und erstellte ein Live-Umfrage-Dashboard, was zum Sieg im *Smart-City-Ideenwettbewerb* führte (10.000 EUR Förderung).'
				)
			},
			{
				company: 'Laboratory for Machine Tools and Production Engineering',
				href: 'https://www.wzl.rwth-aachen.de/cms/wzl/Wirtschaft/Praxisprojekte/~citnp/CNC-Kompetenzzentrum/lidx/1/',
				badges: [],
				location: tr('Aachen, Germany', 'Aachen, Deutschland'),
				title: tr('Work Placement', 'Praktikum'),
				logoUrl: WLZ,
				start: tr('Feb 2022', 'Feb. 2022'),
				end: tr('Jun 2022', 'Juni 2022'),
				description: tr(
					'Researched and prototyped a reinforcement learning model for a self-adjusting CNC mill using **Proximal Policy Optimization**. Built a **regression** model to act as a **virtual environment**, reviewed literature to select the learning approach, and presented findings to **WLZ** researchers.',
					'Erforschte und prototypisierte ein Reinforcement-Learning-Modell für eine selbstjustierende CNC-Fräse mittels **Proximal Policy Optimization**. Erstellte ein **Regressionsmodell** als **virtuelle Umgebung**, recherchierte Literatur zur Auswahl des Lernansatzes und präsentierte die Ergebnisse den **WLZ**-Forschenden.'
				)
			},
			{
				company: 'Beyond Communications',
				href: 'https://beyond-communications.com/',
				badges: [],
				location: 'Hybrid',
				title: tr('System Administrator', 'Systemadministrator'),
				logoUrl: BeyondComunications,
				start: tr('Aug 2021', 'Aug. 2021'),
				end: tr('Jul 2023', 'Juli 2023'),
				description: tr(
					'Orchestrated software upgrades, integrations, and documentation, *monitored* networks and devices to resolve issues, *diagnosed* and *fixed* server incidents, assessed software *compatibility*, and provided **customer support** for technical difficulties.',
					'Koordinierte Software-Upgrades, Integrationen und Dokumentation, *überwachte* Netzwerke und Geräte zur Problemlösung, *diagnostizierte* und *behob* Serverstörungen, bewertete die Software-*Kompatibilität* und bot **Kundensupport** bei technischen Schwierigkeiten.'
				)
			},
			{
				company: 'Aquaculture Automation Startup',
				href: '#',
				badges: [],
				location: 'Remote',
				title: tr('Data Science Intern', 'Data-Science-Praktikant'),
				logoUrl: Keras,
				start: tr('May 2021', 'Mai 2021'),
				end: tr('Jul 2021', 'Juli 2021'),
				description: tr(
					'Built an image segmentation pipeline in **Keras** to identify fish, *manipulated* datasets with **Pandas**, *visualized* insights using **Seaborn**, and *automated* data cleaning/filtering with **Python** and **Bash**.',
					'Entwickelte eine Bildsegmentierungs-Pipeline in **Keras** zur Identifizierung von Fischen, *bearbeitete* Datensätze mit **Pandas**, *visualisierte* Erkenntnisse mit **Seaborn** und *automatisierte* Datenbereinigung/-filterung mit **Python** und **Bash**.'
				)
			}
		],
		education: [
			{
				school: 'RWTH Aachen University',
				href: 'https://www.rwth-aachen.de',
				degree: tr("Bachelor's Degree, Computer Science", 'Bachelor of Science, Informatik'),
				logoUrl: RWTH,
				start: '2022',
				description: tr(
					'Foucus on System Design, High Performance Computing and Machine Learning',
					'Schwerpunkt auf Systemdesign, High Performance Computing und maschinellem Lernen'
				)
			},
			{
				school: 'UWC Red Cross Nordic',
				href: 'https://uwcrcn.no',
				degree: 'International Baccalaureate',
				logoUrl: IBImg,
				start: tr('Aug 2020', 'Aug. 2020'),
				end: tr('Apr 2022', 'Apr. 2022'),
				description: tr(
					'Higher level subjects: Math, Physics, Economics',
					'Leistungskurse: Mathematik, Physik, Wirtschaft'
				)
			}
		],
		projects: [
			{
				title: 'Chat Collect',
				href: 'https://chatcollect.com',
				dates: 'Jan 2024 - Feb 2024',
				active: true,
				description:
					'With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
				technologies: [
					'Next.js',
					'Typescript',
					'PostgreSQL',
					'Prisma',
					'TailwindCSS',
					'Stripe',
					'Shadcn UI',
					'Magic UI'
				],
				links: [
					{
						type: 'Website',
						href: 'https://chatcollect.com',
						// icon: <Icons.globe className="size-3" />,
						icon: Globe
					}
				],
				image: '',
				video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4'
			},
			{
				title: 'Magic UI',
				href: 'https://magicui.design',
				dates: 'June 2023 - Present',
				active: true,
				description: 'Designed, developed and sold animated UI components for developers.',
				technologies: [
					'Next.js',
					'Typescript',
					'PostgreSQL',
					'Prisma',
					'TailwindCSS',
					'Stripe',
					'Shadcn UI',
					'Magic UI'
				],
				links: [
					{
						type: 'Website',
						href: 'https://magicui.design',
						// icon: <Icons.globe className="size-3" />,
						icon: Globe
					},
					{
						type: 'Source',
						href: 'https://github.com/magicuidesign/magicui',
						icon: Github
						// icon: <Icons.github className="size-3" />,
					}
				],
				image: '',
				video: 'https://cdn.magicui.design/bento-grid.mp4'
			},
			{
				title: 'llm.report',
				href: 'https://llm.report',
				dates: 'April 2023 - September 2023',
				active: true,
				description:
					'Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.',
				technologies: [
					'Next.js',
					'Typescript',
					'PostgreSQL',
					'Prisma',
					'TailwindCSS',
					'Shadcn UI',
					'Magic UI',
					'Stripe',
					'Cloudflare Workers'
				],
				links: [
					{
						type: 'Website',
						href: 'https://llm.report',
						icon: Globe
						// icon: <Icons.globe className="size-3" />,
					},
					{
						type: 'Source',
						href: 'https://github.com/dillionverma/llm.report',
						icon: Github
						// icon: <Icons.github className="size-3" />,
					}
				],
				image: '',
				video: 'https://cdn.llm.report/openai-demo.mp4'
			},
			{
				title: 'Automatic Chat',
				href: 'https://automatic.chat',
				dates: 'April 2023 - March 2024',
				active: true,
				description:
					'Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.',
				technologies: [
					'Next.js',
					'Typescript',
					'PostgreSQL',
					'Prisma',
					'TailwindCSS',
					'Shadcn UI',
					'Magic UI',
					'Stripe',
					'Cloudflare Workers'
				],
				links: [
					{
						type: 'Website',
						href: 'https://automatic.chat',
						icon: Globe
						// icon: <Icons.globe className="size-3" />,
					}
				],
				image: '',
				video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4'
			}
		],
		hackathons: [
			{
				title: 'Hack Western 5',
				dates: 'November 23rd - 25th, 2018',
				location: 'London, Ontario',
				description:
					'Developed a mobile application which delivered bedtime stories to children using augmented reality.',
				image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png',
				mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
				links: []
			}
		]
	};
}

export type ResumeData = ReturnType<typeof getData>;

// Reactive resume data that follows the active locale.
export const data = derived(locale, ($locale) => getData($locale));

// Static English data for any non-reactive consumers.
export const DATA = getData('en');
