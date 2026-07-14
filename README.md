# n_c_c_n

**Scientific workstation** — raccolta di modelli matematici interattivi
(sistemi dinamici, caos, sonificazione) in stile terminale/workstation anni '90.

Sito statico, nessuna dipendenza esterna, nessun build. Funziona aprendo
`index.html` in un browser e va online su GitHub Pages senza configurazione.

## Struttura

```
n_c_c_n/
├─ index.html            # console principale (menu navigabile da tastiera)
├─ about.html            # colophon
├─ .nojekyll             # dice a GitHub Pages di non ignorare le cartelle
├─ assets/
│  ├─ theme.css          # TEMA (bezel NeXT + schermo CRT a fosfori)
│  ├─ projects.js        # >>> CATALOGO: l'unico file da modificare <<<
│  └─ site.js            # motore: costruisce home e pagine progetto
├─ billiard/
│  ├─ index.html         # pagina modulo (3 righe, uguale per tutti)
│  └─ sim/
│     └─ dj.html         # simulazione (biliardo + sonificazione)
├─ pendulum/
│  └─ index.html
└─ nbp/
   └─ index.html
```

## Aggiungere una simulazione (nessun cambio di struttura)

1. Metti il file HTML nella cartella del progetto, es. `pendulum/sim/forced.html`.
2. Apri `assets/projects.js` e aggiungi UNA riga nell'array `sims` del progetto:

   ```js
   { id:"forced", title:"Pendolo forzato", desc:"biforcazioni e caos",
     file:"sim/forced.html", status:"online", year:2026 }
   ```

Fatto. Homepage e pagina del modulo si aggiornano da sole.

## Aggiungere un progetto nuovo

1. Copia la cartella `pendulum/` e rinominala (es. `lorenz/`).
2. Nel nuovo `index.html` cambia solo l'id: `Site.renderProject('lorenz', ...)`.
3. Aggiungi un blocco in `assets/projects.js` con lo stesso `id` (`"lorenz"`).

Regge comodamente 30–50 moduli con questa struttura.

## Comandi da tastiera (console)

- `↑` / `↓` (o `j` / `k`) — naviga il menu
- `1`–`9` — apri direttamente la voce
- `Invio` — esegui la voce selezionata
- un tasto qualsiasi (o click) salta la sequenza di boot

## Metterlo online su GitHub Pages

Il repository `n_c_c_n` esiste già sul tuo account. Da questa cartella:

```bash
cd n_c_c_n
git init
git add .
git commit -m "Base workstation site"
git branch -M main
git remote add origin https://github.com/<TUO-UTENTE>/n_c_c_n.git
git push -u origin main
```

Poi su GitHub: **Settings → Pages → Build and deployment → Deploy from a branch
→ Branch: `main` / `(root)` → Save**.

Dopo ~1 minuto il sito è online su
`https://<TUO-UTENTE>.github.io/n_c_c_n/`.

Per ogni aggiornamento: `git add . && git commit -m "..." && git push`.
