# 🍄 Gluva - Mushroom Farm Website

Сучасний односторінковий сайт для фермерського господарства з продажу грибів гливи. Побудований з акцентом на performance, accessibility та user experience.

## ✨ Особливості

- 🎨 Сучасний UI з анімаціями GSAP
- 🛒 Інтерактивний кошик з Context API
- ⚡ Оптимізований bundle через lazy loading
- 📱 Повністю responsive дизайн
- ♿ Accessibility-friendly
- 🧪 Unit тести з Vitest (75% coverage)
- 🔍 SEO оптимізація

## 🛠️ Технології

- **React 18** - UI фреймворк
- **Vite** - Build tool
- **Tailwind CSS** - Стилізація
- **GSAP** - Анімації
- **Vitest + RTL** - Тестування
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

## 📦 Архітектура

```
src/
├── components/
│   ├── common/          # Переіспуваємі компоненти
│   ├── features/        # Feature-специфічні компоненти
│   ├── layout/          # Layout компоненти
│   └── sections/        # Секції сторінки
├── context/             # React Context
├── hooks/               # Custom hooks
└── config/              # Конфігурація
```

## 🚀 Швидкий старт

```bash
# Встановити залежності
npm install

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

## 📊 Performance

- ✅ Lazy loading секцій
- ✅ Code splitting
- ✅ Image optimization
- ✅ Tree shaking
- ✅ Gzip compression

## 🧪 Тестування

Проект містить unit тести для критичних компонентів:

- Button component (100% coverage)
- ProductCard component (78% coverage)
- CartContext (70% coverage)

## 📝 Code Quality

- ESLint для лінтингу
- Prettier для форматування
- Husky pre-commit hooks
- Автоматична перевірка коду перед комітом

## 🌐 Deploy

Проект задеплоєний на Vercel: [gluva.vercel.app](https://gluva.vercel.app)

## 📄 Ліцензія

MIT

---

**Розроблено з ❤️ для портфоліо**
