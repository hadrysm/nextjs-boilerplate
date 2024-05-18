# Boilerplate and Starter for Next JS 14+, Tailwind CSS 3 and TypeScript

🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js (app routing), TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.

![Cover](https://svgshare.com/i/idk.svg)

## :rocket: Features

Developer experience first:

- [Next.js](https://nextjs.org) for Static Site Generator
- Type checking [TypeScript](https://www.typescriptlang.org)
- Integrate with [Tailwind CSS](https://tailwindcss.com)
- [Storybook](https://storybook.js.org) for components documentation
- Strict Mode for TypeScript and React 18
- Linter with [ESLint](https://eslint.org)
- Code Formatter with [Prettier](https://prettier.io)
- [Husky](https://typicode.github.io/husky/#/) for Git Hooks
- [Lint-staged](https://github.com/okonet/lint-staged) for running linters on Git staged files
- Testing with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/)
- Absolute Imports using `@` prefix
- Nextjs custom layouts
- [T3 env](https://env.t3.gg/) Manage your environment variables with ease
- Message convention for git
- Maximize lighthouse score
- GH actions
- Components generation with [Plop](https://plopjs.com/) and [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) convention

## 📅 Plans

- [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [next-pwa](https://github.com/shadowwalker/next-pwa)

## 🧪 Testing

All tests are collocated with the source code inside the same directory. So, it makes it easier to find them. Coverage threshold is set to `70%`. In the `.jest` folder there is a custom provider for the all tests.

## :information_source: How To Use

To use this template you can simply click in **[Use this template](https://github.com/hadrysm/nextjs-boilerplate/generate)** or create your Next.js app based on this template by running:

```bash
pnpm create next-app -e https://github.com/hadrysm/nextjs-boilerplate
```

## 🚀 Deploy to production

Install command on Vercel:

```
corepack use pnpm@`pnpm -v` && pnpm i
```

You can see the results locally in production mode with:

```shell
pnpm build
```

```shell
pnpm start
```

## :gear: Generating components

```bash
pnpm generate Button
```

Result (if you chose an atom component):

```
└── components
      └── atoms
        └── Button
          ├── index.ts
          ├── Button.stories.tsx
          ├── Button.test.tsx
          └── Button.tsx
```

## 🤝 Contributing

1. Fork this repository;
2. Create your branch: `git checkout -b my-awesome-contribution`;
3. Commit your changes: `git commit -m 'feat: Add some awesome contribution'`;
4. Push to the branch: `git push origin my-awesome-contribution`.

## License

Licensed under the MIT License, Copyright © 2024

See [LICENSE](LICENSE) for more information.

---

Made with much :heart: and :muscle: by Mateusz Hadryś :blush: <a href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/">My Contact</a>
