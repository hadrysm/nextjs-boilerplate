const features = [
  '🏎️ Next.js (app routing)',
  '🔥 Type checking TypeScript',
  '💅 Tailwind CSS',
  '✨ ESlint',
  '✨ Prettier',
  '🧪 Jest',
  '🧪 React Testing Library',
  '📕 Storybook',
  '💎 Atomic Design',
  '🚀 GitHub Actions',
  '💻 T3 Env',
  '🏁 Absolute Imports using `@` prefix'
];

const HomePage = () => (
  <div>
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Next.js Enterprise Boilerplate
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer
            experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React
            Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.
          </p>
        </div>
      </div>
    </section>
    <div className="mx-auto mt-4 max-w-screen-lg">
      <h2 className="text-bold mt-8 text-3xl">🚀 Features:</h2>
      <ul className="ml-6 mt-6 list-disc">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default HomePage;
