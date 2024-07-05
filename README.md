# Bay Area Asian Riders - A Next.js 14 full-stack community website 

![Logo](/public/images/motorbikeIcon.svg)
![ScreenShot1](/public/images/screenshot1.png)
## Features

- Fullstack Next.js 14 webapp with @Vercel/Postgres
- Server Component
- Wisp Blog with Tags
- Route Handler
- Dark Mode
- Clerk Authentication
- Prisma ORM

## Technologies
- [Next.js 14 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [clerk.js](https://clerk.com/)
- [Typescript](https://www.typescriptlang.org/)
- [ES Lint](https://eslint.org/)
- [Wisp](https://wisp.blog/)
- [@Vercel/Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)
- [Prisma](https://www.prisma.io/)
## Todos:
- Filters Func
- Search Func
- CRUD Func


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

## Challenges faced

1. dynamic rendering 
2. cache strategy: revalidate and cookie()
3. postgres tags filter fetch -> Prisma ORM introduced 
