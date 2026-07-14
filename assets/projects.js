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
    sims: [
      { id:"dj", title:"Biliardo DJ", file:"sim/dj.html",
        desc:"Sonificazione dal vivo delle traiettorie (audio + grafica)",
        status:"online", year:2026 }
    ]
  },

  {
    id: "pendulum",
    title: "PENDULUM",
    subtitle: "Oscillatori non lineari e biforcazioni",
    category: "DYNAMICAL SYSTEMS",
    status: "standby",
    abstract:
      "Pendolo semplice, forzato e doppio. Ritratti di fase, sezioni di " +
      "Poincaré e transizione all'ordine caotico.",
    sims: []   // <-- aggiungi qui le simulazioni quando pronte
  },

  {
    id: "nbp",
    title: "N-BODY PROBLEM",
    subtitle: "Dinamica gravitazionale a molti corpi",
    category: "DYNAMICAL SYSTEMS",
    status: "standby",
    abstract:
      "Problema dei tre corpi e configurazioni periodiche. Integrazione " +
      "numerica e sonificazione delle orbite.",
    sims: []
  }
];
