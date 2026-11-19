<script lang="ts">
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	const BLUR_FADE_DELAY = 0.04;
</script>

<svelte:head>
	<title>Datenschutzerklärung</title>
	<meta name="description" content="Datenschutzerklärung gemäß DSGVO" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<BlurFade delay={BLUR_FADE_DELAY}>
	<h1 class="mb-8 text-2xl font-medium tracking-tighter">Datenschutzerklärung</h1>
</BlurFade>

<BlurFade delay={BLUR_FADE_DELAY * 2}>
	<div class="prose prose-sm max-w-none dark:prose-invert">
		<h2>1. Verantwortlicher</h2>
		<p>
			Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler
			Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
		</p>
		<p>
			Alexander Weir<br />
			Bismarckstraße 177<br />
			52066 Aachen<br />
			Deutschland<br />
			Telefon: <a href="tel:+31680057194">+31 680 057194</a><br />
			E-Mail: <a href="mailto:sashasalzweir@gmail.com">sashasalzweir@gmail.com</a>
		</p>

		<h2>2. Allgemeine Hinweise</h2>
		<p>
			Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre
			Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TDDDG). In dieser
			Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im
			Rahmen dieser Website.
		</p>

		<h2>3. Hosting</h2>
		<p>
			Diese Website wird bei einem externen Dienstleister gehostet (Auftragsverarbeiter). Die
			personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des
			Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und
			Kommunikationsdaten sowie sonstige Daten handeln, die über eine Website generiert werden.
		</p>
		<p>Anbieter ist:</p>
		<p>
			IONOS SE<br />
			Elgendorfer Straße 57<br />
			56410 Montabaur<br />
			Deutschland
		</p>
		<p>
			Die Server befinden sich in Deutschland. Das Hosting erfolgt zum Zwecke der Vertragserfüllung
			gegenüber unseren potenziellen und bestehenden Interessenten sowie im Interesse einer
			sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen
			professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Wir haben mit dem Anbieter einen
			Vertrag über Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen, der die Einhaltung der
			datenschutzrechtlichen Vorgaben sicherstellt.
		</p>

		<h2>4. Server-Logfiles</h2>
		<p>
			Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
			Server-Logfiles, die Ihr Browser automatisch an uns übermittelt. Dies sind:
		</p>
		<ul>
			<li>Browsertyp und Browserversion</li>
			<li>verwendetes Betriebssystem</li>
			<li>Referrer URL</li>
			<li>Hostname des zugreifenden Rechners</li>
			<li>Uhrzeit der Serveranfrage</li>
			<li>IP-Adresse</li>
		</ul>
		<p>
			Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
			Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
			Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und
			der Optimierung sowie der Sicherheit seiner Website – hierzu müssen die Server-Logfiles
			erfasst werden. Die Logdaten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer
			Erhebung nicht mehr erforderlich sind, in der Regel nach spätestens 7 Tagen, sofern keine
			sicherheitsrelevanten Vorfälle eine längere Speicherung erfordern.
		</p>

		<h2>5. Webanalyse mit Umami (selbst gehostet)</h2>
		<p>
			Diese Website setzt zur statistischen Auswertung von Zugriffen die Open-Source-Webanalysesoftware
			Umami ein. Umami wird ausschließlich auf unserem eigenen Server betrieben (selbst gehostet). Es
			findet keine Übermittlung der erhobenen Daten an Dritte statt; sämtliche Daten verbleiben auf
			unserem Server und werden nicht an externe Dienstleister oder sonstige Empfänger weitergegeben.
		</p>
		<p>
			Umami ist datenschutzfreundlich konfiguriert: Bei der Nutzung werden keine Cookies gesetzt und
			keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen. Ein Einwilligungsbanner
			(Cookie-Banner) ist daher nicht erforderlich. Es findet weder ein Fingerprinting noch eine
			Erstellung von Nutzerprofilen statt.
		</p>
		<p>
			Im Rahmen der Webanalyse werden die folgenden Daten verarbeitet: aufgerufene Seiten
			(Seitenaufrufe), der Referrer (die zuvor besuchte Website), Browsertyp und Betriebssystem, der
			Gerätetyp sowie das Land des Zugriffs. Ihre IP-Adresse wird nicht vollständig gespeichert: Umami
			anonymisiert die IP-Adresse, indem es sie mit einem regelmäßig wechselnden Schlüssel (Salt)
			hasht. Dieser Hash dient ausschließlich der Zählung eindeutiger Besucher. Land und Stadt werden
			lediglich vorübergehend abgeleitet und nicht dauerhaft gespeichert oder einer Person zugeordnet.
			Eine Zusammenführung mit anderen Daten oder eine Zuordnung zu Ihrer Person findet nicht statt.
		</p>
		<p>
			Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
			Interesse liegt in der statistischen Auswertung der Nutzung unserer Website sowie in deren
			Optimierung und bedarfsgerechter Gestaltung. Da bei dem Einsatz von Umami keine Cookies gesetzt
			und keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, bedarf es insoweit
			keiner Einwilligung nach § 25 TDDDG.
		</p>
		<p>
			Die erhobenen Daten werden auf unserem eigenen Server so lange gespeichert, wie dies für die
			genannten statistischen Zwecke erforderlich ist.
		</p>
		<p>
			Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
			gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1
			lit. f DSGVO erfolgt, Widerspruch einzulegen (Art. 21 DSGVO). Näheres hierzu finden Sie unter
			Ziff. 12 (Widerspruchsrecht).
		</p>

		<h2>6. SSL- bzw. TLS-Verschlüsselung</h2>
		<p>
			Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
			eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass
			die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol
			in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
			die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
		</p>

		<h2>7. Schriftarten (lokal gehostet)</h2>
		<p>
			Diese Website verwendet zur einheitlichen Darstellung von Schriftarten die Schriftart „Inter“.
			Die Schriftart ist lokal auf unserem Server eingebunden und wird ausschließlich von dort
			geladen. Eine Verbindung zu Servern Dritter (z. B. Google Fonts) findet dabei nicht statt; es
			werden keine personenbezogenen Daten an Dritte übermittelt.
		</p>

		<h2>8. Lokaler Browserspeicher (localStorage)</h2>
		<p>
			Diese Website speichert Ihre Einstellung zum hellen bzw. dunklen Anzeigemodus („Theme“) im
			lokalen Speicher (localStorage) Ihres Browsers. Diese Information verbleibt ausschließlich auf
			Ihrem Endgerät und wird nicht an uns oder Dritte übertragen. Die Speicherung ist technisch
			erforderlich, um die von Ihnen gewünschte Funktion bereitzustellen (§ 25 Abs. 2 Nr. 2 TDDDG);
			eine Einwilligung ist hierfür nicht erforderlich. Sie können den lokalen Speicher jederzeit
			über die Einstellungen Ihres Browsers löschen.
		</p>

		<h2>9. Kontaktaufnahme per E-Mail</h2>
		<p>
			Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben inklusive der von Ihnen dort
			angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen
			bei uns gespeichert. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
			lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
			Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
			Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
			gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden gelöscht, sobald sie für
			die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen
			Aufbewahrungspflichten entgegenstehen.
		</p>

		<h2>10. Keine automatisierte Entscheidungsfindung</h2>
		<p>
			Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des Art. 22 DSGVO
			findet nicht statt.
		</p>

		<h2>11. Ihre Rechte als betroffene Person</h2>
		<p>Ihnen stehen hinsichtlich Ihrer personenbezogenen Daten folgende Rechte zu:</p>
		<ul>
			<li>Recht auf Auskunft (Art. 15 DSGVO)</li>
			<li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
			<li>Recht auf Löschung (Art. 17 DSGVO)</li>
			<li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
			<li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
			<li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
			<li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
		</ul>
		<p>
			Zur Ausübung dieser Rechte können Sie sich jederzeit unter den oben genannten Kontaktdaten an
			uns wenden.
		</p>

		<h2>12. Widerspruchsrecht (Art. 21 DSGVO)</h2>
		<p>
			Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6
			Abs. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, aus Gründen, die sich aus Ihrer
			besonderen Situation ergeben, jederzeit gegen diese Verarbeitung Widerspruch einzulegen. Wir
			verarbeiten die betroffenen personenbezogenen Daten dann nicht mehr, es sei denn, wir können
			zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte
			und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
			Verteidigung von Rechtsansprüchen.
		</p>

		<h2>13. Beschwerderecht bei der Aufsichtsbehörde</h2>
		<p>
			Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei einer
			Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts,
			Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Die für uns zuständige
			Aufsichtsbehörde ist:
		</p>
		<p>
			Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)<br />
			Kavalleriestraße 2–4<br />
			40213 Düsseldorf<br />
			Deutschland
		</p>

		<h2>14. Aktualität und Änderung dieser Datenschutzerklärung</h2>
		<p>
			Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website
			oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden,
			diese Datenschutzerklärung anzupassen.
		</p>
	</div>
</BlurFade>
