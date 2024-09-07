import type { Meta, StoryObj } from '@storybook/react'
import { Markdown } from './Markdown'

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Blockquote: Story = {
  args: { markdown: '> this is blockquote' }
}

export const Divider: Story = {
  args: { markdown: '---' }
}

export const Paragraph: Story = {
  args: {
    markdown:
      "This text features ~~strikethrough~~, **bold**, *italic*, and __underline__ formatting. There's also `inline code`. [Here is a link](https://example.com)."
  }
}

const footernoteMarkdown = `
This is part of the main text[^1].

This is part of the main text[^2].

[^1]: This is the definition of a footnote. A detailed explanation is written here.

[^2]: This is the definition of a footnote. A detailed explanation is written here.
`

export const Footernote: Story = {
  args: {
    markdown: footernoteMarkdown
  }
}

export const Code: Story = {
  args: {
    markdown: '```ts\nconsole.log()\n```\n'
  }
}

export const Headings: Story = {
  args: {
    markdown: new Array(6)
      .fill(null)
      .map((_, index) => '#'.repeat(index + 1) + ' Heading' + (index + 1))
      .join('\n\n')
  }
}

export const Image: Story = {
  args: {
    markdown:
      '![unsplash image](https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)'
  }
}

export const Table: Story = {
  args: {
    markdown: ['|A|B|', '|-|-|', '|A1|B1|', '|A2|B2|'].join('\n')
  }
}

export const List: Story = {
  args: {
    markdown: [
      '- Bulleted 1',
      '- Bulleted 2',
      '1. Numbered 1',
      '2. Numbered 2',
      '   1. Numbered 12a',
      '   2. Numbered 2-b',
      '- Bulleted 1',
      '- Bulleted 2',
      '- - Bulleted 2-a',
      '- - Bulleted 2-b'
    ].join('\n')
  }
}

const definitionMarkdown = `
Here is a link to [GitHub][GitHub Home Page].

Also, here is a link to [Google][Google Home Page].

![unsplash image][unsplash-image]

[GitHub Home Page]: https://github.com "GitHub Home Page"
[Google Home Page]: https://www.google.com "Google Home Page"
[unsplash-image]: https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb
`

export const Definition: Story = {
  args: {
    markdown: definitionMarkdown
  }
}

const GfmAlertMarkdown = `
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
 `

export const GfmAlert: Story = {
  args: {
    markdown: GfmAlertMarkdown
  }
}

const longMarkdown = `
# Markdown Components Showcase

In this document, you'll find examples of different markdown components that can be rendered using our custom \`Markdown\` component. Below are examples of blockquote, headings, lists, tables, and more.

## Blockquote

> This is a blockquote, used for quoting external content or highlighting important sections in your document.

---

## Formatting in Paragraphs

This section demonstrates different text formatting options. You can use **bold** text to emphasize important information, *italic* text for highlighting terms, __underline__ for underlined sections, and even ~~strikethrough~~ to indicate deletions.

Additionally, here's an example of \`inline code\`. [You can also include links](https://example.com) within your paragraphs for navigation purposes.

---

## Code Example

Below is a code snippet demonstrating simple TypeScript code:

\`\`\`ts
console.log('Hello, world!');
\`\`\`

---

## Footnotes

Sometimes, you may want to add extra details without cluttering the main text. This is where footnotes come in handy.

This is part of the main text[^1].

This is another part of the main text[^2].

[^1]: Footnote one with additional details goes here.
[^2]: Footnote two with more explanation is included here.

---

## Headings

You can create hierarchical structures in your document using headings of different levels:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Image Example

![A beautiful nature image from Unsplash](https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)

---

## Lists

Here are some bulleted and numbered lists for organizing information:

- Bullet 1
- Bullet 2

1. Number 1
2. Number 2

---

## Table Example

Tables can be used to represent structured data:

| A  | B  |
|----|----|
| A1 | B1 |
| A2 | B2 |

---

## Definition Links

You can use reference-style links for cleaner markdown syntax:

Here is a link to [GitHub][GitHub Home Page].

Here is another link to [Google][Google Home Page].

![Unsplash image][Unsplash Image]

[GitHub Home Page]: https://github.com "GitHub"
[Google Home Page]: https://www.google.com "Google"
[Unsplash Image]: https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb "Nature"

---

## GFM Alerts

> [!NOTE]
> Here's a note to keep in mind while reading this section.

> [!TIP]
> A useful tip for improving productivity!

> [!IMPORTANT]
> Don't forget this crucial piece of information.

> [!WARNING]
> Pay attention to this warning to avoid issues.

> [!CAUTION]
> Be cautious when performing certain actions to prevent problems.
`

export const Full: Story = {
  args: {
    markdown: longMarkdown
  }
}
