Доброго дня. Хотілось би одразу написати декілька нюансів та недоліків цієї роботи:
1) хоч завдання і було направлене на використання Next.js, через роботу з закритими ендпойнтами майже все написано на клієнтській частині, бо localStorage доступний тільки на клієнті, а з cookies я так і не розібралася. Я розумію, що це напевно не те, що Ви б хотіли побачити, але не знаю, як інакше можна було б це зробити (на даному етапі моїх знань та навичок).
2) В ререндерінгу меню і головної сторінки є явний мій косяк - після логування користувача компоненти не перемальовуються. Я спробувала перегуглила половину інтернету, і без редаксу воно так і не запрацювало. Якщо у фідбеку Ви напишете, що там можна було зробити - буду дуже вдячна.
3) За дизайн теж щиро прошу пробачити, але вже на що часу вистачило.
4) В цілому я розумію, що моя контрольна дуже далека від еталонної, і деякі недоліки я вже бачу, але не встигаю виправити. Але щиро сподіваюся хоча б на прохідний бал))


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
