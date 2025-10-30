![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![next-intl](https://img.shields.io/badge/i18n-next--intl-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

# Next.js Multilingual Setup (with next-intl, RTL/LTR, and Theme Toggle)

A minimal yet production-ready internationalization (i18n) setup for Next.js 15/16 using next-intl, with support for:

- Dynamic locale routing (`/[locale]/page.tsx`)
- RTL/LTR auto detection (Arabic, Persian, etc.)
- Language switcher with persistent cookies
- Theme toggle (light/dark/system)
- Full integration with shadcn/ui, Radix UI, and next-themes

---

## 1. Overview

This project demonstrates how to implement a clean, reusable, and scalable i18n system in Next.js using modern architecture.  
It provides:

- Locale-based routing via `next-intl`
- Direction-aware UI using `@radix-ui/react-direction`
- Client-side hook `useI18nUI()` to synchronize document attributes
- Modular structure for translations and locale constants

---

## 2. Project Structure

```bash
i18n/
├── constants.ts           # Supported locales and defaults
├── languages.enum.ts      # Enum for language codes
├── locales.ts             # Locale utilities (normalize, baseOf, isRTL, getDir)
├── messages/
│   ├── ar.json            # Arabic translations
│   └── en.json            # English translations (example)
├── request.ts             # next-intl configuration (server)
├── routing.ts             # locale-based routing setup
└── use-i18n-ui.ts         # Hook to manage <html dir/lang> attributes

components/layout/
├── direction-provider.tsx # Radix Direction boundary for RTL/LTR
├── locale-menu.tsx        # Dropdown to switch languages
├── mode-toggle.tsx        # Dropdown to toggle light/dark mode
└── navbar.tsx             # Example Navbar using both components

app/[locale]/
├── layout.tsx             # Locale-aware root layout
└── page.tsx               # Example page with localized content
```

---

## 3. Tech Stack

- Next.js 15+ / 16 (App Router)
- TypeScript
- next-intl – for translations and routing
- next-themes – for dark/light/system modes
- shadcn/ui + Radix UI – for modern UI components
- Framer Motion – optional animations
- Lucide Icons – for clean icons

---

## 4. Getting Started

### 4.1 Clone the repository

```bash
git clone https://github.com/adnanalmahmut/nextjs-i18n-starter.git
cd nextjs-i18n-starter
```

### 4.2 Install dependencies

```bash
npm install
# or
pnpm install
```

### 4.3 Run the development server

```bash
npm run dev
```

Then open:

- http://localhost:3000/ar
- http://localhost:3000/en

---

## 5. Add More Languages

To add a new language:

### 5.1 Add the new code to `SUPPORTED_LOCALES` in `i18n/constants.ts`

```ts
export const SUPPORTED_LOCALES = [
  Languages.ARABIC,
  Languages.ENGLISH,
  Languages.TURKISH, // new language
] as const;
```

### 5.2 Add a translation file in `i18n/messages/xx.json`

```json
{
  "HomePage": {
    "title": "Merhaba Dünya!"
  }
}
```

### 5.3 That’s it

The new language will automatically appear in the dropdown menu.

---

## 6. RTL / LTR Support

The `useI18nUI()` hook automatically updates:

- `<html lang="xx" dir="rtl|ltr">`
- `document.body.dir`
- `data-locale` and `data-dir` attributes

RTL languages are defined in `RTL_BASES` within `i18n/constants.ts`.

---

## 7. Theme Switching

The project uses `next-themes` with a custom `ModeToggle` component.

Supported modes:

- Light
- Dark
- System

---

## 8. Example Components

| Component               | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `LocaleMenu`            | Language dropdown menu with cookie persistence |
| `ModeToggle`            | Theme switcher with dropdown                   |
| `DirectionBoundaryAuto` | Wraps layout for proper RTL rendering          |
| `Navbar`                | Sample navigation bar using both components    |

---

## 9. Example Output

**Arabic UI:**  
`/ar` → "مرحباً بالعالم!"

**English UI:**  
`/en` → "Hello World!"

---

## 10. Author

**Adnan Mahmoud**

- [LinkedIn](https://www.linkedin.com/in/adnanmahmut/)
- [GitHub](https://github.com/adnanalmahmut)

---

## 11. License

MIT License © 2025 Adnan Mahmoud  
Feel free to use, modify, and contribute.
