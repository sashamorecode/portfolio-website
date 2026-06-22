<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { locale, toggleLocale, t } from '$lib/i18n';

	$: flag = $locale === 'de' ? '🇩🇪' : '🇬🇧';
</script>

<Button on:click={toggleLocale} variant="ghost" size="icon" class="rounded-full">
	<span class="text-lg leading-none" aria-hidden="true">{flag}</span>
	<span class="sr-only">{$t.a11y.toggleLanguage}</span>
</Button>
