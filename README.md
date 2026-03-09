# 🍄 Gluva - Mushroom Farm App

Повноцінний веб-застосунок для фермерського господарства з продажу грибів гливи. Побудований з акцентом на production-ready архітектуру, реальні API інтеграції та повний e-commerce функціонал.

🌐 **Live:** [gluva.vercel.app](https://gluva.vercel.app)
💻 **Code:** [github.com/O-Kornilova/Gluva](https://github.com/O-Kornilova/Gluva)

## ✨ Функціонал

- 🔐 **JWT Авторизація** — реєстрація, вхід, захищені роути
- 🛒 **E-commerce** — каталог товарів, кошик, оформлення замовлень
- 🚚 **Доставка** — інтеграція з Nova Poshta API, Укрпошта, Самовивіз
- 👨‍💼 **Admin панель** — управління замовленнями і товарами (ціна, наявність)
- 🎨 **Анімації** — GSAP ScrollTrigger, 3D Bento tilt ефекти
- ⚡ **Performance** — lazy loading, code splitting, bundle analysis
- 🧪 **Тести** — unit тести з Vitest (75% coverage)
- 🔍 **SEO** — meta tags, Open Graph, sitemap, robots.txt
- 📱 **Responsive** — адаптивний дизайн для всіх пристроїв

## 🛠️ Технологічний стек

| Категорія        | Технології                                |
| ---------------- | ----------------------------------------- |
| **Frontend**     | React 18, Vite, React Router              |
| **Стилізація**   | Tailwind CSS                              |
| **Анімації**     | GSAP, ScrollTrigger                       |
| **Backend**      | Node.js, Express                          |
| **База даних**   | PostgreSQL, Prisma ORM                    |
| **Авторизація**  | JWT                                       |
| **API**          | Nova Poshta API                           |
| **Тестування**   | Vitest, React Testing Library             |
| **Code Quality** | ESLint, Prettier, Husky                   |
| **Deploy**       | Vercel (frontend), Railway (backend + DB) |

## 📦 Архітектура

```
src/
├── components/
│   ├── common/       # Повторно використані компоненти (Button, SEO, AnimatedTitle)
│   ├── features/     # Feature компоненти (Cart, Auth, BentoCard, ProductCard, Delivery)
│   ├── layout/       # Layout компоненти (Navbar, Footer)
│   └── sections/     # Секції сторінки (Hero, About, Features, FAQ, Contact)
├── context/          # React Context (CartContext, AuthContext)
├── hooks/            # Custom hooks (useBentoTilt, useProductQuantity)
├── pages/            # Сторінки (Home, CartPage, AdminPage)
└── services/         # API сервіси (api.js, novaPoshtaService)

backend/
├── src/
│   ├── controllers/  # Бізнес логіка (auth, products, orders)
│   ├── middleware/   # JWT авторизація, захист роутів
│   └── routes/       # Express роути
└── prisma/
    └── schema.prisma # Схема бази даних
```

## 🏗️ Ключові архітектурні рішення

**Separation of Concerns:**

- Логіка винесена в custom hooks (`useBentoTilt`)
- Презентаційні компоненти відокремлені від логіки
- API сервіси в окремому шарі (`services/`)

**State Management:**

- `CartContext` з `useReducer` для глобального стану кошика
- `AuthContext` для стану авторизації з JWT токеном в localStorage

**Full Stack:**

- REST API на Express з JWT авторизацією
- PostgreSQL через Prisma ORM
- Розділений деплой: Vercel + Railway

## 🚀 Швидкий старт

```bash
# Frontend
npm install
cp .env.example .env
npm run dev

# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev
```

## 🔑 Environment Variables

```env
# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_NOVA_POSHTA_API_KEY=

# Backend
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

## 🧪 Тестування

```bash
npm run test
npm run test:coverage
```

Покриття тестами:

- `Button` component — 100%
- `ProductCard` component — 78%
- `CartContext` — 70%

## 📊 Performance

- ✅ Lazy loading всіх секцій
- ✅ Code splitting
- ✅ Bundle analysis через rollup-plugin-visualizer
- ✅ Gzip compression на Vercel

## 🔒 Безпека

- JWT токени для авторизації
- Environment variables для секретних ключів
- Protected routes для Admin панелі
- `isAdmin` флаг в базі даних

## 📄 Ліцензія

MIT

---

**Розроблено з ❤️ для портфоліо**
