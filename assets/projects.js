/* ============================================================
   n_c_c_n :: CATALOGO PROGETTI  ——  UNICO FILE DA MODIFICARE
   ------------------------------------------------------------
   Per AGGIUNGERE UNA SIMULAZIONE:
     trova il progetto qui sotto e aggiungi una riga in "sims":
       { id:"v3", title:"Titolo", desc:"descrizione breve",
         file:"sim/nome.html", status:"online", year:2026 }
     poi metti il file HTML dentro la cartella del progetto.

   Per AGGIUNGERE UN PROGETTO NUOVO (fino a 30-50 senza cambiare niente):
     1) copia la cartella "pendulum" e rinominala (es. "lorenz")
     2) aggiungi un blocco qui sotto con lo stesso "id" della cartella
     3) fine. La homepage e la pagina si costruiscono da sole.

   status ammessi:  "online" | "standby" | "wip"
   ============================================================ */

window.PROJECTS = [
  {
    id: "billiard",
    title: "BILLIARD DYNAMICS",
    subtitle: "Biliardi caotici e sonificazione in tempo reale",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Traiettorie in biliardi convessi e a stadio: da regolari a caotiche. " +
      "Ogni rimbalzo genera una nota; la geometria diventa musica.",
    math:
      "Un biliardo matematico e' una particella che si muove in linea retta e " +
      "rimbalza in modo speculare (angolo di incidenza = angolo di riflessione) sul " +
      "bordo di una regione piana. Introdotti da G. D. Birkhoff (1927), sono il " +
      "modello piu' semplice di transizione ordine->caos: nel cerchio e nell'ellisse " +
      "il moto e' integrabile (esiste una quantita' conservata oltre all'energia), " +
      "mentre nello stadio di Bunimovich (1974) e' completamente caotico ed ergodico. " +
      "Ogni rimbalzo si descrive con due numeri: la posizione s lungo il bordo e la " +
      "componente tangenziale p della velocita' — la mappa di Birkhoff (s,p), che qui " +
      "diventa altezza della nota e accento.",
    sims: [
      { id:"dj", title:"Biliardo DJ", file:"sim/dj.html",
        desc:"Sonificazione dal vivo delle traiettorie (audio + grafica)",
        status:"online", year:2026 },
      { id:"dj2", title:"Biliardo DJ · 3 palline", file:"sim/dj2.html",
        desc:"Tre palline con strumenti, due basi ritmiche, wobble e pannello Birkhoff",
        status:"online", year:2026 }
    ]
  },

  {
    id: "pendulum",
    title: "PENDULUM",
    subtitle: "Oscillatori non lineari e biforcazioni",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Pendolo semplice, forzato e doppio. Ritratti di fase, sezioni di " +
      "Poincaré e transizione all'ordine caotico.",
    math:
      "Il pendolo doppio e' un'asta appesa a un'altra asta, sotto gravita'. Le sue " +
      "equazioni del moto si ricavano dalla meccanica di Lagrange (fine '700) e " +
      "coinvolgono due angoli. Il sistema e' deterministico ma NON integrabile: " +
      "sopra una certa energia diventa caotico e due condizioni iniziali vicine " +
      "divergono in modo esponenziale (esponente di Lyapunov positivo). E' l'esempio " +
      "da manuale di sensibilita' alle condizioni iniziali — il classico 'effetto " +
      "farfalla'. Qui i passaggi degli angoli dal punto piu' basso generano le note.",
    sims: [
      { id:"dj", title:"Pendolo DJ", file:"sim/dj.html",
        desc:"Pendoli doppi caotici: spinta e forzante esterna, tre voci dagli angoli",
        status:"online", year:2026 }
    ]
  },

  {
    id: "nbp",
    title: "N-BODY PROBLEM",
    subtitle: "Dinamica gravitazionale a molti corpi",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Problema dei tre corpi e configurazioni periodiche. Integrazione " +
      "numerica e sonificazione delle orbite.",
    math:
      "Il problema degli N corpi chiede il moto di N masse che si attraggono per la " +
      "sola gravita' di Newton (1687). Per N=2 e' risolto esattamente (le orbite di " +
      "Keplero); per N>=3 H. Poincaré (1890) dimostro' che non esiste una formula " +
      "generale e scopri' cosi' il caos deterministico. Restano pero' soluzioni " +
      "periodiche notevoli: i punti di Lagrange e la celebre orbita a 'figura-otto' di " +
      "Chenciner–Montgomery (2000). Qui l'integrazione e' numerica con una gravita' " +
      "ammorbidita; gli avvicinamenti ravvicinati tra i corpi diventano note.",
    sims: [
      { id:"dj", title:"N-body DJ", file:"sim/dj.html",
        desc:"Gravità a N corpi: avvicinamenti sonori e un drone per corpo",
        status:"online", year:2026 }
    ]
  }
];
