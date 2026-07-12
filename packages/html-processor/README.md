# Latex to HTML

[![JavaScript][javascript-badge]][javascript-lang]
[![HTML][html-badge]](#)
[![GitHub][github-badge]][repo]
[![pnpm][pnpm-badge]][pnpm]
[![Coffee][buy-me-coffee]][coffee]
[![License: MIT][license-badge]][license]
[![No AI][noai-badge]](#)

HTML-Processor is a JavaScript package which manipulates HTML using the [rehype][rehype] library and plugins. The package provides a default function `processHTML()`, which reads HTML from a string and parses it into a Hast tree (HTML) used by [rehype][rehype]. After the tree has been processed, [rehype-stringify][rehype-stringify] then returns a modified HTML string.

The package uses the following Rehype plugins:

- [rehype-parse][rehype-parse] to parse the input HTML string to a Hast tree
- [rehype-highlight][rehype-highlight] to highlight code
- [rehype-remove-empty-attribute][rehype-remove-empty-attribute]
- [rehype-unwrap-images][rehype-unwrap-images] to remove unnecessary `<p>` parent tags from images
- [rehype-stringify][rehype-stringify] to convert the Hast tree back to a string

In addition the following (manual) methods are also used:

- `fixUrls` prepends the input `rootUrl` to relative URLs in links
- `probeImageSizes` to determine the size for images
- `checkListDepth` to determine the depth of a given list (for bullet type)
- `inlineCodeBlocks` checks whether a `<code>` tag is inline or inside a `<pre>` tag
- `inlineLinks` checks whether a link is inline (text only)
- `cleanEmptyTags` removes empty text tags

Consider the following HTML:

```html
<h1>Title</h1>
<p>
  Some paragraph with
  <a href="https://www.wrexhamafc.co.uk/"> a random inline link, </a>
  to test.
</p>
<h2>Some code</h2>
<pre><code class="language-python">
    def functionToSolveEverything():
        # TODO: implement
        pass
</code></pre>
<p>List of TODOs</p>
<ul>
  <li>Figure</li>
  <li>Out</li>
  <li>Everthing</li>
</ul>
<p>
  <img src="images/example.png" alt="An example image." title="Example image" />
</p>
<p>
  Example code <code>print("Hello World!")</code> can appear anywhere, like
  image links:
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license" alt="License: MIT" />
  </a>
</p>
```

This `htmlString` can be processed using:

```javascript
import processHTML from "html-processor";

const urlFn = (url) => {
  return `https://example.com/files/${url}`;
};

const result = await processHTML(htmlString, urlFn);
```

The output HTML string is:

```html
Processor
<h1>Title</h1>
<p>
  Some paragraph with
  <a href="https://www.wrexhamafc.co.uk/" external="true" inline="true">
    a random inline link,
  </a>
  to test.
</p>
<h2>Some code</h2>
<pre><code class="hljs language-python" inline="false">
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">functionToSolveEverything</span>():
        <span class="hljs-comment"># <span class="hljs-doctag">TODO:</span> implement</span>
        <span class="hljs-keyword">pass</span>
</code></pre>
<p>List of TODOs</p>
<ul>
  <li depth="1">Figure</li>
  <li depth="1">Out</li>
  <li depth="1">Everthing</li>
</ul>

<img
  src="https://example.com/files/images/example.png"
  alt="An example image."
  title="Example image"
  external="false"
/>

<p>
  Example code <code inline="true">print("Hello World!")</code> can appear
  anywhere, like image links:
  <a href="https://example.com/files/LICENSE" external="false" inline="false">
    <img
      src="https://img.shields.io/github/license"
      alt="License: MIT"
      external="true"
    />
  </a>
</p>
```

Notice that:

- Links `<a>` now have an `inline` attribute
- Links and images now have an `external` attribute
- Code blocks now have `hljs` highlighting, including `<span>` tags for keywords
- Code blocks have an `inline` attribute
- List items `<li>` have a `depth` attribute
- Relative URLs now start with the `rootURL`

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
[rehype-parse]: https://github.com/rehypejs/rehype/blob/main/packages/rehype-parse
[rehype-highlight]: https://github.com/rehypejs/rehype-highlight
[rehype-remove-empty-attribute]: https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-empty-attribute
[rehype-unwrap-images]: https://github.com/rehypejs/rehype-unwrap-images
[//]: # "Badges"
[latex-badge]: https://img.shields.io/badge/LaTeX-00A0A0?logo=latex&logoColor=fff
[github-badge]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[buy-me-coffee]: https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black
[license-badge]: https://img.shields.io/github/license/zwill22/website
[noai-badge]: https://custom-icon-badges.demolab.com/badge/No%20AI-2f2f2f?logo=non-ai&logoColor=white
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff
[javascript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000
[html-badge]: https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white
