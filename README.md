# Next.js E-commerce

This is a full-stack e-commerce application built with Next.js, TypeScript, and a range of modern technologies. It includes features like product browsing, a shopping cart, user authentication, and Stripe integration for payments.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payments:** [Stripe](https://stripe.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & custom components
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Linting:** [ESLint](https://eslint.org/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started) (for running the database)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mrcsbrln/next-ecommerce.git
    cd next-ecommerce
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file by copying the example file:

    ```bash
    cp .env.example .env.local
    ```

    Update the `.env.local` file with your credentials for the database, Stripe, and NextAuth.js.

4.  **Run the database:**

    Start the PostgreSQL database using Docker:

    ```bash
    docker-compose up -d
    ```

5.  **Run database migrations and seed data:**

    Apply the database schema and populate it with initial data:

    ```bash
    pnpm migrate
    ```

6.  **Start the development server:**

    ```bash
    pnpm dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project follows the standard Next.js App Router structure:

- `app/`: Contains all the routes, UI components, and logic for the application.
- `components/`: Contains shared UI components used across the application.
- `lib/`: Contains shared functions, utilities, and configurations.
- `prisma/`: Contains the database schema, migrations, and seed script.
- `public/`: Contains static assets like images and fonts.

## Available Scripts

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm generate`: Generates the Prisma client.
- `pnpm migrate`: Runs database migrations.

## Deployment

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
