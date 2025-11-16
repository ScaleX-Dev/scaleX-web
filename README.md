# ScaleX Website

This is the official repository for the ScaleX company website, built with Next.js and Tailwind CSS.

## About ScaleX

At ScaleX, our journey began with a group of college freelancers. Since then, we've grown our business, expanded our team, and diversified our portfolio. Central to our evolution has been our unwavering passion for data and creativity, empowering us to solve problems for our clients in our sleep.

We connect vision, co-create strategy, and scale brands with agility and purpose. At ScaleX Global, we go beyond partnerships - we become an extension of your team. By blending agile digital marketing, performance-driven design, and strategic insight, we solve real-world challenges startups and growing brands face every day.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy with Docker

You can also deploy this application using Docker.

1.  **Build the Docker image:**

    To build the image, you need to pass your Firebase credentials as build arguments. Replace the placeholder values with your actual credentials from the `.env.local` file.

    ```bash
    docker build \
      --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key" \
      --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain" \
      --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id" \
      --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket" \
      --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id" \
      --build-arg NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id" \
      -t scalex-web .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 scalex-web
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
