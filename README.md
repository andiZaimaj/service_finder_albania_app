# Service Finder Albania

A two-sided marketplace mobile app connecting clients with tradespeople (electricians, plumbers, cleaners, mechanics, painters) in Albania.

Built with Expo (React Native), TypeScript, and a cream/sage glassmorphism design system.

## Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

## Setup

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

## Connecting to the API

The app uses a backend API. Configure the URL in `.env`:

```
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
```

**For physical device testing with Expo Go:**
1. Find your computer's local IP address:
   - Windows: `ipconfig` → look for IPv4 Address
   - Mac/Linux: `ifconfig` or `ip addr`
2. Replace `192.168.1.100` with your actual IP
3. Make sure your phone and computer are on the same Wi-Fi network
4. `localhost` will NOT work on a physical device

## Mock Data Mode

The app includes mock data for development without a backend. It's enabled by default:

```
EXPO_PUBLIC_USE_MOCK=true
```

Set to `false` when your API server is running.

## Running

```bash
# Start with Expo Go
npx expo start

# Scan the QR code with:
# - iOS: Camera app
# - Android: Expo Go app

# Or run on simulator/emulator
npx expo start --ios
npx expo start --android
```

## Tech Stack

- **Expo SDK 56** with Expo Router (file-based routing)
- **TypeScript** (strict mode)
- **NativeWind v4** (Tailwind CSS for React Native)
- **React Query v5** (TanStack Query) for server state
- **Zustand** for client state (auth, language, saved workers)
- **Expo SecureStore** for JWT tokens
- **Axios** with auto token refresh
- **React Hook Form + Zod** for form validation
- **expo-blur** + **expo-linear-gradient** for glassmorphism UI
- **react-native-svg** for icons
- **i18n-js** for English/Albanian localization

## Project Structure

```
app/                    # Expo Router pages
  (auth)/               # Auth screens (welcome, login, register)
  (tabs)/               # Main tab screens (home, saved, inbox, profile)
  worker/[id]           # Worker profile
  job/                  # Job screens (detail, create, browse, my-jobs)
  proposal/[jobId]      # Proposals view
  messages/[userId]     # Chat conversation
  notifications/        # Notifications list
  subscription/         # Subscription plans
  review/create         # Leave a review
components/ui/          # Reusable design system components
hooks/                  # React Query hooks
lib/api/                # API client and endpoint modules
store/                  # Zustand stores
constants/              # Colors, typography, categories, cities
types/                  # TypeScript interfaces
```

## Features

- Guest browsing with sign-in prompts
- Client flow: browse workers, post jobs, review proposals, message workers
- Worker flow: dashboard, browse jobs, submit proposals, manage subscription
- English/Albanian language toggle
- Glassmorphism UI with blur effects and gradient backgrounds
- Pull-to-refresh on all list screens
- Auto token refresh on 401 responses
