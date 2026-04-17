# Interviu Senior React Developer — Potențial Team Lead

**Durată estimată:** 75–90 min
**Structură:** tehnic (~55%) + leadership (~35%) + Q&A candidat (~10%)

---

## 1. Warm-up & Context (5 min)

**Q1:** Povestește-mi despre cel mai complex proiect React la care ai lucrat. Ce rol ai avut și care au fost cele mai grele decizii tehnice?
**A1:** Caut: scale-ul proiectului (echipă, useri, complexitate), ownership clar (nu doar „am contribuit"), decizii concrete cu trade-offs (nu „am ales X pentru că e popular"). Red flag: răspuns vag, nu poate explica *de ce* a ales ceva. Green flag: vorbește despre constrângeri, alternative considerate, ce ar face diferit acum.

---

**Q2:** De ce cauți o schimbare acum și ce te atrage la un rol cu componentă de team lead?
**A2:** Caut motivații constructive (creștere, impact, mentorat), nu doar fugă de ceva. Pentru team lead: să menționeze că îi place să ajute alții, nu doar „vreau promovare". Red flag: vorbește negativ despre colegi/manageri fără nuanță.

---

## 2. JavaScript — Fundamente (10–15 min)

**Q1:** Explică event loop-ul în JS. Care e diferența între microtasks și macrotasks și de ce contează în practică?
**A1:** Call stack → Web APIs → task queue (macrotasks: setTimeout, setInterval, I/O) și microtask queue (Promises, queueMicrotask, MutationObserver). După fiecare task sincron, se golește *întreaga* coadă de microtasks înainte de următorul macrotask. Contează pentru ordinea execuției async și evitarea blocajelor UI.

**Exercițiu — cere candidatului să prezică output-ul:**
```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

queueMicrotask(() => console.log('4'));

console.log('5');

// Output corect: 1, 5, 3, 4, 2
// Sincron întâi (1, 5), apoi TOATE microtasks (3, 4), apoi macrotask (2)
```

---

**Q2:** Ce este un closure și dă-mi un exemplu real unde l-ai folosit intenționat (nu accidental).
**A2:** O funcție care „reține" accesul la variabilele din scope-ul în care a fost definită. Exemple așteptate: factory functions, data privacy, memoization, custom hooks. Red flag: doar definiția de manual, fără exemplu real.

**Exemplu așteptat — data privacy cu factory:**
```js
function createCounter(initial = 0) {
  let count = initial; // privat — nu există acces în afară
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.count;       // undefined — nu se poate accesa direct
```

**Bonus — capcană clasică cu `var` în loop:**
```js
// ❌ Printează 3, 3, 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// ✅ Cu `let` fiecare iterație are propriul closure: 0, 1, 2
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

---

**Q3:** Care e diferența între `Promise.all`, `Promise.allSettled`, `Promise.race` și `Promise.any`?
**A3:**
- `all` — toate reușesc sau respinge la primul fail (fail-fast)
- `allSettled` — așteaptă toate, returnează status pentru fiecare
- `race` — primul care se rezolvă *sau* respinge (timeout pattern)
- `any` — primul care *reușește* (fallback pattern)

**Exemple concrete:**
```js
// all — pagină care ARE NEVOIE de toate pentru a se randa
const [user, permissions, config] = await Promise.all([
  fetchUser(),
  fetchPermissions(),
  fetchConfig(),
]);

// allSettled — dashboard cu widget-uri independente
const results = await Promise.allSettled([
  fetchRevenue(),
  fetchActiveUsers(),
  fetchErrors(),
]);
results.forEach((r, i) => {
  if (r.status === 'fulfilled') renderWidget(i, r.value);
  else renderError(i, r.reason);
});

// race — timeout pattern
const data = await Promise.race([
  fetchData(),
  new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000)),
]);

// any — fallback la mai multe CDN-uri
const asset = await Promise.any([
  fetch('https://cdn1.com/file'),
  fetch('https://cdn2.com/file'),
  fetch('https://cdn3.com/file'),
]);
```

---

**Q4:** Implementează `debounce`. Care e diferența față de `throttle` și când folosești fiecare?
**A4:** Debounce: amână execuția până nu mai vin apeluri timp de X ms (search input). Throttle: garantează execuție la fiecare X ms maxim (scroll tracking). Bonus dacă menționează leading/trailing edge.

```js
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, delay) {
  let lastCall = 0;
  let timeout;
  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastCall);
    if (remaining <= 0) {
      lastCall = now;
      fn.apply(this, args);
    } else if (!timeout) {
      // trailing edge — asigură că ultima valoare nu e pierdută
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// Use case: search bar → debounce (așteaptă să termine utilizatorul)
input.addEventListener('input', debounce(e => search(e.target.value), 300));

// Use case: scroll tracking → throttle (rate limiting)
window.addEventListener('scroll', throttle(trackScroll, 100));
```

---

**Q5:** Dă-mi exemple de memory leaks comune în JS/React și cum le previi.
**A5:** Event listeners neșterse, intervale fără cleanup, subscriptions neînchise, closures care țin referințe mari.

```jsx
// ❌ LEAK — listener rămâne după unmount
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ❌ LEAK — setState pe componentă unmount-ată
useEffect(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(setData); // dacă unmount-ează între timp → warning + leak
}, []);

// ✅ Cu AbortController
useEffect(() => {
  const ctrl = new AbortController();
  fetch('/api/data', { signal: ctrl.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });
  return () => ctrl.abort();
}, []);

// ❌ LEAK — interval pierdut
useEffect(() => {
  setInterval(poll, 1000);
}, []);

// ✅
useEffect(() => {
  const id = setInterval(poll, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 3. React & Ecosistem (15–20 min)

**Q1:** Explică-mi regulile dependency array în `useEffect`. Când e legitim să omiți o dependență?
**A1:** Tot ce e folosit în effect și vine din render scope trebuie să fie în array. Excepții: setters (stabili), refs, funcții memoizate. *Niciodată* nu minți array-ul. Green flag: de multe ori un `useEffect` nu ar trebui să existe deloc.

```jsx
// ❌ Lipsă dep — userId stale
useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);

// ✅ Corect
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

// ❌ Effect inutil — derivă state din props
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// ✅ Calcul direct în render — fără effect, fără state
const fullName = `${first} ${last}`;

// ❌ Effect pentru a sincroniza state cu props
const [selected, setSelected] = useState(defaultId);
useEffect(() => {
  setSelected(defaultId);
}, [defaultId]);

// ✅ Folosește `key` pentru a reseta componenta sau recalculează derivat
```

---

**Q2:** Când ar trebui să folosești `useMemo` și `useCallback` și când e premature optimization?
**A2:** Pentru calcule chiar scumpe, stabilizare referință pentru `React.memo` children sau dependency arrays. Nu le pune automat pe tot — au cost propriu. React Compiler (React 19) face mult din asta automat.

```jsx
// ❌ Inutil — e O(1)
const double = useMemo(() => x * 2, [x]);

// ❌ Inutil — Button nu e memoizat, re-render oricum
const handleClick = useCallback(() => doThing(), []);
return <Button onClick={handleClick} />;

// ✅ Legitim — calcul greu pe listă mare
const filtered = useMemo(
  () => hugeList.filter(complexPredicate).sort(expensiveCompare),
  [hugeList]
);

// ✅ Legitim — stabilizare pentru child memoizat
const handleSelect = useCallback((id) => {
  dispatch({ type: 'select', id });
}, []);
return <MemoizedBigList onSelect={handleSelect} />;

// ✅ Legitim — obiect ca dependency în alt effect
const query = useMemo(() => ({ userId, filter }), [userId, filter]);
useEffect(() => { fetchData(query); }, [query]);
```

---

**Q3:** Cum funcționează reconciliation în React? De ce `key` contează și ce e greșit cu `key={index}`?
**A3:** React compară tree-uri element cu element, pe aceeași poziție și tip. `key` spune React care element e „același" între renders. `key={index}` e ok doar pe liste statice. Altfel: state intern se leagă de poziție, nu de item → bug-uri subtile.

```jsx
// ❌ Șterge primul item → inputurile rămase își păstrează textul
// în poziție, nu împreună cu item-ul corect
{todos.map((todo, i) => (
  <input key={i} defaultValue={todo.text} />
))}

// ✅ State-ul inputului rămâne legat de todo-ul corect
{todos.map((todo) => (
  <input key={todo.id} defaultValue={todo.text} />
))}
```

---

**Q4:** Context API vs Redux vs Zustand vs React Query — cum alegi?
**A4:** Nu sunt înlocuitoare 1:1. **Server state** → React Query / SWR. **Client state simplu** → Context sau Zustand. **Client state complex** → Zustand / Redux Toolkit. **Formulare** → React Hook Form.

```jsx
// ❌ Reinventat — lipsește cache, dedup, revalidation, retry
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  // ...
}

// ✅ React Query — toate gratis: cache, dedup, retry, stale-while-revalidate
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
  // ...
}

// ✅ Zustand — client state global simplu
const useCartStore = create((set) => ({
  items: [],
  add: (item) => set(state => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] }),
}));

// Selector previne re-render inutil
const itemCount = useCartStore(state => state.items.length);
```

---

**Q5:** Ce probleme de performanță are Context API și cum le rezolvi?
**A5:** Orice consumer re-renderează la orice schimbare de value. Soluții: split pe domeniu, separat state/dispatch, memoize value, sau migrare la Zustand.

```jsx
// ❌ Toți consumerii re-renderează când se schimbă theme,
// chiar dacă folosesc doar user
<AppContext.Provider value={{ user, setUser, theme, setTheme }}>
  <App />
</AppContext.Provider>

// ✅ Split pe domeniu
<UserContext.Provider value={userValue}>
  <ThemeContext.Provider value={themeValue}>
    <App />
  </ThemeContext.Provider>
</UserContext.Provider>

// ✅ Separă state de dispatch — componentele care doar dispatch
// nu re-renderează la schimbări de state
<StateContext.Provider value={state}>
  <DispatchContext.Provider value={dispatch}>
    <App />
  </DispatchContext.Provider>
</StateContext.Provider>

// ✅ Memoize value ca să nu creezi obiect nou la fiecare render
const value = useMemo(() => ({ user, setUser }), [user]);
```

---

**Q6:** Explică-mi Server Components vs SSR clasic. Ce avantaje aduc RSC în Next.js App Router?
**A6:** SSR clasic trimite HTML + hidratează cu tot JS-ul componentelor. RSC rulează *doar* pe server, NU ajung în bundle client, pot face fetch direct. Limite: fără state, fără event handlers. Pattern: RSC pentru structură + Client Components cu `"use client"` pentru interactivitate.

```tsx
// app/posts/[id]/page.tsx — Server Component (default în App Router)
import { db } from '@/lib/db';
import { LikeButton } from './LikeButton';

export default async function PostPage({ params }) {
  // Fetch direct din DB, fără API layer, fără a ajunge în bundle client
  const post = await db.post.findUnique({ where: { id: params.id } });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Componentă interactivă izolată */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}

// app/posts/[id]/LikeButton.tsx — Client Component
'use client';

import { useState } from 'react';

export function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button onClick={() => setLikes(l => l + 1)}>
      ❤️ {likes}
    </button>
  );
}
```

---

**Q7:** Cum proiectezi un custom hook? Dă-mi un exemplu pe care l-ai scris și care a fost reutilizat.
**A7:** Naming convention, API clar documentat, gestionare corectă a cleanup și race conditions, testabilitate.

```tsx
// Exemplu solid — useDebouncedValue
function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cancel la orice schimbare
  }, [value, delay]);

  return debounced;
}

// Usage — search fără să batem API la fiecare literă
function SearchBar() {
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query, 400);

  const { data } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => searchApi(debounced),
    enabled: debounced.length > 2,
  });

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// Bonus — useAsync cu race condition safe
function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{
    data?: T; error?: Error; loading: boolean;
  }>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true });
    fn()
      .then(data => { if (!cancelled) setState({ data, loading: false }); })
      .catch(error => { if (!cancelled) setState({ error, loading: false }); });
    return () => { cancelled = true; };
  }, deps);

  return state;
}
```

---

## 4. Arhitectură & Design Decisions (10–15 min)

**Q1:** Cum structurezi folderele pentru o aplicație React mare? Feature-based vs type-based?
**A1:** Feature-based aproape întotdeauna câștigă la scale. Layer `/shared` pentru cross-feature. Reguli clare de dependențe.

```
src/
  app/                    # routing, providers, entry point
    providers.tsx
    router.tsx
  features/               # logic de business, organizată pe domeniu
    checkout/
      components/
      hooks/
      api/
      types.ts
      index.ts            # barrel — public API al feature-ului
    auth/
      components/
      hooks/
      api/
      index.ts
    dashboard/
      ...
  shared/                 # cross-feature, fără logic de business
    ui/                   # design system (Button, Input, Modal)
    hooks/                # useDebouncedValue, useMediaQuery
    utils/
    api/                  # axios instance, interceptors
  pages/                  # compoziție de features pentru routing
```

Reguli ESLint pentru a impune boundaries:
```js
// .eslintrc — interzice import cross-feature
{
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [{
        target: './src/features/checkout',
        from: './src/features',
        except: ['./checkout'],
      }],
    }],
  },
}
```

---

**Q2:** Când ai recomanda micro-frontends și când e o greșeală?
**A2:** Ok când: echipe mari independente, tech stacks diferite, deploy-uri independente critice. Greșeală când: echipă mică, domeniu cuplat, fără infrastructură. Costuri reale: shared state, duplicare bundle, UX consistency, debugging.

Matrice scurtă de decizie:

| Situație                          | Micro-frontends? |
|-----------------------------------|------------------|
| Echipă 5-15 oameni, un produs     | ❌ nu            |
| 3+ echipe, domenii separate       | ✅ considerabil  |
| Trebuie un design system comun    | ⚠️ cost mare     |
| Legacy app + modul nou izolat     | ✅ bună strategie|
| Deploy rapid e prioritate business| ✅ da            |

---

**Q3:** Ai o aplicație care crește rapid și build-ul durează 4 minute. Care e abordarea ta?
**A3:** Măsoară întâi. Pași: profile build, code splitting, schimbă tooling (Vite/Turbopack), cache în CI.

```ts
// vite.config.ts — manual chunks pentru cache eficient
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@mui/material', '@emotion/react'],
          'charts': ['recharts', 'd3'],
        },
      },
    },
  },
});
```
```tsx
// Code splitting pe route
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

---

**Q4:** Cum abordezi TypeScript într-o echipă — strict de la început sau gradual?
**A4:** Strict pe proiect nou. Pe legacy: incremental. Interzice `any` în cod nou (eslint). Tipuri generate din API contracts.

```ts
// ❌ any ascunde erori
function process(data: any) {
  return data.items.map(i => i.name); // runtime error dacă data nu are items
}

// ✅ unknown + narrowing
function process(data: unknown) {
  if (
    data &&
    typeof data === 'object' &&
    'items' in data &&
    Array.isArray(data.items)
  ) {
    return data.items.map((i: { name: string }) => i.name);
  }
  throw new Error('Invalid shape');
}

// ✅ Mai bine — validare la runtime cu zod
import { z } from 'zod';

const DataSchema = z.object({
  items: z.array(z.object({ name: z.string() })),
});

function process(raw: unknown) {
  const data = DataSchema.parse(raw); // type + runtime safety
  return data.items.map(i => i.name);
}

// ✅ Discriminated unions pentru state modelling
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render(state: RequestState<User[]>) {
  switch (state.status) {
    case 'loading': return <Spinner />;
    case 'error': return <ErrorView error={state.error} />; // .error type-safe
    case 'success': return <List users={state.data} />;    // .data type-safe
    case 'idle': return null;
  }
}
```

---

## 5. Performanță & Debugging (10 min)

**Q1:** Un utilizator raportează că o pagină e lentă. Cum abordezi problema sistematic?
**A1:** Reproduce → măsoară obiectiv → identifică tipul (load vs runtime vs fetch) → fix cu A/B de măsurare. Red flag: optimizează fără să măsoare.

```jsx
// 1. React Profiler API — măsoară render times în producție
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) {
    analytics.track('slow-render', { id, phase, duration: actualDuration });
  }
}

<Profiler id="ProductList" onRender={onRender}>
  <ProductList />
</Profiler>
```
```js
// 2. Performance marks pentru operații custom
performance.mark('search-start');
await doSearch();
performance.mark('search-end');
performance.measure('search', 'search-start', 'search-end');
// Vizibil în Chrome DevTools → Performance tab
```
```bash
# 3. Bundle analysis
npx vite-bundle-visualizer
# sau
npx source-map-explorer 'build/static/js/*.js'
```

---

**Q2:** Povestește-mi despre un bug greu pe care l-ai rezolvat recent. Cum ai ajuns la cauză?
**A2:** Caut metodologie (bisect, logging, reproduce minimal), hipoteze testate sistematic. Green flag: recunoaște că a avut teorii greșite pe drum.

*(fără cod — răspuns narativ)*

---

**Q3:** Ce sunt Core Web Vitals și cum le optimizezi pentru o aplicație React?
**A3:** LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift). Monitorizare cu `web-vitals` lib.

```jsx
// CLS — rezervă spațiu pentru imagini ca să nu sară layout-ul
<img src="/hero.jpg" width={1200} height={600} alt="..." />

// INP — desparte update urgent de cel lent cu useTransition
function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // update urgent — input responsive

    startTransition(() => {
      // update lent, non-blocking, interruptible
      setFiltered(items.filter(i => i.name.includes(e.target.value)));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <BigList items={filtered} />
    </>
  );
}

// LCP — preload imagine critică
// <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />

// Monitorizare în producție
import { onCLS, onINP, onLCP } from 'web-vitals';

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
```

---

## 6. Testare & Calitate Cod (5–10 min)

**Q1:** Care e strategia ta de testare pe un proiect React? Ce acoperi cu unit vs integration vs E2E?
**A1:** Majoritatea teste *integration* cu React Testing Library, unit pentru logică pură, E2E (Playwright/Cypress) pentru flow-uri critice. Green flag: „test the behavior, not the implementation".

```jsx
// ❌ Testing implementation details — se sparge la orice refactor
test('setState is called with new value', () => {
  const setState = jest.fn();
  render(<Counter setState={setState} />);
  fireEvent.click(screen.getByText('+'));
  expect(setState).toHaveBeenCalledWith(1);
});

// ✅ Testing behavior — ce vede utilizatorul
test('user can increment counter', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// ✅ Integration — cu MSW pentru API mock
test('shows products after loading', async () => {
  server.use(
    http.get('/api/products', () =>
      HttpResponse.json([{ id: 1, name: 'Book' }])
    )
  );

  render(<ProductPage />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText('Book')).toBeInTheDocument();
});

// ✅ E2E cu Playwright — flow critic de checkout
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products/1');
  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /cart/i }).click();
  await page.getByRole('button', { name: /checkout/i }).click();
  await expect(page.getByText(/order confirmed/i)).toBeVisible();
});
```

---

**Q2:** Ce faci într-un code review? Ce cauți și ce *nu* comentezi?
**A2:** Caut: corectitudine, edge cases, securitate, performanță evidentă, testabilitate, naming. *Nu* comentez preferințe personale fără impact sau style (asta face linter). Tone: întreabă, nu dictează. Distinge clar blocker de nice-to-have.

*(fără cod — răspuns despre proces)*

---

## 7. Leadership & Team Lead Potential (15–20 min)

**Q1:** Ai vreodată mentorat un junior? Povestește-mi un caz concret — ce a mers și ce ai fi făcut diferit.
**A1:** Caut exemple concrete, nu teorie. Green flag: se bucură de progresul altora, ajustează stilul după persoană, recunoaște greșeli proprii. Red flag: „le arăt cum se face și gata".

---

**Q2:** Cum ai aborda primele 60–90 zile ca team lead nou pentru o echipă existentă?
**A2:** (1) Ascultare — 1:1s cu fiecare, (2) nu schimbă nimic major în prima lună, (3) identifică quick wins, (4) construiește credibilitate tehnică livrând ceva, (5) definește împreună cu echipa regulile. Red flag: vine cu „planul meu" de la zi 1.

---

**Q3:** Doi senior developeri din echipa ta au păreri tehnice opuse și blochează un feature. Ce faci?
**A3:** Ascultă separat, formalizează trade-offs în scris, decide pe criterii obiective (cost, risc, deadline, maintainability), ia decizia explicit, documenteaz-o. Green flag: acceptă că uneori *el* trebuie să decidă.

---

**Q4:** Un membru al echipei subperformează de 2 luni. Cum procedezi?
**A4:** Feedback direct și devreme cu exemple concrete, înțelege cauza, plan clar cu așteptări, check-ins dese, escaladare corectă dacă nu merge. Red flag: evită conversația grea sau sare la PIP.

---

**Q5:** PM-ul vrea un feature pentru săptămâna viitoare, tu crezi că durează 3 săptămâni. Cum gestionezi?
**A5:** Descompune: ce e must-have? Versiune MVP? Expune trade-offs în termeni de business, nu tehnici. Decizia e a business-ului, dar bazată pe info corect. Green flag: parteneriat cu PM.

---

**Q6:** Cum echilibrezi tech debt cu feature delivery?
**A6:** Face tech debt vizibil, alocare continuă (20%), boy scout rule, leagă de impact business. Red flag: „avem nevoie de 3 luni de refactoring".

---

**Q7:** Cât cod scrii tu personal ca team lead? Cum decizi când să preiei ceva vs să delegi?
**A7:** Încă scrie cod (30–60%), dar evită path-ul critic. Delegă ce crește pe alții. Preia probleme arhitecturale, research, emergency. Red flag: „fac eu tot că e mai rapid".

---

## 8. Scenarii Behavioral (5–10 min)

**Q1:** Povestește-mi despre un moment în care ai luat o decizie tehnică care s-a dovedit greșită. Ce ai făcut?
**A1:** Onestitate, ownership, ce a învățat, cum a comunicat schimbarea.

---

**Q2:** Cum primești feedback critic? Dă-mi un exemplu recent.
**A2:** Green flag: solicită activ feedback, a schimbat ceva după feedback, nu devine defensiv.

---

**Q3:** Ce nu-ți place într-o echipă / cultură? Ce te face să pleci?
**A3:** Răspunsuri sănătoase: lipsă ownership, micromanagement, decizii fără date, toxic behavior tolerat.

---

## 9. Întrebări din partea candidatului (5 min)

Observă *ce* întreabă — semnalul real de ce contează pentru el/ea.

**Green flag:** procesul de decizie tehnică, așteptări în primele 6 luni, decizii de arhitectură, onboarding, provocări actuale.
**Neutre:** stack, procese, remote policy, compensation, creștere.
**Red flag:** nicio întrebare, doar beneficii, nimic despre muncă sau echipă.

---

## Evaluare finală — cadru rapid

| Dimensiune | Sub așteptări | La nivel | Peste așteptări |
|---|---|---|---|
| JS & React depth | răspunsuri din manual | explică trade-offs | anticipează edge cases, a trăit problemele |
| Arhitectură | știe pattern-uri | alege în funcție de context | gândește la evoluție și cost de întreținere |
| Leadership potential | orientat doar pe cod | se gândește la echipă | deja acționează ca lead informal |
| Comunicare | tehnic-only, defensiv | clar, structurat | adaptează mesajul la audiență |
| Self-awareness | nu recunoaște gap-uri | conștient de limite | cere feedback activ |

**Decizie:** senior confirmat + team lead potential = bifează clar cel puțin 4 din 5 dimensiuni la „la nivel" sau mai sus, cu leadership măcar „la nivel".
