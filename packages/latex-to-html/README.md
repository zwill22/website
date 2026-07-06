# Latex to HTML

[![JavaScript][javascript-badge]][javascript-lang]
[![LaTeX][latex-badge]](#)
[![HTML][html-badge]](#)
[![GitHub][github-badge]][repo]
[![pnpm][pnpm-badge]][pnpm]
[![Coffee][buy-me-coffee]][coffee]
[![License: MIT][license-badge]][license]
[![No AI][noai-badge]](#)

Latex-to-HTML is a JavaScript package which converts LaTeX code to HTML using the [unified-latex][unified-latex] library and plugins. The library generates an Abstract Syntax Tree (AST) from the LaTeX, which it then converts to Hast tree (HTML) used by [rehype][rehype]. The rehype plugin [rehype-stringify][rehype-stringify] then returns a HTML string.

The library does not perform any manipulation on the input LaTeX or the output HTML besides formatting and sanitising. The result of this is that custom LaTeX commands are removed and must be dealt with separately, either before using this library, or by maniputlating the output HTML.

Consider the following LaTeX document:

```latex
\documentclass{article}

\newcommand{\mylogo}{LOGO}

\title{Example LaTeX}
\author{Me}

\begin{document}

\mylogo
\maketitle

\section{The Start}

In the beginning...

\end{document}
```

This `latexString` can be converted into HTML using:

```javascript
import latexToHtml from "latexToHTML";

const result = await latexToHtml(latexString);
```

However, the resulting HTML string is:

```html
<p><span></span><span></span></p>
<h3>The Start</h3>
<p>In the beginning...</p>
```

Notice that the `\mylogo` command and the `\maketitle` command are completely ignored, with the (empty) line `<p><span></span><span></span></p>` in their place.

[//]: # "Links"
[javascript-lang]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[repo]: https://github.com/zwill22/website
[license]: https://github.com/zwill22/website/blob/main/LICENSE
[pnpm]: https://pnpm.io
[coffee]: https://coff.ee/zmwill
[unified]: https://unifiedjs.com
[rehype]: https://github.com/rehypejs/rehype
[unified-latex]: https://github.com/siefkenj/unified-latex/tree/main
[rehype-stringify]: https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify
[//]: # "Badges"
[latex-badge]: https://img.shields.io/badge/LaTeX-00A0A0?logo=latex&logoColor=fff
[github-badge]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[buy-me-coffee]: https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black
[license-badge]: https://img.shields.io/github/license/zwill22/website
[noai-badge]: https://custom-icon-badges.demolab.com/badge/No%20AI-2f2f2f?logo=non-ai&logoColor=white
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff
[javascript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000
[html-badge]: https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white
