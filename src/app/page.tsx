import { Button } from '@/components/ui/Button';

const featuresItems = [
  { icon: '🏎️', name: 'Next.js (app routing)' },
  { icon: '🔥', name: 'Type checking TypeScript' },
  { icon: '💅', name: 'Tailwind CSS' },
  { icon: '✨', name: 'Biome' },
  { icon: '🧪', name: 'Vitest' },
  { icon: '🧪', name: 'React Testing Library' },
  { icon: '📕', name: 'Storybook' },
  { icon: '🚀', name: 'GitHub Actions' },
  { icon: '💻', name: 'T3 Env' },
  { icon: '🏁', name: 'Absolute Imports using `@` prefix' }
];

const HomePage = () => (
  <div>
    <section className="bg-background px-4">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl xl:text-6xl">
            Next.js Enterprise Boilerplate
          </h1>
          <p className="mb-6 max-w-2xl font-light text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
            Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer
            experience first: Next.js, TypeScript, Biome, Husky, Lint-Staged, Vitest, React Testing
            Library, PostCSS, Tailwind CSS, Storybook, GH actions.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </section>
    <div className="mx-auto mt-4 max-w-screen-lg px-4">
      <h2 className="text-bold mt-8 mb-10 text-3xl text-foreground">🚀 Features:</h2>
      <ul className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featuresItems.map(({ icon, name }) => (
          <li
            key={name}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-6 text-center text-card-foreground shadow transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="text-xl">{icon}</span>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default HomePage;
