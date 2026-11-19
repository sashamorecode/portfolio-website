<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import '../../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { initLocale } from '$lib/i18n';

	export let data;

	setMode('dark');
	initLocale(data.locale);
</script>

<ModeWatcher />
<div
	class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"
>
	<slot></slot>
	<footer
		class="mb-24 mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
	>
		<span>© {new Date().getFullYear()} Alexander Weir</span>
		<a href="/impressum" class="hover:text-foreground hover:underline">Impressum</a>
		<a href="/datenschutz" class="hover:text-foreground hover:underline">Datenschutz</a>
	</footer>
	<Navbar />
</div>
