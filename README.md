# TravelTrucks

TravelTrucks is a camper-rental web application. Users can browse available campers, filter them, open a detailed page with a photo gallery and reviews, and send a booking request.

**Live demo:** https://travel-trucks-eight-iota.vercel.app/

## Features

- Home page with a banner and a **View Now** call to action
- Catalog of campers loaded from the backend
- Backend filtering by location, camper form, engine and transmission (one option per group)
- **Load More** pagination (4 cards per request) that respects the active filters
- Camper details page opened in a new tab, with full information, a Swiper thumbnail gallery and five-star user reviews
- Booking form with validation and a success notification
- Loading, error and empty states for every request
- Per-page metadata and Open Graph tags

## Tech stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- TanStack Query (`useInfiniteQuery`)
- Axios
- Formik and Yup
- Swiper
- React Hot Toast
- React Icons
- ESLint and Prettier

Backend: [Campers API](https://campers-api.goit.study/docs)

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/Dima-dev1/travel-trucks.git
cd travel-trucks
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are needed.

## Scripts

```bash
npm run dev           # development server
npm run build         # production build
npm start             # serve the production build
npm run lint          # ESLint
npm run typecheck     # TypeScript check
npm run format        # format with Prettier
npm run format:check  # check formatting
```

## Project structure

```
app/          routes, layouts, metadata
components/   one folder per component (Header, Hero, CamperCard, Filters, BookingForm, ui/Button, ...)
lib/          API client, formatters, amenity data
types/        TypeScript types
```
