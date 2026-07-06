# Markdown to HTML

[![JavaScript][javascript-badge]][javascript-lang]
[![Markdown][markdown-badge]](#)
[![HTML][html-badge]](#)
[![GitHub][github-badge]][repo]
[![pnpm][pnpm-badge]][pnpm]
[![Coffee][buy-me-coffee]][coffee]
[![License: MIT][license-badge]][license]
[![No AI][noai-badge]](#)

Markdown-To-HTML is a JavaScript package which converts Markdown to HTML using the [remark][remark] and [rehype][rehype] libraries and plugins. The rehype plugin [rehype-stringify][rehype-stringify] then returns a HTML string.

The library provides minimal code manipulation, with many features unsupported.
The only changes made to the markdown code is for images with an emphasised comment next to them. The comment is merged with the image to become the images alt-text. For example:

```md
![Image title](https://blog.idrsolutions.com/app/uploads/2017/03/PNG.png)
_An image_
```

becomes:

```html
<img
  src="https://blog.idrsolutions.com/app/uploads/2017/03/PNG.png"
  alt="An image"
  title="Image Title"
/>
```

Consider the following Markdown document:

```md
# Example Markdown document

_Author - 6th July 2026_

This is a Markdown document, Markdown is a lightweight markup language for creating formatted text from plain text. It is used in many places, such as [https://github.com](GitHub), ReadMe files, blogging, and instant messaging.

## Usage

In addition to links and titles, markdown is useful for embedding code, either inline `print("Hello World!")` using single quotes, or blocks using triple qutoes. Images can be embedded using:

![An image](image.png)
_A PNG image_

There's also lists:

- math mode
- block quotes
- tables
- etc.

However, there are multiple markdown syntaxes, and not all features are available in all versions.
```

This `mdString` can be converted into HTML using:

```javascript
import markdownToHtml from "markdown-to-html";

const result = await markdownToHtml(mdString);
```

The resulting HTML string is:

```html
<h1>Example Markdown document</h1>
<p><em>Author - 6th July 2026</em></p>
<p>
  This is a Markdown document, Markdown is a lightweight markup language for
  creating formatted text from plain text. It is used in many places, such as
  <a href="GitHub">https://github.com</a>, ReadMe files, blogging, and instant
  messaging.
</p>
<h2>Usage</h2>
<p>
  In addition to links and titles, markdown is useful for embedding code, either
  inline <code>print("Hello World!")</code> using single quotes, or blocks using
  triple qutoes. Images can be embedded using:
</p>
<p>
  <img src="image.png" alt="A PNG image" title="An image" />
</p>
<p>There's also lists:</p>
<ul>
  <li>math mode</li>
  <li>block quotes</li>
  <li>tables</li>
  <li>etc.</li>
</ul>
<p>
  However, there are multiple markdown syntaxes, and not all features are
  available in all versions.
</p>
```

Notice that the `img` tag is surrounded by a `p` tag. The additional tag can be removed along with other changes using [rehype][rehype] plugins, but only the basic converstion is performed by this package without any cleanup.

[//]: # "Links"
[javascript-lang]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[repo]: https://github.com/zwill22/website
[license]: https://github.com/zwill22/website/blob/main/LICENSE
[pnpm]: https://pnpm.io
[coffee]: https://coff.ee/zmwill
[unified]: https://unifiedjs.com
[remark]: https://github.com/remarkjs/remark
[rehype]: https://github.com/rehypejs/rehype
[unified-latex]: https://github.com/siefkenj/unified-latex/tree/main
[rehype-stringify]: https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify
[//]: # "Badges"
[markdown-badge]: https://img.shields.io/badge/Markdown-%23000000.svg?logo=markdown&logoColor=white
[github-badge]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[buy-me-coffee]: https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black
[license-badge]: https://img.shields.io/github/license/zwill22/website
[noai-badge]: https://custom-icon-badges.demolab.com/badge/No%20AI-2f2f2f?logo=non-ai&logoColor=white
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff
[javascript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000
[html-badge]: https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white
