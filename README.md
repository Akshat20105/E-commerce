# Product Management System

This is a simple Product Management System built with Next.js, React, and PostgreSQL. It allows users to view, add, edit, and delete products.

## Features

- List all products
- Add new products
- Edit existing products
- Delete products
- Responsive design

## Tech Stack

- Frontend: React, Next.js
- Backend: Next.js API Routes
- Database: PostgreSQL
- Styling: Tailwind CSS
- UI Components: shadcn/ui

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Akshat20105/E-commerce.git
   cd product-management-system
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up your PostgreSQL database and create a table named `products` with the following schema:
   ```sql
   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     quantity INTEGER NOT NULL
   );
   ```

4. Create a `.env.local` file in the root directory and add your database connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   ```
   in my case it is
   ```
   DATABASE_URL=postgresql://postgres:passwd@localhost:5432/e_com   
   ```

5. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `pages/index.tsx`: Main page component
- `pages/api/products/index.ts`: API route for fetching all products and creating new products
- `pages/api/products/[id].ts`: API route for updating and deleting individual products
- `components/ProductList.tsx`: Component for displaying the list of products
- `components/ProductForm.tsx`: Component for adding/editing products
- `next.config.js`: Next.js configuration file

## Approach

This project follows these key principles:

1. **Server-Side Rendering**: Utilizing Next.js for improved performance and SEO.
2. **API Routes**: Leveraging Next.js API routes to create a simple backend within the same project.
3. **Component-Based Architecture**: Using React components for a modular and maintainable codebase.
4. **Responsive Design**: Implementing a mobile-first approach with Tailwind CSS for responsive layouts.
5. **Error Handling**: Implementing proper error handling and displaying user-friendly error messages.
6. **Loading States**: Adding loading indicators to improve user experience during data fetching.
7. **Optimistic Updates**: Updating the UI immediately upon user actions for a snappier feel, then syncing with the server.

## Future Improvements

- Add authentication and user management
- Implement pagination for the product list
- Add sorting and filtering options
- Implement unit and integration tests
- Set up continuous integration and deployment (CI/CD)

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/Akshat20105/E-commerce/issues) if you want to contribute.
