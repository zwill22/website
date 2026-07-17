# My website

[![TypeScript][typescript-badge]][typescript-lang]
[![Next.js][next-badge]][nextjs]
[![React][react-badge]][react]
[![Tailwind CSS][tailwind-badge]][tailwindcss]
[![HTML][html-badge]](#)
[![CSS][css-badge]](#)
[![GitHub][github-badge]][repo]
[![pnpm][pnpm-badge]][pnpm]
[![Vercel][vercel-badge]][vercel]
[![Vercel Deploy][vercel-deploy-badge]][website]
[![GitHub Actions][github-actions-badge]][github-actions]
[![Tests][test-badge]][test]
[![Package tests][package-tests-badge]][package-tests]
[![Mocha][mocha-badge]](#)
[![Coffee][buy-me-coffee]][coffee]
[![License: MIT][license-badge]][license]
[![No AI][noai-badge]](#)

Source code for my website, built using:

- [Typescript][typescript-lang]
- [Next.js][nextjs]
- [React][react]
- [TailwindCSS][tailwindcss]
- [HeroUI][heroui] component library
- [HeroIcons][heroicons]
- [Bootstrap Icons][bootstrap]
- [pnpm][pnpm] package manager

This project was initialised using the HeroUI template:

```bash
npx heroui-cli@latest init -t app -p pnpm
```

To run the site in development mode, run:

```bash
pnpm run dev
```

However, a `.env` file is necessary for secrets.

The sub-packages [markdown-to-html](packages/markdown-to-html/README.md),
and [latex-to-html](packages/latex-to-html/README.md) are used to convert
Markdown and LaTeX into HTML. These utilise the [unified][unified]
JavaScript ecosystem for the conversion. Blog posts and project READMEs are converted from Markdown syntax, while the online version of my CV is converted
from the original LaTeX version.

The package [html-processor](packages/html-processor/README.md) uses [Rehype][rehype] to manipulate
HTML into the desired format.

Additional features include:

- [Nodemailer][nodemailer] for SMTP email transport.
- [Rehype React][rehype-react] for converting HTML to React

The aim is to further expand this website, adding new projects and blog posts.

<!-- Links -->

[typescript-lang]: https://www.typescriptlang.org
[repo]: https://github.com/zwill22/website
[license]: https://github.com/zwill22/website/blob/main/LICENSE
[nextjs]: https://nextjs.org
[react]: https://react.dev
[tailwindcss]: https://tailwindcss.com
[pnpm]: https://pnpm.io
[coffee]: https://coff.ee/zmwill
[heroui]: https://heroui.com
[heroicons]: https://heroicons.com
[bootstrap]: https://icons.getbootstrap.com
[nodemailer]: https://nodemailer.com
[unified]: https://unifiedjs.com
[rehype]: https://github.com/rehypejs/rehype
[rehype-react]: https://github.com/rehypejs/rehype-react
[github-actions]: https://github.com/zwill22/website/actions
[test]: https://github.com/zwill22/website/actions/workflows/test.yml
[package-tests]: https://github.com/zwill22/website/actions/workflows/test-packages.yml
[mocha]: https://mochajs.org/
[vercel]: https://vercel.com
[website]: https://website-iota-lake-90.vercel.app/

<!-- Badges -->

[github-badge]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white&style=for-the-badge
[buy-me-coffee]: https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black&style=for-the-badge
[license-badge]: https://img.shields.io/github/license/zwill22/website?style=for-the-badge
[noai-badge]: https://custom-icon-badges.demolab.com/badge/No%20AI-2f2f2f?logo=non-ai&logoColor=white&style=for-the-badge
[next-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white&style=for-the-badge
[react-badge]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff&style=for-the-badge
[typescript-badge]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white&style=for-the-badge
[html-badge]: https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white&style=for-the-badge
[css-badge]: https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff&style=for-the-badge
[github-actions-badge]: https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white&style=for-the-badge
[test-badge]: https://img.shields.io/github/actions/workflow/status/zwill22/website/test.yml?style=for-the-badge&logo=github&label=Tests
[package-tests-badge]: https://img.shields.io/github/actions/workflow/status/zwill22/website/test-packages.yml?style=for-the-badge&logo=github&label=Package%20Tests
[mocha-badge]: https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=fff&style=for-the-badge
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white&style=for-the-badge
[vercel-deploy-badge]: https://deploy-badge.vercel.app/vercel/website-iota-lake-90?name=Vercel&style=for-the-badge
