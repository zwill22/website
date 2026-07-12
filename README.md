# My website

[![TypeScript][typescript-badge]][typescript-lang]
[![Next.js][next-badge]][nextjs]
[![React][react-badge]][react]
[![Tailwind CSS][tailwind-badge]][tailwindcss]
[![HTML][html-badge]](#)
[![CSS][css-badge]](#)
[![GitHub][github-badge]][repo]
[![pnpm][pnpm-badge]][pnpm]
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

[//]: # "Links"
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
[//]: # "Badges"
[github-badge]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[buy-me-coffee]: https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black
[license-badge]: https://img.shields.io/github/license/zwill22/website
[noai-badge]: https://custom-icon-badges.demolab.com/badge/No%20AI-2f2f2f?logo=non-ai&logoColor=white
[next-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[react-badge]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff
[typescript-badge]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white
[html-badge]: https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white
[css-badge]: https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff
