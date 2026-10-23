# CulturaLab — Palestra d’esame

CulturaLab è un sito statico in italiano per allenarsi alla prova pratica IFTS «Tecnologie per la valorizzazione dei beni culturali». Non usa account, backend, database o pacchetti esterni.

## Uso su PC

Apri la versione ospitata via HTTPS nel browser. Per installarla come applicazione, usa il menu del browser e scegli **Installa app** o **Aggiungi alla schermata Home**. Dopo la prima visita, le risorse principali vengono conservate dal service worker e sono disponibili offline. I progressi rimangono nel localStorage di quel browser e di quel dispositivo: non sono sincronizzati fra PC o browser e si perdono se si cancellano i dati del sito.

## Pubblicazione su GitHub Pages

Carica i file e le cartelle di questo progetto nella radice di un repository. In **Settings → Pages**, scegli il branch `main` e la cartella `/ (root)`, quindi salva. Dopo la pubblicazione apri l’URL HTTPS mostrato da GitHub. I percorsi relativi permettono l’uso anche nei repository di progetto. Per i siti di progetto, imposta `start_url` e `scope` del manifest come `./` (già configurati).

Per provare i file in locale, avvia un server statico nella cartella del progetto, ad esempio `python3 -m http.server 3000`, e apri `http://localhost:3000`. La modalità `file://` può mostrare i contenuti principali, ma non consente l’installazione PWA o l’uso del service worker.

## Funzioni incluse

- Percorso per principianti in quattro livelli e dodici missioni.
- Editor didattico HTML/CSS con anteprima isolata.
- Le quattro schede progetto didattiche e le tre tracce ufficiali.
- Simulazione a tempo di due ore, checklist e griglia ufficiale da 100 punti.
- Bozza guidata della relazione tecnica e nove domande per il colloquio.
- Progressi e bozze salvati localmente.

La simulazione HTML/CSS è didattica. Il sito non esegue PHP, MySQL, AI, geolocalizzazione reale o upload amministrativi: li presenta come concetti di studio perché è un’applicazione statica, senza server.
