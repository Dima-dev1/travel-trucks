# TravelTrucks

TravelTrucks is a camper-rental frontend project built with Next.js App Router,
TypeScript, and Tailwind CSS. It will use the GoIT Campers API for camper
listings, filters, reviews, details, and booking requests.

## Requirements

- Node.js 20 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm start      # Serve the production build
```

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- TanStack Query for API state and catalog pagination
- React Hook Form and Zod for booking form validation
- Swiper for the camper image gallery

The API documentation is available at
[campers-api.goit.study/docs](https://campers-api.goit.study/docs).

## Project status

The Next.js and Tailwind foundation is installed. The required application
routes and features are the next implementation step:

- `/` — home page
- `/catalog` — camper catalog and filters
- `/catalog/[camperId]` — camper details, reviews, gallery, and booking
