# World Brief: React Native News Application

## Overview

World Brief is a mobile news application built with React Native that provides users with curated news articles across various categories, featuring dark mode support and bookmarking functionality.

## Features

- Multiple News Categories
  - Local
  - Business
  - Technology
  - Sports
  - Entertainment
  - Health
  - Science

- Dark/Light Mode Toggle
- Bookmark Articles
- Search Functionality
- Infinite Scroll News Loading
- Caching Mechanism for Improved Performance

## Prerequisites

- Node.js (v18+)
- Latest version of the expo go app

## Installation

1. Clone the repository

```bash
git clone https://github.com/aubynsamuel/World-Brief.git
cd world-brief
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure API Keys

- Add your NewsAPI keys in `apiKeys.tsx`

4. Run the application

```bash
# Start the app
npx expo start
```

## Tech Stack

- React Native
- Expo Router
- AsyncStorage
- NewsAPI
- MaterialIcons

## Project Structure

- `/app`: Application routes with expo router
- `/components`: Reusable UI components
- `/services`: API interaction logic
- `/apiKeys.tsx`:News API keys
- `/NewsAppContext.tsx`: App state management file
- `/package.json`
- `/styles.tsx`: Styles file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
