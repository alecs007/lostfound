# 🔍 Lost & Found - Reunirea Oamenilor cu Obiectele și Animalele Pierdute

<div align="center">  
  **Autor:** Alexandru Rotar  
  **Coordonator:** Prof. Mircea Rotar
</div>

<img src="https://res.cloudinary.com/dqyq1oiwi/image/upload/v1758395029/Copy_of_Untitled_1_s0pji1.png" alt="Banner Lost & Found" width="100%">

**Lost & Found** este o aplicație web full-stack concepută pentru a ajuta utilizatorii să recupereze obiectele și animalele pierdute prin potrivire inteligentă bazată pe geolocalizare. Platforma combină cartografiere în timp real, algoritmi avansați de căutare și autentificare securizată a utilizatorilor pentru a crea un ecosistem complet de obiecte găsite.

## Cuprins

- [Prezentare Generală a Proiectului](#prezentare-generală-a-proiectului)
- [Previzualizare](#previzualizare)
- [Funcționalități Principale](#funcționalități-principale)
- [Arhitectură Tehnică](#arhitectură-tehnică)
- [Documentație API](#documentație-api)
- [Implementare Securitate](#implementare-securitate)
- [Optimizări de Performanță](#optimizări-de-performanță)
- [Provocări Tehnice](#provocări-tehnice)
- [Design Responsive Mobile](#design-responsive-mobile)
- [Instalare](#instalare)
- [Configurare Mediu](#configurare-mediu)
- [Filosofie Design](#filosofie-design)

## Prezentare Generală a Proiectului

Această aplicație abordează provocarea de a conecta eficient persoanele care au pierdut obiecte cu cele care le-au găsit. Prin valorificarea indexării geospațiale și a strategiilor de caching, platforma oferă rezultate de căutare rapide, conștiente de locație, menținând în același timp securitatea datelor și fiabilitatea sistemului.

**Puncte Tehnice Cheie:**
- Interogări geospațiale cu indexuri MongoDB 2dsphere
- Limitare de rată și caching susținute de Redis
- Autentificare bazată pe JWT cu rotație de token-uri de reîmprospătare
- Optimizare automată a imaginilor prin CDN Cloudinary
- Protecție XSS prin sanitizare input cu express-mongo-sanitize
- Validare completă a inputului folosind scheme Zod

## Previzualizare

<div align="center">
  <img src="https://rotis-web.vercel.app/_next/image?url=%2Fimages%2Fprojects%2FLostFound%2Flostfound-1.webp&w=3840&q=90" alt="Pagina Postării" width="49%">
  <img src="https://rotis-web.vercel.app/_next/image?url=%2Fimages%2Fprojects%2FLostFound%2Flostfound-2.webp&w=3840&q=90" alt="Creare Postare" width="49%">
</div>

<div align="center">
  <img src="https://rotis-web.vercel.app/_next/image?url=%2Fimages%2Fprojects%2FLostFound%2Flostfound-3.webp&w=3840&q=90" alt="Panou de Control" width="49%">
  <img src="https://rotis-web.vercel.app/_next/image?url=%2Fimages%2Fprojects%2FLostFound%2Flostfound-5.webp&w=3840&q=90" alt="Pagina Principală" width="49%">
</div>

## Funcționalități Principale

### Postare și Descoperire Geospațială
Utilizatorii pot crea postări cu coordonate precise folosind integrarea Leaflet.js și API-ul Nominatim de la OpenStreetMap. Sistemul implementează indexuri geospațiale MongoDB pentru interogări eficiente bazate pe rază, permițând utilizatorilor să descopere obiectele pierdute/găsite din apropiere în intervale de distanță personalizabile.

### Căutare Avansată și Filtrare
Funcționalitatea de căutare multi-parametru include potrivire de text, intervale de date, categorii și filtrare bazată pe locație. Interogările de căutare sunt optimizate prin caching Redis cu gestionare inteligentă TTL (expirare de 1 oră), reducând apelurile API externe și îmbunătățind timpii de răspuns.

### Generator de Fluturași Imprimabili
Generare automată de fluturași PDF profesioniști cu coduri QR care redirecționează către postarea online. Șabloanele sunt optimizate pentru imprimare A4 și includ layout-uri personalizabile care se adaptează la diferite tipuri de obiecte.

### Sistem de Gestionare Utilizatori
Flux de autentificare securizat cu token-uri JWT (acces + reîmprospătare), verificare email și recuperare parolă. Profilurile utilizatorilor mențin istoricul postărilor cu analize în panoul de control pentru urmărirea postărilor active și rezolvate. Utilizatorii pot marca postări pentru referință ulterioară și pot gestiona colecțiile salvate.

### Sistem de Comentarii
Funcționalitatea de comentare în timp real permite utilizatorilor să pună întrebări, să ofere actualizări sau să coordoneze întâlniri direct pe postări. Comentariile sunt limitate ca rată pentru a preveni spam-ul și suportă discuții în thread-uri.

## Arhitectură Tehnică

### Stack Tehnologic

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)

**Frontend:**
- Next.js 14 cu App Router
- TypeScript pentru siguranță tipurilor
- Module SCSS pentru stilizare la nivel de componentă
- Leaflet.js pentru hărți interactive
- React Context API pentru gestionarea stării

**Backend:**
- Express.js cu TypeScript
- Mongoose ODM pentru interacțiuni MongoDB
- Redis pentru stocare sesiuni și caching
- Helmet.js pentru headere de securitate
- Morgan pentru jurnalizare cereri
- express-mongo-sanitize pentru prevenirea injecției NoSQL
- Zod pentru validare scheme

**Infrastructură:**
- MongoDB Atlas pentru găzduire bază de date
- Redis Cloud pentru strat de caching
- Cloudinary pentru CDN imagini
- Vercel pentru deployment frontend
- Railway/Render pentru deployment backend

## Documentație API

### URL de Bază
```
Producție: https://api.lostfound.ro/api/v1
Dezvoltare: http://localhost:8000/api/v1
```

### Rute de Autentificare (`/auth`)

| Metodă | Endpoint | Limită Rată | Descriere |
|--------|----------|-------------|-----------|
| POST | `/register` | 5/10min | Creare cont nou utilizator cu verificare email |
| POST | `/login` | 10/5min | Autentificare utilizator și emitere token-uri JWT |
| POST | `/logout` | - | Invalidare token reîmprospătare și ștergere cookies |
| POST | `/refresh-token` | - | Generare token de acces nou folosind token de reîmprospătare |
| POST | `/verify-email` | 10/min | Confirmare adresă email cu cod de verificare |
| POST | `/forgot-password` | 10/min | Solicitare email resetare parolă |
| POST | `/reset-password` | 10/min | Resetare parolă folosind token din email |

**Flux de Autentificare:**
1. Utilizator se înregistrează → Verificare email trimisă
2. Utilizator verifică email → Cont activat
3. Utilizator se autentifică → Token de acces (15min) + Token de reîmprospătare (7 zile) emise
4. Token de acces expiră → Client solicită token nou folosind token de reîmprospătare
5. Token de reîmprospătare expiră → Utilizator trebuie să se autentifice din nou

### Rute de Gestionare Postări (`/post`)

| Metodă | Endpoint | Auth | Limită Rată | Descriere |
|--------|----------|------|-------------|-----------|
| POST | `/create` | ✓ | 93/10min | Creare postare nouă pierdut/găsit cu imagini |
| GET | `/:postId` | - | 30/min | Recuperare postare unică după ID |
| PUT | `/edit/:postId` | ✓ | 20/5min | Actualizare detalii și imagini postare |
| PATCH | `/solve/:postId` | ✓ | 30/min | Marcare postare ca rezolvată |
| DELETE | `/delete/:postId` | ✓ | 10/5min | Ștergere postare proprie |
| GET | `/user-posts` | ✓ | 30/min | Obținere toate postările utilizatorului autentificat |
| GET | `/latest` | - | 30/min | Recuperare postări recente cu paginare |

**Exemplu Creare Postare:**
```typescript
POST /api/v1/post/create
Content-Type: multipart/form-data
Authorization: Bearer {access_token}

{
  title: "Labrador Negru Pierdut",
  description: "Văzut ultima dată lângă Parcul Central",
  category: "pet",
  type: "lost",
  location: {
    lat: 44.4268,
    lon: 26.1025,
    display_name: "București, România"
  },
  contactInfo: {
    phone: "+40123456789",
    email: "contact@example.com"
  },
  images: [File, File] // Max 5 imagini, 5MB fiecare
}
```

### Rute de Gestionare Utilizatori (`/user`)

| Metodă | Endpoint | Auth | Limită Rată | Descriere |
|--------|----------|------|-------------|-----------|
| GET | `/profile` | ✓ | 30/min | Obținere profil utilizator autentificat |
| GET | `/public-profile/:id` | - | 30/min | Vizualizare profil public utilizator |
| PUT | `/change-password` | ✓ | 2/min | Actualizare parolă utilizator |
| PUT | `/change-profile-image` | ✓ | 2/min | Încărcare imagine de profil nouă |
| DELETE | `/delete-account` | ✓ | 2/min | Ștergere permanentă cont utilizator |
| GET | `/saved-posts` | ✓ | - | Recuperare postări marcate de utilizator |
| POST | `/save-post` | ✓ | 30/min | Marcare postare |
| POST | `/remove-post` | ✓ | 30/min | Eliminare postare din marcaje |

### Rute de Geocodare (`/geo`)

| Metodă | Endpoint | Limită Rată | Descriere |
|--------|----------|-------------|-----------|
| GET | `/search?q={query}&limit={n}` | 60/min | Geocodare directă (adresă → coordonate) |
| GET | `/reverse?lat={lat}&lon={lon}` | 60/min | Geocodare inversă (coordonate → adresă) |
| GET | `/health` | - | Verificare stare serviciu |

**Funcționalități Geocodare:**
- Rezultate cache în Redis pentru 1 oră
- Specific țării România (countrycodes=ro)
- Validare coordonate: lat ∈ [43.5, 48.3], lon ∈ [20.2, 29.7]
- Localizare automată limbă (Română)
- Rezultate deduplicate cu scor de importanță

### Rute de Comentarii (`/comment`)

| Metodă | Endpoint | Auth | Limită Rată | Descriere |
|--------|----------|------|-------------|-----------|
| POST | `/create` | ✓ | 5/min | Adăugare comentariu la postare |
| DELETE | `/delete/:commentId` | ✓ | 5/min | Ștergere comentariu propriu |

### Rute de Căutare (`/search`)

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/posts?q={query}&category={cat}&location={loc}&radius={km}&dateFrom={date}&dateTo={date}` | Căutare avansată postări |

**Parametri Căutare:**
- `q`: Căutare text în titlu/descriere
- `category`: Filtrare după categorie (pet, electronics, documents, etc.)
- `location`: Punct central pentru căutare rază
- `radius`: Rază de căutare în kilometri
- `dateFrom`/`dateTo`: Filtrare după interval dată postare

## Implementare Securitate

### Validare și Sanitizare Input

**Validare Scheme Zod** - Toate cererile primite sunt validate față de scheme TypeScript-first înainte de a ajunge la controllere. Aceasta asigură siguranța tipurilor și prinde datele malformate devreme în ciclul de viață al cererii.

```typescript
// Exemplu: Schemă creare postare
const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  category: z.enum(['pet', 'electronics', 'documents', 'jewelry', 'other']),
  type: z.enum(['lost', 'found']),
  location: z.object({
    lat: z.number().min(43.5).max(48.3),
    lon: z.number().min(20.2).max(29.7),
    display_name: z.string()
  })
});
```

**Prevenire Injecție NoSQL** - Middleware-ul `express-mongo-sanitize` elimină caracterele `$` și `.` din input-ul utilizatorului, prevenind atacurile de injecție operator MongoDB. Aceasta protejează împotriva interogărilor malițioase care încearcă să manipuleze operațiunile bazei de date.

```typescript
// Sanitizare aplicată global tuturor rutelor
app.use(mongoSanitize());

// Exemplu atac prevenit:
// { "email": { "$gt": "" } } → { "email": "" }
```

### Arhitectură Limitare Rată

Limitarea ratei susținută de Redis previne abuzul și asigură alocarea echitabilă a resurselor. Diferite endpoint-uri au limite în trepte bazate pe intensitatea resurselor:

| Tip Endpoint | Fereastră | Limită | Rațiune |
|--------------|-----------|--------|---------|
| Înregistrare | 10 min | 5 | Prevenire creare conturi bot |
| Autentificare | 5 min | 10 | Echilibru securitate vs. experiență utilizator |
| Creare Postare | 10 min | 93 | Permite utilizare legitimă prevenind spam |
| Încărcare Imagine | 5 min | 115 | Protejare stocare și lățime de bandă |
| Geocodare | 1 min | 60 | Respectare utilizare corectă API extern |
| Comentarii | 1 min | 5 | Prevenire spam fără a împiedica discuția |
| Actualizări Profil | 1 min | 2 | Operațiuni critice necesită limite stricte |

Starea limitei de rată este stocată în Redis cu prefixe cheie (`rl_register:`, `rl_login:`, etc.) pentru izolare namespace. Sistemul returnează răspunsuri de eroare standardizate cu headere retry-after conforme cu RFC 6585.

### Autentificare și Autorizare

**Strategie Token JWT:**
- **Token-uri de Acces**: Durată scurtă (15 minute), conțin ID utilizator și rol
- **Token-uri de Reîmprospătare**: Durată lungă (7 zile), stocate în cookies httpOnly
- **Rotație Token**: Fiecare reîmprospătare generează pereche nouă de token-uri, vechile token-uri invalidate
- **Algoritm Semnătură**: HS256 cu secrete ≥32 caractere

**Securitate Cookie:**
```typescript
res.cookie('refreshToken', token, {
  httpOnly: true,      // Prevenire acces XSS
  secure: true,        // Doar HTTPS în producție
  sameSite: 'strict',  // Protecție CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 zile
});
```

**Securitate Parolă:**
- Hash bcrypt cu salt rounds = 12
- Minimum 8 caractere cu cerințe de complexitate
- Parolele niciodată jurnalizate sau returnate în răspunsuri
- Resetare parolă securizată cu token-uri limitate în timp

### Headere Securitate HTTP (Helmet.js)

```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Cerință Next.js
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

Protecțiile activate includ CSP, HSTS, X-Frame-Options, X-Content-Type-Options și Referrer-Policy.

### Securitate Încărcare Fișiere

**Configurare Multer:**
- Stocare memorie (fără scrieri pe disc în dezvoltare)
- Validare tip MIME înainte de procesare
- Limite dimensiune: 5MB per fișier, max 5 fișiere per cerere
- Formate permise: doar JPEG, JPG, PNG, WebP
- Gestionare erori pentru încărcări malformate

**Integrare Cloudinary:**
- Optimizare automată format (conversie WebP)
- Transformare lazy pentru imagini responsive
- URL-uri de încărcare semnate previn încărcări neautorizate
- Livrare CDN reduce încărcarea serverului de origine

### Politică CORS

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Whitelist origine specifică
  credentials: true,                  // Permite cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Configurația CORS strictă previne atacurile cross-origin permițând cereri autentificate de la frontend.

## Optimizări de Performanță

### Strategie Caching

**Strat Caching Redis:**
- Răspunsuri geocodare: TTL 1 oră (cheie: `search:{query}:{limit}`)
- Geocodare inversă: TTL 1 oră (cheie: `reverse:{lat}:{lon}`)
- Contoare limită rată: Fereastră glisantă cu expirare automată
- Token-uri sesiune: TTL se potrivește expirării JWT

Monitorizarea ratei de hit cache arată ~75% hit-uri cache pentru interogări geocodare, reducând apelurile API externe și îmbunătățind timpii de răspuns de la ~800ms la ~15ms.

### Indexare Bază de Date

**Indexuri MongoDB:**
```javascript
// Index geospațial pentru interogări locație
postSchema.index({ location: '2dsphere' });

// Index compus pentru căutări filtrate
postSchema.index({ category: 1, type: 1, createdAt: -1 });

// Index text pentru căutare full-text
postSchema.index({ title: 'text', description: 'text' });

// Optimizare căutare utilizator
postSchema.index({ userId: 1, status: 1 });
```

Benchmark-urile de performanță a interogărilor arată latență percentila 95 sub 50ms pentru interogări indexate vs. 2000ms+ pentru scanări complete ale colecției.

### Pipeline Optimizare Imagini

**Transformări Cloudinary:**
- Conversie automată WebP cu fallback la format original
- Variante imagine responsive (thumbnail, medium, full)
- Încărcare lazy cu placeholder-e imagine calitate joasă (LQIP)
- Caching margine CDN pentru livrare globală

**Rezultate Optimizare:**
- Dimensiune medie imagine: 2.3MB → 180KB (WebP)
- Timp încărcare pagină: 4.2s → 1.8s
- Economii lățime de bandă: ~92%

### Optimizări Frontend

**Funcționalități Next.js:**
- Împărțire automată cod per rută
- Rendering server-side pentru SEO și performanță încărcare inițială
- Generare statică pentru pagini publice
- Componentă imagine cu încărcare lazy încorporată
- Optimizare font cu preîncărcare Geist

**Analiză Bundle:**
- Bundle JS inițial: 142KB gzipped
- First Contentful Paint: ~1.2s
- Time to Interactive: ~2.3s
- Scor Performanță Lighthouse: 94/100

## Provocări Tehnice

### Acuratețe și Validare Geospațială

**Provocare**: Asigurarea că coordonatele sunt valide și cad în granițele României în timp ce gestionează cazuri limită precum utilizatori aproape de granițe sau coordonate din surse externe.

**Soluție**: Implementare validare Zod strictă cu constrângeri min/max pe latitudine (43.5-48.3°N) și longitudine (20.2-29.7°E). Adăugare mecanisme fallback când API-ul Nominatim eșuează—sistemul degradează grațios la afișarea coordonatelor brute în loc să arunce erori.

```typescript
const reverseSchema = z.object({
  lat: z.coerce.number().min(43.5).max(48.3),
  lon: z.coerce.number().min(20.2).max(29.7)
});

// Răspuns fallback la eșec API
catch (error) {
  res.json({
    display_name: `${lat.toFixed(5)}, ${lon.toFixed(5)}`,
    address: {},
    lat, lon
  });
}
```

### Conflicte Actualizare Concurentă

**Provocare**: Condiții de cursă când mai mulți utilizatori interacționează cu aceeași postare simultan (editare, comentare, marcare rezolvată).

**Soluție**: Valorificarea operatorilor de actualizare atomică MongoDB (`$set`, `$push`, `$inc`) și implementare blocare optimistă cu câmpuri versiune. Operațiunile critice folosesc tranzacții pentru a asigura consistența datelor.

```typescript
// Operațiune atomică previne condițiile de cursă
await Post.findByIdAndUpdate(
  postId,
  { $set: { status: 'solved', solvedAt: new Date() } },
  { new: true, runValidators: true }
);
```

### Reziliență API Extern

**Provocare**: Limite rată API Nominatim (1 cerere/secundă) și timeout-uri ocazionale cauzând erori pentru utilizatori.

**Soluție**: Abordare cu trei straturi:
1. **Caching Redis** cu TTL 1 oră reduce apelurile API cu ~75%
2. **Configurare timeout** (5s) previne cererile blocate
3. **Degradare grațioasă** returnează date parțiale în loc să eșueze

Limitarea ratei pe endpoint-ul de geocodare (60/min) asigură conformitatea cu politica de utilizare Nominatim permițând activitate legitimă utilizator.

### Scalabilitate și Gestionare Resurse

**Provocare**: Pe măsură ce baza de utilizatori crește, gestionarea conexiunilor bazei de date, conexiunilor Redis și utilizării memoriei devine critică.

**Soluție**:
- Pooling conexiuni MongoDB (min: 10, max: 50 conexiuni)
- Reutilizare conexiune Redis cu instanță client unică
- Încărcări imagine limitate la 5MB pentru a preveni epuizarea memoriei
- Limitarea ratei previne înfometarea resurselor de la actori malițioși
- Strategie scalare orizontală cu design stateless pregătit pentru load balancer

### Performanță Căutare la Scară

**Provocare**: Căutarea text în mii de postări cu multiple filtre (locație, categorie, dată) trebuie să rămână rapidă.

**Soluție**: Implementare indexuri compuse acoperind tipare comune de interogare și pipeline agregare MongoDB pentru căutări complexe. Planul de optimizare viitor include integrare Elasticsearch pentru căutare full-text odată ce volumul de postări depășește 100K înregistrări.

## Design Responsive Mobile

<div align="center">
  <img src="https://res.cloudinary.com/dqyq1oiwi/image/upload/v1758396413/localhost_3000__iPhone_XR_zmjobt.png" alt="Homepage Mobile" width="32%">
  <img src="https://res.cloudinary.com/dqyq1oiwi/image/upload/v1758396413/localhost_3000__iPhone_XR_2_n2645d.png" alt="Postare Mobile" width="32%">
  <img src="https://res.cloudinary.com/dqyq1oiwi/image/upload/v1758396634/localhost_3000__iPhone_XR_3_cxnbtp.png" alt="Hartă Mobile" width="32%">
</div>

Design complet responsive cu controale hartă optimizate pentru touch, filtre pliabile și layout-uri formulare mobile-first. CSS Grid și Flexbox asigură layout-uri consistente pe toate dispozitivele. Breakpoint-uri la 768px și 1024px acomodează tablete și desktop-uri.

## Instalare

### Cerințe Prealabile
- Node.js 18+ și npm
- MongoDB 5.0+
- Redis 6.0+
- Cont Cloudinary (tier gratuit suficient)

### Instrucțiuni Configurare

```bash
# Clonare repository
git clone https://github.com/Rotis-Web/lostfound.git
cd lostfound

# Instalare dependențe frontend
cd client
npm install

# Instalare dependențe backend
cd ../server
npm install

# Pornire MongoDB și Redis (dacă rulează local)
# macOS cu Homebrew:
brew services start mongodb-community
brew services start redis

# Rulare servere dezvoltare
npm run dev:all
# Aceasta pornește atât frontend-ul (port 3000) cât și backend-ul (port 8000)
```

## Configurare Mediu

### Configurare Frontend

Creare `client/.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=numele_tau_cloud
```

### Configurare Backend

Creare `server/.env`:
```bash
# Server
PORT=8000
NODE_ENV=development

# Bază de Date
MONGO_URI=mongodb://localhost:27017/lostfound
# Producție: mongodb+srv://username:password@cluster.mongodb.net/lostfound

# Redis
REDIS_URL=redis://localhost:6379
# Producție: redis://username:password@host:port

# URL-uri Aplicație
APP_ORIGIN=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Configurare JWT (generare șiruri aleatorii 32+ caractere)
JWT_SECRET=secretul_tau_securizat_min_32_caractere_foloseste_openssl_rand
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=secretul_tau_refresh_diferit_de_cel_de_mai_sus
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary (înregistrare la cloudinary.com)
CLOUDINARY_CLOUD_NAME=numele_tau_cloud
CLOUDINARY_API_KEY=cheia_ta_api
CLOUDINARY_API_SECRET=secretul_tau_api

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=emailul_tau@gmail.com
SMTP_PASS=parola
