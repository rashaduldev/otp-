# 🔐 Two-Factor Authentication Demo

This is a **Next.js 2FA demo application** built with [Next.js](https://nextjs.org) and Tailwind CSS. The app demonstrates **email-based login with OTP verification**, user registration, and secure token-based authentication.

## Features

* User **registration** with email and password.
* **Login** with email and password.
* **OTP verification** for secure two-factor authentication.
* Access token handling with **automatic authentication** for protected routes.
* **Dark mode** support using Tailwind CSS.
* User dashboard displaying authenticated user info.

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd your-project
npm install
# or
yarn install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

> The app auto-updates as you edit files.

## App Structure

* `app/page.tsx` – Landing page with register/login links.
* `app/register` – User registration page with token handling.
* `app/login` – Login page with automatic email pre-fill.
* `app/otp` – OTP verification page.
* `hooks/useAuth.ts` – Custom hook to manage authentication and token storage.
* `lib/api.ts` – Axios instance with automatic token attachment for API requests.

## Learn More

To learn more about Next.js, check these resources:

* [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) – an interactive Next.js tutorial.
* [Tailwind CSS](https://tailwindcss.com/docs) – for styling your app efficiently.

## Deploy on Vercel

The easiest way to deploy your app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.