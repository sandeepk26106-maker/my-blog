/* MyBlog — full article content for all 10 posts.
   Shared by index.html (cards) and post.html (reader).
   Body is HTML string so the reader can render headings, lists, code and quotes. */
window.BLOG_POSTS = [
  {
    id: 1,
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    excerpt:
      "React seekhne ka sahi tareeka — components, props, state aur JSX ko real examples ke saath samjho, theory se zyada code se.",
    author: "Aarav Sharma",
    date: "2026-10-20",
    category: "React",
    readTime: 9,
    cover: "https://picsum.photos/seed/blog1/1200/600",
    body: `
      <p>Har naye developer ka React se pehla safar hota hai <code>Hello World</code> tak, aur dusra safar hota hai "ye sab samajh aaya, ab kya?" — aur yahi pehla confusion hai jahan 90% log ruk jaate hain. Is post me hum aise React ko samjhenge jaise koi dost samjha raha ho: components kya hain, props kaise jaate hain, state kaise rehta hai, aur in sab ka real-life use case kya hai.</p>
      <p>Ek baat clear kar deta hoon — aapko pehle se React expert banna nahi hai. Sirf itna chahiye ki aap confidently ek page bana sakein, aur jab error aaye to panic na karein. Chaliye shuru karte hain.</p>

      <h2>React asal me kya hai? UI ka description, DOM nahi</h2>
      <p>Sabse common confusion ye hai ki log sochte hain React "DOM ko fast banata hai". Galat hai. React DOM ko fast nahi banata — React <strong>DOM ko chharta hai</strong>. Aap React ko batate hain "UI aisi honi chahiye", aur React khud decide karta hai ki asli DOM me kya badalna hai aur kya nahi.</p>
      <p>Yehi reason hai ki React me <code>document.getElementById</code> aur <code>innerHTML</code> ka use discouraged hai. Aap seedha "state badlo" kehte ho, React baaki sambhal leta hai. Ye declarative way of thinking hai — aur isi ko React ka asli superpower kehte hain.</p>
      <blockquote>Socho aap UI ka "photo" bana rahe ho, aur React aapko batata hai ki photo me kya kya badla hai. Bas wahi kaam, har baar.</blockquote>

      <h2>Component: UI ka ek reusable tukda</h2>
      <p>Component React ka sabse important concept hai. Simple words me — ek component ek function hai jo JSX return karti hai. Jaise HTML me aap <code>&lt;div&gt;</code> ya <code>&lt;article&gt;</code> use karte ho, waise hi React me aap apne components banate ho.</p>
      <p>Ek blog card ka structure socho: image, title, excerpt, author, date. Ye sab har post me same rahega, sirf data badlega. Yehi componentize karne ka matlab hai.</p>
      <pre><code>function PostCard({ post }) {
  return (
    &lt;article className="card"&gt;
      &lt;img src={post.cover} alt={post.title} /&gt;
      &lt;h3&gt;{post.title}&lt;/h3&gt;
      <p>{post.excerpt}&lt;/p>
      &lt;span>{post.author} · {post.date}&lt;/span>
    &lt;/article&gt;
  );
}</code></pre>
      <p>Dekhiye kitna saaf hai. Ek baar likha, har jagah use karo. Ise hi kehte hain "write once, use everywhere".</p>

      <h2>Props: parent se child ko data bhejna</h2>
      <p>Props ka matlab hai "properties" — parent component child ko data deta hai, one-way direction me. Child props ko badal nahi sakta, sirf padh sakta hai. Ye rule aapko bug se bachata hai.</p>
      <p>Upar wale example me <code>{ post }</code> ek prop hai. Parent ne ye diya, component ne use kiya. Bas.</p>
      <p>Ek common doubt: "mujhe ek hi component me thoda alag dikhana hai to kya karu?" — yahan conditional rendering ya props destructuring with defaults aata hai:</p>
      <pre><code>function PostCard({ post, featured = false }) {
  return (
    &lt;article className={featured ? "card card--featured" : "card"}&gt;
      {/* ... */}
    &lt;/article&gt;
  );
}</code></pre>

      <h2>State: data jo badalta hai aur UI ko badal deta hai</h2>
      <p>Props read-only hain, state read-write hai. State React ka memory hai — jab value change hoti hai, React us component ko dobara render karta hai. Yehi "reactive" feel hota hai.</p>
      <p>State ko <code>useState</code> se banate hain. Ye ek array return karta hai: current value aur setter.</p>
      <pre><code>const [count, setCount] = useState(0);

function Counter() {
  return (
    &lt;button onClick={() => setCount(count + 1)}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}</code></pre>
      <p>Yahan ek baat dhyan rakho: <code>setCount(count + 1)</code> sahi hai, lekin <code>setCount(count)</code> karna bhool jao — React ko lagta hai value same hai, kuch nahi hua. Isliye functional form use karo jab nayi value purani pe depend kare: <code>setCount(c => c + 1)</code>.</p>
      <p>Ek aur zaroori baat — state ko direct modify mat karo. <code>count = 5</code> likhoge to React ko pata hi nahi chalega. Hamesha <code>setCount</code> use karo.</p>

      <h2>JSX: HTML jaisa JavaScript</h2>
      <p>JSX aapko HTML jaisa syntax deta hai jo JavaScript me convert ho jaata hai. Isliye browser ko seedha JSX nahi samajh aata — isliye build step ya Babel lagta hai.</p>
      <p>JSX ke do rules yaad rakho:</p>
      <ul>
        <li>Ek element return karo — do chahiye to unhe <code>&lt;div&gt;</code> ya <code>&lt;&gt;&lt;/&gt;</code> (Fragment) me wrap karo.</li>
        <li><code>class</code> nahi, <code>className</code> likhte hain. <code>for</code> nahi, <code>htmlFor</code> likhte hain.</li>
      </ul>
      <p>Map aur conditional rendering JSX me bahut natural lagte hain:</p>
      <pre><code>{posts.length === 0 ? (
  &lt;p&gt;No posts yet.&lt;/p&gt;
) : (
  posts.map(post => &lt;PostCard key={post.id} post={post} /&gt;
)}</code></pre>

      <h2>Event handling aur controlled inputs</h2>
      <p>React me click handler <code>onClick</code> hota hai, aur uske andar <code>setState</code> call hoti hai. Form inputs ko "controlled" banane ke liye <code>value</code> aur <code>onChange</code> dono lagate hain:</p>
      <pre><code>const [email, setEmail] = useState("");

&lt;input
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="you@example.com"
/&gt;</code></pre>
      <p>Jaise hi user kuch type karta hai, state update hoti hai, component re-render hota hai. Yehi React ka "controlled component" concept hai — form ka data hamesha React ke paas rehta hai, DOM ke paas nahi.</p>

      <h2>Common galtiyan jo beginners karte hain</h2>
      <ul>
        <li><strong>State directly modify karna</strong> — hamesha setter use karo.</li>
        <li><strong>list me <code>key</code> na dena</strong> — har list item ko stable <code>key</code> do (<code>id</code> best hai, index nahi).</li>
        <li><strong>Hooks ko condition ke andar call karna</strong> — hooks hamesha top level pe call hone chahiye, bina conditions ke.</li>
        <li><strong>Props me function ko bina soche call karna</strong> — <code>onClick={handle()}</code> galat hai, <code>onClick={handle}</code> sahi hai. Pehle call ho jaayega har render pe.</li>
        <li><strong>Event object me <code>target</code> turant use karna</strong> — async code me value pehle se save kar lo.</li>
      </ul>

      <h2>Ek chhota project idea jo sab cover kare</h2>
      <p>Sirf theory padhne se kuch nahi hota. Ek simple <strong>Todo app</strong> banaiye — isme aapko milega:</p>
      <ul>
        <li><strong>State</strong> — todo items ki list</li>
        <li><strong>Props</strong> — har todo row ko parent se data</li>
        <li><strong>Events</strong> — add, delete, toggle complete</li>
        <li><strong>Conditional rendering</strong> — "empty state" jab list khaali ho</li>
        <li><strong>List rendering + keys</strong> — <code>map</code> with <code>key</code></li>
      </ul>
      <p>Chhota rakho, par pura karo. 2 ghante me ban jayega aur React ka concept permanently baith jayega.</p>

      <h2>Summary</h2>
      <p>React ko teen lines me samajh lo: <strong>UI ko components me todo</strong>, <strong>data ko props se bhejo</strong>, <strong>badalne wale data ko state me rakho</strong>. Bas itna hi framework hai. Baaki sab libraries aur patterns hain jo dheere dheere aati hain.</p>
      <p>Agla step: <a href="post.html?slug=react-hooks-cheat-sheet">React Hooks Cheat Sheet</a> — hooks ki complete list ke saath.</p>
    `,
  },
  {
    id: 2,
    slug: "css-grid-in-10-minutes",
    title: "CSS Grid in 10 Minutes",
    excerpt:
      "Flexbox ke baad Grid ka asli power — responsive layouts bina ek bhi media query likhe, plus areas aur auto-fit ka practical use.",
    author: "Diya Sharma",
    date: "2026-10-18",
    category: "CSS",
    readTime: 8,
    cover: "https://picsum.photos/seed/blog2/1200/600",
    body: `
      <p>Agar aapne Flexbox seekh liya hai, to Grid aapko "wow" moment deta hai. Flexbox ek dimension (row ya column) pe best hai, lekin Grid do dimensions ko ek saath handle karta hai — rows bhi, columns bhi. Aur sabse khoobsurat baat: <strong>responsive layout bina media query ke</strong>.</p>
      <p>Toh shuru karte hain, ek saath poora Grid.</p>

      <h2>Grid container banana</h2>
      <p>Do cheezein karni hain: parent ko <code>display: grid</code> dena, aur batana ki columns kitne hone chahiye.</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}</code></pre>
      <p><code>repeat(3, 1fr)</code> ka matlab hai "3 columns, har ek equal width, available space ke hisaab se". Yehi line blog cards layout banati hai — 3 column desktop pe.</p>
      <p>Grid ke do important terms: <strong>tracks</strong> (rows/columns ki lines) aur <strong>cells</strong> (jo content unme aata hai). Aur ek rule — <code>gap</code> hamesha use karo, margin se nahi, kyunki gap sirf cells ke beech lagta hai, edges pe nahi.</p>

      <h2>Column aur row control</h2>
      <p>Sirf columns nahi, rows bhi define kar sakte ho:</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}</code></pre>
      <p>Ye classic "sidebar + content + sidebar" layout hai. Yahan <code>1fr</code> beech wale content ko baaki jagah le kar flexibly stretch karne deta hai, jabki 200px wale columns fixed rehte hain. Ek line me poori layout — media query ki zaroorat hi nahi padti.</p>

      <h2>Responsive layout bina media query ke (auto-fit + minmax)</h2>
      <p>Ye Grid ka sabse killer feature hai. Likho:</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}</code></pre>
      <p>Samjho kya ho raha hai: "Har column kam se kam 280px ho, jitni columns fit ho sakein utni bana lo, aur space bharne ke liye stretch karo."</p>
      <ul>
        <li>Mobile (375px) → 1 column</li>
        <li>Tablet (768px) → 2 columns</li>
        <li>Desktop (1280px) → 3 columns</li>
      </ul>
      <p>Ek hi declaration, teen breakpoints, zero media queries. <code>auto-fit</code> khaali tracks ko collapse kar deta hai; <code>auto-fill</code> unhe bharne ki koshish karta hai — cards ki count fixed rakhni ho to <code>auto-fill</code> better hai.</p>
      <p>Sirf columns me flexibility chahiye to shorthand bhi bahut kaam aata hai:</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}</code></pre>

      <h2>Line-based placement: kab, kahan</h2>
      <p>Kabhi specific jagah element rakhna ho (jaise dashboard me sidebar full height), to line numbers se control karo:</p>
      <pre><code>.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "footer  footer";
  gap: 16px;
}
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }</code></pre>
      <p><code>grid-template-areas</code> se layout ASCII art jaisa dikhta hai — padhna aur maintain karna dono easy. Ye zyada tar landing pages aur dashboards me use hota hai.</p>

      <h2>Alignment: justify aur align</h2>
      <p>Flexbox jaisa hi concept, bas naming badli hai:</p>
      <ul>
        <li><code>justify-content</code> — main axis (horizontal by default) me items kahan baithein</li>
        <li><code>align-items</code> — cross axis me items kahan baithein</li>
        <li><code>place-items: center</code> — dono ek saath (shorthand)</li>
        <li><code>place-content: center</code> — poora grid container center me</li>
      </ul>
      <pre><code>.center-box {
  display: grid;
  place-items: center;
  place-content: center;
  min-height: 100vh;
}</code></pre>

      <h2>Spanning aur overlapping</h2>
      <p>Koi card 2 columns wide chahiye? <code>span</code> use karo. Aur overlapping bhi possible hai — same cell me do items rakh sakte ho, Grid unko stack kar deta hai:</p>
      <pre><code>.featured { grid-column: span 2; }
.overlay {
  grid-column: 1 / -1;   /* poori row */
  grid-row: 1 / 3;      /* do rows */
}</code></pre>
      <p>Featured post ko full-width banana ho to <code>grid-column: 1 / -1</code> — ye "1 se last tak" ka shorthand hai.</p>

      <h2>Flexbox ya Grid? Kab kaunsa?</h2>
      <p>Ye confusion sabse zyada hoti hai. Simple rule:</p>
      <ul>
        <li><strong>Grid</strong> — jab layout 2D ho (rows + columns ek saath): page layout, card grids, dashboards, galleries.</li>
        <li><strong>Flexbox</strong> — jab layout 1D ho (ek hi direction): navigation bar, button group, inline icons, tag lists, center karna.</li>
      </ul>
      <p>Dono ek saath bhi use ho sakte hain — page structure Grid se aur header ke andar Flexbox se. Modern CSS me ye bilkul normal hai.</p>

      <h2>Performance aur best practices</h2>
      <ul>
        <li><code>minmax()</code> ke bina <code>1fr</code> bohot thin ho sakta hai — hamesha <code>minmax(0, 1fr)</code> use karo jahan content overflow na kare.</li>
        <li>Grid bahut fast hai — content ki sankhya badhao, columns ko flex karne ki zaroorat nahi.</li>
        <li>Print styles me Grid kaam karta hai, par Flexbox thoda zyada predictable hota hai — dhyan rakho.</li>
        <li>Subgrid (modern browsers me supported) nested layouts ko parent ke saath align karta hai — headers jaise cheezein align karne me bahut kaam aata hai.</li>
      </ul>

      <h2>Summary</h2>
      <p>Grid ko aise samjho jaise table ho — lekin table jaisa rigid nahi. Aap rows aur columns define karte ho, aur browser khud sab arrange karta hai. <code>repeat(auto-fit, minmax(...))</code> seekh lo, 80% layouts usi ek line se ban jayenge.</p>
      <p>Agla padhne layak: <a href="post.html?slug=mastering-flexbox-layouts">Mastering Flexbox Layouts</a>.</p>
    `,
  },
  {
    id: 3,
    slug: "javascript-es2026-features",
    title: "JavaScript ES2026 Features",
    excerpt:
      "Modern JS me kya kya naya aaya — Array.at, Object.groupBy, Promise.any, structuredClone aur aise features jo aapki daily coding easy kar dete hain.",
    author: "Kabir Nair",
    date: "2026-10-15",
    category: "JavaScript",
    readTime: 9,
    cover: "https://picsum.photos/seed/blog3/1200/600",
    body: `
      <p>JavaScript har saal behtar hota hai, aur naye features aksar "cool" lagte hain par kaam me nahi aate. Is post me sirf wahi features rakhe hain jo <strong>roz ki coding me time bachate hain</strong> — har feature ke saath practical example aur "kab use karna hai" bhi.</p>
      <p>Chaliye shuru karte hain, sirf useful cheezein.</p>

      <h2>Array.prototype.at() — last element ka tension khatam</h2>
      <p>Pehle last element nikalne ke liye <code>arr[arr.length - 1]</code> likhte the. Ab <code>at()</code> kaafi clean hai, aur negative index bhi support karta hai:</p>
      <pre><code>const items = ["a", "b", "c", "d"];

items.at(0);   // "a"
items.at(-1);  // "d"  ← last element
items.at(-2);  // "c"  ← second last</code></pre>
      <p>Negative index se aapko wo feel aata hai jo Python me milta hai. Sabse bada faida — <code>arr[arr.length - 1]</code> me agar <code>arr</code> undefined hua to crash ho jata tha, <code>at()</code> par <code>undefined</code> milta hai bina crash kiye. Hmm, chhota difference lagta hai, par production me bahut hota hai.</p>

      <h2>Object.groupBy() — data ko group karna</h2>
      <p>Grouping ke liye pehle manual <code>reduce</code> likhte the. Ab ek built-in method aa gaya hai:</p>
      <pre><code>const orders = [
  { id: 1, city: "Delhi",  total: 500 },
  { id: 2, city: "Mumbai", total: 700 },
  { id: 3, city: "Delhi",  total: 300 },
  { id: 4, city: "Pune",   total: 900 },
];

const byCity = Object.groupBy(orders, order => order.city);
console.log(byCity);
// { Delhi: [...], Mumbai: [...], Pune: [...] }</code></pre>
      <p>Ek aur useful variant: <code>Map.groupBy()</code> — jab key koi object ya array ho to Map use hota hai, kyunki plain object me keys string ban jaati hain:</p>
      <pre><code>const byTag = Map.groupBy(articles, a => a.tags);
byTag.get(["react"]); // same array reference se lookup</code></pre>
      <p>Filtration ke liye <code>Object.groupBy</code> ko <code>filter</code> se combine karna bahut natural lagta hai — pehle filter karo, phir group karo. Ek pure-function style pipeline jo padhne me bhi accha lagta hai.</p>

      <h2>Promise.any() — "pehla successful result"</h2>
      <p>Jab aapko multiple APIs me se jo bhi pehle jawab de, chahiye — tab <code>Promise.any</code> kaam aata hai. Ye <code>Promise.all</code> se bilkul alag hai:</p>
      <pre><code>// Sab ka wait karo, ek fail = sab fail
await Promise.all([fetchA(), fetchB()]);

// Jo pehle success ho, wahi chahiye
const result = await Promise.any([
  fetchFromFastCDN(),
  fetchFromBackup(),
  fetchFromMirror(),
]);</code></pre>
      <p>Ye pattern failover systems me bahut kaam aata hai — 3 alag providers se try karo, jo bhi pehle successful ho uska data lo. <code>Promise.any</code> tab reject hota hai jab <strong>sab</strong> fail ho jaayein, aur error me <code>AggregateError</code> aata hai jisme saari errors hoti hain.</p>
      <blockquote>Rule yaad rakho: <code>Promise.all</code> = sab ka wait, koi ek fail to sab fail. <code>Promise.any</code> = pehla success, sab fail to fail. <code>Promise.allSettled</code> = sabka result chahiye, fail bhi record karke.</blockquote>

      <h2>structuredClone() — deep copy, bina fuss</h2>
      <p>Object copy karne ke liye <code>JSON.parse(JSON.stringify(obj))</code> ek classic hack tha, lekin usme Date, Map, Set, circular references sab barbaad ho jaate the. Ab native deep clone hai:</p>
      <pre><code>const original = { date: new Date(), tags: new Set(["a"]), nested: { x: 1 } };
const copy = structuredClone(original);

copy.nested.x = 99;
original.nested.x; // 1 — copy alag hai</code></pre>
      <p>Functions aur DOM nodes isme clone nahi hote (throw kar deta hai), lekin real-world data structures — arrays, objects, Date, Map, Set — sab perfect handle hote hain. Redux store, form state, cache snapshots — sab me kaam aata hai.</p>

      <h2>Array.fromAsync() — async sequences</h2>
      <p>Async iterables ko array me convert karna pehle manual loop se hota tha. Ab ek line me:</p>
      <pre><code>// Node stream se array
const chunks = await Array.fromAsync(readableStream);

// Paginated API — saare pages ek saath
const allItems = await Array.fromAsync(
  async function* () {
    let page = 1;
    while (true) {
      const res = await fetch(\`/api/items?page=\${page}\`);
      const data = await res.json();
      if (!data.length) break;
      yield* data;
      page++;
    }
  }()
);</code></pre>
      <p>Ye pattern infinite scroll aur bulk export me bahut kaam aata hai — loop ka logic generator me, collection ka kaam built-in ko.</p>

      <h2>RegExp 'v' flag — better unicode support</h2>
      <p>Ab regex me Unicode sets mile hain — <code>[\\p{...}]</code> properties, string literals aur set operations:</p>
      <pre><code>// Emoji ya letter dono match karo
/[\p{Letter}\p{Emoji}]/v.test("Hello 🎉"); // true

// Set difference
/[\p{L}--[aeiou]]/v.test("b"); // true
/[\p{L}--[aeiou]]/v.test("a"); // false</code></pre>
      <p>Agar aap user input validate karte ho (names, tags, search filters), to ye flag aapko lambe <code>if</code> chains se bachata hai.</p>

      <h2>Numeric separators aur BigInt</h2>
      <p>Chhota lekin kaam ka: bade numbers padhne layak ban jaate hain.</p>
      <pre><code>const budget = 1_000_000_000;   // 1 billion, samajh aaya
const huge = 9_007_199_254_740_993n; // BigInt literal</code></pre>
      <p>BigInt ka use crypto, timestamps aur financial calculations me hota hai jahan float precision galti kar deta hai. Dhyan rakho — BigInt aur normal number ko directly mix nahi kar sakte, pehle convert karna padta hai.</p>

      <h2>Error ka <code>cause</code> option</h2>
      <p>Errors me ab original reason attach kar sakte ho — debugging me bahut kaam aata hai:</p>
      <pre><code>try {
  await saveToDb(data);
} catch (err) {
  throw new Error("Could not save order", { cause: err });
}</code></pre>
      <p>Ab logs me dono dikhenge — aapka friendly message aur asli stack trace. Pehle log me sirf "Could not save order" tha aur asli reason kho gaya tha.</p>

      <h2>Promise ke aur helpful additions</h2>
      <ul>
        <li><strong>Promise.withResolvers()</strong> — promise ko resolve/reject functions ke saath resolve karna ho to ab clean API hai (mostly library authors ke liye).</li>
        <li><strong>Array.prototype.findLast() / findLastIndex()</strong> — reverse search, bina <code>reverse()</code> kiye.</li>
        <li><strong>Array.prototype.toSorted() / toReversed() / toSpliced()</strong> — naye methods original array ko <strong>mutate nahi</strong> karte, <code>sort()</code> ki tarah side-effect free.</li>
        <li><strong>Object.hasOwn()</strong> — <code>Object.hasOwn(obj, "key")</code>, prototype chain check kiye bina.</li>
      </ul>

      <h2>Kaise seekhein? Practical tarika</h2>
      <ol>
        <li>MDN ka <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" target="_blank" rel="noreferrer">JavaScript reference</a> browser me bookmark kar lo.</li>
        <li>Har nayi feature ka <code>browser compatibility</code> check karo — enterprise projects me abhi bhi purane browsers hote hain.</li>
        <li>Feature ko try karo <a href="https://caniuse.com" target="_blank" rel="noreferrer">caniuse.com</a> pe.</li>
        <li>Apne <code>eslint</code> config me <code>ecmaVersion</code> update karo, warna linter complain karega.</li>
      </ol>

      <h2>Summary</h2>
      <p>Modern JS ki direction hai: <strong>chhote helpers jo daily kaam simplify karte hain</strong>. Sabse zyada kaam aane wale: <code>at()</code>, <code>Object.groupBy()</code>, <code>Promise.any()</code>, <code>structuredClone()</code> aur <code>Error cause</code>. Inhe aaj se use karna shuru karo — code chhota hoga aur bugs kam honge.</p>
    `,
  },
  {
    id: 4,
    slug: "dark-mode-done-right",
    title: "Dark Mode Done Right",
    excerpt:
      "Sirf background dark karna dark mode nahi hai — CSS variables, color-scheme, flash-free toggle aur proper contrast ke saath sahi tarika.",
    author: "Meera Iyer",
    date: "2026-10-12",
    category: "UX",
    readTime: 8,
    cover: "https://picsum.photos/seed/blog4/1200/600",
    body: `
      <p>Bahut se log dark mode ko sirf itna samajhte hain: background black kar do, text white kar do. Par jab aisa karte ho, toh aadhi se zyada problems aati hain — text chamakta hai, images aankhon me chubhti hain, aur page reload karte hi white flash dikhta hai. Asli dark mode <strong>systematic</strong> hota hai. Chaliye sahi tarika seekhte hain.</p>

      <h2>Step 1: Tokens banao, colors seedha mat likho</h2>
      <p>Sabse bada galti hard-coded colors likhna hai — <code>color: #333</code>, <code>background: #fff</code>. Wahan theme badalna impossible ho jaata hai. Solution hai: <strong>CSS custom properties</strong> (CSS variables).</p>
      <pre><code>:root {
  --bg: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --card: #f9fafb;
  --border: #e5e7eb;
  --accent: #4f46e5;
}

[data-theme="dark"] {
  --bg: #111827;
  --text: #f9fafb;
  --muted: #9ca3af;
  --card: #1f2937;
  --border: #374151;
  --accent: #818cf8;
}</code></pre>
      <p>Ab har jagah <code>var(--text)</code> use karo, hex code nahi. Theme badalna ek attribute toggle ho gaya. Yehi approach Tailwind ke <code>dark:</code> variants aur shadcn/ui jaise systems me hoti hai.</p>
      <p>Tokens design me bhi help karte hain — semantic naam (<code>--surface</code>, <code>--on-surface</code>) rakho, color ka naam nahi (<code>--gray-800</code> nahi). Tab ek din brand color badalna ho to ek jagah change karna kaafi hoga.</p>

      <h2>Step 2: <code>color-scheme</code> set karo</h2>
      <p>Ye chhoti si property bahut bada farak deti hai. Browser ko batati hai ki page ka native UI (scrollbar, form controls, date pickers) kis theme me chahiye:</p>
      <pre><code>:root { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }</code></pre>
      <p>Bina iske dark mode me scrollbar white reh jaata hai, input fields ka default styling odd lagta hai, aur autofill ka background galat dikhta hai. Ek line se sab theek.</p>

      <h2>Step 3: White flash (FOUC) roko</h2>
      <p>Sabse annoying problem — jab user light theme pe hai aur system dark hai, page load hote hi ek white flash dikhta hai. Reason: theme apply hone se pehle browser default white paint kar deta hai.</p>
      <p>Solution: theme <strong>render se pehle</strong> set karo — <code>&lt;head&gt;</code> me ek chhota inline script:</p>
      <pre><code>&lt;head&gt;
&lt;script&gt;
  (function () {
    try {
      var saved = localStorage.getItem("myblog_theme");
      var theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  })();
&lt;/script&gt;
&lt;/head&gt;</code></pre>
      <p>Ye script body render hone se pehle chalti hai, to theme pehle se set hota hai — flash hota hi nahi. Yehi reason hai ki inline scripts ko HTML me turant rakhna hota hai; external file me daaloge to load hone me time lagta hai aur flash aa jaata hai.</p>

      <h2>Step 4: System preference ko respect karo</h2>
      <p>User ne manually koi theme set nahi ki hai, to system ki preference follow karo:</p>
      <pre><code>const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = saved || (prefersDark ? "dark" : "light");</code></pre>
      <p>Ek important rule: <strong>sirf manual toggle se system preference override mat karo</strong>, warna user ki choice har reload pe reset ho jayegi. Manual choice save karo, usse hamesha priority do.</p>

      <h2>Step 5: Toggle button</h2>
      <pre><code>const [theme, setTheme] = useState(getInitialTheme);

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);</code></pre>
      <p><code>getInitialTheme</code> localStorage se saved value lega, warna system preference. Icon bhi usi state se aayega — <code>🌙</code> light mode me (click to go dark), <code>☀️</code> dark mode me. Icon ki <strong>meaning</strong> clear rakhna: "moon" dikha raha hai to matlab "ab dark karo".</p>

      <h2>Contrast sahi rakho</h2>
      <p>Dark mode me sab kuch pure white nahi hona chahiye. Pure white (<code>#fff</code>) text dark background pe <strong>halo</strong> effect deta hai — letters ke aage glow. Isliye better hai halka off-white use karna:</p>
      <pre><code>/* Light theme */
--text: #111827;   /* near-black */
--muted: #6b7280; /* secondary text */

/* Dark theme */
--text: #f9fafb;   /* off-white, not #fff */
--muted: #9ca3af; /* halka grey, readable */</code></pre>
      <p>Contrast ratio ke liye rule: body text minimum <strong>4.5:1</strong>, large text aur UI components ke liye <strong>3:1</strong>. Test karne ke liye koi bhi free contrast checker use karo — dark mode me accent colors bhi adjust karne padte hain, wahi indigo dark bg pe thoda dull lagta hai.</p>

      <h2>Images aur media ko handle karo</h2>
      <p>Bright photos dark UI me aankhon me chubhti hain. Do popular approaches:</p>
      <pre><code>/* 1. Halka dim — safe, subtle */
img { filter: brightness(0.9) contrast(1.05); }

/* 2. Sirf kuch images pe */
[data-theme="dark"] .hero-image { filter: brightness(0.85); }</code></pre>
      <p>Logo aur icons ko filter mat lagao — unhe matlab se badal do. SVG me <code>fill="currentColor"</code> use karo, to theme ke saath apne aap adjust ho jaate hain.</p>

      <h2>Shadows ki jagah borders</h2>
      <p>Light theme me depth dikhane ke liye shadows use hote hain. Dark mode me shadows kaam nahi karte — background hi dark hai, shadow kahan dikhega? Wahan <strong>borders</strong> aur background ka subtle difference use karo:</p>
      <pre><code>/* Light */
.card { box-shadow: 0 1px 3px rgba(0,0,0,.08); border: none; }

/* Dark */
[data-theme="dark"] .card {
  box-shadow: none;
  border: 1px solid var(--border);
  background: var(--card);
}</code></pre>
      <p>Dark mode me cards ko thoda <em>lighter</em> background dena padta hai (jaise <code>#1f2937</code> on <code>#111827</code>) — waise woh main background me ghulne lagte hain.</p>

      <h2>Accessibility checklist</h2>
      <ul>
        <li>Toggle button ka <code>aria-label</code> badalta rahe — "Switch to dark theme" / "Switch to light theme".</li>
        <li>Keyboard se toggle ho, space/enter se bhi — button hona chahiye, div nahi.</li>
        <li><code>prefers-reduced-motion</code> respect karo — theme transition smooth ho to transition ko band kar do.</li>
        <li>Images ke <code>alt</code> text meaningful rakho, decorative images ko <code>alt=""</code>.</li>
        <li>Focus ring dark background pe bhi dikhna chahiye — <code>outline</code> hatao mat.</li>
      </ul>

      <h2>Quick summary</h2>
      <ol>
        <li>CSS variables banao, hard-coded colors hatao</li>
        <li><code>color-scheme</code> set karo</li>
        <li>Head me inline script se flash roko</li>
        <li>System preference ko fallback ke roop me use karo</li>
        <li>Contrast check karo, pure white avoid karo</li>
        <li>Images dim karo, shadows ko borders se replace karo</li>
      </ol>
      <p>Ye sab sath me karne se dark mode "upar se laga diya" wala feel nahi deta — balki bilkul native lagta hai. Apne project me <a href="post.html?slug=getting-started-with-react">React ke saath</a> lagane ke baad dekho kaise lagta hai.</p>
    `,
  },
  {
    id: 5,
    slug: "blog-seo-basics",
    title: "Blog SEO Basics",
    excerpt:
      "Search me aana itna mushkil nahi — meta tags, structured data, sitemap aur fast loading. Practical SEO checklist for developers.",
    author: "Aarav Sharma",
    date: "2026-10-10",
    category: "SEO",
    readTime: 8,
    cover: "https://picsum.photos/seed/blog5/1200/600",
    body: `
      <p>SEO ko log bahut bada topic samajhte hain — keyword research, backlinks, content strategy. Par blog ki growth ke liye 80% kaam <strong>technical basics</strong> se hota hai, jo ek developer khud kar sakta hai. Is post me wo basics bata raha hoon, bina theory ki gaddi ke.</p>

      <h2>Pehle samjho: search engine kaise padhta hai</h2>
      <p>Google ke paas teen steps hain:</p>
      <ol>
        <li><strong>Crawl</strong> — bot aapke page pe aata hai, links follow karta hai</li>
        <li><strong>Index</strong> — content samajh kar store karta hai</li>
        <li><strong>Rank</strong> — user ke query ke against best pages choose karta hai</li>
      </ol>
      <p>Agar crawl ya index stage pe hi atak gaya, to ranking ki baat baad me. Isliye pehle "crawlable aur indexable" banao, phir ranking par dhyan do.</p>

      <h2>1. Title tag — sabse important</h2>
      <p>Har page ka ek unique, descriptive title hona chahiye:</p>
      <pre><code>&lt;title&gt;CSS Grid in 10 Minutes — MyBlog&lt;/title&gt;</code></pre>
      <ul>
        <li>50-60 characters ke andar rakho (mobile pe zyada dikhta nahi)</li>
        <li>Primary keyword shuru me rakho</li>
        <li>Brand name end me</li>
        <li>Har page ka alag ho — duplicate title = disaster</li>
      </ul>

      <h2>2. Meta description</h2>
      <p>Ye snippet me dikhta hai — user ko click karne ka reason yahi deta hai:</p>
      <pre><code>&lt;meta name="description" content="Learn CSS Grid with auto-fit and minmax — responsive layouts without a single media query. Practical examples in 10 minutes." /&gt;</code></pre>
      <p>150-160 characters ka sweet spot hai. Isme keyword naturally daalo, aur ek reason do ki user kyun click kare.</p>

      <h2>3. Canonical URL</h2>
      <p>Ek hi page multiple URLs pe accessible ho (with/without www, trailing slash, parameters) to Google confuse ho jaata hai. Canonical batata hai ki asli page kaunsa hai:</p>
      <pre><code>&lt;link rel="canonical" href="https://myblog.com/posts/css-grid-in-10-minutes" /&gt;</code></pre>
      <p>Agar blog ke multiple domains ho (apne + medium + dev.to mirror), to canonical har jagah apne main domain pe point kare.</p>

      <h2>4. Open Graph aur Twitter Cards</h2>
      <p>Jab koi aapka link WhatsApp/LinkedIn/X pe share kare, to ek attractive preview chahiye:</p>
      <pre><code>&lt;meta property="og:type" content="article" /&gt;
&lt;meta property="og:title" content="CSS Grid in 10 Minutes" /&gt;
&lt;meta property="og:description" content="Responsive layouts without media queries." /&gt;
&lt;meta property="og:url" content="https://myblog.com/posts/css-grid-in-10-minutes" /&gt;
&lt;meta property="og:image" content="https://myblog.com/img/grid-cover.png" /&gt;
&lt;meta property="og:image:width" content="1200" /&gt;
&lt;meta property="og:image:height" content="630" /&gt;

&lt;meta name="twitter:card" content="summary_large_image" /&gt;</code></pre>
      <p><strong>Important:</strong> og:image ki size 1200x630 rakho. Ye ratio LinkedIn aur WhatsApp dono pe accha dikhta hai. Image absolute URL honi chahiye (relative nahi).</p>

      <h2>5. Semantic HTML — free SEO</h2>
      <p>Google ko batane ke liye ki content ka structure kya hai, semantic tags use karo:</p>
      <pre><code>&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;CSS Grid in 10 Minutes&lt;/h1&gt;
    &lt;time datetime="2026-10-18"&gt;October 18, 2026&lt;/time&gt;
  &lt;/header&gt;
  &lt;section&gt;
    &lt;h2&gt;Grid container banana&lt;/h2&gt;
    &lt;p&gt;...&lt;/p&gt;
  &lt;/section&gt;
&lt;/article&gt;</code></pre>
      <ul>
        <li>Ek page pe <strong>ek hi h1</strong></li>
        <li>Headings ka hierarchy: h1 → h2 → h3 (skip mat karo)</li>
        <li>Images me meaningful <code>alt</code></li>
        <li>Links me descriptive text ("yahan click karein" nahi)</li>
        <li>Tables ke liye <code>&lt;th&gt;</code>, lists ke liye <code>&lt;ul&gt;/&lt;ol&gt;</code></li>
      </ul>

      <h2>6. Structured data (JSON-LD)</h2>
      <p>Schema markup se Google ko batata hai ki aapka content kya hai — isse rich results milte hain (star rating, author info, FAQ accordion):</p>
      <pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "CSS Grid in 10 Minutes",
  "author": { "@type": "Person", "name": "Diya Sharma" },
  "datePublished": "2026-10-18",
  "image": "https://myblog.com/img/grid-cover.png"
}
&lt;/script&gt;</code></pre>
      <p>Validation ke liye Google ka <a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">Rich Results Test</a> use karo.</p>

      <h2>7. Sitemap aur robots.txt</h2>
      <p>Sitemap me saare important pages ki list hoti hai. Simple static blog me to ek hi file kaafi hai:</p>
      <pre><code>&lt;!-- public/sitemap.xml --&gt;
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://myblog.com/&lt;/loc&gt;
    &lt;lastmod&gt;2026-10-22&lt;/lastmod&gt;
    &lt;changefreq&gt;weekly&lt;/changefreq&gt;
    &lt;priority&gt;1.0&lt;/priority&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>
      <pre><code># public/robots.txt
User-agent: *
Allow: /
Sitemap: https://myblog.com/sitemap.xml</code></pre>
      <p>Search Console me sitemap submit karna mat bhoolna — bataye bina Google ko naye posts pata hi nahi chalenge.</p>

      <h2>8. Core Web Vitals — speed hi SEO hai</h2>
      <p>Google ranking me speed direct factor hai, aur user experience bhi. Teen main metrics:</p>
      <ul>
        <li><strong>LCP</strong> (Largest Contentful Paint) — main content kitni jaldi dikhta hai. Target: 2.5s se kam</li>
        <li><strong>INP</strong> (Interaction to Next Paint) — click karne ke baad kitni der reaction hota hai. Target: 200ms se kam</li>
        <li><strong>CLS</strong> (Cumulative Layout Shift) — content kitna hilta hai load hote waqt. Target: 0.1 se kam</li>
      </ul>
      <p>Sabse aasan wins:</p>
      <ul>
        <li>Images ko <code>loading="lazy"</code> (first image ko chhod ke) aur <code>width</code>/<code>height</code> attributes dein — CLS fix hota hai</li>
        <li>Fonts ko <code>font-display: swap</code> ke saath load karein</li>
        <li>Sirf jo CSS zaroori hai wahi inline karein, baaki external</li>
        <li>Third-party scripts ko <code>async</code> ya <code>defer</code> se late load karein</li>
      </ul>

      <h2>9. Internal linking</h2>
      <p>Apne posts ko aapas me link karo — reader ko aur content milta hai aur Google ko pata chalta hai ki kaunsa post important hai. Har post ke end me 2-3 "related posts" links rakho (jaise is blog me hai).</p>
      <p>Descriptive anchor text use karo: "CSS Grid guide" likhna behtar hai "yahan click karein" se.</p>

      <h2>10. Ek hi h1, har page pe ek unique title</h2>
      <p>Sabse aam galtiyan: sab pages ka title same, ya multiple h1. Ye dono directly ranking gharati hain. Ek checklist banaiye aur har naye post pe chalaiye.</p>

      <h2>Quick checklist</h2>
      <ul>
        <li>Unique title (50-60 chars) + meta description (150-160)</li>
        <li>Canonical URL</li>
        <li>OG + Twitter card tags, 1200x630 image</li>
        <li>Ek h1, semantic headings, alt texts</li>
        <li>JSON-LD BlogPosting schema</li>
        <li>Sitemap + robots.txt, Search Console me submit</li>
        <li>Fast load, lazy images, no CLS</li>
        <li>2-3 internal links per post</li>
      </ul>
      <p>Ye sab karte hi aapka blog "SEO friendly" ho jaata hai. Uske baad content quality aur backlinks par focus karna — par pehle ye foundation solid karo.</p>
    `,
  },
  {
    id: 6,
    slug: "deploy-react-for-free",
    title: "Deploy React for Free",
    excerpt:
      "Vercel, Netlify, Cloudflare Pages aur GitHub Pages — sabka free tier comparison, setup steps aur real limitations jahan free plan ruk jaata hai.",
    author: "Rohan Verma",
    date: "2026-10-08",
    category: "DevOps",
    readTime: 9,
    cover: "https://picsum.photos/seed/blog6/1200/600",
    body: `
      <p>"Deploy karna kya hai?" — ye sawaal har beginner ke mann me aata hai. Short answer: code ko server pe daalna jahan duniya ke log use karein. Lekin asli sawaal ye hai: <strong>aapka React app static hai ya dynamic?</strong> Isi ek decision se poori hosting strategy decide hoti hai.</p>
      <p>Is post me hum 4 free options compare karenge, unhe step-by-step deploy karenge, aur batayenge ki har ek ke limits kya hain.</p>

      <h2>Pehle samjho: aapka app static hai ya nahi?</h2>
      <p><strong>Static site</strong> = HTML/CSS/JS files jo browser ko directly serve ho jaati hain. No server logic at runtime. Jaise hamara MyBlog — React CDN pe render hota hai, data ek JS file me hai. Ye kisi bhi static host pe 2 minute me live ho jaata hai, aur practically unlimited traffic handle karta hai (CDN ki wajah se).</p>
      <p><strong>Dynamic app</strong> = database, API, user sessions, server-side rendering. Iske liye compute chahiye — free tier milega, par limits ke saath.</p>
      <p>Yeh decide karna pehla kaam hai, kyunki galat host chunne se baad me migrate karna painful hota hai.</p>

      <h2>Option 1: GitHub Pages (sabse simple)</h2>
      <p>Jo humne abhi kiya — repository se direct static site serve. Setup 3 steps:</p>
      <ol>
        <li>Repo me <code>.github/workflows/deploy.yml</code> banao</li>
        <li>Workflow me build + deploy steps likho</li>
        <li>Repo Settings → Pages → Source: GitHub Actions select karo</li>
      </ol>
      <pre><code>name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: "."</code></pre>
      <p><strong>Pros:</strong> Zero config, free, HTTPS automatic, repo ke saath linked (push = deploy).</p>
      <p><strong>Cons:</strong> Sirf static sites, custom domain ke liye DNS configure karna padta hai, no server-side code, no environment secrets wala easy flow (secrets add kar sakte ho par thoda painful).</p>
      <p><strong>Kab chunein:</strong> Docs site, portfolio, personal blog, ya koi bhi pure static project. Hamare blog ke liye perfect.</p>

      <h2>Option 2: Vercel (React ka official favourite)</h2>
      <p>Vercel ka free tier <strong>unlimited</strong> deployments deta hai, har deployment pe automatic SSL, aur Vite/Next.js projects ko zero-config detect kar leta hai.</p>
      <ol>
        <li><a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a> pe sign up (GitHub se best)</li>
        <li>"Add New Project" → apna repo select karo</li>
        <li>Framework: Vite / Other detect kar lete hain</li>
        <li>Deploy — 1-2 minute me live</li>
      </ol>
      <p>Key cheezein jo Vercel accha karta hai:</p>
      <ul>
        <li><strong>Preview deployments</strong> — har pull request ke liye alag URL, review se pehle live dekh lo</li>
        <li><strong>Environment variables</strong> — UI se set karo, secrets safe rehte hain</li>
        <li><strong>Custom domain</strong> — free me SSL ke saath</li>
        <li><strong>Edge functions</strong> — chhoti serverless functions ke liye</li>
      </ul>
      <p>Free tier me <strong>Hobby</strong> plan hai: personal projects ke liye free, commercial use ke liye paid lagega. Serverless function ka execution limit bhi hota hai — heavy backend ke liye paid plan better hai.</p>

      <h2>Option 3: Netlify</h2>
      <p>Netlify bhi similar free tier deta hai, aur uska <strong>Forms</strong> feature bahut useful hai — bina backend ke contact form banana ho to ek line kaafi hai:</p>
      <pre><code>&lt;form name="contact" method="POST" data-netlify="true"&gt;
  &lt;input type="text" name="name" /&gt;
  &lt;input type="email" name="email" /&gt;
  &lt;textarea name="message"&gt;&lt;/textarea&gt;
&lt;/form&gt;</code></pre>
      <p>Netlify Forms, redirects file, edge functions aur deploy previews — sab achha hai. Differences:</p>
      <ul>
        <li>Deploy previews: Netlify zyada generous hai, har branch pe milti hai</li>
        <li>Vercel ka build cache thoda behtar hai, repeated builds faster</li>
        <li>Free bandwidth: dono pe ~100GB/month ke around</li>
        <li>Dono ka free tier me "Hobby" branding add hota hai (chhota footer badge)</li>
      </ul>

      <h2>Option 4: Cloudflare Pages</h2>
      <p>Cloudflare Pages sabse tez hai kyunki Cloudflare ke edge network pe deploy hota hai. Pages ka free tier unlimited static sites deta hai aur bandwidth ke liye koi strict limit nahi hai (reasonable use ke andar).</p>
      <pre><code># wrangler.toml ya dashboard se
pages_build_output_dir = "dist"</code></pre>
      <p>Bonus: Cloudflare Pages Workers se free tier me lightweight serverless functions bhi mil jaate hain — chhoti API ke liye kaafi hain.</p>
      <p>Jab chuna hai: speed aur global reach sabse important ho, ya Cloudflare ki baaki services (Workers, R2 storage, DNS) already use kar rahe ho.</p>

      <h2>Comparison table</h2>
      <p>Sabse aasan decision banane ke liye:</p>
      <table>
        <thead>
          <tr><th>Host</th><th>Best for</th><th>Free tier me kya</th><th>Limitations</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>GitHub Pages</strong></td>
            <td>Pure static sites, docs, personal blog</td>
            <td>Unlimited static hosting, free HTTPS</td>
            <td>Sirf static, no server code, custom domain DNS set karna padta hai</td>
          </tr>
          <tr>
            <td><strong>Vercel</strong></td>
            <td>React / Next.js apps</td>
            <td>Unlimited deployments, preview URLs, env vars</td>
            <td>Hobby plan personal use; functions ka execution limit</td>
          </tr>
          <tr>
            <td><strong>Netlify</strong></td>
            <td>Static sites + forms + team workflows</td>
            <td>Forms, redirects, deploy previews, ~100GB bandwidth</td>
            <td>Hobby branding badge, build minutes limited</td>
          </tr>
          <tr>
            <td><strong>Cloudflare Pages</strong></td>
            <td>Max speed, global CDN</td>
            <td>Unlimited static sites, generous bandwidth, Workers</td>
            <td>Advanced config thoda technical lagta hai</td>
          </tr>
        </tbody>
      </table>
      <p>Teeno (Vercel/Netlify/Cloudflare) ka sabse bada plus: <strong>push karte hi deploy</strong>. Git push → CI/CD → live URL. Ye workflow ek baar set kar lo, phir content push karte hi publish ho jaata hai.</p>

      <h2>Environment variables — secrets kaise handle karein</h2>
      <p>API keys ya database URLs kabhi bhi code me mat daalo. Sabhi hosts me built-in environment variables hote hain:</p>
      <pre><code># .env (local, kabhi commit mat karo)
VITE_API_URL=https://api.myblog.com
VITE_STRIPE_KEY=pk_test_xxx</code></pre>
      <pre><code># .gitignore me zaroor rakho
.env
.env.local
.env.production</code></pre>
      <p>Vercel/Netlify/Cloudflare teeno me Settings → Environment Variables me add karte ho, aur har deploy me inject ho jaate hain. Vite me <code>import.meta.env.VITE_API_URL</code> se access milta hai (sirf <code>VITE_</code> prefix wale expose hote hain).</p>

      <h2>Custom domain kaise lagate hain</h2>
      <ol>
        <li>Domain khareedein (GoDaddy, Namecheap, ya Cloudflare Registrar)</li>
        <li>Host me apna domain add karein</li>
        <li>DNS me CNAME record set karein (Vercel: <code>cname.vercel-dns.com</code>)</li>
        <li>SSL certificate auto issue hota hai — 5 minute me live</li>
      </ol>
      <p>Cloudflare Registrar par domain kharidne se DNS bhi wahin rehta hai, propagation fast hoti hai aur privacy bhi free me milti hai.</p>

      <h2>Deploy ke baad ka checklist</h2>
      <ul>
        <li>Production build hi deploy ho raha hai? (dev build me debug code hota hai)</li>
        <li>Base path sahi hai? (Vite me <code>base: "/repo-name/"</code> chahiye ho sakta hai)</li>
        <li>404 page bana lo — <code>404.html</code> (GitHub Pages ke liye)</li>
        <li>Sitemap aur robots.txt deploy ho rahe hain?</li>
        <li>HTTPS on hai, mixed content warnings nahi hain?</li>
        <li>Analytics/Sentry set up hai?</li>
      </ul>

      <h2>Final recommendation</h2>
      <p>Beginner ho aur React seekh rahe ho → <strong>Vercel</strong>. Sirf static blog/docs ho → <strong>GitHub Pages</strong> ya <strong>Cloudflare Pages</strong>. Forms chahiye bina backend ke → <strong>Netlify</strong>. Speed aur global CDN priority ho → <strong>Cloudflare Pages</strong>.</p>
      <p>Aur sabse important baat: <strong>CDN + auto deploy ka matlab hai ki aap sirf content push karein, baaki system sambhal lega.</strong> Focus content pe rakhiye, infra pe nahi.</p>
    `,
  },
  {
    id: 7,
    slug: "mastering-flexbox-layouts",
    title: "Mastering Flexbox Layouts",
    excerpt:
      "Flexbox ka complete playbook — direction, wrap, alignment, gap, order aur real UI patterns jaise navbar, equal-height cards aur center karna.",
    author: "Diya Sharma",
    date: "2026-10-05",
    category: "CSS",
    readTime: 8,
    cover: "https://picsum.photos/seed/blog7/1200/600",
    body: `
      <p>Flexbox seekhne ka sabse bada problem ye hota hai ki log <code>justify-content</code> aur <code>align-items</code> ko alag-alag yaad karte hain, lekin kaam karte waqt confuse ho jaate hain. Asli samajh ek shabd se aati hai: <strong>main axis</strong> aur <strong>cross axis</strong>.</p>
      <p>Bas ye do shabd samajh lo, Flexbox predictable ho jaata hai.</p>

      <h2>Main axis aur cross axis — yehi sab kuch hai</h2>
      <p>Flex container me do axes hote hain. <code>flex-direction</code> batata hai main axis kahan hai, aur cross axis uske perpendicular hota hai.</p>
      <pre><code>.container { display: flex; }              /* default: row */
.container { flex-direction: column; }   /* vertical */</code></pre>
      <ul>
        <li><code>row</code> (default) → main axis horizontal. <code>justify-content</code> left-right control karta hai, <code>align-items</code> top-bottom.</li>
        <li><code>column</code> → main axis vertical. <code>justify-content</code> top-bottom, <code>align-items</code> left-right.</li>
      </ul>
      <p>Yehi wajah hai ki log mix up karte hain — <code>direction</code> badalte hi <code>justify</code> ka kaam badal jaata hai. <strong>Direction set karo, phir socho main axis kahan hai.</strong></p>

      <h2>Main axis pe: justify-content</h2>
      <p><code>justify-content</code> items ko main axis me distribute karta hai. Ye 5 values sabse zyada use hoti hain:</p>
      <pre><code>justify-content: flex-start;   /* default - shuru me (default row me left) */
justify-content: center;      /* beech me */
justify-content: flex-end;     /* end me (default row me right) */
justify-content: space-between; /* pehla start, last end, beech me space */
justify-content: space-around;  /* har item ke around, edges pe half */
justify-content: space-evenly;  /* har gap equal, edges pe bhi */</code></pre>
      <p><strong>Visual memory trick:</strong> <code>space-between</code> me pehla aur last item edges pe chipke hain, beech me space. <code>space-around</code> me har item ke dono taraf aadha space hai (edges pe aadha). <code>space-evenly</code> me sab equal — edges pe bhi poori.</p>
      <p>Ye teen "space" variants footer aur navigation me bahut kaam aate hain. <code>justify-content: space-between</code> + <code>align-items: center</code> = classic navbar (logo left, links right, dono vertically centered).</p>

      <h2>Cross axis pe: align-items</h2>
      <p><code>align-items</code> items ko cross axis me align karta hai (default <code>stretch</code>):</p>
      <pre><code>align-items: flex-start;
align-items: center;
align-items: flex-end;
align-items: stretch;   /* default - height full kar deta hai */
align-items: baseline;  /* text ki baseline ke hisaab se */</code></pre>
      <p>Sabse useful combos:</p>
      <pre><code>/* Vertical + horizontal center - sabse common */
.center { display: flex; align-items: center; justify-content: center; }

/* Logo left, buttons right */
.navbar { display: flex; align-items: center; justify-content: space-between; }</code></pre>
      <p>Vertical + horizontal center karne ke liye <code>place-content: center</code> bhi likh sakte ho — <code>place-content</code> shorthand hai <code>align-content</code> + <code>justify-content</code> ka. <code>place-items</code> bhi <code>align-items</code> + <code>justify-content</code> ka shorthand hai (jab ek hi container me items ko center karna ho).</p>

      <h2>Flex items ka behaviour</h2>
      <p>Ab items ki properties. Ye teen line sabse zyada kaam aati hain:</p>
      <pre><code>.item {
  flex-grow: 1;    /* free space me kitna badhe (default 0) */
  flex-shrink: 1;  /* space kam ho to kitna ghatke (default 1) */
  flex-basis: auto; /* initial size (default: content size) */
}

/* shorthand */
.item { flex: 1; }        /* grow:1 shrink:1 basis:0% */
.item { flex: 0 0 200px; } /* fixed 200px, na badhe na ghatke */
.item { flex: auto; }      /* grow 1, shrink 1, basis auto */</code></pre>
      <p><code>flex: 1</code> sabse zyada use hota hai — iska matlab "mujhe jitna space mile utna le lo, aur equally baanto". Ye <code>flex: 1 1 0%</code> ka shorthand hai, jismein basis 0 hota hai, isliye content ke size se content ignore hota hai aur space purely equally bat jaata hai. Ye subtle difference bug ka source bhi hota hai: <code>flex: 1</code> vs <code>flex: 1 1 auto</code> — ek width ko content ke hisaab se flex basis deta hai, doosra equal.</p>
      <p>Ek common use case: logo left, spacer, links right — beech me kuch nahi chahiye to ek element <code>flex: 1</code> bana do, baaki naturally end pe chale jayenge.</p>

      <h2>Wrapping — ek line se zyada</h2>
      <p>Default me sab items ek hi line me rahte hain aur shrink ho jaate hain. Wrap allow karo:</p>
      <pre><code>.container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}</code></pre>
      <p><code>flex-wrap: wrap</code> lines wrap ho jaati hain, <code>nowrap</code> (default) sabko ek line me rakhta hai, <code>wrap-reverse</code> ulti wrapping karta hai.</p>
      <p><strong>Note:</strong> <code>gap</code> hamesha better hai margin se — gap sirf items ke beech space deta hai, container ke edges pe nahi, jo wrapper se last row me uneven spacing avoid karta hai.</p>

      <h2>align-self — ek item alag</h2>
      <p>Poore container ko badalne ki jagah ek specific item ko alag align karna ho to <code>align-self</code> use karo:</p>
      <pre><code>.card .badge { align-self: flex-start; }  /* parent ke center me bhi rehta, khud start me */</code></pre>
      <p>Ye rule parent ke <code>align-items</code> ko override karta hai. Flexbox me <code>align-self</code> kaam karta hai, Grid me <code>justify-self</code> / <code>align-self</code> dono alag hote hain.</p>

      <h2>order — visual sequence badlo</h2>
      <p><code>order</code> items ki visual position badalta hai (default 0, chhota number pehle). Ye tab kaam aata hai jab DOM order alag rakhna ho but screen reader ke liye logical order sahi ho:</p>
      <pre><code>.logo { order: -1; }   /* logo ko pehle dikha do */</code></pre>
      <p>Par <strong>dhyan rakho</strong>: <code>order</code> sirf visual order change karta hai, DOM order nahi. Keyboard navigation aur screen readers DOM order follow karte hain — in dono ko mismatch karne se accessibility bug banta hai.</p>

      <h2>Real UI patterns</h2>
      <h3>Pattern 1: Equal height cards</h3>
      <pre><code>.grid { display: flex; flex-wrap: wrap; gap: 16px; }
.card { flex: 1 1 300px; display: flex; flex-direction: column; }
.card .desc { flex: 1; }  /* description badhe, button neeche */</code></pre>
      <p>Yahan <code>flex: 1 1 300px</code> ka matlab — 300px minimum, jitna space mile utna grow, aur cards ki height barabar ho jaati hai kyunki <code>align-items: stretch</code> default hai.</p>

      <h3>Pattern 2: Center karna (2D)</h3>
      <pre><code>.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}</code></pre>
      <p>Grid me ye <code>place-items: center</code> one-liner hai, lekin Flexbox me bhi yehi hai — dono ek line.</p>

      <h3>Pattern 3: Sticky footer</h3>
      <pre><code>body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }        /* content badhe, footer neeche */
footer { /* natural height */ }</code></pre>
      <p>Page chhota ho to footer neeche chipak jaata hai, content lamba ho to normal flow me rehta hai. Classic pattern, har blog me use hota hai.</p>

      <h3>Pattern 4: Space-between with wrapping</h3>
      <pre><code>.tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; }</code></pre>

      <h2>Flexbox vs Grid — final rule</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Flexbox</th><th>Grid</th></tr>
        </thead>
        <tbody>
          <tr><td>Dimensions</td><td>1D (ek axis)</td><td>2D (rows + columns)</td></tr>
          <tr><td>Alignment axis</td><td>Main + cross</td><td>Inline + block</td></tr>
          <tr><td>Item placement</td><td>Order property se</td><td>Line / area se (exact)</td></tr>
          <tr><td>Best for</td><td>Nav, buttons, tag chips, centering</td><td>Page layout, galleries, dashboards</td></tr>
          <tr><td>Responsive trick</td><td>flex-wrap + flex basis</td><td>auto-fit + minmax</td></tr>
        </tbody>
      </table>
      <ul>
        <li><strong>Flexbox</strong> — ek dimension. Navigation, button groups, tag chips, avatar + name, inline lists, centering.</li>
        <li><strong>Grid</strong> — do dimensions. Page layouts, card galleries, dashboards, form grids, magazine-style layouts.</li>
      </ul>
      <p>Ek hi page pe dono perfectly saath chalte hain: page skeleton Grid se, aur har section ke andar Flexbox se.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li><code>justify-content</code> kaam nahi kar raha → check karo ki container me <code>display: flex</code> hai, aur direction kya hai.</li>
        <li>Text truncate nahi ho raha → <code>min-width: 0</code> flex item pe lagao (default <code>min-width: auto</code> content ki wajah se overflow kar deta hai).</li>
        <li>Extra whitespace aakhir me → <code>flex: 1</code> missing hai ya <code>justify-content</code> mix up hai.</li>
        <li>Overflow hidden → <code>flex-shrink: 0</code> ya <code>min-width: 0</code> try karo.</li>
        <li>Wrong item shrink ho raha hai → <code>flex-shrink: 0</code> un items pe jinko size nahi badalna chahiye (icons, buttons).</li>
      </ul>

      <h2>Summary</h2>
      <p>Flexbox ka pura logic ek line me hai: <strong>direction set karo → main axis pe justify → cross axis pe align</strong>. Bas. Ek baar ye clear ho gaya, to har layout 2 minute me ban jaata hai.</p>
      <p>Grid seekhna ho to <a href="post.html?slug=css-grid-in-10-minutes">CSS Grid in 10 Minutes</a> padho.</p>
    `,
  },
  {
    id: 8,
    slug: "react-hooks-cheat-sheet",
    title: "React Hooks Cheat Sheet",
    excerpt:
      "useState se useReducer tak — har hook ka kya kaam hai, kab use karna hai, common pitfalls, aur custom hooks ka sahi tareeka.",
    author: "Kabir Nair",
    date: "2026-10-02",
    category: "React",
    readTime: 10,
    cover: "https://picsum.photos/seed/blog8/1200/600",
    body: `
      <p>Hooks React ka sabse important hissa hain — aur isi wajah se React seekhna mushkil bhi lagta hai, kyunki 10+ hooks hain aur har ek ka apna kaam hai. Is post me hum sabhi hooks ko <strong>kaam ke hisaab se</strong> samjhenge: kaunsa hook kab chahiye, common galtiyan kya hain, aur custom hooks kab likhne chahiye.</p>

      <h2>Rules of Hooks — pehle ye</h2>
      <p>Do rules hain, aur inka violation React me runtime error deta hai:</p>
      <ol>
        <li>Hooks ko <strong>top level</strong> pe call karo — conditions, loops ya nested functions me nahi.</li>
        <li>Hooks ko <strong>React function components</strong> ya custom hooks me hi call karo (normal function me nahi).</li>
      </ol>
      <p>Isliye hamesha <code>use</code> prefix rakho custom hooks me — ESLint isi convention se detect karta hai. Aur <code>if</code> ke andar hook call karna kabhi sahi nahi hota, chahe code path kabhi na chale.</p>
      <pre><code>// ❌ galat
if (isLoggedIn) {
  const [name, setName] = useState("");
}

// ✅ sahi — hamesha call karo, render me decide karo
const [name, setName] = useState("");
if (isLoggedIn) {
  showName(name);
}</code></pre>

      <h2>useState — component ka memory</h2>
      <p>Sabse pehla aur sabse zyada use hona wala hook. Ek state variable aur uska setter:</p>
      <pre><code>const [count, setCount] = useState(0);

// simple update
setCount(count + 1);

// jahan nayi value purani pe depend kare — functional form
setCount(c => c + 1);</code></pre>
      <p><strong>Rules yaad rakho:</strong></p>
      <ul>
        <li>State ko direct modify mat karo — hamesha setter use karo</li>
        <li>Ek baar me ek hi value update hoti hai — 2 variables chahiye to 2 <code>useState</code> calls</li>
        <li>Objects/arrays me spread karke update karo: <code>setItems([...items, newItem])</code></li>
        <li>State update async hota hai — ek hi handler me 2 baar <code>setCount(count+1)</code> likhoge to sirf 1 baar increase hoga</li>
        <li>Initial value expensive ho to lazy init: <code>useState(() => JSON.parse(raw))</code></li>
      </ul>
      <p>Object state me functional update bahut zaroori hai:</p>
      <pre><code>// ❌ purana object overwrite ho jayega
setUser({ name: "Aarav" });

// ✅ baaki fields bache rahenge
setUser(u => ({ ...u, name: "Aarav" }));</code></pre>
      <p>Ek aur cheez — multiple states ko ek object me rakhne vs alag rakhne. Rule: logically related ho to ek object, warna alag <code>useState</code> calls. Har field ka apna <code>useState</code> rakhna boilerplate banata hai, aur har update me poora object copy karna padta hai.</p>

      <h2>useEffect — side effects</h2>
      <p><code>useEffect</code> har rendering ke baad chalata hai. Use cases: API call, event listener, timer, localStorage sync, DOM measurement.</p>
      <pre><code>useEffect(() => {
  // setup
  fetch("/api/posts")
    .then(r => r.json())
    .then(setPosts);

  // optional cleanup
  return () => console.log("cleanup");
}, []);   // [] = sirf mount pe</code></pre>
      <p><strong>Dependency array samjho:</strong></p>
      <ul>
        <li><code>[]</code> — sirf first render pe (mount). API call, listener add.</li>
        <li><code>[dep]</code> — jab <code>dep</code> change ho. <code>userId</code> change ho to naya fetch.</li>
        <li>omit kiya — har render pe. Rarely chahiye, usually sign of bug.</li>
      </ul>
      <p><strong>Cleanup function</strong> bahut zaroori hai — memory leaks aur stale updates dono rokta hai:</p>
      <pre><code>useEffect(() => {
  const id = setInterval(tick, 1000);
  const onKey = e => { if (e.key === "Escape") close(); };

  window.addEventListener("keydown", onKey);
  return () => {
    clearInterval(id);
    window.removeEventListener("keydown", onKey);
  };
}, []);</code></pre>
      <p>React 18 me <code>useEffect</code> ka ek subtle rule: agar effect cleanup ke baad dobara trigger hota hai, to stale closure se bachne ke liye <code>AbortController</code> use karo — warna purane request ka response naye state ko overwrite kar dega.</p>

      <h2>useRef — DOM access aur "memory" jo re-render nahi karta</h2>
      <p><code>useRef</code> do kaam karta hai:</p>
      <ol>
        <li><strong>DOM node access</strong> — <code>ref.current</code> se actual element milta hai</li>
        <li><strong>Value store</strong> jo re-render trigger nahi karta (state se different)</li>
      </ol>
      <pre><code>const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);

&lt;input ref={inputRef} placeholder="Auto focused" /&gt;</code></pre>
      <p>Jab value badalne par UI update nahi chahiye, tab <code>useRef</code> state se behtar hai — re-render nahi hota. Timer ID store karna, previous value yaad rakhna, koi bhi "silent" value — sab ke liye.</p>
      <p>Ek classic example — pehle wala value dekhna:</p>
      <pre><code>const prevCount = useRef(count);
useEffect(() => {
  prevCount.current = count;
});</code></pre>

      <h2>useMemo aur useCallback — performance</h2>
      <p>Dono ka kaam <strong>reference stability</strong> hai, sirf calculation expensive ho to hi use karo.</p>
      <pre><code>// expensive calculation memoize karo
const sorted = useMemo(() => sortExpensive(items), [items]);

// function reference stable rakho (jab child memoized ho)
const handleSubmit = useCallback((data) => {
  save(data, formId);
}, [formId]);</code></pre>
      <p><strong>Kab use karein:</strong></p>
      <ul>
        <li>Calculation genuinely heavy ho (1000+ items ka filter/sort)</li>
        <li>Value ko <code>useEffect</code> dependency me use kar rahe ho aur infinite loop ho raha ho</li>
        <li>Memoized child component ko stable prop chahiye</li>
      </ul>
      <p><strong>Kab NA use karein:</strong> har render me <code>useMemo</code> lagana — har memoization ka apna cost hota hai (dependency compare + memory). Chhoti calculations me ye optimization nahi, overhead hai. Aur <code>useCallback</code> bina <code>React.memo</code> ke bilkul faltu hai.</p>

      <h2>useContext — global state (without a library)</h2>
      <p>Context kisi value ko component tree me "broadcast" karta hai bina props drill kiye:</p>
      <pre><code>const ThemeContext = createContext("light");

function App() {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;App /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

// consume
const theme = useContext(ThemeContext);</code></pre>
      <p>Auth state, theme, language — ye sab ke liye perfect. Par dhyan rakho: <strong>Provider ki value har render pe nayi object banegi to saare consumers re-render honge.</strong> Isliye value ko <code>useMemo</code> se wrap karo:</p>
      <pre><code>const value = useMemo(() => ({ user, theme }), [user, theme]);</code></pre>
      <p>Context bada ho jaaye to performance issue aata hai — isliye bade apps me Redux, Zustand ya Jot jaise dedicated state libraries better hote hain. Chhote projects me Context kaafi hai.</p>

      <h2>useReducer — complex state</h2>
      <p>Jab state me bohot saare related fields hon aur transitions clear hon, to <code>useReducer</code> <code>useState</code> se behtar hota hai:</p>
      <pre><code>function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "ADD", payload: newItem });</code></pre>
      <p>Faida: saari state logic ek jagah, testing easy (reducer pure function hai), aur bug hone pe trace easy. Multi-step flows (checkout, wizard, editor) me ye pattern bahut achha lagta hai.</p>

      <h2>useId — unique IDs</h2>
      <pre><code>const id = useId();
&lt;label htmlFor={id}&gt;Email&lt;/label&gt;
&lt;input id={id} /&gt;</code></pre>
      <p>Accessible form labels ke liye stable unique ID chahiye to ye hook best hai — server rendering me bhi consistent rehta hai (counter-based IDs nahi).</p>

      <h2>Custom hooks — apni reusable logic</h2>
      <p>Jab same logic 2-3 jagah repeat ho, usse custom hook bana do. Ye <strong>logic reuse</strong> hai, component reuse nahi:</p>
      <pre><code>// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}</code></pre>
      <p>Use karna:</p>
      <pre><code>const [theme, setTheme] = useLocalStorage("theme", "light");
const [cart, setCart] = useLocalStorage("cart", []);</code></pre>
      <p>Custom hook ke rules: naam <code>use</code> se shuru ho, andar hooks call ho sakte hain, aur return kuch bhi ho sakta hai — value, tuple, ya object. Is blog ka poora auth system bhi isi tarah banaya gaya hai — <code>assets/auth.js</code> me <code>AuthStore</code> hai jo localStorage wrapper hai.</p>

      <h2>Kaunsa hook kab?</h2>
      <table>
        <thead>
          <tr><th>Hook</th><th>Kab use karein</th><th>Common mistake</th></tr>
        </thead>
        <tbody>
          <tr><td><code>useState</code></td><td>Simple local state</td><td>Direct mutation</td></tr>
          <tr><td><code>useEffect</code></td><td>API calls, subscriptions, timers</td><td>Missing cleanup, stale deps</td></tr>
          <tr><td><code>useRef</code></td><td>DOM access, timer IDs, previous value</td><td>State ki jagah use karna</td></tr>
          <tr><td><code>useMemo</code></td><td>Expensive calculation memoize karna</td><td>Har render pe use karna</td></tr>
          <tr><td><code>useCallback</code></td><td>Stable function reference (memoized child)</td><td>Bina <code>React.memo</code> ke lagana</td></tr>
          <tr><td><code>useContext</code></td><td>Theme, auth, language — cross-component state</td><td>Unstable provider value</td></tr>
          <tr><td><code>useReducer</code></td><td>Complex, multi-step state transitions</td><td>Simple state me overkill</td></tr>
          <tr><td><code>useId</code></td><td>Accessible form label IDs</td><td>—</td></tr>
        </tbody>
      </table>
      <p>Short version:</p>
      <ul>
        <li><strong>useState</strong> — simple local state</li>
        <li><strong>useEffect</strong> — API calls, subscriptions, DOM side effects</li>
        <li><strong>useRef</strong> — DOM access, timers, non-rendering values</li>
        <li><strong>useMemo / useCallback</strong> — performance, sirf zaroorat pe</li>
        <li><strong>useContext</strong> — cross-component state (theme, auth)</li>
        <li><strong>useReducer</strong> — complex, multi-step state transitions</li>
        <li><strong>useId</strong> — accessible form IDs</li>
      </ul>

      <h2>Top mistakes jo debug karte waqt dikhte hain</h2>
      <ol>
        <li><strong>Missing dependencies</strong> — ESLint ka <code>react-hooks/exhaustive-deps</code> rule ON rakho. Ignore mat karo blindly.</li>
        <li><strong>State update in render</strong> — render me <code>setState</code> call karna infinite loop banata hai. <code>useEffect</code> me daalo.</li>
        <li><strong>Stale closure</strong> — event listener me purana state capture ho jaata hai. Functional form ya <code>useRef</code> use karo.</li>
        <li><strong>Missing cleanup</strong> — listener/timer unsubscribe na karna = memory leak.</li>
        <li><strong>Object dependency</strong> — <code>useEffect(() => {...}, [{ a: 1 }])</code> har baar naya object banta hai to effect har render chalega. Value pass karo, ya <code>useMemo</code> se memoize karo.</li>
      </ol>

      <h2>Summary</h2>
      <p>Hooks ko ratna nahi hai — <strong>kaam samajhna hai</strong>. State ke liye <code>useState</code>, side effects ke liye <code>useEffect</code>, DOM ke liye <code>useRef</code>, performance ke liye <code>useMemo</code>/<code>useCallback</code>, global state ke liye <code>useContext</code>, complex logic ke liye <code>useReducer</code>. Repeated logic ho to custom hook bana lo. Bas itna yaad rakhoge to React smooth lagega.</p>
      <p>Fundamentals clear karne ke liye <a href="post.html?slug=getting-started-with-react">Getting Started with React</a> padho.</p>
    `,
  },
  {
    id: 9,
    slug: "writing-tech-posts-that-get-read",
    title: "Writing Tech Posts That Get Read",
    excerpt:
      "Technical writing ka formula — hook, structure, examples aur editing. Practical tips jo readers ko scroll karne se rok deti hain.",
    author: "Meera Iyer",
    date: "2026-09-29",
    category: "Writing",
    readTime: 8,
    cover: "https://picsum.photos/seed/blog9/1200/600",
    body: `
      <p>Bahut saare log likhte hain par padha nahi jaata. Problem content me nahi hoti — <strong>presentation</strong> me hoti hai. Wahi information jo 3 screens me samajh aati hai, ek lambe paragraph me dab jaati hai.</p>
      <p>Is post me wo techniques jo practical hain — theory nahi, examples ke saath.</p>

      <h2>Pehle reader socho</h2>
      <p>Post likhne se pehle ek sawaal poochho: "ye post kiske liye hai, aur ye padhne ke baad wo kya kar payega?"</p>
      <p>Agar jawab clear nahi hai, to post bhi clear nahi hogi. Example:</p>
      <ul>
        <li><strong>Bad:</strong> "CSS Grid ke baare me" — kya milega? Kuch nahi pata.</li>
        <li><strong>Good:</strong> "CSS Grid in 10 Minutes — responsive layouts bina ek bhi media query likhe" — outcome clear hai, time bhi.</li>
      </ul>
      <p>Title me <strong>reader ka result</strong> likho, feature ka naam nahi. "React Hooks" vs "React Hooks Cheat Sheet — kaunsa kab use karna hai" — dono me 5 second me samajh aata hai ki doosra padhna hai.</p>

      <h2>Pehla paragraph = promise</h2>
      <p>Reader decide karta hai pehle 2-3 lines me ki aage padhna hai ya nahi. Ye lines me batana hai: kya milega, kis problem ka solution hai, aur kitna time lagega.</p>
      <pre><code>// Weak opening
CSS Grid is a powerful layout system. It has many features.
It was introduced in 2017 and is now widely supported.

// Strong opening
Aapko responsive layout chahiye, par media queries likhne ka
mann nahi? Ek declaration likh kar — auto-fit aur minmax —
aur har screen size pe perfect grid mil jayega. 10 minute me samajh jayega.</code></pre>
      <p>Fir bhi ek practical tip: <strong>reader ko turant result dikha do</strong>. "Ye karna hai, is tarike se" — agar reader ko pehle hi working code mil gaya, to wo turant trust karega aur poora padhega.</p>

      <h2>Structure: chhote blocks, ek idea per heading</h2>
      <p>Technical post ki golden rule — <strong>ek heading = ek complete idea</strong>. Reader ka scroll pattern aisa hota hai: pehle headings scan karta hai, phir interesting wala part padhta hai.</p>
      <p>Isliye:</p>
      <ul>
        <li>Chhote headings (2-4 words) — "Grid container banana", "Common mistakes"</li>
        <li>Lamba paragraph = red flag. 3-4 lines se zyada ek block me mat rakho.</li>
        <li>Lists use karo jahan items hain — list scan karna aasan hai, paragraph nahi.</li>
        <li>Har 2-3 paragraph ke baad ek visual break — code block, list, ya quote.</li>
      </ul>
      <p>Ek paragraph me 3-4 lines ka rule reader ke screen par bhi practical hai — chhoti screen pe zyada lines dikhti hain, to wahan chhote blocks zaroori hain.</p>

      <h2>Example sabse important hai</h2>
      <p>Technical post ka dil hai <strong>code example</strong>. Text batata hai kya hota hai, code dikhata hai kaise hota hai.</p>
      <p>Rules:</p>
      <ol>
        <li>Har concept ka <strong>minimum working example</strong> do — poora, copy-paste-able.</li>
        <li>Code ke upar 1 line batao ye karta kya hai, neeche 1 line batao kya seekhna hai.</li>
        <li>Comments sirf wahi likho jo non-obvious ho — "ye line kya karti hai" wale comments padhne me time lagata hai.</li>
        <li>Output dikha do agar kuch visible hai (terminal output, ya before/after).</li>
      </ol>
      <pre><code>/* ✅ Achha comment */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
// Responsive: jitne columns fit ho sakein, har ek min 280px

/* ❌ Useless comment */
display: flex;  // sets display to flex</code></pre>
      <p>Ek aur trick — <strong>galat code bhi dikhao</strong>. Reader ko dikhta hai ki wo galtiyan nahi karega:</p>
      <pre><code>// ❌ Galat — purana object overwrite ho jayega
setUser({ name: "Aarav" });

// ✅ Sahi — baaki fields bache rahenge
setUser(u => ({ ...u, name: "Aarav" }))</code></pre>

      <h2>Formatting = readability</h2>
      <p>Do formatting rules jo professional posts ko immediately alag dikhati hain:</p>
      <ul>
        <li><strong>Sentence case headlines</strong> — "Grid container banana", "Common mistakes" nahi "GRID CONTAINER BANANA" ya "Common Mistakes".</li>
        <li><strong>Bullet points</strong> — sahi bullet points chhote paragraphs se zyada readable hote hain.</li>
      </ul>
      <p>Sirf 2-3 lines ke paragraphs, chhote headings, aur bullets ka sahi use — bas itna hi style guide hai jo most professional blogs follow karte hain.</p>

      <h2>Tables jahan zaroorat ho</h2>
      <p>Comparison dikhani ho to paragraph likhne se table behtar hai. Example — hooks ka comparison:</p>
      <pre><code>| Hook | Kab use karein |
|------|----------------|
| useState | Simple local state |
| useEffect | API calls, subscriptions |</code></pre>
      <p>Tables scan karna aasan hai, aur comparison me information density zyada hoti hai bina readability ghataye.</p>

      <h2>Callouts aur blockquotes</h2>
      <p>Kuch lines ko visually alag karna ho to blockquote ya callout use karo:</p>
      <pre><code>&gt; Rule yaad rakho: Promise.all = sab ka wait, koi ek fail to sab fail.
&gt; Promise.any = pehla success, sab fail to fail.</code></pre>
      <p>Rule, tip, warning — jo bhi reader ko ratna hai, use visually alag karo. Isse bhi important: <strong>highlight karke padhne se zyada important hai ki kuch highlight na kare</strong>. Har line ko callout banana = kuch bhi highlight nahi hua.</p>

      <h2>Opening aur closing me "so what" do</h2>
      <p>Log scroll karte waqt pehla aur last paragraph padhte hain. Isliye:</p>
      <ul>
        <li><strong>Opening</strong> — problem aur promise</li>
        <li><strong>Closing</strong> — summary + "ab kya karo" + next step</li>
      </ul>
      <p>Closing me ek <strong>next step</strong> hona chahiye — koi related post link, koi challenge, ya "ab ise apne project me try karo". Reader ko direction chahiye, warna wo soch ke chala jaata hai.</p>

      <h2>Editing: likhne ke baad ka kaam</h2>
      <p>Pehli draft kharab hoti hai — ye normal hai. Do passes:</p>
      <ol>
        <li><strong>Content pass</strong> — kya koi sentence apna kaam nahi bata rahi? Kitna cut kar sakte ho? Koi important point chhoot gaya?</li>
        <li><strong>Language pass</strong> — grammar, spelling, consistent tone. "Ek kaam karo" jaise informal tone ek jagah aur "additionally" jaise formal tone doosri jagah — mix mat rakho.</li>
      </ol>
      <p>Ek powerful trick — <strong>apne aap se 10 second paas ho jao</strong>, phir padho. Aankhon se jo aapne likha hai wo dikhta nahi — sirf meaning dikhta hai. Wahi cheez reader ko dikhti hai.</p>

      <h2>Common galtiyan</h2>
      <ul>
        <li><strong>Introduction bahut lamba</strong> — pehla paragraph 3 lines se zyada mat rakho</li>
        <li><strong>Code bina context ke</strong> — har block se pehle batao ye kya karta hai</li>
        <li><strong>Formatting inconsistency</strong> — kabhi <code>**bold**</code>, kabhi <code>__bold__</code></li>
        <li><strong>Conclusion me naya concept</strong> — naya idea sirf closing me mat laao</li>
        <li><strong>Clickbait title</strong> — agar title promise de raha hai jo content deliver nahi karta, to reader ek baar aayega, doosri baar nahi</li>
      </ul>

      <h2>Publish karne se pehle checklist</h2>
      <ul>
        <li>Title me reader ka result hai?</li>
        <li>Pehle 2 lines me value clear hai?</li>
        <li>Har heading ek complete idea cover karti hai?</li>
        <li>Har concept ka code example hai?</li>
        <li>Paragraph 3-4 lines se lamba nahi?</li>
        <li>Headings sentence case me hain?</li>
        <li>Summary aur next step hai?</li>
        <li>Ek baar 10 second pause karke dobara padha?</li>
      </ul>

      <h2>Summary</h2>
      <p>Technical writing ka formula: <strong>reader ka result title me, promise opening me, working examples beech me, next step closing me</strong>. Style simple rakho — chhote blocks, bullets, tables, code examples. Aur sabse zaroori: editing. Pehli draft publish mat karo.</p>
    `,
  },
  {
    id: 10,
    slug: "git-workflow-for-solo-devs",
    title: "Git Workflow for Solo Devs",
    excerpt:
      "Solo developers ke liye practical git — branches, meaningful commits, .gitignore, rebase vs merge, tags aur releases ka simple workflow.",
    author: "Rohan Verma",
    date: "2026-09-26",
    category: "DevOps",
    readTime: 9,
    cover: "https://picsum.photos/seed/blog10/1200/600",
    body: `
      <p>"Git seekhne ki zaroorat nahi, main to akela kaam karta hoon" — ye sunne me achha lagta hai par practically galat hai. Kyunki git tumhe <strong>undo</strong> ka option deta hai, aur solo developer ko undo ki sabse zyada zaroorat hoti hai. "Ye feature kharab ho gaya, wapas le aata hoon" — ye ability git deta hai.</p>
      <p>Is post me solo dev ke liye git ka <strong>simple, kaam ka workflow</strong> hai — team wale complex branching strategies nahi, balki wahi jo roz kaam aasan banate hain.</p>

      <h2>Daily loop — itna kaafi hai</h2>
      <pre><code>git status                 # kya badla hai, dekho
git add .                  # sab stage karo (ya specific files)
git commit -m "message"    # commit karo
git push                   # GitHub pe bhejo</code></pre>
      <p>Bas itna. Roz 3-5 commits. Har commit ek complete, working change ho. Isse code review karna hua ho to bhi easy hoga — aur 6 mahine baad khud ko samajhna bhi hoga.</p>
      <p><strong>Sabse badi galti:</strong> ek din me 500 lines ka ek commit. Ab ye change kab shuru hua, kab kharab hua — koi nahi bata sakta. Chhote commits, jaldi-jaldi push.</p>

      <h2>Commit message sahi likho</h2>
      <p>6 mahine baad jab "ye line kab aur kyun badli" ka sawaal hoga, to message hi jawab dega. Format simple rakho:</p>
      <pre><code>type: short summary

Optional detail — kya badla, kyun badla, kya socha.

type ∈ feat | fix | docs | style | refactor | test | chore</code></pre>
      <p>Real examples:</p>
      <pre><code>feat: add dark mode toggle with localStorage persistence
fix: prevent double submit on newsletter form
docs: update installation steps for Windows users
refactor: extract PostCard component to reduce duplication</code></pre>
      <p>Do rules: <strong>present tense me likho</strong> ("add" not "added" — git log consistent dikhta hai), aur <strong>ek commit = ek kaam</strong>. "fix bug and update readme and refactor" — ye teen alag commits hone chahiye.</p>
      <blockquote>Good commit messages are written for the person who will read them in 6 months — and that person is usually you.</blockquote>

      <h2>Branch: har feature ka apna branch</h2>
      <p>Solo developer ko bhi branch use karna chahiye. Kyunki:</p>
      <ul>
        <li>Half-finished feature <code>main</code> me nahi jaata</li>
        <li>Bug fix karna ho turant — naya branch bana lo, fix karo, merge karo, feature wapas lao</li>
        <li>Experiment kar sakte ho bina risk ke</li>
      </ul>
      <pre><code>git switch -c feature/dark-mode    # naya branch banao aur switch karo
# ... kaam karo ...
git add .
git commit -m "feat: add dark mode toggle"
git push -u origin feature/dark-mode</code></pre>
      <p>Branch naam meaningful rakho: <code>feature/login</code>, <code>fix/navbar-overflow</code>, <code>chore/upgrade-deps</code>. <code>test-1</code> ya <code>new-branch</code> jaise naam 2 hafte baad kuch nahi batate.</p>

      <h2>Merge vs Rebase — simple rule</h2>
      <p>Dono ka goal same hai: feature branch ka kaam main me laana. Farak sirf history me hai.</p>
      <pre><code># Merge — dono ki history rahti hai, ek merge commit banta hai
git switch main
git merge feature/dark-mode

# Rebase — feature branch ko main ke upar "replay" karta hai, linear history
git switch feature/dark-mode
git rebase main
# (agar conflict aaye: fix karo, phir)
git rebase --continue</code></pre>
      <p><strong>Simple rule for solo devs:</strong></p>
      <ul>
        <li>Feature branch private hai (kisi ne push nahi kiya) → <strong>rebase</strong> karo. Clean history milti hai.</li>
        <li>Branch shared hai ya GitHub PR banaya hai → <strong>merge</strong> karo. Rebase se history badal jaati hai, jo dusron ke clones ko confuse karta hai.</li>
      </ul>
      <p>Ek aur practical baat — <code>git pull --rebase</code> habit bana lo. Warna <code>main</code> pull karne pe "merge commit" aa jaate hain aur history messy hoti hai.</p>

      <h2>.gitignore — sabse pehle banaiye</h2>
      <p>Galat file commit karke usse hataana (aur history se clean karna) bahut painful hota hai. <code>.gitignore</code> pehle se ready rakho:</p>
      <pre><code># Dependencies
node_modules/

# Build output
dist/
build/

# Environment files (secrets!)
.env
.env.local

# Logs
*.log
npm-debug.log*

# Editor / OS
.DS_Store
Thumbs.db
.vscode/
.idea/

# Test artifacts
coverage/
playwright-report/
test-results/</code></pre>
      <p>Rule: <strong>jo bhi apne aap generate hota hai, wo commit mat karo</strong>. <code>node_modules</code> kabhi nahi — wo hamesha <code>npm install</code> se banta hai.</p>
      <p>Secret files ka alag rule: <code>.env</code> commit kabhi nahi, aur agar kabhi commit ho gaya hai to <strong>git history se hatao</strong> — sirf latest commit se hataana kaafi nahi, poori history me rehta hai. GitHub Secrets use karo instead.</p>

      <h2>Pehle se tayyar raho</h2>
      <p>Ek <code>.gitignore</code> template ready rakhne se shuru me hi sab theek ho jaata hai. Node projects ke liye <a href="https://github.com/github/gitignore" target="_blank" rel="noreferrer">github/gitignore</a> se start karo, aur apni stack ka template copy kar lo.</p>

      <h2>Undo karna seekho — ye real superpower hai</h2>
      <p>Solo developer ka sabse bada faida. Common situations aur unke commands:</p>
      <pre><code># Staged changes wapas lo (file/folder ka content restore)
git restore --staged file.js
git restore .

# Working directory ka change undo (staged nahi hua)
git restore file.js

# Last commit UNDO karke changes wapas lao (safe, history intact)
git reset --soft HEAD~1     # changes staged rehte hain
git reset --mixed HEAD~1    # changes unstaged ho jaate hain (default)

# Commit ke andar koi file add karni hai
git add missing.js
git commit --amend --no-edit

# Bhool gaye message edit karna
git commit --amend -m "naya message"

# Purane commit me galti hai (pehle push nahi kiya)
git rebase -i HEAD~3     # interactive: reword, edit, drop, squash</code></pre>
      <p><strong>Push ke baad kuch galat ho gaya?</strong> Tab <code>git revert</code> use karo — ye naya commit banata hai jo pichla undo karta hai, jabki history badalta nahi. <code>reset --hard</code> se history rewrite karna teammates ke clones bigaad kar deta hai (aur public repo me force-push disaster hai).</p>
      <p><code>git reflog</code> ek safety net hai — koi bhi commit, chahe "delete" ho chuka ho, wahan mil jaata hai. <code>git reflog</code> chalao aur <code>git reset --hard &lt;sha&gt;</code> se wapas aa jaao.</p>

      <h2>Tags aur releases</h2>
      <p>Version publish karte waqt tag lagao:</p>
      <pre><code>git tag -a v1.0.0 -m "First public release"
git push origin v1.0.0</code></pre>
      <p>GitHub pe tag se automatically release ban jaata hai, aur users ko changelog milta hai. <code>package.json</code> me version aur tag dono sync rakho — mismatch hua to confuse hota hai.</p>

      <h2>GitHub pe daily flow</h2>
      <p>Sirf push karne wala solo developer ko <strong>PR (Pull Request)</strong> use karna sikhna chahiye. Apne hi branch se PR bana ke merge karo — fayda:</p>
      <ul>
        <li>CI/CD chalega — build, tests, deploy automatic</li>
        <li>Merge se pehle review kar sakte ho (khud ko hi)</li>
        <li>Protected branch rule laga sakte ho — <code>main</code> me direct push block</li>
        <li>Kabhi bhi revert kar sakte ho</li>
      </ul>
      <pre><code>git switch -c feature/blog-reader
# kaam karo, commit karo
git push -u origin feature/blog-reader
# GitHub pe PR banao → Review → Merge</code></pre>
      <p>Ye professional workflow hai, aur solo hone par bhi aapko team-level habits mil jaati hain.</p>

      <h2>Offline backup</h2>
      <p><code>git push</code> = offsite backup. Par kabhi kabhi bina internet ke kaam karna ho, to locally bhi backup rakho:</p>
      <pre><code>git remote add backup /path/to/other/drive/my-blog-backup
git push backup main</code></pre>
      <p>Ya GitHub ke saath <code>git bundle</code> — ek single file me poora repo:</p>
      <pre><code>git bundle create my-blog-backup.bundle --all</code></pre>
      <p>Jis din <code>git push</code> chhoot jaye, woh din bahut costly hota hai. Daily push = daily backup. Isko habit banao.</p>

      <h2>Daily checklist</h2>
      <ul>
        <li>Chhote, meaningful commits — ek kaam per commit</li>
        <li>Commit message: <code>type: summary</code> format</li>
        <li>Feature branch banao, <code>main</code> saaf rakho</li>
        <li>Roz push karo</li>
        <li><code>.gitignore</code> pehle se ready</li>
        <li>Undo ke liye <code>restore</code> / <code>reset --soft</code> yaad rakho</li>
        <li>Release pe tag lagao</li>
      </ul>

      <h2>Summary</h2>
      <p>Solo developer ke liye git ka kaam hai: <strong>tumhe galti se bachana</strong>. Roz commit, feature branches, chhote commits, aur push. Undo ke commands yaad rakhne se tumhara sabse bada blocker khatam ho jaata hai — kyunki ab koi bhi experiment 2 minute me revert ho sakta hai.</p>
      <p>Deploy karna ho to <a href="post.html?slug=deploy-react-for-free">Deploy React for Free</a> padho.</p>
    `,
  },
];
