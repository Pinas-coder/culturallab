import { lessons, courseProjects, traces, oralQuestions, rubric, examPhases } from './content.js';

const STORAGE_KEY = 'culturalab-progress-v1';
const EXAM_SECONDS = 120 * 60;
const DEFAULT_HTML = `<section class="visit-intro">
  <p class="kicker">ITINERARIO CULTURALE · EMILIA</p>
  <h1>Un territorio, molte storie.</h1>
  <p>Segui le tracce di chi ha vissuto, creato e attraversato questi luoghi.</p>
  <a class="button" href="#tappe">Esplora le tappe <span aria-hidden="true">→</span></a>
</section>
<section class="stops" id="tappe">
  <article class="stop">
    <span class="number">01</span>
    <h2>La torre civica</h2>
    <p>Il profilo della città racconta una storia fatta di pietra e passaggi.</p>
    <a href="#scheda">Apri la scheda →</a>
  </article>
  <article class="stop">
    <span class="number">02</span>
    <h2>Il museo del borgo</h2>
    <p>Oggetti quotidiani danno forma alla memoria della comunità.</p>
    <a href="#museo">Apri la scheda →</a>
  </article>
</section>`;
const DEFAULT_CSS = `* { box-sizing: border-box; }
body { margin: 0; padding: 28px; font: 16px/1.55 system-ui, sans-serif; color: #21364a; background: #f8f6ef; }
.visit-intro { padding: 26px; border-radius: 16px; background: #e9e1d3; }
.kicker, .number { color: #a44e38; font-size: 11px; letter-spacing: .12em; }
h1 { font-size: clamp(30px, 7vw, 48px); line-height: 1.05; max-width: 540px; }
.button { display: inline-block; padding: 10px 14px; border-radius: 7px; background: #21364a; color: white; text-decoration: none; }
.stops { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 16px; }
.stop { flex: 1 1 230px; padding: 19px; border: 1px solid #d8cfbf; border-radius: 13px; background: white; }
.stop a { color: #a44e38; }`;

const viewLabels = {
  home: 'Panoramica', journey: 'Percorso guidato', lab: 'Laboratorio', traces: 'Tracce d’esame',
  exam: 'Simulazione', oral: 'Colloquio orale', projects: 'Progetti del corso', report: 'Relazione tecnica', lesson: 'Missione guidata'
};
const levelDescriptions = [
  'Impara la struttura delle pagine e i nomi delle cose. Nessuna esperienza necessaria.',
  'Rendi i contenuti chiari, ordinati e comodi anche sul telefono.',
  'Aggiungi ricerca, moduli, filtri e piccoli calcoli controllabili.',
  'Collega i dati, ragiona su API e sicurezza, poi motiva ogni scelta.'
];
const quizBank = {
  'html-scheletro': { q: 'Qual è il passo più utile prima di scegliere colori e animazioni?', options: ['Organizzare i contenuti con una gerarchia chiara', 'Aggiungere ombre a tutte le immagini', 'Creare cinque menu diversi'], answer: 0, why: 'Prima struttura e contenuti; dopo l’aspetto visivo.' },
  'html-link-immagini': { q: 'Che cosa dovrebbe dire il link “clicca qui”?', options: ['Nulla: è sufficiente il colore', 'La destinazione o l’azione che lo aspetta', 'Solo il nome del file'], answer: 1, why: 'Il testo del collegamento deve spiegare dove porta.' },
  'css-stile': { q: 'Quale proprietà crea spazio all’interno del bordo di una scheda?', options: ['padding', 'href', 'alt'], answer: 0, why: 'padding crea spazio interno; margin crea spazio esterno.' },
  'flexbox-layout': { q: 'A che cosa serve flex-wrap: wrap?', options: ['A trasformare testo in immagine', 'A consentire agli elementi di andare a capo', 'A rendere il link sicuro'], answer: 1, why: 'Gli elementi possono andare sulla riga successiva quando manca spazio.' },
  'css-responsive': { q: 'Da quale base conviene partire per un layout mobile-first?', options: ['Una colonna leggibile, poi si amplia', 'Tre colonne fisse su ogni dispositivo', 'Una larghezza rigida da 1200px'], answer: 0, why: 'Partire da una colonna riduce gli incastri sui piccoli schermi.' },
  'js-primo-passo': { q: 'Quale passaggio collega un pulsante a una risposta?', options: ['Aggiungere un listener all’evento click', 'Cambiare il nome del file', 'Aggiungere un alt al pulsante'], answer: 0, why: 'addEventListener ascolta un evento e avvia la funzione associata.' },
  'array-filtri': { q: 'Che cosa restituisce filter quando seleziona le opere d’arte?', options: ['Un nuovo elenco che supera la condizione', 'La password del database', 'Un’immagine già compressa'], answer: 0, why: 'filter costruisce un nuovo array con gli elementi che corrispondono.' },
  'form-dati': { q: 'Dove vanno ripetuti i controlli importanti per una vera applicazione?', options: ['Solo nel colore del pulsante', 'Anche sul server', 'Solo nel titolo della pagina'], answer: 1, why: 'I controlli del browser migliorano l’uso ma possono essere aggirati.' },
  'json-modello': { q: 'Come colleghi una tappa a un luogo senza copiare tutti i suoi dati?', options: ['Usando l’id del luogo', 'Duplicando tutte le immagini', 'Eliminando l’itinerario'], answer: 0, why: 'Una relazione con id riduce duplicazioni e ambiguità.' },
  'fetch-api': { q: 'Dove non devi inserire una password del database?', options: ['Nel codice JavaScript pubblico', 'Nel secret store del server', 'In una configurazione privata lato server'], answer: 0, why: 'Chiunque può leggere il codice del browser: le credenziali non vanno esposte.' },
  'accessibilita-sicurezza': { q: 'Quale controllo non deve limitarsi al browser?', options: ['Etichetta visibile di un campo', 'Validazione e permessi delle operazioni admin', 'Colore di una linea decorativa'], answer: 1, why: 'I controlli sensibili vanno applicati dal server, che è fidato.' },
  'media-ai-analisi': { q: 'Che cosa rende comprensibile una funzione AI progettata per il museo?', options: ['Solo dire “usa l’AI”', 'Descrivere input, elaborazione e output', 'Nascondere da dove arrivano i contenuti'], answer: 1, why: 'Il flusso chiarisce che cosa entra, cosa fa il sistema e che cosa riceve il visitatore.' }
};

function emptyState() {
  return {
    version: 1,
    lessons: {}, lessonSteps: {}, quizzes: {},
    traceChecks: {}, selectedTrace: 'portale', traceVariants: {},
    exploredProjects: {}, oralNotes: {}, oralReady: {},
    reports: {}, scores: {}, examChecks: {},
    lab: { html: DEFAULT_HTML, css: DEFAULT_CSS },
    exam: { traceId: 'portale', remaining: EXAM_SECONDS, lastTick: null, running: false, completed: false },
    touchedAt: null
  };
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function validTraceId(id) {
  return traces.some(trace => trace.id === id);
}
function normalizeState(saved) {
  const base = emptyState();
  if (!isObject(saved) || saved.version !== base.version) return base;
  const exam = isObject(saved.exam) ? saved.exam : {};
  const lab = isObject(saved.lab) ? saved.lab : {};
  const remaining = Number(exam.remaining);
  const lastTick = Number(exam.lastTick);
  const normalized = {
    ...base,
    ...saved,
    lessons: isObject(saved.lessons) ? saved.lessons : {},
    lessonSteps: isObject(saved.lessonSteps) ? saved.lessonSteps : {},
    quizzes: isObject(saved.quizzes) ? saved.quizzes : {},
    traceChecks: isObject(saved.traceChecks) ? saved.traceChecks : {},
    selectedTrace: validTraceId(saved.selectedTrace) ? saved.selectedTrace : base.selectedTrace,
    traceVariants: isObject(saved.traceVariants) ? saved.traceVariants : {},
    exploredProjects: isObject(saved.exploredProjects) ? saved.exploredProjects : {},
    oralNotes: isObject(saved.oralNotes) ? saved.oralNotes : {},
    oralReady: isObject(saved.oralReady) ? saved.oralReady : {},
    reports: isObject(saved.reports) ? saved.reports : {},
    scores: isObject(saved.scores) ? saved.scores : {},
    examChecks: isObject(saved.examChecks) ? saved.examChecks : {},
    lab: {
      html: typeof lab.html === 'string' ? lab.html : base.lab.html,
      css: typeof lab.css === 'string' ? lab.css : base.lab.css
    },
    exam: {
      ...base.exam,
      ...exam,
      traceId: validTraceId(exam.traceId) ? exam.traceId : base.exam.traceId,
      remaining: Number.isFinite(remaining) ? Math.max(0, Math.min(EXAM_SECONDS, remaining)) : EXAM_SECONDS,
      lastTick: Number.isFinite(lastTick) && lastTick > 0 ? lastTick : null,
      running: exam.running === true,
      completed: exam.completed === true
    }
  };
  if (normalized.exam.remaining === 0) {
    normalized.exam.running = false;
    normalized.exam.completed = true;
    normalized.exam.lastTick = null;
  }
  return normalized;
}
function safeLoad() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return emptyState();
  }
}
let state = safeLoad();
let currentView = 'home';
let currentLessonId = null;
let toastTimer = null;
let installPrompt = null;
let clockInterval = null;

const main = document.querySelector('#main-content');
const toastRegion = document.querySelector('#toast-region');

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}
function lessonDone(id) { return Boolean(state.lessons[id]); }
function completedLessons() { return lessons.filter(x => lessonDone(x.id)).length; }
function overallPercent() { return Math.round(completedLessons() / lessons.length * 100); }
function nextLesson() { return lessons.find(x => !lessonDone(x.id)) || lessons[0]; }
function levelLessons(level) { return lessons.filter(x => x.level === level); }
function getTrace(id = state.selectedTrace) { return traces.find(x => x.id === id) || traces[0]; }
function saveState() {
  try {
    if (state.exam?.running && state.exam.lastTick) {
      const now = Date.now();
      const elapsed = Math.floor((now - state.exam.lastTick) / 1000);
      state.exam.remaining = Math.max(0, state.exam.remaining - elapsed);
      state.exam.lastTick = now;
      if (state.exam.remaining === 0) { state.exam.running = false; state.exam.completed = true; }
    }
    state.touchedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    notify('Il browser non ha potuto salvare i dati. Controlla lo spazio disponibile.', 'warn');
  }
}
function notify(message, kind = 'ok') {
  if (!toastRegion) return;
  toastRegion.innerHTML = `<div class="toast ${kind}" role="status">${esc(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastRegion.innerHTML = ''; }, 3300);
}
function lessonButton(lesson, text = 'Apri la missione') {
  return `<button class="btn btn-secondary btn-small" type="button" data-lesson="${esc(lesson.id)}">${text} <span aria-hidden="true">→</span></button>`;
}
function sectionHead(eyebrow, title, description = '') {
  return `<div class="section-head"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ''}</div></div>`;
}
function pill(text, style = '') { return `<span class="pill ${style}">${esc(text)}</span>`; }
function render() {
  const renderer = {
    home: renderHome, journey: renderJourney, lesson: renderLesson,
    lab: renderLab, traces: renderTraces, exam: renderExam,
    oral: renderOral, projects: renderProjects, report: renderReport
  }[currentView] || renderHome;
  const activeElement = document.activeElement;
  const focusId = main.contains(activeElement) && activeElement.id ? activeElement.id : null;
  main.innerHTML = renderer();
  updateNavigation();
  if (currentView === 'lab') {
    const htmlInput = document.querySelector('#lab-html');
    const cssInput = document.querySelector('#lab-css');
    if (htmlInput) htmlInput.value = state.lab.html;
    if (cssInput) cssInput.value = state.lab.css;
    updatePreview();
  }
  if (currentView === 'exam') updateTimerDisplay();
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
}
function updateNavigation() {
  document.querySelectorAll('.nav-link').forEach(button => {
    const active = button.dataset.view === currentView || (currentView === 'lesson' && button.dataset.view === 'journey');
    button.classList.toggle('is-active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  const label = currentView === 'lesson' ? 'Percorso guidato' : (viewLabels[currentView] || 'Panoramica');
  document.querySelector('#current-section').textContent = label;
  document.title = `${label} — CulturaLab`;
}
function go(view, options = {}) {
  currentView = view;
  if (options.lessonId) currentLessonId = options.lessonId;
  if (!options.fromHistory && window.history?.pushState) {
    const route = view === 'lesson'
      ? `#lesson/${encodeURIComponent(currentLessonId || '')}`
      : `#${view}`;
    if (window.location.hash !== route) window.history.pushState({}, '', route);
  }
  render();
  if (options.focus !== false) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
function startLesson(id) { currentLessonId = id; go('lesson'); }
function renderHome() {
  const next = nextLesson();
  const levelDone = [1, 2, 3, 4].filter(level => levelLessons(level).every(item => lessonDone(item.id))).length;
  const latestName = completedLessons() === lessons.length ? 'Percorso completato' : `Missione ${next.number} · ${next.title}`;
  return `<section class="hero-panel">
    <div class="hero-copy"><span class="eyebrow">IFTS · TECNOLOGIE PER I BENI CULTURALI</span>
      <h1>Costruisci un sito,<br><span>un passo alla volta.</span></h1>
      <p class="lead">Un percorso guidato per chi parte da zero. Impara facendo, rivedi i progetti del corso e allenati alle tre tracce pratiche dell’esame.</p>
      <div class="button-row">${lessonButton(next, completedLessons() === lessons.length ? 'Rivedi una missione' : 'Continua il percorso')}<button class="btn btn-secondary" type="button" data-view="traces">Guarda le tracce <span aria-hidden="true">↗</span></button></div>
    </div>
    <div class="hero-art" aria-label="Quattro livelli di apprendimento"><span class="art-label">IL TUO PUNTO DI PARTENZA</span><strong>${String(levelDone).padStart(2, '0')} / 04</strong><div class="art-rule"></div><small>${levelDone} livelli consolidati · nessuna fretta</small></div>
  </section>
  <div class="stats-row" aria-label="La palestra d’esame"><div class="stat-card"><span class="stat-number">04</span><span class="stat-copy"><strong>livelli guidati</strong><small>dal primo file al progetto completo</small></span></div><div class="stat-card"><span class="stat-number">03</span><span class="stat-copy"><strong>tracce ufficiali</strong><small>una preparazione per ciascuna</small></span></div><div class="stat-card"><span class="stat-number">120′</span><span class="stat-copy"><strong>simulazione d’esame</strong><small>sviluppo, relazione e verifica</small></span></div></div>
  <div class="section-head"><div><span class="eyebrow">DA DOVE RIPARTIRE</span><h2>Il prossimo passo, senza saltare le basi.</h2></div></div>
  <div class="home-grid"><section class="paper-card"><div class="lesson-preview"><div class="lesson-index">${completedLessons() === lessons.length ? '✓' : next.number}</div><div class="lesson-preview-content"><span class="pill sea">${completedLessons() === lessons.length ? 'COMPLETATO' : `LIVELLO ${next.level} · ${next.duration}`}</span><h3 style="margin-top:10px">${esc(latestName)}</h3><p>${esc(completedLessons() === lessons.length ? 'Hai completato il percorso base. Ora puoi ripassare, allenarti sulle tracce e provare una simulazione.' : next.summary)}</p>${lessonButton(next, completedLessons() === lessons.length ? 'Rivedi' : 'Riprendi da qui')}</div></div><div class="rule"></div><div class="progress-meta"><span>Il tuo percorso</span><strong>${completedLessons()} di ${lessons.length} missioni</strong></div><div class="progress-track" role="progressbar" aria-valuenow="${overallPercent()}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${overallPercent()}%"></div></div><p class="small muted" style="margin:0">Il progresso viene conservato su questo dispositivo, senza creare un account.</p></section>
  <section class="paper-card progress-card"><span class="eyebrow" style="color:#f1b28f">ALLENATI CON CALMA</span><h3 style="margin-top:13px">Capire prima di consegnare.</h3><p class="small">Ogni traccia è spezzata in richieste più piccole. Segna i passaggi mentre costruisci.</p><div class="progress-meta"><span>Livelli completati</span><strong>${levelDone} / 4</strong></div><div class="progress-track"><div class="progress-fill" style="width:${levelDone * 25}%"></div></div><button class="btn btn-secondary btn-small" type="button" data-view="journey">Apri il percorso <span aria-hidden="true">→</span></button></section></div>
  ${sectionHead('UNA VISTA D’INSIEME', 'Quattro livelli. Tre tracce. Un metodo.', 'Prima impari i mattoni, poi ti alleni a unirli in una soluzione completa.')}
  <div class="path-rail">${[1,2,3,4].map(level => { const items = levelLessons(level); const done = items.filter(x => lessonDone(x.id)).length; const status = done === items.length ? 'is-done' : (level === next.level ? 'is-current' : ''); return `<div class="path-level"><span class="level-dot ${status}">${done === items.length ? '✓' : String(level).padStart(2,'0')}</span><div class="level-copy"><h3>Livello ${level} — ${['Le fondamenta','Dare forma alle pagine','Rendere il sito interattivo','Costruire una soluzione completa'][level-1]}</h3><p>${esc(levelDescriptions[level-1])}</p></div><span class="pill">${done}/${items.length}</span></div>`; }).join('')}</div>
  <div class="callout"><span class="tip-mark" aria-hidden="true">↳</span><div><strong>Una nota importante sulle tracce</strong><p>Le tre prove ufficiali hanno difficoltà comparabile. Qui gli esercizi diventano gradualmente più autonomi: puoi scegliere tu su quale traccia allenarti.</p></div></div>`;
}
function renderJourney() {
  const levels = [1, 2, 3, 4];
  return `<span class="eyebrow">IL PERCORSO</span><h1>Si comincia dalle basi.</h1><p class="lead">Procedi al tuo ritmo: ogni missione spiega un concetto, mostra un esempio e ti chiede un piccolo passo concreto. Puoi tornare indietro quando vuoi.</p>
  <div class="metric-grid" style="margin-top:22px"><div class="metric"><strong>${completedLessons()} / ${lessons.length}</strong><span>missioni completate</span></div><div class="metric"><strong>${overallPercent()}%</strong><span>del percorso base</span></div><div class="metric"><strong>10–18 min</strong><span>durata indicativa per missione</span></div></div>
  ${levels.map(level => { const items = levelLessons(level); const done = items.filter(x => lessonDone(x.id)).length; return `<section class="level-section"><div class="level-heading"><div class="level-number">0${level}</div><div><h2>${['Le fondamenta','Dare forma alle pagine','Rendere il sito interattivo','Costruire una soluzione completa'][level-1]}</h2><p>${esc(levelDescriptions[level-1])}</p></div><span class="pill" style="margin-left:auto">${done} / ${items.length} completate</span></div><div class="lesson-list">${items.map(lesson => `<article class="lesson-card"><div class="lesson-card-top"><span class="pill ${lessonDone(lesson.id) ? 'sea' : ''}">${lesson.duration}</span>${lessonDone(lesson.id) ? '<span class="lesson-check">✓ Completata</span>' : `<span class="pill">Missione ${lesson.number}</span>`}</div><h3>${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="lesson-card-bottom"><span class="muted small">${lessonDone(lesson.id) ? 'Puoi rifarla quando vuoi.' : 'Spiegazione · esempio · missione'}</span>${lessonButton(lesson, lessonDone(lesson.id) ? 'Rivedi' : 'Inizia')}</div></article>`).join('')}</div></section>`; }).join('')}
  <div class="callout"><span class="tip-mark" aria-hidden="true">i</span><div><strong>Le tracce ufficiali sono comparabili, non “facile / difficile”.</strong><p>Il percorso costruisce la tua autonomia un po’ alla volta; scegli liberamente quale prova fare per prima.</p></div></div>`;
}
function renderLesson() {
  const lesson = lessons.find(x => x.id === currentLessonId) || nextLesson();
  currentLessonId = lesson.id;
  const quiz = quizBank[lesson.id];
  const selected = state.quizzes[lesson.id];
  const steps = state.lessonSteps[lesson.id] || [];
  const answerText = selected === undefined ? '' : (selected === quiz.answer ? 'Corretto. ' + quiz.why : 'Non ancora. ' + quiz.why);
  const answerClass = selected === undefined ? '' : (selected === quiz.answer ? 'good' : 'warn');
  return `<div class="lesson-detail"><button class="back-link" type="button" data-view="journey">← Torna al percorso guidato</button>
  <header class="lesson-detail-header"><span class="eyebrow">LIVELLO ${lesson.level} · MISSIONE ${lesson.number} · ${lesson.duration}</span><h1>${esc(lesson.title)}</h1><p class="lead">${esc(lesson.summary)}</p></header>
  <div class="lesson-body-grid"><article class="lesson-copy"><h2>Il concetto, in parole semplici</h2><p>${esc(lesson.concept)}</p><h2>${esc(lesson.exampleTitle)}</h2><p>Guarda la struttura. Poi prova a riscriverla nel laboratorio, una riga alla volta.</p><div class="code-block"><span class="code-label">ESEMPIO DA STUDIARE</span><pre><code>${esc(lesson.example)}</code></pre></div>
  <h2>La tua missione</h2><p>${esc(lesson.challenge)}</p><ul class="task-checklist">${lesson.steps.map((step, index) => `<li><input type="checkbox" id="step-${lesson.id}-${index}" data-step="${index}" data-lesson-step="${lesson.id}" ${steps[index] ? 'checked' : ''}><label for="step-${lesson.id}-${index}">${esc(step)}</label></li>`).join('')}</ul>
  <div class="button-row"><button class="btn ${lessonDone(lesson.id) ? 'btn-secondary' : 'btn-copper'}" type="button" data-action="complete-lesson" data-id="${lesson.id}">${lessonDone(lesson.id) ? '✓ Missione completata · rivedi' : 'Segna missione completata'}</button><button class="btn btn-secondary" type="button" data-view="lab">Apri il laboratorio <span aria-hidden="true">↗</span></button></div>
  <div class="paper-card" style="margin-top:22px"><span class="eyebrow">CHECK RAPIDO</span><h3 style="font:500 21px var(--serif);margin-top:10px">${esc(quiz.q)}</h3><div class="button-row" style="display:grid;margin-top:13px">${quiz.options.map((option, index) => `<button class="btn ${selected === index ? (index === quiz.answer ? 'btn-primary' : 'btn-secondary') : 'btn-secondary'}" style="justify-content:flex-start;text-align:left" type="button" data-action="quiz-answer" data-id="${lesson.id}" data-answer="${index}">${esc(option)}</button>`).join('')}</div>${selected !== undefined ? `<p class="small ${answerClass === 'good' ? 'muted' : 'muted'}" role="status" style="margin:12px 0 0;color:${answerClass === 'good' ? '#39745d' : '#8d6328'}">${esc(answerText)}</p>` : ''}</div>
  </article><aside><div class="aside-note"><span class="tip-mark">↳</span><h3>Se ti blocchi, riduci il passo.</h3><p>Prova prima a descrivere la pagina a parole. Poi aggiungi una cosa per volta. Il pulsante “Laboratorio” apre un’anteprima isolata: puoi sperimentare senza rovinare il resto dell’app.</p></div><div class="paper-card" style="margin-top:12px"><h3 style="font:500 19px var(--serif)">Il tuo avanzamento</h3><p class="small">${steps.filter(Boolean).length} di ${lesson.steps.length} passaggi spuntati</p><div class="progress-track"><div class="progress-fill" style="width:${Math.round(steps.filter(Boolean).length / lesson.steps.length * 100)}%;background:var(--sea)"></div></div><span class="pill ${lessonDone(lesson.id) ? 'sea' : ''}">${lessonDone(lesson.id) ? 'Completata' : 'In corso'}</span></div><div class="aside-note" style="margin-top:12px"><span class="tip-mark">i</span><h3>Quanto tempo serve?</h3><p>${lesson.duration} è un’indicazione, non una scadenza. Puoi lasciare la missione e riprenderla più tardi: i tuoi progressi rimangono in questo browser.</p></div></aside></div></div>`;
}
function renderLab() {
  return `<span class="eyebrow">PICCOLI ESPERIMENTI · NESSUNA CONFIGURAZIONE</span><h1>Il tuo primo laboratorio.</h1><p class="lead">Modifica HTML e CSS, poi aggiorna l’anteprima. Il contenuto si esegue in un riquadro isolato e non cambia il resto dell’app.</p>
  <div class="callout"><span class="tip-mark">i</span><div><strong>Un passo alla volta</strong><p>Prova a cambiare il titolo, aggiungere una card o modificare un colore. L’anteprima non esegue JavaScript: è un punto di partenza sicuro per HTML e CSS.</p></div></div>
  <div class="lab-layout"><section class="lab-editor"><div class="editor-tabs"><span class="editor-tab">HTML + CSS · BOZZA SUL TUO PC</span><button class="btn btn-quiet btn-small" type="button" data-action="reset-lab">Ripristina esempio</button></div><div class="editor-content"><label for="lab-html">index.html <span>Struttura e contenuti</span></label><textarea id="lab-html" aria-label="Editor HTML" spellcheck="false"></textarea><label for="lab-css" style="margin-top:14px">styles.css <span>Aspetto visivo</span></label><textarea id="lab-css" class="css-editor" aria-label="Editor CSS" spellcheck="false"></textarea><div class="button-row" style="margin-top:12px"><button class="btn btn-copper" type="button" data-action="run-preview">Aggiorna anteprima <span aria-hidden="true">↗</span></button><button class="btn btn-secondary" type="button" data-action="save-lab">Salva la bozza</button></div></div></section>
  <section class="preview-card"><div class="preview-head"><strong>La tua pagina prende forma</strong><span class="pill sea">Anteprima isolata</span></div><iframe class="preview-frame" id="lab-preview" title="Anteprima isolata del codice HTML e CSS" sandbox="allow-forms"></iframe></section></div>
  <div class="lab-help"><span class="eyebrow">IDEA PER ALLENARTI</span><h3 style="margin-top:8px">Parti da un luogo vicino a te.</h3><p>Scrivi un titolo e una breve descrizione. Poi aggiungi due punti di interesse. Per ogni immagine futura, annota che cosa dovrebbe raccontare e quale testo alternativo useresti.</p><div class="button-row"><button class="btn btn-secondary btn-small" type="button" data-lesson="html-scheletro">Ripassa la struttura HTML</button><button class="btn btn-secondary btn-small" type="button" data-lesson="css-responsive">Ripassa il responsive</button></div></div>`;
}
function traceCheckData(trace) {
  if (!state.traceChecks[trace.id]) state.traceChecks[trace.id] = {};
  return state.traceChecks[trace.id];
}
function traceCount(trace) { return trace.groups.reduce((sum, group) => sum + group.items.length, 0); }
function traceDone(trace) { return Object.values(traceCheckData(trace)).filter(Boolean).length; }
function renderTraceCards() {
  return `<div class="trace-grid">${traces.map(trace => `<article class="trace-card ${state.selectedTrace === trace.id ? 'is-selected' : ''}"><span class="trace-number">TRACCIA ${trace.number}</span><h3>${esc(trace.title)}</h3><p>${esc(trace.focus)}<br><br>${esc(trace.scenario)}</p><button class="btn ${state.selectedTrace === trace.id ? 'btn-primary' : 'btn-secondary'} btn-small" type="button" data-action="select-trace" data-id="${trace.id}">${state.selectedTrace === trace.id ? 'Traccia selezionata' : 'Allenati su questa'} <span aria-hidden="true">→</span></button></article>`).join('')}</div>`;
}
function renderTraceDetail() {
  const trace = getTrace();
  const checks = traceCheckData(trace);
  const done = traceDone(trace);
  const variant = state.traceVariants[trace.id];
  return `<section class="trace-detail"><div class="trace-number">TRACCIA ${trace.number} · ${esc(trace.focus.toUpperCase())}</div><h2 style="margin-top:9px">${esc(trace.title)}</h2><p class="scenario">${esc(variant || trace.scenario)}</p>
  <div class="materials">${trace.material.map(item => `<span class="material-tag">${esc(item)}</span>`).join('')}</div>
  <div class="trace-progress"><div><strong>${done} / ${traceCount(trace)}</strong><span> requisiti segnati come compresi o svolti</span></div><button class="btn btn-secondary btn-small" type="button" data-action="new-variant">Estrai una variante <span aria-hidden="true">↻</span></button></div>
  <div class="requirements-grid">${trace.groups.map((group, gi) => `<section class="requirements-group"><h3>${esc(group.title)} <span class="pill">${group.items.filter((_, ii) => checks[`${gi}-${ii}`]).length}/${group.items.length}</span></h3><ul>${group.items.map((item, ii) => `<li><label class="requirement-check" for="trace-${trace.id}-${gi}-${ii}"><input id="trace-${trace.id}-${gi}-${ii}" type="checkbox" data-trace-check="${trace.id}" data-check="${gi}-${ii}" ${checks[`${gi}-${ii}`] ? 'checked' : ''}><span>${esc(item)}</span></label></li>`).join('')}</ul></section>`).join('')}</div>
  <div class="button-row" style="margin-top:17px"><button class="btn btn-copper" type="button" data-action="prepare-exam" data-id="${trace.id}">Simula questa traccia <span aria-hidden="true">→</span></button><button class="btn btn-secondary" type="button" data-action="open-report" data-id="${trace.id}">Prepara la relazione</button></div></section>`;
}
function renderTraces() {
  return `<span class="eyebrow">CONSEGNE UFFICIALI · ALLENAMENTO GUIDATO</span><h1>Tre tracce, tre modi di valorizzare il patrimonio.</h1><p class="lead">Le prove ufficiali hanno difficoltà comparabile. Scegli un tema, familiarizza con la consegna e spunta ogni requisito mentre lavori.</p>${renderTraceCards()}${renderTraceDetail()}<div class="callout"><span class="tip-mark">i</span><div><strong>Non serve finire tutto al primo tentativo.</strong><p>Seleziona pochi requisiti, prova a costruirli nel laboratorio e poi torna qui. Gli spunti di variazione cambiano il contesto, non i criteri fondamentali.</p></div></div>`;
}
function renderProjects() {
  return `<span class="eyebrow">DALLA SEZIONE “PROGETTI” DEL CORSO</span><h1>Il codice del corso, spiegato.</h1><p class="lead">Quattro elaborati mostrano come crescono le competenze: dalla pagina statica ai dati, alle richieste dinamiche e ai contenuti multimediali. Puoi leggere le schede in qualsiasi ordine.</p><div class="project-grid">${courseProjects.map(project => `<article class="project-card" data-number="${project.number}"><div class="project-number">PROGETTO ${project.number} · ${esc(project.level.toUpperCase())}</div><h3>${esc(project.title)}</h3><p>${esc(project.summary)}</p><div>${pill(project.tech, 'sea')}</div><h4 style="margin-top:17px">Che cosa osservare</h4><ul>${project.details.map(item => `<li>${esc(item)}</li>`).join('')}</ul><div class="rule"></div><h4>Competenze da riusare</h4><div class="materials">${project.learn.map(item => `<span class="material-tag">${esc(item)}</span>`).join('')}</div><div class="project-bottom"><span>${state.exploredProjects[project.id] ? '✓ Esplorato' : 'Un esempio da studiare'}</span><button class="btn btn-secondary btn-small" type="button" data-action="toggle-project" data-id="${project.id}">${state.exploredProjects[project.id] ? 'Segna da rivedere' : 'Segna come esplorato'}</button></div></article>`).join('')}</div><div class="callout"><span class="tip-mark">↳</span><div><strong>Come usare i progetti durante l’esame</strong><p>Prendi un’idea per volta: una pagina leggibile, un form, un modello dati, un flusso frontend/API. Non serve copiare un’intera applicazione PHP se la consegna richiede un prototipo.</p></div></div><p class="small muted">Fonte: sezione Progetti del <a href="https://quiz-platform-format.netlify.app/webpages/progetti" target="_blank" rel="noreferrer">portale didattico del corso</a>.</p>`;
}
function remainingExamSeconds() {
  const exam = state.exam;
  if (!exam.running || !exam.lastTick) return Math.max(0, exam.remaining);
  return Math.max(0, exam.remaining - Math.floor((Date.now() - exam.lastTick) / 1000));
}
function clockString(seconds) {
  const value = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(value / 3600)).padStart(2,'0')}:${String(Math.floor(value % 3600 / 60)).padStart(2,'0')}:${String(value % 60).padStart(2,'0')}`;
}
function examPhaseIndex(remaining) { return EXAM_SECONDS - remaining < examPhases[0].minutes * 60 ? 0 : 1; }
function examProgress() { return Math.min(100, Math.round((EXAM_SECONDS - remainingExamSeconds()) / EXAM_SECONDS * 100)); }
function getExamChecks(traceId) {
  if (!state.examChecks[traceId]) state.examChecks[traceId] = {};
  return state.examChecks[traceId];
}
function scoreValue(traceId, criterion) { return Math.max(0, Math.min(Number(rubric.find(x => x.id === criterion)?.points || 0), Number(state.scores?.[traceId]?.[criterion] || 0))); }
function totalScore(traceId) { return rubric.reduce((sum, item) => sum + scoreValue(traceId, item.id), 0); }
function renderExam() {
  const trace = getTrace(state.exam.traceId);
  const remaining = remainingExamSeconds();
  const phase = examPhaseIndex(remaining);
  const running = state.exam.running && remaining > 0;
  const checks = getExamChecks(trace.id);
  const examChecklist = ['Ho scelto gli obiettivi e ordinato le richieste.', 'Il prototipo copre i flussi principali della traccia.', 'Dati e contenuti hanno una struttura comprensibile.', 'Ho controllato mobile, titoli, alternative testuali e navigazione.', 'Ho lasciato tempo per la relazione e la verifica finale.', 'So spiegare almeno tre scelte nel colloquio.'];
  return `<span class="eyebrow">TEMPO MINIMO UFFICIALE · 2 ORE</span><h1>Prova completa, con il tempo dalla tua parte.</h1><p class="lead">La simulazione segue la scansione consigliata: 95 minuti di sviluppo e 25 minuti per relazione/verifica. Puoi fermarti e riprendere il timer.</p>
  <section class="exam-card" style="margin-top:20px"><div class="field" style="max-width:500px"><label for="exam-trace">Scegli la traccia della simulazione</label><select id="exam-trace" data-action="exam-select-trace">${traces.map(t => `<option value="${t.id}" ${trace.id === t.id ? 'selected' : ''}>${esc(t.title)}</option>`).join('')}</select></div>
  <div class="exam-shell"><div><div class="timer-display ${remaining === 0 ? 'is-over' : ''}" id="timer-display" role="timer" aria-live="off">${clockString(remaining)}</div><div class="timer-caption">${running ? 'Timer in corso — il tempo passa anche se cambi sezione.' : remaining === 0 ? 'Tempo terminato. Completa la verifica senza fretta.' : state.exam.completed ? 'Simulazione conclusa.' : 'La simulazione non è ancora iniziata.'}</div><div class="timer-progress" role="progressbar" aria-label="Tempo di simulazione trascorso" aria-valuenow="${examProgress()}" aria-valuemin="0" aria-valuemax="100"><span style="width:${examProgress()}%"></span></div><div class="button-row">${!running && remaining > 0 ? `<button class="btn btn-copper" type="button" data-action="start-exam">${state.exam.completed || remaining < EXAM_SECONDS ? 'Riprendi' : 'Avvia i 120 minuti'} <span aria-hidden="true">▶</span></button>` : ''}${running ? '<button class="btn btn-secondary" type="button" data-action="pause-exam">Metti in pausa <span aria-hidden="true">Ⅱ</span></button>' : ''}<button class="btn btn-quiet btn-small" type="button" data-action="reset-exam">Reimposta il timer</button></div>
  <div class="phase-card ${phase === 0 ? 'active' : ''}"><strong>01 · Progettazione e sviluppo · 95 min</strong><p>Il PDF consiglia 90–100 minuti. ${phase === 0 ? 'Fase attuale: concentra lo sforzo su un prototipo funzionante.' : 'Lascia una nota con la parte che vuoi ancora rivedere.'}</p></div><div class="phase-card ${phase === 1 ? 'active' : ''}"><strong>02 · Relazione e verifica · 25 min</strong><p>Il PDF consiglia 20–30 minuti. ${phase === 1 ? 'Fase attuale: prepara la relazione e ricontrolla la consegna.' : 'Ricordati di riservare tempo alla spiegazione delle scelte.'}</p></div>
  <div class="button-row" style="margin-top:14px"><button class="btn btn-secondary btn-small" type="button" data-action="open-report" data-id="${trace.id}">Apri relazione tecnica</button><button class="btn btn-secondary btn-small" type="button" data-view="oral">Ripassa le domande orali</button></div></div>
  <aside><div class="paper-card" style="padding:17px"><span class="eyebrow">CONSEGNA</span><h3 style="font:500 20px var(--serif);margin-top:9px">${esc(trace.title)}</h3><p class="small">${esc(trace.focus)}</p><p class="small muted">Prototipo funzionante + breve relazione tecnica + 3 domande teoriche collegate.</p><button class="link-button" type="button" data-action="open-trace" data-id="${trace.id}">Rivedi tutti i requisiti →</button></div><div class="paper-card" style="padding:17px;margin-top:11px"><h3 style="font:500 20px var(--serif)">Promemoria di consegna</h3><ul class="exam-checks">${examChecklist.map((label,index)=>`<li><label for="exam-check-${trace.id}-${index}"><input id="exam-check-${trace.id}-${index}" type="checkbox" data-exam-check="${trace.id}" data-check="${index}" ${checks[index] ? 'checked' : ''}><span>${esc(label)}</span></label></li>`).join('')}</ul><div class="progress-meta"><span>Passaggi segnati</span><strong>${Object.values(checks).filter(Boolean).length} / ${examChecklist.length}</strong></div></div></aside></div></section>
  <section class="exam-card" style="margin-top:16px"><span class="eyebrow">AUTO-VALUTAZIONE · 100 PUNTI</span><h2 style="font-size:25px;margin-top:8px">Rileggi il tuo prototipo con la griglia ufficiale.</h2><p class="small muted">Assegna a ogni area un punteggio entro il massimo indicato. È uno strumento di ripasso, non un voto ufficiale.</p><div class="score-list">${rubric.map(item => `<div class="score-row"><label for="score-${trace.id}-${item.id}"><strong>${esc(item.label)}</strong><br><span class="muted">${esc(item.help)} · massimo ${item.points}</span></label><div><input type="number" min="0" max="${item.points}" step="1" value="${scoreValue(trace.id,item.id)}" id="score-${trace.id}-${item.id}" data-score="${item.id}" data-trace="${trace.id}" aria-label="Punti per ${esc(item.label)} su ${item.points}"></div></div>`).join('')}</div><div class="total-score"><span>Punteggio che ti attribuisci</span><strong><span id="score-total">${totalScore(trace.id)}</span><small style="font:12px var(--sans);color:#d9e0e4"> / 100</small></strong></div></section>`;
}
function oralProgress() { return oralQuestions.filter(q => state.oralReady[q.id]).length; }
function renderOral() {
  return `<span class="eyebrow">3 DOMANDE PER TRACCIA · 9 DOMANDE TOTALI</span><h1>Racconta il perché delle tue scelte.</h1><p class="lead">Le risposte modello non sono copioni da imparare. Sono piste per organizzare il ragionamento, collegarlo al progetto e motivare i compromessi.</p><div class="metric-grid" style="margin-top:20px"><div class="metric"><strong>${oralProgress()} / 9</strong><span>risposte che ti senti pronto a raccontare</span></div><div class="metric"><strong>3</strong><span>domande collegate a ogni traccia</span></div><div class="metric"><strong>2 min</strong><span>prova a spiegare a voce senza leggere</span></div></div><div class="callout"><span class="tip-mark">↳</span><div><strong>Una struttura semplice per rispondere</strong><p>1. Definisci il problema. 2. Descrivi la scelta fatta. 3. Spiega il beneficio e il limite. 4. Indica come la verificheresti.</p></div></div><div class="oral-stack">${oralQuestions.map((q,index)=>`<details class="oral-card"><summary><span class="oral-number">${String(index+1).padStart(2,'0')}</span><span class="oral-question">${esc(q.question)}</span><span class="oral-meta">${esc(q.trace)} · ${esc(q.topic)}</span></summary><div class="oral-answer"><span class="eyebrow">SPUNTI PER UNA RISPOSTA PERSONALE</span><ul>${q.guide.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><label class="field" for="oral-note-${q.id}"><span>La tua risposta, in parole tue</span><textarea id="oral-note-${q.id}" data-oral-note="${q.id}" placeholder="Scrivi qualche punto, oppure prova a rispondere a voce…">${esc(state.oralNotes[q.id] || '')}</textarea></label><label class="ready-toggle"><input type="checkbox" data-oral-ready="${q.id}" ${state.oralReady[q.id] ? 'checked' : ''}>Mi sento pronto a parlarne</label></div></details>`).join('')}</div>`;
}
const reportFields = [
  { id: 'obiettivo', label: 'Obiettivo e destinatari', hint: 'Chi userà il sito? Quale bisogno risolve?', full: true },
  { id: 'organizzazione', label: 'Organizzazione generale e navigazione', hint: 'Pagine, sezioni, componenti e percorso del visitatore.' },
  { id: 'tecnologie', label: 'Tecnologie utilizzate', hint: 'Che cosa hai scelto e per quale motivo?' },
  { id: 'dati', label: 'Organizzazione e gestione dei dati', hint: 'File, JSON/CSV, modello o database; descrivi i campi.' },
  { id: 'ux', label: 'UX, responsive e accessibilità', hint: 'Gerarchia, mobile, tastiera, alt, leggibilità.' },
  { id: 'funzioni', label: 'Funzioni realizzate e relativi limiti', hint: 'Ricerca, filtri, tappe, opere, multimedia o interazioni.' },
  { id: 'sicurezza', label: 'Sicurezza e contenuti multimediali', hint: 'Compila quando la traccia lo richiede o motivane la non applicabilità.' },
  { id: 'futuro', label: 'Sviluppi futuri e miglioramenti', hint: 'Che cosa aggiungeresti con più tempo? Quali verifiche servono?' }
];
function currentReport(traceId = state.selectedTrace) { return state.reports[traceId] || {}; }
function compileReport(traceId) {
  const trace = getTrace(traceId);
  const report = currentReport(traceId);
  const body = reportFields.map(field => `## ${field.label}\n${(report[field.id] || '').trim() || 'Da completare.'}`).join('\n\n');
  return `# Relazione tecnica — ${trace.title}\n\nData: ${new Date().toLocaleDateString('it-IT')}\n\n${body}\n\n## Controllo finale\nVerifica che il prototipo si apra, che le funzionalità dichiarate siano presenti e che i contenuti siano coerenti con la consegna.\n`;
}
function renderReport() {
  const trace = getTrace(state.selectedTrace);
  const report = currentReport(trace.id);
  return `<button class="back-link" type="button" data-view="traces">← Torna alle tracce</button><span class="eyebrow">CONSEGNA SCRITTA · TRACCIA ${trace.number}</span><h1>Metti in parole le tue scelte.</h1><p class="lead">La relazione non deve essere lunga. Racconta come è organizzata la soluzione, come sono gestiti i dati e perché hai preso le decisioni principali.</p><div class="callout"><span class="tip-mark">i</span><div><strong>La bozza viene salvata soltanto in questo browser.</strong><p>Rivedi ogni risposta: sostituisci le indicazioni tra parentesi e non dichiarare funzioni che il prototipo non realizza.</p></div></div><div class="paper-card" style="margin-top:16px"><div class="progress-meta"><span>Traccia selezionata</span><strong>${esc(trace.title)}</strong></div><div class="field-grid" style="margin-top:17px">${reportFields.map(field=>`<div class="field ${field.full ? 'full' : ''}"><label for="report-${field.id}">${esc(field.label)}</label><small>${esc(field.hint)}</small><textarea id="report-${field.id}" data-report-field="${field.id}" placeholder="Scrivi qui la tua risposta…">${esc(report[field.id] || '')}</textarea></div>`).join('')}</div><div class="button-row" style="margin-top:15px"><button class="btn btn-copper" type="button" data-action="download-report">Scarica la bozza .md</button><button class="btn btn-secondary" type="button" data-action="copy-report">Copia il testo</button><button class="btn btn-quiet" type="button" data-view="exam">Rivedi la griglia di valutazione</button></div></div><p class="small muted" style="margin-top:13px">Per iniziare da un’altra traccia, selezionala nella sezione <button class="link-button" type="button" data-view="traces">Tracce d’esame</button>. La relazione è un aiuto allo studio, non un documento ufficiale.</p>`;
}
function updatePreview() {
  const frame = document.querySelector('#lab-preview');
  const html = document.querySelector('#lab-html')?.value ?? state.lab.html;
  const css = document.querySelector('#lab-css')?.value ?? state.lab.css;
  if (!frame) return;
  const safeDoc = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${html}</body></html>`;
  frame.srcdoc = safeDoc;
}
function updateTimerDisplay() {
  const display = document.querySelector('#timer-display');
  if (!display) return;
  const remaining = remainingExamSeconds();
  if (remaining === 0 && state.exam.running) {
    state.exam.remaining = 0;
    state.exam.running = false;
    state.exam.completed = true;
    state.exam.lastTick = null;
    saveState();
    notify('I 120 minuti sono terminati. Ora rivedi relazione e consegna.', 'warn');
    render();
    return;
  }
  display.textContent = clockString(remaining);
  display.classList.toggle('is-over', remaining === 0);
  const caption = display.parentElement.querySelector('.timer-caption');
  if (caption) caption.textContent = state.exam.running ? 'Timer in corso — il tempo passa anche se cambi sezione.' : remaining === 0 ? 'Tempo terminato. Completa la verifica senza fretta.' : state.exam.completed ? 'Simulazione conclusa.' : 'La simulazione non è ancora iniziata.';
  const progress = display.parentElement.querySelector('.timer-progress span');
  if (progress) progress.style.width = `${Math.min(100, Math.round((EXAM_SECONDS - remaining) / EXAM_SECONDS * 100))}%`;
}
function resetExam(confirmUser = true) {
  if (confirmUser && !window.confirm('Reimpostare la simulazione? Il tempo e le spunte di questa traccia torneranno a zero.')) return;
  state.exam = { traceId: state.exam.traceId || state.selectedTrace, remaining: EXAM_SECONDS, lastTick: null, running: false, completed: false };
  state.examChecks[state.exam.traceId] = {};
  saveState();
  render();
  notify('Timer reimpostato a 120 minuti.');
}
function openReport(traceId) {
  if (traceId) state.selectedTrace = traceId;
  saveState();
  go('report');
}
function renderTraceForExam(traceId) {
  state.exam.traceId = traceId;
  state.selectedTrace = traceId;
  saveState();
  go('exam');
}
function downloadReport() {
  const text = compileReport(state.selectedTrace);
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relazione-${state.selectedTrace}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify('Bozza scaricata. Rivedila prima di consegnarla.');
}
async function copyReport() {
  try {
    await navigator.clipboard.writeText(compileReport(state.selectedTrace));
    notify('Relazione copiata negli appunti.');
  } catch {
    notify('La copia automatica non è disponibile. Usa “Scarica la bozza .md”.', 'warn');
  }
}
function handleClick(event) {
  const viewButton = event.target.closest('[data-view]');
  const lessonButtonEl = event.target.closest('[data-lesson]');
  const actionButton = event.target.closest('[data-action]');
  if (viewButton) {
    event.preventDefault();
    go(viewButton.dataset.view);
    return;
  }
  if (lessonButtonEl) {
    startLesson(lessonButtonEl.dataset.lesson);
    return;
  }
  if (!actionButton) return;
  const { action, id } = actionButton.dataset;
  switch (action) {
    case 'complete-lesson': {
      state.lessons[id] = !state.lessons[id];
      saveState(); render();
      notify(state.lessons[id] ? 'Missione aggiunta al tuo percorso.' : 'Missione riaperta. Puoi rivederla.');
      break;
    }
    case 'quiz-answer': {
      const lesson = lessons.find(x => x.id === id);
      const quiz = quizBank[id];
      const answer = Number(actionButton.dataset.answer);
      state.quizzes[id] = answer;
      if (quiz && answer === quiz.answer) state.lessons[id] = true;
      saveState(); render();
      if (quiz && answer === quiz.answer) notify('Risposta corretta. La missione è segnata come completata.');
      else notify('Riprova: rileggi la spiegazione e cerca il passaggio chiave.', 'warn');
      break;
    }
    case 'select-trace':
      state.selectedTrace = id; saveState(); render(); break;
    case 'new-variant': {
      const trace = getTrace();
      const variants = trace.variants;
      const old = state.traceVariants[trace.id];
      const options = variants.filter(x => x !== old);
      state.traceVariants[trace.id] = options[Math.floor(Math.random() * options.length)] || trace.scenario;
      saveState(); render(); notify('Nuovo scenario estratto. I requisiti ufficiali restano la tua guida.');
      break;
    }
    case 'prepare-exam': renderTraceForExam(id); break;
    case 'open-trace': state.selectedTrace = id; saveState(); go('traces'); break;
    case 'open-report': openReport(id); break;
    case 'toggle-project': {
      state.exploredProjects[id] = !state.exploredProjects[id]; saveState(); render();
      notify(state.exploredProjects[id] ? 'Progetto segnato come esplorato.' : 'Progetto rimosso dai completati.');
      break;
    }
    case 'run-preview': updatePreview(); notify('Anteprima aggiornata nel riquadro isolato.'); break;
    case 'save-lab': {
      state.lab.html = document.querySelector('#lab-html')?.value || '';
      state.lab.css = document.querySelector('#lab-css')?.value || '';
      saveState(); notify('Bozza laboratorio salvata su questo dispositivo.'); break;
    }
    case 'reset-lab': {
      state.lab = { html: DEFAULT_HTML, css: DEFAULT_CSS }; saveState(); render(); notify('Esempio iniziale ripristinato.'); break;
    }
    case 'start-exam': {
      if (state.exam.remaining <= 0) { resetExam(false); }
      state.exam.running = true; state.exam.completed = false; state.exam.lastTick = Date.now(); saveState(); render(); notify('Simulazione avviata. Puoi mettere in pausa il timer.'); break;
    }
    case 'pause-exam': {
      state.exam.remaining = remainingExamSeconds(); state.exam.running = false; state.exam.lastTick = null; saveState(); render(); notify('Timer in pausa. Riprenderà da questo punto.'); break;
    }
    case 'reset-exam': resetExam(true); break;
    case 'download-report': downloadReport(); break;
    case 'copy-report': copyReport(); break;
    case 'reset-progress': {
      if (window.confirm('Azzerare progressi, appunti, bozze, timer e codice salvato su questo browser? Questa operazione non si può annullare.')) {
        state = emptyState(); saveState(); currentView = 'home'; render(); notify('Progressi locali azzerati.');
      }
      break;
    }
    case 'install-app': {
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt.userChoice.then(() => { installPrompt = null; });
      } else notify('Per installarla, usa il menu del browser e scegli “Installa app” o “Aggiungi alla schermata Home”.');
      break;
    }
    default: break;
  }
}
function handleChange(event) {
  const target = event.target;
  if (target.matches('[data-lesson-step]')) {
    const id = target.dataset.lessonStep;
    if (!state.lessonSteps[id]) state.lessonSteps[id] = [];
    state.lessonSteps[id][Number(target.dataset.step)] = target.checked;
    saveState();
    const lesson = lessons.find(x => x.id === id);
    const checked = state.lessonSteps[id].filter(Boolean).length;
    notify(`${checked} di ${lesson?.steps.length || 0} passaggi segnati.`);
  }
  if (target.matches('[data-trace-check]')) {
    const data = traceCheckData(getTrace(target.dataset.traceCheck));
    data[target.dataset.check] = target.checked; saveState(); render();
  }
  if (target.matches('[data-exam-check]')) {
    getExamChecks(target.dataset.examCheck)[target.dataset.check] = target.checked;
    saveState(); render();
  }
  if (target.matches('[data-oral-ready]')) {
    state.oralReady[target.dataset.oralReady] = target.checked; saveState(); render();
    notify(target.checked ? 'Domanda segnata come pronta.' : 'Puoi ripassare questa domanda.');
  }
  if (target.matches('[data-action="exam-select-trace"]')) {
    state.exam.traceId = target.value; state.selectedTrace = target.value; saveState(); render();
  }
  if (target.matches('[data-score]')) {
    const traceId = target.dataset.trace;
    if (!state.scores[traceId]) state.scores[traceId] = {};
    const criterion = rubric.find(x => x.id === target.dataset.score);
    const value = Math.max(0, Math.min(criterion.points, Number(target.value) || 0));
    target.value = value; state.scores[traceId][target.dataset.score] = value; saveState();
    const total = document.querySelector('#score-total'); if (total) total.textContent = totalScore(traceId);
  }
}
function handleInput(event) {
  const target = event.target;
  if (target.matches('#lab-html')) { state.lab.html = target.value; saveState(); }
  if (target.matches('#lab-css')) { state.lab.css = target.value; saveState(); }
  if (target.matches('[data-report-field]')) {
    const traceId = state.selectedTrace;
    if (!state.reports[traceId]) state.reports[traceId] = {};
    state.reports[traceId][target.dataset.reportField] = target.value; saveState();
  }
  if (target.matches('[data-oral-note]')) { state.oralNotes[target.dataset.oralNote] = target.value; saveState(); }
}
function setupPwa() {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    if (currentView === 'home') render();
  });
  window.addEventListener('appinstalled', () => notify('CulturaLab è stato installato. I tuoi progressi restano su questo dispositivo.'));
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

function applyLocationRoute() {
  const route = window.location.hash.replace(/^#/, '');
  const [view, lessonId] = route.split('/');
  const validViews = new Set(['home', 'journey', 'lab', 'traces', 'exam', 'oral', 'projects', 'report']);
  let decodedLessonId = '';
  try { decodedLessonId = decodeURIComponent(lessonId || ''); } catch { decodedLessonId = ''; }
  if (view === 'lesson' && lessons.some(lesson => lesson.id === decodedLessonId)) {
    currentLessonId = decodedLessonId;
    currentView = 'lesson';
  } else {
    currentView = validViews.has(view) ? view : 'home';
  }
  render();
}

document.addEventListener('click', handleClick);
document.addEventListener('change', handleChange);
document.addEventListener('input', handleInput);
window.addEventListener('hashchange', applyLocationRoute);
window.addEventListener('popstate', applyLocationRoute);
setupPwa();
applyLocationRoute();
clockInterval = setInterval(() => { if (currentView === 'exam' && state.exam.running) updateTimerDisplay(); }, 1000);
