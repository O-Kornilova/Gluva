# 🍄 Gluva - Mushroom Farm App

Повноцінний веб-застосунок для фермерського господарства з продажу грибів гливи. Побудований з акцентом на production-ready архітектуру, реальні API інтеграції та повний e-commerce функціонал.

🌐 **Live:** [gluva.vercel.app](https://gluva.vercel.app)
💻 **Code:** [github.com/O-Kornilova/Gluva](https://github.com/O-Kornilova/Gluva)

## ✨ Функціонал

- 🔐 **Авторизація** - Google OAuth + Email/Password через Firebase Auth
- 🛒 **E-commerce** - каталог товарів, кошик, оформлення замовлень
- 🚚 **Доставка** - інтеграція з Nova Poshta API (пошук міст і відділень), Укрпошта, Самовивіз
- 👨‍💼 **Admin панель** - управління замовленнями, зміна статусів
- 💾 **Firestore** - збереження замовлень в реальному часі
- 🎨 **Анімації** - GSAP ScrollTrigger, 3D Bento tilt ефекти
- ⚡ **Performance** - lazy loading, code splitting, bundle analysis
- 🧪 **Тести** - unit тести з Vitest (75% coverage)
- 🔍 **SEO** - meta tags, Open Graph, sitemap, robots.txt
- 📱 **Responsive** - адаптивний дизайн для всіх пристроїв

## 🛠️ Технологічний стек

| Категорія        | Технології                    |
| ---------------- | ----------------------------- |
| **Frontend**     | React 18, Vite, React Router  |
| **Стилізація**   | Tailwind CSS                  |
| **Анімації**     | GSAP, ScrollTrigger           |
| **Backend**      | Firebase Auth, Firestore      |
| **API**          | Nova Poshta API               |
| **Тестування**   | Vitest, React Testing Library |
| **Code Quality** | ESLint, Prettier, Husky       |
| **Deploy**       | Vercel (CI/CD)                |

## 📦 Архітектура

```
src/
├── components/
│   ├── common/          # Повнорно використані компоненти (Button, SEO, AnimatedTitle)
│   ├── features/        # Feature компоненти (Cart, Auth, BentoCard, ProductCard, Delivery)
│   ├── layout/          # Layout компоненти (Navbar, Footer)
│   └── sections/        # Секції сторінки (Hero, About, Features, FAQ, Contact)
├── context/             # React Context (CartContext, AuthContext)
├── hooks/               # Custom hooks (useBentoTilt, useProductQuantity)
├── pages/               # Сторінки (Home, CartPage, AdminPage)
├── services/            # API сервіси (novaPoshtaService, ukrPoshtaService)
└── config/              # Конфігурація (firebase, site, products)
```

## 🏗️ Ключові архітектурні рішення

**Separation of Concerns:**

- Логіка винесена в custom hooks (`useBentoTilt`)
- Презентаційні компоненти відокремлені від логіки
- API сервіси в окремому шарі (`services/`)

**State Management:**

- `CartContext` з `useReducer` для глобального стану кошика
- `AuthContext` для стану авторизації
- Firebase Firestore для persistence

**Component Composition:**

- `ProductCard` розбитий на `MediaDisplay`, `QuantityControl`, `PriceDisplay`
- `Features` секція використовує `BentoTilt`, `BentoCard`, `NutritionCard`

## 🚀 Швидкий старт

```bash
# Встановити залежності
npm install

# Створити .env файл
cp .env.example .env
# Заповнити змінні середовища

# Запустити dev server
npm run dev

# Білд для production
npm run build

# Запустити тести
npm run test

# Coverage звіт
npm run test:coverage

# Bundle analysis
npm run analyze
```

## 🔑 Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_NOVA_POSHTA_API_KEY=
```

## 🧪 Тестування

```bash
npm run test           # Запустити тести
npm run test:coverage  # Coverage звіт
```

Покриття тестами:

- `Button` component — 100%
- `ProductCard` component — 78%
- `CartContext` — 70%

## 📊 Performance

- ✅ Lazy loading всіх секцій
- ✅ Code splitting (окремі chunks для кожної секції)
- ✅ Bundle analysis через rollup-plugin-visualizer
- ✅ Tree shaking
- ✅ Gzip compression на Vercel

## 🔒 Безпека

- Firebase Security Rules для Firestore
- Environment variables для секретних ключів
- Protected routes для Admin панелі
- Авторизовані домени в Firebase

## 📄 Ліцензія

MIT

---

**Розроблено з ❤️ для портфоліо**
