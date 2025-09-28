# Inspection App

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) (My recommendation version is v22.19.0)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Composer](https://getcomposer.org/) and [PHP](https://www.php.net/) (>= 8) for the backend

## 🪛 Installation

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

## 🚀 Running the application

1. **Backend**

   Open a terminal in the `inspection-app/backend` directory and run the Lumen application on port **8000** using PHP's built-in server:

   ```sh
   php -S localhost:8000 -t public
   ```

   This will expose the API endpoints at `http://localhost:8000`.

2. **Frontend**

   Open a terminal in the inspection-app/frontend directory.

   Run with pnpm:

   ```sh
   pnpm dev
   ```

   Or run with npm:

   ```sh
   npm run dev
   ```

   The application should open in your browser at `http://localhost:5173`. The frontend expects the API to be available at `http://localhost:8000`;

## 📝 Notes

- **Three pages:**

  - **Inspection Record:**
    1. All dropdown data should be prefetched into the Vuex store on initial load using Axios. After that, dynamic dropdown content should be handled on the client side (no further server requests).
    2. Displays all inspection requests across three tabs: Open, For Review, and Completed.
    3. Search functionality filters correctly across all fields.
    4. Clicking a request no. data navigates to the detail page.
    5. Clicking a row expands the table to show additional details in quick view.
    6. Clicking the Export button downloads data in JSON format.
    7. Clicking the Create Request button navigates to the Create Inspection page.
  - **Create Inspection:**
    1. Form validation is implemented using react-hook-form with Yup.
    2. In Order Information users can add or delete items. Each item can have multiple lots.
    3. All select inputs support searching.
    4. Users can search lots, allocations, owners, or conditions. Selecting one or more fields filters the others (e.g., selecting a lot filters allocation, owner, and condition).
    5. Available quantity (Avail Qty) is shown automatically once lot, allocation, owner, and condition are selected (dummy inventory data is provided).
    6. A newly created inspection has the status New and redirects the user to the detail page.
    7. On creation, the app matches customer selection with the owner in the lot section of order information to count third-party data, and randomly generates Charge to Customer data when value of Charge to Customer is "true".
    8. Clicking Cancel navigates back to the Inspection Record page.
  - **Detail Inspection:**
    1. Displays all inspection data, including header info, scope of work, order information, and charges to the customer.
    2. Clicking Export / Share Document opens the print window.
    3. Clicking Back navigates to the Inspection Record page.

- **State management:** Uses Redux Toolkit (`@reduxjs/toolkit`) for managing global state. On first load the frontend performs an `axios` request to `/api/inspections` (served by the backend) and writes the resulting data into the Redux store. All subsequent reads and writes happen entirely on the client side.

– **Backend:** A lightweight **Lumen 12** server located in the `backend` folder exposes a single endpoint (`/api/inspections`). This endpoint reads the provided `my‑datatest.json` file on disk and returns the contents as JSON. At runtime the backend performs no database I/O: it simply reads the file from storage. You can add additional fields to your Redux state as needed without changing the backend. The backend has intentionally not been shipped with its `vendor` directory to keep the repository size reasonable; therefore you must run `composer install` before serving the API locally.

- **Styling:** Tailwind CSS is used throughout the project. The classes defined in the components closely follow the layout.

- **Routing:** Utilises `react-router-dom` to handle navigation between pages.

- **Atomic design:** Components are organised into the `src/components` directory. This promotes reusability and separation of concerns.
