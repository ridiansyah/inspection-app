# Inspection App

## Prerequisites

- [Node.js](https://nodejs.org/) (My recommendation version is v22.19.0)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Composer](https://getcomposer.org/) and [PHP](https://www.php.net/) (>= 8) for the backend

## Installation

1. **Clone the repository** and navigate into the project folder:

   ```sh
   git clone https://github.com/ridiansyah/inspection-app.git
   cd inspection-app
   ```

2. **Backend setup**

   Install dependencies using Composer:

   ```sh
   cd backend
   composer install
   ```

   Run the Lumen application on port 8000 using PHP's built‑in server:

   ```sh
   php -S localhost:8000 -t public
   ```

   This will expose the API endpoints at `http://localhost:8000`.

3. **Frontend setup**

   Open a new terminal and open frontend directory

   ```sh
   cd frontend
   ```

   Install Node dependencies:

   using pnpm

   ```sh
   pnpm install
   ```

   or using npm

   ```sh
   npm install
   ```

   Run the development server:

   using pnpm

   ```sh
   pnpm dev
   ```

   or using npm

   ```sh
   npm run dev
   ```

   The application should open automatically in your browser at `http://localhost:5173`. The frontend expects the API to be available at `http://localhost:8000`;
