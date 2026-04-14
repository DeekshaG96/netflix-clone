# Netflix Clone - Clean Architecture Boilerplate

A high-fidelity Netflix clone built with React, Tailwind CSS, and Firebase.

## Architecture Overview

This project follows **Clean Architecture** principles to ensure scalability and maintainability:

- **UI Layer (`/src/components`, `/src/pages`)**: React components styled with Tailwind CSS and animated with Framer Motion.
- **Business Logic Layer (`/src/context`, `/src/hooks`)**: Global state management via Context API and reusable logic via Custom Hooks.
- **Data Layer (`/src/services`, `/src/lib`)**: API integration with TMDB and Firebase SDK configuration.

## Tech Stack

- **Frontend**: React 18+ (Vite)
- **Backend**: Firebase (Auth, Firestore)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React


## Project Structure

```text
/src
  /components     # Reusable UI components (Navbar, MovieRow, Banner, etc.)
  /context        # Global state (Auth, UI)
  /hooks          # Custom React hooks
  /lib            # Third-party library configs (Firebase, Utils)
  /pages          # Page-level components (Landing, Browse, Login)
  /types          # TypeScript interfaces
```

## Setup Instructions

1. **Clone the repository** and install dependencies:
   ```bash
   npm install
   ```

2. **Firebase Setup**:
   The project is pre-configured with Firebase. Ensure `firebase-applet-config.json` is present in the root.

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Key Features

- **Firebase Authentication**: Secure sign-up and login flow.
- **Dynamic Hero Section**: Randomly selected trending movie on each refresh.
- **Search Functionality**: Real-time search across movies and TV shows.
- **Video Overlay**: Immersive video player experience on click.
- **Responsive Design**: Fully adaptive for Mobile, Tablet, and Desktop.
