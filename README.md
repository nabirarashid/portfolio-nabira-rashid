# nabira's cafe

[nabirarashid.com](https://nabirarashid.com) — a personal site set out like a café menu. React, Vite, TypeScript, Tailwind.

## run

```
npm install
npm run dev
```

`npm run build` fetches the latest Substack posts, builds, and writes a share-card shell per article so links unfurl properly.

## writing

Articles are markdown in `src/content/writing/`. The filename is the URL (`keep-something-real.md` → `/writing/keep-something-real`). Copy `_template.md` to start one by hand, or pull everything from Substack:

```
npm run import:substack
```

New posts only; `--force` rewrites all of them.

## projects

`src/data/projects.ts`. The home page shows three at random; `/projects` shows the lot.
