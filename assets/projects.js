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
    subtitle_en: "Chaotic billiards and real-time sonification",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Traiettorie in biliardi convessi e a stadio: da regolari a caotiche. " +
      "Ogni rimbalzo genera una nota; la geometria diventa musica.",
    abstract_en:
      "Trajectories in convex and stadium billiards: from regular to chaotic. " +
      "Every bounce generates a note; the geometry becomes music.",
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
    math_en:
      "A mathematical billiard is a particle moving in a straight line and reflecting " +
      "specularly (angle of incidence = angle of reflection) off the boundary of a " +
      "planar region. Introduced by G. D. Birkhoff (1927), they are the simplest model " +
      "of the order->chaos transition: in a circle or ellipse the motion is integrable " +
      "(there is a conserved quantity besides energy), while in the Bunimovich stadium " +
      "(1974) it is fully chaotic and ergodic. Each bounce is described by two numbers: " +
      "the position s along the boundary and the tangential component p of the velocity " +
      "— the Birkhoff map (s,p), which here becomes note pitch and accent.",
    sims: [
      { id:"dj", title:"Biliardo DJ", title_en:"Billiard DJ", file:"sim/dj.html",
        desc:"Sonificazione dal vivo delle traiettorie (audio + grafica)",
        desc_en:"Live sonification of the trajectories (audio + graphics)",
        status:"online", year:2026 },
      { id:"dj2", title:"Biliardo DJ · 3 palline", title_en:"Billiard DJ · 3 balls", file:"sim/dj2.html",
        desc:"Tre palline con strumenti, due basi ritmiche, wobble e pannello Birkhoff",
        desc_en:"Three balls with instruments, two drum bases, wobble and a Birkhoff panel",
        status:"online", year:2026 }
    ]
  },

  {
    id: "pendulum",
    title: "PENDULUM",
    subtitle: "Oscillatori non lineari e biforcazioni",
    subtitle_en: "Nonlinear oscillators and bifurcations",
    credit: "da un'idea di Federico Munini",
    credit_en: "from an idea by Federico Munini",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Pendolo semplice, forzato e doppio. Ritratti di fase, sezioni di " +
      "Poincaré e transizione all'ordine caotico.",
    abstract_en:
      "Simple, driven and double pendulum. Phase portraits, Poincaré " +
      "sections and the transition to chaos.",
    math:
      "Il pendolo doppio e' un'asta appesa a un'altra asta, sotto gravita'. Le sue " +
      "equazioni del moto si ricavano dalla meccanica di Lagrange (fine '700) e " +
      "coinvolgono due angoli. Il sistema e' deterministico ma NON integrabile: " +
      "sopra una certa energia diventa caotico e due condizioni iniziali vicine " +
      "divergono in modo esponenziale (esponente di Lyapunov positivo). E' l'esempio " +
      "da manuale di sensibilita' alle condizioni iniziali — il classico 'effetto " +
      "farfalla'. Qui i passaggi degli angoli dal punto piu' basso generano le note.",
    math_en:
      "The double pendulum is a rod hanging from another rod, under gravity. Its " +
      "equations of motion follow from Lagrangian mechanics (late 1700s) and involve " +
      "two angles. The system is deterministic but NOT integrable: above a certain " +
      "energy it becomes chaotic, and two nearby initial conditions diverge " +
      "exponentially (positive Lyapunov exponent). It is the textbook example of " +
      "sensitivity to initial conditions — the classic 'butterfly effect'. Here the " +
      "arms passing through the lowest point generate the notes.",
    sims: [
      { id:"dj", title:"Pendolo DJ", title_en:"Pendulum DJ", file:"sim/dj.html",
        desc:"Pendoli doppi caotici: spinta e forzante esterna, tre voci dagli angoli",
        desc_en:"Chaotic double pendulums: impulse and external drive, three voices from the angles",
        status:"online", year:2026 }
    ]
  },

  {
    id: "lorenz",
    title: "LORENZ ATTRACTOR",
    subtitle: "Caos deterministico e le due ali della farfalla",
    subtitle_en: "Deterministic chaos and the butterfly's two wings",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "L'attrattore di Lorenz: la traiettoria si avvolge attorno a un'ala, " +
      "poi salta sull'altra. Ogni avvolgimento diventa una nota.",
    abstract_en:
      "The Lorenz attractor: the trajectory winds around one wing, then jumps " +
      "to the other. Every winding becomes a note.",
    math:
      "Il sistema di Lorenz (E. N. Lorenz, 1963) e' un modello semplificato della " +
      "convezione atmosferica: tre equazioni differenziali in x, y, z con i parametri " +
      "sigma, rho, beta. Per i valori classici (sigma=10, rho=28, beta=8/3) le soluzioni " +
      "non convergono a un punto ne' a un ciclo, ma si addensano su un ATTRATTORE STRANO " +
      "a forma di farfalla: la traiettoria si avvolge attorno a un'ala per qualche giro " +
      "e poi salta imprevedibilmente sull'altra. E' l'esempio storico del caos " +
      "deterministico e della sensibilita' alle condizioni iniziali (l''effetto " +
      "farfalla'). Qui ogni avvolgimento — un massimo locale di z — genera una nota, " +
      "l'ala (segno di x) sceglie il tema, e i salti tra le ali scandiscono il ritmo.",
    math_en:
      "The Lorenz system (E. N. Lorenz, 1963) is a simplified model of atmospheric " +
      "convection: three differential equations in x, y, z with parameters sigma, rho, " +
      "beta. For the classic values (sigma=10, rho=28, beta=8/3) the solutions converge " +
      "neither to a point nor to a cycle, but settle onto a butterfly-shaped STRANGE " +
      "ATTRACTOR: the trajectory winds around one wing for a few loops and then jumps " +
      "unpredictably to the other. It is the historic example of deterministic chaos and " +
      "sensitivity to initial conditions (the 'butterfly effect'). Here every winding — " +
      "a local maximum of z — generates a note, the wing (sign of x) selects the theme, " +
      "and the jumps between wings drive the rhythm.",
    sims: [
      { id:"dj", title:"Lorenz DJ", title_en:"Lorenz DJ", file:"sim/dj.html",
        desc:"Sonificazione dal vivo dell'attrattore: due temi per le due ali, batteria pilotata dai giri",
        desc_en:"Live sonification of the attractor: two themes for the two wings, drums driven by the windings",
        status:"online", year:2026 }
    ]
  },

  {
    id: "nbp",
    title: "N-BODY PROBLEM",
    subtitle: "Dinamica gravitazionale a molti corpi",
    subtitle_en: "Gravitational dynamics of many bodies",
    category: "DYNAMICAL SYSTEMS",
    status: "online",
    abstract:
      "Problema dei tre corpi e configurazioni periodiche. Integrazione " +
      "numerica e sonificazione delle orbite.",
    abstract_en:
      "The three-body problem and periodic configurations. Numerical " +
      "integration and sonification of the orbits.",
    math:
      "Il problema degli N corpi chiede il moto di N masse che si attraggono per la " +
      "sola gravita' di Newton (1687). Per N=2 e' risolto esattamente (le orbite di " +
      "Keplero); per N>=3 H. Poincaré (1890) dimostro' che non esiste una formula " +
      "generale e scopri' cosi' il caos deterministico. Restano pero' soluzioni " +
      "periodiche notevoli: i punti di Lagrange e la celebre orbita a 'figura-otto' di " +
      "Chenciner–Montgomery (2000). Qui l'integrazione e' numerica con una gravita' " +
      "ammorbidita; gli avvicinamenti ravvicinati tra i corpi diventano note.",
    math_en:
      "The N-body problem asks for the motion of N masses attracting each other " +
      "through Newtonian gravity alone (1687). For N=2 it is solved exactly (Kepler " +
      "orbits); for N>=3 H. Poincaré (1890) proved there is no general formula and thus " +
      "discovered deterministic chaos. Yet remarkable periodic solutions remain: the " +
      "Lagrange points and the famous 'figure-eight' orbit of Chenciner–Montgomery " +
      "(2000). Here the integration is numerical with softened gravity; the close " +
      "approaches between bodies become notes.",
    sims: [
      { id:"dj", title:"N-body DJ", title_en:"N-body DJ", file:"sim/dj.html",
        desc:"Gravità a N corpi: avvicinamenti sonori e un drone per corpo",
        desc_en:"N-body gravity: sonified close approaches and a drone per body",
        status:"online", year:2026 }
    ]
  }
];
