# 🚌 Tripzy - The Test From AVIAN SOLUTIONS

A modern, responsive travel booking platform built with Next.js, featuring multi-language support and an intuitive user interface for booking bus rides, hotels, and flights.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🌍 Multi-Language Support

- **7 Languages**: English, Chinese (中文), Vietnamese (Tiếng Việt), Japanese (日本語), Thai (ภาษาไทย), Korean (한국어), Spanish (Español)
- Persistent language selection using Zustand
- Localized calendar with date-fns
- Dynamic form validation messages
- Automatic UI text translation

### 🎨 Modern UI/UX

- Fully responsive design (mobile, tablet, desktop)
- Beautiful animations with BlurFade effects
- Shadcn/ui components
- Clean and intuitive interface
- Custom combobox with search functionality
- Interactive calendar date picker

### 🚌 Bus Booking Features

- Location search with autocomplete
- From/To location swap functionality
- Single or round-trip booking
- Passenger count selector
- Date range selection
- Form validation with Zod
- Real-time error messages in current language

### 🏗️ Technical Features

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: Zod
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tripzy-frontend-test-dang-huu-phuc
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Run Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Build & Deployment

### Production Build

Create an optimized production build:

```bash
npm run build
```

This will:

- Compile TypeScript
- Optimize all components
- Generate static pages
- Minify assets
- Create production-ready bundles

### Start Production Server

After building, start the production server:

```bash
npm run start
```

### Lint Code

Check for code quality issues:

```bash
npm run lint
```

## 📁 Project Structure

```
tripzy-frontend-test-dang-huu-phuc/
├── app/                          # Next.js App Router
│   ├── db/                      # Database/data files
│   │   └── index.ts            # Location data
│   ├── search/                 # Search results page
│   │   └── page.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
│
├── components/                   # React components
│   ├── content/                # Content components
│   │   ├── bus-content.tsx    # Bus booking form
│   │   ├── home-content.tsx   # Home page content
│   │   └── select-language.tsx # Language selector
│   ├── form/                   # Form components
│   │   └── custom-combobox.tsx
│   └── ui/                     # UI components (shadcn/ui)
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── calendar-localize.tsx
│       ├── combobox.tsx
│       └── ...
│
├── hooks/                        # Custom React hooks
│   ├── use-language.ts         # Language management hook
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-mounted.ts          # Mount state hook
│
├── lib/                          # Utilities and libraries
│   ├── dictionary.json         # All translations (7 languages)
│   └── utils.ts                # Utility functions
│
├── public/                       # Static assets
│   ├── logo.png
│   ├── bus-icon.png
│   ├── hotel-icon.png
│   └── ...
│
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🌐 Language System

### Adding New Translations

Edit `lib/dictionary.json` to add or modify translations:

```json
{
  "en": {
    "common": {
      "your_key": "Your English Text"
    }
  },
  "vi": {
    "common": {
      "your_key": "Văn bản tiếng Việt của bạn"
    }
  }
  // ... other languages
}
```

### Using Translations in Components

```tsx
import { useLanguage } from "@/hooks/use-language";

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("common.your_key")}</h1>
      <button onClick={() => setLanguage("vi")}>Switch to Vietnamese</button>
    </div>
  );
}
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with custom configurations:

- **Breakpoints**:

  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

- **Custom Colors**: Defined in `tailwind.config.ts`

### Adding Custom Styles

1. Use Tailwind utility classes
2. Add custom CSS in `app/globals.css` if needed
3. Use `cn()` utility for conditional classes

## 🔧 Key Technologies

| Technology           | Purpose                          |
| -------------------- | -------------------------------- |
| **Next.js 16**       | React framework with App Router  |
| **TypeScript**       | Type-safe development            |
| **Tailwind CSS**     | Utility-first styling            |
| **Zustand**          | Lightweight state management     |
| **Zod**              | Schema validation                |
| **date-fns**         | Date manipulation and formatting |
| **react-day-picker** | Date picker component            |
| **Lucide React**     | Icon library                     |
| **Radix UI**         | Headless UI primitives           |

## 📱 Responsive Design

The application is fully responsive across all devices:

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

All components adapt their layout and styling based on screen size.

## 🧪 Form Validation

The project uses Zod for form validation with:

- Real-time validation
- Localized error messages
- Type-safe schemas
- Custom validation rules

Example validation:

```typescript
const formSchema = z.object({
  from: z.string().min(1, t("validation.from_required")),
  to: z.string().min(1, t("validation.to_required")),
  passengers: z.number().min(1).max(20),
});
```

## 🗺️ Available Routes

| Route     | Description                 |
| --------- | --------------------------- |
| `/`       | Home page with booking form |
| `/search` | Search results page         |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For questions or issues, please open an issue on the repository.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your app will be live!

### Other Platforms

You can also deploy to:

- **Netlify**
- **AWS Amplify**
- **Digital Ocean**
- **Railway**
- Any platform that supports Node.js

## 🎯 Development Tips

1. **Hot Reload**: Changes are automatically reflected in the browser
2. **TypeScript**: Use TypeScript for better code quality and IDE support
3. **Component Structure**: Follow the existing component organization
4. **Translations**: Always add translations for all 7 languages
5. **Responsive**: Test on multiple screen sizes
6. **Performance**: Use Next.js Image component for images

## 📊 Build Output

After running `npm run build`, you'll see:

```
Route (app)
┌ ○ /              (Static)
├ ○ /_not-found    (Static)
└ ○ /search        (Static)

○  (Static)  prerendered as static content
```

This indicates that pages are pre-rendered for optimal performance.

---

Made with ❤️ using Next.js and TypeScript
