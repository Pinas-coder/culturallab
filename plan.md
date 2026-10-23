# Piano — CulturaLab

## Obiettivo e ambito
CulturaLab è una palestra d’esame in italiano per chi parte senza esperienza e deve preparare la prova pratica IFTS «Tecnologie per la valorizzazione dei beni culturali». Il percorso combina fondamentali per principianti, attività guidate, studio dei progetti del corso, tre tracce ufficiali, relazione tecnica e preparazione orale. Le tre tracce sono trattate come prove di pari impostazione; cresce la difficoltà dell’allenamento, non si presume che una traccia ufficiale sia intrinsecamente più difficile delle altre.

Il prodotto sarà un sito statico installabile come PWA dal browser e utilizzabile su PC. Sarà compatibile con GitHub Pages, senza richiedere account, server applicativo o database. Stato, progressi e bozze restano sul dispositivo con localStorage. Il progetto non produrrà un eseguibile Windows nativo.

## Contenuti di riferimento
Il PDF fornito definisce le tre tracce:

1. **Portale web per un bene culturale**: home, almeno quattro punti di interesse, ricerca o filtri, scheda dettagliata, contenuti multimediali, informazioni pratiche, responsive design, accessibilità e relazione tecnica.
2. **Itinerario culturale interattivo**: cinque tappe ordinate, schema visuale/cartografico, schede, almeno una funzione interattiva, modello logico LUOGO/ITINERARIO/TAPPA e relazione.
3. **Piattaforma intelligente per un museo**: catalogo di almeno sei opere in almeno due categorie, filtri, schede, suggerimenti motivati, proposta di flusso AI, sicurezza per area admin e relazione tecnica.

Ogni traccia ha tre domande orali. La simulazione d’esame riprende il tempo minimo di due ore, la scansione consigliata di 90–100 minuti di sviluppo e 20–30 minuti per relazione/verifica, e la griglia ufficiale: funzionamento 30, dati 15, UX 15, responsive/accessibilità 10, codice 10, valorizzazione culturale 10, relazione e motivazioni 10.

I quattro elaborati presenti nella sezione Progetti del sito del corso saranno usati come casi didattici: pagina statica di blog con header/contenuto/footer e Flexbox; prenotazione del gommone con form, dati in array, POST e calcolo del prezzo in base a date e tariffa; gestionale utenti/classi/valutazioni con PHP OOP, MySQL e chiamate AJAX/fetch; gestionale audioguide con PHP/MySQL, pannello admin, upload audio/immagini e API AJAX. Le schede disponibili evidenziano anche codice residuo non collegato allo schema del progetto audioguide: può diventare un esercizio di lettura e controllo della coerenza dei dati.

## Percorso didattico
L’esperienza offre un ingresso «Parto da zero» e quattro livelli con spiegazioni, esempi leggibili, checklist e missioni brevi:

- **Livello 1 — Le fondamenta**: file e cartelle, HTML semantico, titoli, link, immagini e testo alternativo. Primo mini-sito a pagina singola.
- **Livello 2 — Dare forma alle pagine**: selettori CSS, spaziatura, Flexbox, griglie essenziali, gerarchia visiva e layout mobile. Esercizi ispirati al progetto blog.
- **Livello 3 — Rendere il sito interattivo**: JavaScript di base, form, eventi, ricerca/filtri, array e JSON; esercizio di prenotazione con calcolo controllabile.
- **Livello 4 — Costruire una soluzione completa**: schede dati, relazioni, fetch/API, database, multimedia, sicurezza e motivazione dell’uso di AI/IoT. Attività ispirate ai gestionali del corso.

Ogni livello include obiettivi, contenuto breve, esempio commentato, compito guidato e autovalutazione. Il laboratorio codice permette di modificare HTML/CSS e vedere il risultato in un’anteprima isolata, con suggerimenti a richiesta. Il controllo del codice è formativo e circoscritto alle attività dimostrabili nel browser; non simula un server PHP/MySQL reale.

## Allenamento e simulazioni
Le sezioni di pratica comprendono: catalogo dei progetti del corso; selettore delle tre tracce; missioni guidate che rimuovono progressivamente gli aiuti; generatore di varianti di traccia; simulazione a tempo di 120 minuti; timer per le fasi di sviluppo e relazione/verifica; checklist della consegna; autovalutazione con i sette pesi della griglia ufficiale; generatore assistito della relazione tecnica; carte per le nove domande orali ufficiali con spazio per appunti e indicazioni per strutturare una risposta.

La pratica offre micro-passi prima della consegna completa, feedback motivante e punti di ripartenza salvati. L’utente può scegliere una traccia specifica o farne estrarre una. Il timer può essere messo in pausa; il progresso e le bozze sono salvati localmente.

## Soluzione tecnica e struttura
Sito client-side in HTML, CSS e JavaScript modulari, senza framework, backend, chiamate AI, font remoti o dipendenze di build. Le route visibili possono essere navigazione interna all’app; `/` è l’unica pagina HTTP, e il file `manus-routes.json` alla radice dichiara questa route per `GET /manus-routes.json`. I dati didattici e i testi delle prove sono separati dalla logica dell’interfaccia. localStorage conserva stato, preferenze, avanzamento, appunti e bozze. Un iframe sandboxed mostra l’anteprima dell’esercizio, senza condividere l’origine dell’app. Un manifest Web App e un service worker consentono l’installazione PWA e servono prima le versioni aggiornate online, mantenendo una cache locale per il funzionamento offline.

Struttura prevista:

- `index.html`: punto d’ingresso, metadati, app shell e contenitori accessibili.
- `styles.css`: tokens grafici, layout responsive, componenti e stati interattivi.
- `js/app.js`: avvio app, navigazione, rendering, eventi, stato/progressi locali, editor e anteprima sandbox.
- `js/content.js`: lezioni, missioni, tracce, rubriche, progetti e domande orali.
- `manifest.webmanifest`, `sw.js`, `icons/`: installazione PWA e cache offline.
- `manus-routes.json`: manifesto delle route alla radice, con solo `/`.

La navigazione e gli esercizi funzionano come sito statico. Il codice d’esempio PHP e i concetti backend vengono illustrati, ma PHP, MySQL, upload amministrativi, geolocalizzazione reale e AI non vengono eseguiti sul servizio statico: restano temi didattici/simulati perché non è previsto un backend.

## Design
Tre ipotesi di direzione creativa, con probabilità campionate nella coda bassa: **Atlante editoriale da laboratorio** (0,07), **officina cartacea contemporanea** (0,04), **archivio digitale archeologico** (0,02). Si sceglie **Atlante editoriale da laboratorio**.

- **Movimento**: editoria scientifica contemporanea e quaderno da campo, con struttura da manuale leggibile e indicatori di avanzamento.
- **Principi**: leggibilità prima dell’ornamento; micro-obiettivi visibili; tono incoraggiante senza fingere che il codice sia facile; comandi e feedback sempre prevedibili.
- **Filosofia del colore**: fondo caldo da carta, inchiostro blu profondo per affidabilità e una tonalità rame/corallo come accento proprietario per evidenziare azioni e progressi, senza codificare l’esito solo col colore.
- **Layout**: una colonna di navigazione compatta affiancata da un’area principale editoriale; a larghezza ridotta si trasforma in navigazione semplificata, con schede non dense e azioni comode al tocco. Evitare griglie di dashboard tutte uguali.
- **Motivi distintivi**: numeri di missione stile taccuino; sottili linee di annotazione; timbri di avanzamento con icone/testo oltre al colore.
- **Interazioni**: mostrare per prima la prossima azione utile, tenere i suggerimenti secondari piegati ma scopribili, mantenere visibile l’avanzamento; gli stati “completato” sono reversibili.
- **Animazione**: microtransizioni brevi (circa 140–220 ms) su avanzamento e apertura delle schede, senza animazioni decorative continue; rispettare `prefers-reduced-motion`.
- **Tipografia**: `Inter` o font sans-serif di sistema per testi e controlli; `IBM Plex Mono` o monospace di sistema soltanto per frammenti di codice; titoli compatti con gerarchia chiara e corpo almeno 16 px.
- **Essenza**: una palestra d’esame che traduce richieste complesse in passi affrontabili per principianti; personalità paziente, precisa, concreta.
- **Voce**: istruzioni dirette, brevi e gentili. Esempi: «Prima scegli il contenuto. Poi gli dai una struttura.»; «Se ti blocchi, chiedi un indizio: il passo successivo è più piccolo di quanto sembri.»
- **Marchio**: wordmark CulturaLab accostato a un segno originale di tre linee a gradini che formano una piccola C/scala di apprendimento, realizzabile in SVG/CSS senza immagini decorative.
- **Colore proprietario**: rame corallo, affiancato da navy-inchiostro e avorio caldo.

## Dipendenze e modalità di esecuzione
Nessun pacchetto esterno o API. In anteprima si serve la cartella del progetto sulla porta già configurata a 3000. Per l’uso pubblico, la struttura è pubblicabile su hosting statico/GitHub Pages; la PWA si installa da un’origine HTTPS o localhost. Non collego un repository GitHub né pubblico un sito senza una richiesta/autorizzazione specifica. L’utente può comunque usare la build sul PC da browser; non viene consegnato un `.exe`.
