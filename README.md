Cześć!!

Wykonałem zadanie rekrutacyjne. Z racji, że miałem się wcielić w programistę i otrzymałem bazę w pliku json to stworzyłem sobie prosty backend przy użyciu Supabase, aby wykonać zadanie jak w realnym świecie, gdzie taką bazę trzymalibyśmy na backendzie a nie w lokalnym stanie :)
Mam nadzieję, że wpisałem się założenia zadania a jeśli nie to moje podejsćie zostanie ocenione pozytywnie :D
Zatem do zarządzania stanem skorzystałem z react-query, który dzięki swoim wbudowanym mechanizmom pozytywnie wpływa na wydajność aplikacji oraz z MaterialUI do szybszego zaimpelentowania widoków na potrzeby zadania.

Projekt można odpalić lokalnie (wypchnąłem plik .env) oraz opublikowałem aplikację na Vercel pod linkiem: https://reservations-dashboard-tan.vercel.app

# Hotel Reservation Management System

A hotel reservation management application built with React + TypeScript + Vite.

## Quick Start

1. Clone the repository:

```bash
git clone [your-repo-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - runs the app in development mode
- `npm run build` - builds the app for production
- `npm run lint` - checks code for potential errors
- `npm run preview` - locally preview production build

# Zadanie

## Opis

Wcielasz się w programistę budującego rozwiązania dla branży hotelarskiej, od klienta otrzymałeś Dashboard rezerwacji z którego aktualnie korzysta w swoim hotelu, wraz z bazą danych w pliku json. Klient prosi Cię o dodanie kilku funkcji:

- Dodawanie rezerwacji - dostępny status początkowy to Reserved lub Due in (jeśli data przyjazdu nastąpi tego samego dnia)
  - Akcja powinna zostać automatycznie wywołana po przejściu na link http://localhost:5173/add lub http://localhost:5173/#/add
- Usuwanie Rezerwacji
- Możliwość edycji danych gościa hotelowego takich jak imię i nazwisko, email, notatka - funkcja dostępna jeśli rezerwacja jest w statusie: „Reserved”, „Due In”
  - Edycja powinna być wywołana po przejściu na link /edit/{reservationId} np. http://localhost:5173/edit/res-001 lub http://localhost:5173/#/edit/res-001
- Przenoszenie rezerwacji pomiędzy statusami zgodnie z następującą logiką: - Reserved - Canceled - Due In - Due In - Canceled - No Show - In House - In House - Checked Out - Checked Out: - In House - Canceled - Reserved
  Przykład:
  Rezerwacjom w statusie Reserved można zmienić status na: Canceled lub Due In
  Rezerwacjom w statusie In House można zmienić status na: Checked Out

Projektując rozwiązania pamiętaj o wydajności (rezerwacji może być kilka tysięcy) oraz użyteczności i łatwości obsługi.

## Dodatkowe informacje

Zmiany wprowadź samodzielnie, nie korzystaj z GenAI ani pomocy innych osób. Jeśli nie masz czasu, lub nie jesteś w stanie zaimplementować wszystkich wymagań prześlij nam to co udało Ci się zbudować.
Rozwiązanie powinno być dostarczone w formie linku do Twojego repozytorium GitLab lub GitHub zawierającego historię commitów.

## Czas

Czas na rozwiązanie: 1 tydzień liczony od dnia przesłania zadania.
