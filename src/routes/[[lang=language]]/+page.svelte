<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const origin = 'https://sashasalzanoweir.com';
	$: copy = data.copy;
	$: alternate = data.edition === 'en' ? 'de' : 'en';
	$: canonical = origin + '/' + data.edition;
</script>

<svelte:head>
	<title>{copy.title}</title>
	<meta name="description" content={copy.description} />
	<meta name="theme-color" content="#fcfcfa" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={copy.title} />
	<meta property="og:description" content={copy.description} />
	<meta property="og:image" content={origin + '/homepage/assets/sasha.webp'} />
	<meta property="og:image:alt" content="Sasha Salzano-Weir" />
	<meta property="og:image:width" content="740" />
	<meta property="og:image:height" content="740" />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="en" href={origin + '/en'} />
	<link rel="alternate" hreflang="de" href={origin + '/de'} />
	<link rel="alternate" hreflang="x-default" href={origin + '/'} />
	<link rel="preload" as="font" href="/homepage/assets/instrument.woff2" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href="/homepage/assets/barlow-semi-condensed.woff2" type="font/woff2" crossorigin="anonymous" />
	<link rel="stylesheet" href="/homepage/site.css" />
	<script src="/homepage/site.js"></script>
	<script src="/homepage/signals.js" defer></script>
</svelte:head>

<a class="skip-link" href="#main">{copy.skip}</a>
<div class="signal-field" aria-hidden="true">
	<canvas class="phase-plot"></canvas>
	<canvas class="wave-bank"></canvas>
</div>
<header class="page-nav frame">
	<nav aria-label={copy.nav_label}>
		<a href="#education">{copy.education_heading}</a>
		<a href="#work">{copy.work_nav}</a>
		<a href="#projects">{copy.projects_heading}</a>
	</nav>
	<a class="language" href={'/' + alternate} hreflang={alternate} lang={alternate}>{copy.language_label}</a>
</header>

<main id="main" class="frame">
	<section class="profile" id="about" aria-labelledby="name">
		<span class="signal-print portrait-print">
			<span class="print-ink"><img class="portrait" src="/homepage/assets/sasha.webp" width="740" height="740" alt="Sasha Salzano-Weir" fetchpriority="high" /></span>
		</span>
		<div class="introduction">
			<h1 id="name">Sasha <span class="surname">Salzano-Weir</span></h1>
			<p>{@html copy.intro}</p>
			<address class="contacts" id="contact">
				<a href="mailto:sashasalzweir@gmail.com">sashasalzweir@gmail.com</a>
				<a href="https://github.com/sashamorecode">GitHub</a>
				<a href="https://www.linkedin.com/in/alexander-salzano-weir-966661221/">LinkedIn</a>
			</address>
		</div>
	</section>

	<section class="education" id="education" aria-labelledby="education-title">
		<h2 id="education-title">{copy.education_heading}</h2>
		{#each copy.schools as school}
			<article class="school">
				<h3><a href={school.href}>{school.name}</a></h3>
				<p class="degree">{school.degree}</p>
				<p class="when">{school.period}</p>
				<p class="study-detail">{@html school.detail}</p>
			</article>
		{/each}
	</section>

	<div class="body-columns">
		<section class="experience" id="work" aria-labelledby="work-title">
			<h2 id="work-title">{copy.work_heading}</h2>
			<ol class="jobs">
				{#each copy.jobs as job}
					<li class="job" id={job.id}>
						<article>
							<div class="job-head"><h3>{job.name}</h3><span class="when">{job.period}</span></div>
							<p class="position">{job.role}</p>
							<p class="job-detail">{@html job.detail}</p>
						</article>
					</li>
				{/each}
			</ol>
			<details class="skills">
				<summary>{copy.skills_heading}</summary>
				<dl id="skills">
					{#each copy.tools as row}
						<div><dt>{row.label}</dt><dd>{row.skills}{#each row.links as link} · <a href={link.href}>{link.label}</a>{/each}</dd></div>
					{/each}
				</dl>
			</details>
		</section>

		<section class="projects" id="projects" aria-labelledby="projects-title">
			<h2 id="projects-title">{copy.projects_heading}</h2>
			<figure class="project-figure">
				<a href="https://github.com/sashamorecode/waveProcessor"><img src="/homepage/assets/waveprocessor.png" width="549" height="411" loading="lazy" alt={copy.processor_alt} /></a>
				<figcaption><a href="https://github.com/sashamorecode/waveProcessor">waveProcessor</a> {copy.processor}</figcaption>
			</figure>
			<p class="personal-project"><a href="https://github.com/sashamorecode/WamSynth">WamSynth</a> {copy.synth_description}</p>
			<p class="personal-project" id="geopolitics-process-mining"><a href="https://github.com/sashamorecode/Geopolitics-Process-Mining">{copy.geopolitics_title}</a> {copy.geopolitics_detail}</p>
			<h3 class="project-group" id="platform-projects">{copy.company_projects}</h3>
			<dl class="project-list">
				{#each copy.projects as project}
					<div id={project.id}><dt>{project.name}</dt><dd>{project.detail}</dd></div>
				{/each}
			</dl>
		</section>
	</div>
</main>

<footer class="page-foot frame">
	<a href="#top">{copy.to_top} ↑</a>
	<button class="motion-control" type="button" hidden data-pause={copy.pause_motion} data-play={copy.play_motion}>{copy.pause_motion}</button>
	<div class="settings">
		<a href="/impressum" lang="de">Impressum</a>
		<a href="/datenschutz" lang="de">Datenschutz</a>
		<button class="theme-control" type="button" hidden data-dark={copy.dark} data-light={copy.light}>{copy.dark}</button>
	</div>
</footer>
