# Sales Dashboard Frontend

This is the **frontend** for the Sales Dashboard project, built with **React**, **TypeScript**, **Vite**, and **Material UI**. It provides a modern, responsive web interface for visualizing sales metrics such as revenue and passenger counts over time.

---

## ✨ Features

- **Interactive Dashboard:** Visualizes sales and passenger data with bar charts and summary cards.
- **Date Range Picker:** Select custom date ranges to filter metrics.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Material UI Theming:** Custom light/dark themes and component styles.
- **API Integration:** Fetches data from a backend API.
- **Error Handling:** User-friendly error and loading states.
- **TypeScript:** Full static typing for safety and maintainability.
- **Testing:** Includes unit tests for hooks and utilities.

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── api/            # API fetchers, types, hooks (e.g., useMetricData)
│   ├── assets/         # Static assets (images, etc.)
│   ├── components/     # Reusable UI components (charts, navigation, layout)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Top-level pages (e.g., Dashboard)
│   ├── test/           # Test utilities and setup
│   ├── theme/          # Theme and Material UI customizations
│   └── index.tsx       # App entry point
├── public/             # Static public files
├── package.json        # Project dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tsconfig*.json      # TypeScript configuration
```

---

## 🚀 Getting Started

### 1. **Install dependencies**

```sh
cd frontend
pnpm install
```

### 2. **Start the development server**

```sh
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 3. **Run tests**

```sh
pnpm test
```

---

## ⚙️ How It Works

- **Data Fetching:**
  The app uses [@tanstack/react-query](https://tanstack.com/query/latest) for efficient data fetching and caching. API calls are defined in [`src/api/fetchers.ts`](src/api/fetchers.ts) and consumed via the [`useMetricData`](src/api/useMetricData.ts) hook.

- **UI Components:**
  The dashboard UI is composed of reusable components in [`src/components`](src/components), including charts, navigation, and layout elements.
  Charts use [@mui/x-charts](https://mui.com/x/react-charts/) for visualization.

- **Theming:**
  Material UI theming is customized in [`src/theme`](src/theme) for consistent branding and dark/light mode support.

- **Testing:**
  Unit tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/). Test utilities are in [`src/test`](src/test).

---

## 🧩 Key Files

- [`src/pages/Dashboard.tsx`](src/pages/Dashboard.tsx): Main dashboard page.
- [`src/components/MetricBarChart.tsx`](src/components/MetricBarChart.tsx): Bar chart for metrics.
- [`src/api/useMetricData.ts`](src/api/useMetricData.ts): Custom hook for fetching metric data.
- [`src/api/fetchers.ts`](src/api/fetchers.ts): API fetch functions.
- [`src/theme/AppTheme.tsx`](src/theme/AppTheme.tsx): Theme provider and customizations.

---

## 📝 Customization

- **API URL:**
  The API base URL is set in [`src/api/fetchers.ts`](src/api/fetchers.ts) (`BASE_URL`). Update this if your backend runs elsewhere.

- **Theme:**
  Modify [`src/theme/themePrimitives.ts`](src/theme/themePrimitives.ts) and related files to adjust colors, typography, and component styles.

---

## 🛠️ Scripts

| Command        | Description                |
| -------------- | ------------------------- |
| `pnpm dev`  | Start development server  |
| `pnpm build`| Build for production      |
| `pnpm preview` | Preview production build |
| `pnpm test`     | Run unit tests            |
| `pnpm lint` | Run ESLint                |

---

## 📦 Dependencies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [@mui/x-charts](https://mui.com/x/react-charts/)
- [Vitest](https://vitest.dev/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

---

---

## 📄 License

This project is for demonstration and educational purposes.
