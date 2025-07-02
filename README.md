
# 📦 DUBRA WEB APP

  

A web application developed for managing, tracking and order shipments for "Dubra transporte y logística".

  

## 🧪 Technologies Used

  

- React

- Vite

- TailwindCSS

  

## 🚀 Installation

  

1. Clone the repository:

  

```bash

git  clone  https://github.com/usuario/nombre-proyecto.git

```

  

2. Install dependencies:

  

```bash

npm install

```

## 🛈 Dependencies installed with `npm install`

| Category               | Packages                                                                                                                                       |
|-|-
| 🧠 **Core Framework**   | `react`, `react-dom`, `vite`                                                                                                 
| 🌐 **Routing**          | `react-router`, `react-router-dom`                                                                                                             
| 🎨 **Styling**          | `tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`, `@tailwindcss/postcss`, `@tailwindcss/vite`                               |
| 🧩 **UI & Components**  | `lucide-react`, `react-social-icons`, `@radix-ui/react-label`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-slot`, `class-variance-authority`               |
| 📝 **Forms & Validation** | `react-hook-form`, `@hookform/resolvers`, `zod`, `react-google-recaptcha`                                                              
| 🗺️ **Maps**             | `leaflet`, `leaflet-control-geocoder`, `react-leaflet`                                                                                        
| 📊 **Data & Visualization** | `recharts`, `date-fns`                                                                                                                                                                                                                               
| ✅ **Linting**           | `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`                                                |
| 🧪 **Testing**           | `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`                                                                     
| 🧰 **Dev Tools**         | `@vitejs/plugin-react-swc`, `@types/react`, `@types/react-dom`, `tw-animate-css`|


## 📜 Useful Scripts

-   `npm run dev`: run the project in development mode
    
-   `npm run build`: build the project for production
    
-   `npm run preview`: preview the production build

## 🍃 Custom Tailwind
### 1. 🎨 Themes
- `--color-dubraPrimary`: primary color used across the app, set to `#001f45`.
-  `--color-dubraSecondary`: secondary color used across the app, set to `#c84630`.
-  `--color-dubraText`: text color used across the app, set to `#e9f2ef`.
- `--color-dubraWhite`: custom white color used across the app, set to `#fefefe`.
- `--breakpoint-xs`: custom breakpoin used across the app, set to `25rem`.

###  2. 🖼️ Components
- `bg-dubraPrimary`: applies `--color-dubraPrimary` to background and `--color-dubraText` to texts.
- `bg-dubraSecondary`: applies `--color-dubraSecondary` to background and `--color-dubraText` to texts.
- `bg-dubraWhite`: applies `--color-dubraWhite` to background and `--color-dubraPrimary` to texts.


## ⚛️ Custom React Components

### 1. 🃏 Cards

- `<ServiceCard />` accepts the following props:
  - `title`, `description`, `content`: `string`,
  - `background`, `iconDiv`: Tailwind class `string`,
  - `button`: `ReactNode` — (typically a button or link),
  - `icon`: `lucide-react` —  icon component.

- `<CardGrid />` is a wrapper component that expects exactly **4** `<ServiceCard />` elements as `children`.

---

### 2. 📈 Dashboard

- `<AdminDashboard />`: Main view for **Admin**, displaying administrative insights.
- `<Dashboard />`: Main view for **User**, displaying relevant user information.
- `<RecentOrders />`:  
  - In **User View**, shows the latest 3 orders made **for the company**.  
  - In **Admin View**, shows the **latest order ever made** across all users.
- `<DashboardMetrics />`: Displays summarized metrics for either **Admin** or **User**, depending on context.

---

### 3. 🧭 Navbar
- `<ResponsiveNavBar/>`: navbar for medium display and smaller:
	- `Logo`: `boolean` — if true shows the `DubraLogo`,
	- `className`: Tailwind class `string`,
	- `fields`: `array` — has `field.text`, `field.icon` and `field.link`,
		-  `field.text`: `string`,
		- `field.icon`: `lucide-react` —  icon component,
		- `field.link`: `string` —  route.
	- `menuRef`: `const` — controls click outside of `NavBar` to close it. 

- `<NavBar/>`: uses `ResponsiveNavBar`, it's used for bigger than medium display:
	- `Logo`: `boolean` — if true shows the `DubraLogo`, 
	- `className`: Tailwind class `string`,
	- `fields`: `array` — has `field.text`, `field.icon` and `field.link`,
		-  `field.text`: `string`,
		- `field.icon`: `lucide-react` —  icon component,
		- `field.link`: `string` —  route.
	- `extraFields`: `array` — has `extraField.text` and `field.link`,
		-  `field.text`: `string`,
		- `field.link`: `string` —  route.
	- `extraButton`: `ReactNode` — button to control `ResponsiveNavBar` visibility,
	- `isOpen`: `boolean` — control `ResponsiveNavBar` visibility,
	- `width`: Tailwind class `string`.
	
- `<NavBarButton/>`: NavBar custom button
	- `text`: `string`,
	- `icon`: `lucide-react` —  icon component,
	- `link`: `string` —  route.

---

### 4. 🌐 Miscellaneous

- `<SocialButton />`: is a wrapper around `react-social-icons`, with the following props:
  - `alt`: the name of the social network (used by `react-social-icons`)
  - `backgroundColor`: Tailwind class to style the icon background
  - `url`: the destination URL to the social profile

- `<TrackingInputGroup/>`: is an input that accepts a Tracking ID
		 > ⚠️ **Work in progress**
		 
- `<ModalPopUp/>`: its a modal pop up that accepts:
  - `isOpen`: `boolean` — controls modal visibility,
  - `children`: `ReactNode` — content to render inside the modal,
  - `onClose`: `function` — callback function to close the modal.

- `<Chart/>`: 
	- `chartData`: `array` — 6 last months and their data.
	      > ⚠️ **Work in progress**

- `<HeroSection/>`: Personalized html `<section/>`
	- `title, subtitle`: `string`,
	- `extraComponent`: `ReactNode` — extra content to render inside the section,
	- `imageSrc`: `string` — image route,
	- `textColor, background, customHeight`: Tailwind class (`string`),
	- `centercontent`: `boolean`.
---
	 
