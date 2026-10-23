export const lessons = [
  {
    id: 'html-scheletro', level: 1, number: '01', title: 'La struttura prima della decorazione', duration: '12 min',
    summary: 'Impara a riconoscere il ruolo di HTML: dare una struttura comprensibile ai contenuti.',
    concept: 'HTML è la struttura della pagina. Un browser legge elementi come header, main, section e footer per capire che cosa rappresentano le diverse parti. Prima scrivi il contenuto e i titoli; dopo penserai ai colori. Ogni pagina dovrebbe avere un titolo principale h1 chiaro e sezioni con titoli ordinati.',
    exampleTitle: 'Una pagina con una sola idea principale',
    example: '<header>\n  <p> Museo civico </p>\n</header>\n<main>\n  <h1>La sala delle ceramiche</h1>\n  <p>Scopri oggetti e storie del territorio.</p>\n  <section>\n    <h2>In evidenza</h2>\n    <p>Una selezione per iniziare la visita.</p>\n  </section>\n</main>\n<footer>Informazioni per la visita</footer>',
    steps: ['Crea un file index.html e inserisci la struttura base.', 'Aggiungi un solo h1 che spiega il tema della pagina.', 'Dividi i contenuti in section con un titolo h2 ciascuna.', 'Leggi la pagina dall’inizio alla fine: l’ordine ha senso senza CSS?'],
    challenge: 'Crea la homepage di un piccolo museo: nome del museo, una presentazione di due frasi e una sezione “Da non perdere”.',
    check: 'Ho usato una struttura HTML leggibile e una gerarchia di titoli coerente.'
  },
  {
    id: 'html-link-immagini', level: 1, number: '02', title: 'Link, immagini e descrizioni utili', duration: '10 min',
    summary: 'Fai navigare le persone e descrivi le immagini anche a chi non può vederle.',
    concept: 'Un link deve dire dove porta, non soltanto “clicca qui”. Per le immagini informative, l’attributo alt spiega che cosa mostrano. Se l’immagine è puramente decorativa, alt può essere vuoto. Tieni le informazioni importanti nel testo, non soltanto dentro un’immagine.',
    exampleTitle: 'Un’immagine che si capisce anche senza vederla',
    example: '<a href="#orari">Consulta orari e biglietti</a>\n<img src="vaso.jpg" alt="Vaso in ceramica decorato con motivi blu, esposto nella sala 2">\n<nav aria-label="Sezioni del museo">\n  <a href="#collezione">Collezione</a>\n  <a href="#visita">Organizza la visita</a>\n</nav>',
    steps: ['Aggiungi un collegamento al punto della pagina con le informazioni di visita.', 'Scrivi un testo alternativo concreto, come se descrivessi l’immagine a voce.', 'Usa un’etichetta che anticipa la destinazione del link.', 'Controlla che i link si distinguano dal testo circostante.'],
    challenge: 'Inserisci quattro schede di opere, ciascuna con titolo, immagine e testo alternativo significativo.',
    check: 'I link sono chiari e le immagini informative hanno un testo alternativo sensato.'
  },
  {
    id: 'css-stile', level: 2, number: '03', title: 'Dare forma con CSS', duration: '14 min',
    summary: 'Usa selettori, colori, spaziatura e dimensioni per rendere chiara una pagina.',
    concept: 'CSS descrive l’aspetto. Un selettore sceglie quali elementi modificare; le proprietà decidono come appaiono. Inizia dalla leggibilità: contrasto, spazio tra i blocchi e misure comode da leggere. Le classi permettono di applicare lo stesso stile a più componenti.',
    exampleTitle: 'Una scheda essenziale',
    example: '.card {\n  background: #fffdf8;\n  border: 1px solid #ded8ca;\n  border-radius: 12px;\n  padding: 1.25rem;\n}\n.card h2 { color: #203652; }\n.card p { line-height: 1.6; }',
    steps: ['Collega un file styles.css al tuo HTML.', 'Crea una classe card e applicala a una scheda.', 'Aggiungi spazio interno con padding e spazio esterno con margin.', 'Verifica che testo e sfondo abbiano un contrasto leggibile.'],
    challenge: 'Disegna con CSS una scheda “Punto di interesse” con titolo, descrizione e un link secondario.',
    check: 'Il CSS migliora la gerarchia senza nascondere contenuti o azioni.'
  },
  {
    id: 'flexbox-layout', level: 2, number: '04', title: 'Organizzare le pagine con Flexbox', duration: '15 min',
    summary: 'Metti gli elementi in riga o in colonna e crea una pagina che si adatta allo schermo.',
    concept: 'Flexbox organizza gli elementi di un contenitore lungo una direzione. display:flex attiva il layout; gap crea distanza; flex-wrap permette di andare a capo. Non fissare la pagina a una sola larghezza: usa max-width e spazio fluido.',
    exampleTitle: 'Due colonne che possono andare a capo',
    example: '.intro {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n  flex-wrap: wrap;\n}\n.intro > * { flex: 1 1 16rem; }\n.contenitore { width: min(100% - 2rem, 72rem); margin-inline: auto; }',
    steps: ['Raggruppa testo e immagine in un contenitore.', 'Aggiungi display:flex e gap al contenitore.', 'Permetti agli elementi di andare a capo quando lo spazio è stretto.', 'Prova l’anteprima a larghezza ridotta e controlla che nulla esca dallo schermo.'],
    challenge: 'Imposta il layout di una pagina blog: titolo e menu, articolo con immagine, footer a più sezioni.',
    check: 'La pagina rimane utilizzabile sia su desktop sia su smartphone.'
  },
  {
    id: 'css-responsive', level: 2, number: '05', title: 'Pensare prima al telefono', duration: '12 min',
    summary: 'Applica un layout mobile-first e verifica che pulsanti, testi e schede restino comodi.',
    concept: 'Responsive significa che la stessa interfaccia si adatta a finestre di dimensioni diverse. Parti da una colonna, poi aggiungi colonne quando c’è spazio. Una media query applica regole solo oltre o sotto una larghezza. Le dimensioni relative sono spesso più flessibili dei pixel fissi.',
    exampleTitle: 'Una colonna piccola, due quando c’è spazio',
    example: '.cards { display: grid; grid-template-columns: 1fr; gap: 1rem; }\n@media (min-width: 42rem) {\n  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\nimg { max-width: 100%; height: auto; }',
    steps: ['Controlla la pagina su uno schermo stretto.', 'Parti da una colonna e rendi immagini e campi fluidi.', 'Aggiungi una media query soltanto quando serve più spazio.', 'Controlla che i pulsanti siano facili da toccare e che i testi non siano troppo piccoli.'],
    challenge: 'Adatta la griglia dei punti di interesse a telefono, tablet e desktop senza duplicare i contenuti.',
    check: 'Il layout non richiede scorrimento orizzontale sullo smartphone.'
  },
  {
    id: 'js-primo-passo', level: 3, number: '06', title: 'JavaScript: una cosa succede dopo un’azione', duration: '14 min',
    summary: 'Collega una scelta dell’utente a un risultato usando eventi e funzioni.',
    concept: 'JavaScript aggiunge comportamenti alla pagina. Un evento descrive un’azione, per esempio un clic. Una funzione contiene passi da svolgere. Un pulsante con type="button" può aprire un dettaglio o aggiornare una parte della pagina senza inviare un form.',
    exampleTitle: 'Mostra un’informazione su richiesta',
    example: 'const pulsante = document.querySelector("#mostra");\nconst risultato = document.querySelector("#risultato");\npulsante.addEventListener("click", () => {\n  risultato.textContent = "La visita dura circa 45 minuti.";\n});',
    steps: ['Aggiungi un pulsante con un id riconoscibile.', 'Selezionalo in JavaScript usando document.querySelector.', 'Ascolta l’evento click con addEventListener.', 'Aggiorna un elemento della pagina con un messaggio comprensibile.'],
    challenge: 'Aggiungi un pulsante “Mostra orari” che visualizza gli orari di apertura.',
    check: 'La pagina comunica il risultato dell’azione e non solo che il codice è stato eseguito.'
  },
  {
    id: 'array-filtri', level: 3, number: '07', title: 'Elencare e filtrare contenuti', duration: '16 min',
    summary: 'Organizza più punti di interesse in un array e trova quelli che corrispondono alla ricerca.',
    concept: 'Un array contiene una lista ordinata di valori. Ogni oggetto può descrivere un punto con campi come titolo e categoria. filter crea un nuovo elenco che include solo gli elementi che superano una condizione. Non modificare l’elenco originale quando ti serve mantenere tutti i dati.',
    exampleTitle: 'Cerca una categoria dentro una lista',
    example: 'const luoghi = [\n  { nome: "Cappella", categoria: "arte" },\n  { nome: "Giardino", categoria: "natura" }\n];\nconst scelti = luoghi.filter(luogo => luogo.categoria === "arte");\nconsole.log(scelti);',
    steps: ['Crea almeno tre oggetti con gli stessi campi.', 'Mostra il titolo e la categoria di ciascun oggetto.', 'Aggiungi un campo di ricerca o un filtro categoria.', 'Prova una parola che non esiste e mostra un messaggio “nessun risultato”.'],
    challenge: 'Costruisci una ricerca per nome o categoria dei punti di interesse di una pagina Scopri.',
    check: 'Ricerca e filtri aggiornano l’elenco e spiegano quando non ci sono risultati.'
  },
  {
    id: 'form-dati', level: 3, number: '08', title: 'Form, dati e calcoli controllabili', duration: '15 min',
    summary: 'Raccogli dati da un form, controlla gli input e mostra il calcolo in modo trasparente.',
    concept: 'Un form raccoglie valori. Gli attributi required, min e type offrono controlli semplici nel browser, ma una vera applicazione deve convalidare i dati anche sul server. Dopo aver letto i valori, controlla che siano validi e mostra una conferma leggibile. Le date vanno confrontate con attenzione ai giorni inclusivi.',
    exampleTitle: 'Calcolo semplice del costo',
    example: 'const giorni = Number(document.querySelector("#giorni").value);\nconst prezzo = Number(document.querySelector("#prezzo").value);\nif (giorni > 0 && prezzo >= 0) {\n  totale.textContent = `${giorni} × ${prezzo} € = ${giorni * prezzo} €`;\n}',
    steps: ['Aggiungi al form i campi che servono davvero.', 'Imposta un’etichetta collegata a ogni campo.', 'Controlla valori vuoti, date invertite e numeri negativi.', 'Mostra il totale e spiega come è stato calcolato.'],
    challenge: 'Riproduci la logica didattica della prenotazione del gommone: scegli un modello e calcola il totale dei giorni.',
    check: 'La simulazione spiega gli input usati e non presenta un prezzo senza dettagli.'
  },
  {
    id: 'json-modello', level: 4, number: '09', title: 'Dare una forma ai dati', duration: '16 min',
    summary: 'Progetta entità e relazioni prima di riempire le pagine di informazioni.',
    concept: 'Un modello dei dati descrive quali entità esistono e come si collegano. Un itinerario contiene tappe; ogni tappa può riferirsi a un luogo e a un numero d’ordine. Separare i dati dalla presentazione evita di ripetere le stesse informazioni e rende più semplice cambiare layout o contenuti.',
    exampleTitle: 'Una tappa collegata a un luogo',
    example: 'const itinerario = { id: 1, nome: "Centro storico", descrizione: "Un percorso a piedi" };\nconst luoghi = [{ id: 7, nome: "Torre civica", categoria: "monumento" }];\nconst tappe = [{ itinerarioId: 1, luogoId: 7, ordine: 1 }];',
    steps: ['Scrivi le entità principali in una lista.', 'Per ogni entità annota id e campi essenziali.', 'Disegna una relazione usando gli id anziché copiare tutti i dati.', 'Controlla se una tappa può cambiare posto senza cambiare l’identità del luogo.'],
    challenge: 'Progetta le entità LUOGO, ITINERARIO e TAPPA e aggiungi i campi richiesti dalla traccia.',
    check: 'Il modello dati distingue luogo, itinerario e ordinamento delle tappe.'
  },
  {
    id: 'fetch-api', level: 4, number: '10', title: 'Frontend, API e database', duration: '18 min',
    summary: 'Capisci come una pagina chiede e riceve dati da un servizio senza confondere i ruoli.',
    concept: 'Il frontend è ciò che l’utente vede e usa. Un’API è un punto di ingresso per chiedere o inviare dati; un server li controlla e può salvarli in un database. fetch avvia una richiesta dal browser. Una risposta JSON descrive dati, non l’aspetto della pagina. Una chiave o una password segreta non va inserita nel JavaScript pubblico.',
    exampleTitle: 'Il flusso in tre passaggi',
    example: '// 1. Il browser chiede i contenuti\nconst risposta = await fetch("/api/luoghi");\n// 2. Il server restituisce JSON\nconst luoghi = await risposta.json();\n// 3. Il frontend trasforma i dati in schede\nmostraLuoghi(luoghi);',
    steps: ['Disegna le frecce browser → API → database.', 'Distingui dati di risposta e markup della pagina.', 'Pensa a uno stato di caricamento e a un messaggio di errore.', 'Indica quali controlli devono avvenire sul server.'],
    challenge: 'Spiega come il gestionale utenti o audioguide carica, crea e aggiorna un record passando dal controller.',
    check: 'Sai distinguere codice client, controller/API, modello e database.'
  },
  {
    id: 'accessibilita-sicurezza', level: 4, number: '11', title: 'Accessibilità e sicurezza sono progetto', duration: '17 min',
    summary: 'Integra queste scelte mentre costruisci, non come correzioni dell’ultimo minuto.',
    concept: 'Usare HTML semantico, etichette, contrasto leggibile, focus visibile e testo alternativo migliora l’accesso ai contenuti. In un’area amministrativa usa autenticazione e ruoli, convalida input, query parametrizzate e protezione dalle richieste malevole. Non fidarti dei soli controlli fatti dal browser: possono essere aggirati.',
    exampleTitle: 'Etichetta visibile e controllo dell’input',
    example: '<label for="titolo">Titolo dell’opera</label>\n<input id="titolo" name="titolo" required maxlength="120">\n<button type="submit">Salva la scheda</button>\n<!-- Sul server: verifica i permessi e valida di nuovo il valore. -->',
    steps: ['Naviga un form usando solo Tab e Invio.', 'Controlla se ogni campo ha un’etichetta descrittiva.', 'Elenca chi può leggere, aggiungere o cancellare contenuti.', 'Aggiungi tre misure di sicurezza e indica quale rischio riducono.'],
    challenge: 'Rendi accessibile una scheda e proponi tre protezioni per un pannello di gestione museale.',
    check: 'Le scelte sono esplicite per accessibilità, permessi, dati in ingresso e operazioni admin.'
  },
  {
    id: 'media-ai-analisi', level: 4, number: '12', title: 'Multimedia, AI e dati di visita', duration: '16 min',
    summary: 'Scegli una funzione digitale perché aiuta il visitatore, non per aggiungere tecnologia a caso.',
    concept: 'Immagini, audio e video servono obiettivi diversi. Un QR code apre una scheda dal luogo; beacon o NFC possono avviare un contenuto vicino a un oggetto. Una funzione AI ha un flusso input → elaborazione → output e richiede verifiche su fonti, accuratezza e privacy. Le statistiche sono utili se una decisione può dipendere da esse.',
    exampleTitle: 'Una funzione AI descritta bene',
    example: 'Input: lingua scelta e ID dell’opera.\nElaborazione: recupera una descrizione approvata e la semplifica.\nOutput: sintesi accessibile, con collegamento alla scheda completa.\nControllo: conserva la fonte e permette una revisione umana.',
    steps: ['Scrivi un bisogno del visitatore prima di scegliere il media.', 'Per una proposta AI descrivi input, elaborazione e output.', 'Elenca tre indicatori utili e la decisione che supportano.', 'Annota un rischio e una misura concreta per ridurlo.'],
    challenge: 'Progetta un’audioguida o suggerimento intelligente e spiega come valuteresti se è utile.',
    check: 'La soluzione collega una tecnologia a un bisogno e a una verifica concreta.'
  }
];

export const courseProjects = [
  {
    id: 'blog', number: '01', title: 'Pagina articolo con header e footer', level: 'Fondamenta', tech: 'HTML · CSS · Flexbox',
    summary: 'Pagina statica che riproduce la struttura di un blog, con header e menu, contenuto a due colonne e footer multi-sezione.',
    details: [
      'Contenitore centrale con larghezza massima per mantenere il testo leggibile.',
      'Header con logo, titolo e menu distribuiti con Flexbox.',
      'Area articolo con testo e immagine affiancati, seguita da un paragrafo a larghezza intera.',
      'Footer con sezioni di contatto, menu e collegamenti utili.',
      'Stili condivisi per bordi e link: colori, hover e contrasto del footer.'
    ],
    learn: ['Struttura HTML', 'Navigazione con link', 'Flexbox e spaziatura', 'Layout responsive e contenuti']
  },
  {
    id: 'gommone', number: '02', title: 'Prenotazione gommone', level: 'Interattività', tech: 'PHP · Form · Date',
    summary: 'Sistema con modulo di richiesta e pagina riepilogativa che calcola il prezzo in base ai giorni e al tipo di gommone.',
    details: [
      'Dati statici in array associativi: modelli disponibili e prezzo giornaliero.',
      'Form con contatti, passeggeri, scelta del mezzo e date del noleggio.',
      'Invio dei valori con metodo POST alla pagina che elabora la prenotazione.',
      'Differenza fra date e moltiplicazione per la tariffa; importo formattato in euro.',
      'La data finale è inclusa: dal giorno 1 al 3 il noleggio dura tre giorni.'
    ],
    learn: ['Form ed etichette', 'Array di dati', 'Validazione degli input', 'Funzioni di calcolo e riepilogo']
  },
  {
    id: 'utenti', number: '03', title: 'Gestionale utenti e classi con AJAX', level: 'Architettura', tech: 'PHP OOP · MySQL · fetch',
    summary: 'Gestionale di utenti, classi e valutazioni. Il frontend richiede dati in modo dinamico a un controller PHP.',
    details: [
      'Modelli Utente, Classe e Valutazione; una connessione al database condivisa.',
      'Controller unico che riceve action e dati JSON e restituisce una risposta JSON.',
      'Tabelle aggiornate con AJAX/fetch, moduli per creare e modificare record e messaggi di esito.',
      'Relazioni fra utente e classe, controllo dei posti disponibili e valutazioni associate.',
      'Le query e i permessi appartengono al backend: non esporre credenziali nel frontend.'
    ],
    learn: ['Modello dati relazionale', 'Ruoli di frontend e server', 'Richieste e risposte AJAX', 'Validazione e controlli di sicurezza']
  },
  {
    id: 'audioguide', number: '04', title: 'Gestionale audioguide', level: 'Multimedia', tech: 'PHP · MySQL · Upload · AJAX',
    summary: 'Pannello admin per creare e modificare audioguide con descrizione, file audio e immagine.',
    details: [
      'Modello Guide con nome, descrizione, percorso audio e immagine.',
      'Tabella amministrativa con azioni di recupero, modifica e cancellazione via API AJAX.',
      'Form con caricamento di file audio e immagini; le operazioni richiedono controlli lato server.',
      'Schema SQL del progetto con una tabella guides come fonte dati.',
      'Nota di lettura del progetto: le classi per utenti e classi sono codice residuo non collegato allo schema; riconoscerlo è un utile esercizio di coerenza.'
    ],
    learn: ['Catalogo multimediale', 'CRUD e modello dati', 'Upload e validazione', 'Revisione critica di un progetto']
  }
];

export const traces = [
  {
    id: 'portale', number: '01', title: 'Portale web per un bene culturale', focus: 'Comunicazione digitale · UX · accessibilità',
    scenario: 'Un Comune vuole valorizzare una chiesa, un museo o un sito archeologico con una piattaforma consultabile da desktop e smartphone. Il visitatore deve conoscere il bene, esplorare i punti di interesse e trovare le informazioni utili alla visita.',
    material: ['Quattro immagini del bene e dei punti di interesse.', 'Testi descrittivi e informazioni storiche.', 'Coordinate/localizzazione e informazioni pratiche.', 'Categorie e file dati JSON o CSV.'],
    groups: [
      { title: 'Homepage', items: ['Titolo e presentazione del bene.', 'Immagine principale.', 'Menu di navigazione chiaro e coerente.'] },
      { title: 'Pagina “Scopri”', items: ['Elenco o card di almeno 4 punti di interesse.', 'Ogni punto mostra immagine, titolo e breve descrizione.', 'Ricerca o filtro dei contenuti per categoria o parola chiave.'] },
      { title: 'Scheda di dettaglio', items: ['Descrizione completa del punto di interesse.', 'Una o più immagini.', 'Eventuale contenuto audio o video.', 'Indirizzo, orari, accessibilità e contatti.'] },
      { title: 'Responsive, UX e accessibilità', items: ['Uso corretto anche da smartphone e adattamento a più dimensioni.', 'Testi leggibili e gerarchia corretta dei titoli.', 'Testo alternativo significativo per le immagini.', 'Navigazione comprensibile e leggibilità di pulsanti, link e contenuti.'] },
      { title: 'Relazione tecnica', items: ['Organizzazione generale del sito e tecnologie utilizzate.', 'Scelte di UX e accessibilità.', 'Modalità di organizzazione e gestione dei dati.'] }
    ],
    oral: [0, 1, 2],
    variants: ['Un museo con sale accessibili e visite a turni.', 'Un sito archeologico con reperti esposti all’aperto.', 'Una chiesa con opere da esplorare e orari stagionali.']
  },
  {
    id: 'itinerario', number: '02', title: 'Itinerario culturale interattivo', focus: 'Web/mobile · geolocalizzazione · IoT · territorio',
    scenario: 'Un territorio promuove un itinerario culturale di cinque luoghi. Il visitatore lo pianifica e lo segue su una piattaforma web utilizzabile anche sul posto da smartphone.',
    material: ['Schede descrittive di cinque luoghi.', 'Immagini, coordinate o indirizzi.', 'Distanza, durata o ordine consigliato.', 'Dataset JSON o CSV.'],
    groups: [
      { title: 'Pagina iniziale', items: ['Titolo, breve descrizione e immagine rappresentativa.', 'Numero delle tappe e durata indicativa.'] },
      { title: 'Itinerario e tappe', items: ['Visualizzazione delle cinque tappe nell’ordine di visita.', 'Nome, immagine e breve descrizione per ogni tappa.', 'Indicazioni sulla distanza o sul raggiungimento.', 'Mappa oppure schema visuale dell’itinerario.'] },
      { title: 'Scheda e funzione interattiva', items: ['Informazioni storiche/culturali, galleria, media e informazioni pratiche.', 'Implementa almeno una funzione: filtro, ricerca, preferiti, “Visitato”, itinerario personalizzato, geolocalizzazione simulata o QR code/link.'] },
      { title: 'Modello dei dati', items: ['Prevedi le entità LUOGO, ITINERARIO e TAPPA.', 'LUOGO: almeno id, nome, descrizione, coordinate, categoria e immagine.', 'ITINERARIO: almeno id, nome e descrizione.', 'TAPPA: itinerario, luogo e ordine.'] },
      { title: 'Relazione tecnica', items: ['Destinatari e struttura di navigazione.', 'Modalità di gestione dei dati e possibili sviluppi futuri.'] }
    ],
    oral: [3, 4, 5],
    variants: ['Progetta un itinerario di botteghe storiche nel centro.', 'Crea un percorso fra cinque siti archeologici di una valle.', 'Organizza un percorso accessibile tra musei e monumenti.']
  },
  {
    id: 'museo', number: '03', title: 'Piattaforma intelligente per un museo', focus: 'Catalogazione · personalizzazione · AI · multimedia · sicurezza',
    scenario: 'Un piccolo museo rinnova la propria presenza digitale con un archivio di opere e reperti da esplorare in modo multimediale e progressivamente personalizzato.',
    material: ['Almeno sei opere o reperti appartenenti ad almeno due categorie.', 'Immagini delle opere.', 'Titolo, autore/provenienza, datazione, categoria e descrizione.', 'Un file audio o video di esempio.'],
    groups: [
      { title: 'Catalogo e scheda', items: ['Visualizza almeno sei opere/reperti in almeno due categorie.', 'Per ogni elemento: titolo, autore/provenienza, datazione, categoria, immagine e breve descrizione.', 'Almeno un filtro per categoria o caratteristica.', 'Scheda con immagine principale, informazioni storiche, descrizione estesa, eventuale audio/video e opere correlate.'] },
      { title: 'Personalizzazione e AI', items: ['Suggerimenti “Ti potrebbe interessare anche...” motivati per categoria, epoca, autore, provenienza o tipologia.', 'Descrivi una possibile AI futura (chatbot, sintesi, traduzione, semplificazione, audioguida personalizzata o suggerimento di percorsi) con flusso input → elaborazione → output. Non è richiesta vera AI.'] },
      { title: 'Sicurezza e relazione', items: ['Descrivi almeno tre misure di sicurezza per un’area di amministrazione.', 'Relazione su architettura, dati, criteri dei suggerimenti, multimedia, sicurezza e sviluppi AI.'] }
    ],
    oral: [6, 7, 8],
    variants: ['Personalizza una collezione di ceramiche con audioguide brevi.', 'Suggerisci opere correlate in base a epoca e provenienza.', 'Semplifica testi museali per famiglie e visitatori internazionali.']
  }
];

export const oralQuestions = [
  { id: 0, trace: 'Portale culturale', topic: 'UX e accessibilità', question: 'Quali caratteristiche dovrebbe avere un’interfaccia destinata alla fruizione di un bene culturale per essere accessibile anche a utenti con diverse esigenze?', guide: ['Usa HTML semantico e una gerarchia dei titoli coerente.', 'Descrivi navigazione da tastiera, focus, contrasto, dimensione del testo e alternative testuali.', 'Considera utenti con esigenze visive, motorie, cognitive e diverse modalità di fruizione.', 'Spiega come verificheresti l’accessibilità, non solo quali accorgimenti aggiungeresti.'] },
  { id: 1, trace: 'Portale culturale', topic: 'Database e contenuti', question: 'Come organizzeresti in un database le informazioni relative a beni culturali, punti di interesse, immagini, categorie e contenuti multimediali?', guide: ['Distingui bene culturale, punto di interesse, categoria e media.', 'Assegna id alle entità e usa relazioni o tabelle di collegamento dove necessario.', 'Indica quali campi salvare e perché la relazione riduce duplicazioni.', 'Spiega come il frontend trova i contenuti.'] },
  { id: 2, trace: 'Portale culturale', topic: 'Comunicazione digitale', question: 'Quali strumenti di comunicazione e marketing digitale utilizzeresti per aumentare la visibilità della piattaforma e del bene culturale?', guide: ['Collega canale e pubblico: ricerca, social, newsletter, QR sul posto o partnership locali.', 'Cura contenuti, titolo e descrizione della pagina.', 'Indica un obiettivo misurabile e un dato utile.', 'Rispetta privacy e diritti delle immagini.'] },
  { id: 3, trace: 'Itinerario culturale', topic: 'Web/mobile', question: 'Quali differenze bisogna considerare progettando un’applicazione per un visitatore che la utilizza sul posto tramite smartphone rispetto a un normale sito desktop?', guide: ['Progetta per una mano, rete intermittente, luminosità e uso in movimento.', 'Rendi visibili posizione, prossima tappa, tempo e alternative senza sovraccaricare.', 'Spiega come chiedere il permesso prima di usare la geolocalizzazione.', 'Controlla testi, contrasti, pulsanti e mappa sullo schermo piccolo.'] },
  { id: 4, trace: 'Itinerario culturale', topic: 'IoT e sistemi interattivi', question: 'Come potrebbero essere utilizzati QR code, beacon Bluetooth, NFC o altri sistemi IoT per attivare automaticamente contenuti durante la visita?', guide: ['Descrivi dove si trova il tag o beacon e quale azione apre.', 'Fornisci un’alternativa manuale quando rete, sensore o permesso non sono disponibili.', 'Riduci raccolta e conservazione dei dati personali.', 'Indica come verificheresti l’affidabilità dei contenuti attivati.'] },
  { id: 5, trace: 'Itinerario culturale', topic: 'Statistica e analisi dati', question: 'Quali dati sull’utilizzo della piattaforma sarebbe utile raccogliere per capire il comportamento dei visitatori? Indicare almeno tre indicatori e spiegare a cosa potrebbero servire.', guide: ['Scegli almeno tre indicatori, per esempio schede aperte, tappe completate e ricerche senza risultato.', 'Collega ogni indicatore a una decisione concreta.', 'Evita di raccogliere dati personali non necessari.', 'Definisci un periodo e un denominatore per interpretare correttamente i valori.'] },
  { id: 6, trace: 'Piattaforma museo', topic: 'Intelligenza artificiale', question: 'In quali attività l’intelligenza artificiale può migliorare la valorizzazione e la fruizione di un patrimonio culturale? Quali sono però i principali rischi nell’utilizzarla?', guide: ['Dai un caso concreto come traduzione, sintesi o suggerimento personalizzato.', 'Descrivi input, elaborazione e output.', 'Valuta accuratezza storica, bias, privacy e attribuzione delle fonti.', 'Prevedi revisione umana e un’alternativa ai contenuti generati.'] },
  { id: 7, trace: 'Piattaforma museo', topic: 'Sicurezza informatica', question: 'Quali problemi di sicurezza possono presentarsi in una piattaforma web che consente agli operatori di inserire e modificare contenuti? Come possono essere mitigati?', guide: ['Parla di autenticazione, autorizzazioni per ruolo e protezione delle sessioni.', 'Convalida input e file sul server; proteggi output e richieste.', 'Usa query parametrizzate, backup e log delle modifiche.', 'Spiega come ridurre accessi non autorizzati e recuperare da un incidente.'] },
  { id: 8, trace: 'Piattaforma museo', topic: 'Progettazione multimediale', question: 'Quando è opportuno utilizzare testo, immagini, audio, video o ricostruzioni digitali nella comunicazione di un bene culturale? Quali criteri dovrebbero guidare la scelta?', guide: ['Parti dall’obiettivo informativo e dal contesto di visita.', 'Pesa tempi, accessibilità, connessione, diritti e costi di produzione.', 'Offri trascrizioni o descrizioni quando servono.', 'Distingui chiaramente documentazione, ricostruzione e interpretazione.'] }
];

export const rubric = [
  { id: 'funzionamento', label: 'Funzionamento della soluzione', points: 30, help: 'Il prototipo si apre e i flussi principali fanno ciò che promettono.' },
  { id: 'dati', label: 'Organizzazione e gestione dei dati', points: 15, help: 'I dati sono coerenti, comprensibili e organizzati.' },
  { id: 'ux', label: 'Interfaccia grafica e UX', points: 15, help: 'Le persone capiscono come trovare e usare i contenuti.' },
  { id: 'responsive', label: 'Responsive design e accessibilità', points: 10, help: 'La pagina si adatta ed è leggibile e navigabile.' },
  { id: 'codice', label: 'Qualità del codice e struttura', points: 10, help: 'La soluzione è ordinata e le scelte sono motivate.' },
  { id: 'cultura', label: 'Valorizzazione culturale', points: 10, help: 'I contenuti mettono in valore il patrimonio e il territorio.' },
  { id: 'relazione', label: 'Relazione tecnica e motivazioni', points: 10, help: 'La relazione spiega architettura, dati e scelte.' }
];

export const examPhases = [
  { id: 'sviluppo', label: 'Progettazione e sviluppo', minutes: 95, note: 'Tempo consigliato: 90–100 minuti.' },
  { id: 'relazione', label: 'Relazione e verifica finale', minutes: 25, note: 'Tempo consigliato: 20–30 minuti.' }
];
