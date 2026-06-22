<script lang="ts">
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	const BLUR_FADE_DELAY = 0.04;
</script>

<svelte:head>
	<title>Impressum</title>
	<meta name="description" content="Impressum gemäß § 5 DDG" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<BlurFade delay={BLUR_FADE_DELAY}>
	<h1 class="mb-8 text-2xl font-medium tracking-tighter">Impressum</h1>
</BlurFade>

<BlurFade delay={BLUR_FADE_DELAY * 2}>
	<div class="prose prose-sm max-w-none dark:prose-invert">
		<h2>Angaben gemäß § 5 DDG</h2>
		<p>
			Alexander Weir<br />
			Bismarckstraße 177<br />
			52066 Aachen<br />
			Deutschland
		</p>

		<h2>Kontakt</h2>
		<p>
			Telefon: <a href="tel:+31680057194">+31 680 057194</a><br />
			E-Mail: <a href="mailto:sashasalzweir@gmail.com">sashasalzweir@gmail.com</a>
		</p>

		<h2>Umsatzsteuer</h2>
		<p>
			Gemäß § 19 Abs. 1 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet und daher
			auch keine Umsatzsteuer-Identifikationsnummer nach § 27a UStG ausgewiesen.
		</p>

		<h2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h2>
		<p>
			Alexander Weir<br />
			Bismarckstraße 177<br />
			52066 Aachen
		</p>

		<h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
		<p>
			Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
			Verbraucherschlichtungsstelle teilzunehmen.
		</p>

		<h2>Haftung für Inhalte</h2>
		<p>
			Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
			den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
			jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
			oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
			Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
			allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab
			dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
			entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
		</p>

		<h2>Haftung für Links</h2>
		<p>
			Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
			Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für
			die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
			verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
			Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
			erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
			konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
			Rechtsverletzungen werden wir derartige Links umgehend entfernen.
		</p>

		<h2>Urheberrecht</h2>
		<p>
			Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
			deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
			Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
			jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
			privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht
			vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
			Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
			Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
			Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
		</p>
	</div>
</BlurFade>
