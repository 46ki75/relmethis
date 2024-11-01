import type { Meta, StoryObj } from '@storybook/react'
import { Markdown } from './Markdown'
import code from '../../assets/code/main.rs?raw'

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineStyle: Story = {
  args: {
    markdown: 'Hello, this is :style[red text]{color=red font-weight=bold}.'
  }
}

export const ColorStyle: Story = {
  args: {
    markdown: 'Hello, this is :color[emerald text]{.emerald}.'
  }
}

export const RichText: Story = {
  args: {
    markdown:
      'Hello, this is :rich-text[emerald text]{.emerald .bold}.\n\n:rich-text[JSON.stringify()]{.code .amber}'
  }
}

const bookmark = `
:::bookmark{title="Amazon EC2 Pricing | AWS Official" url="https://aws.amazon.com/jp/ec2/pricing/" image="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"}
Describes the four payment methods for Amazon EC2 instances.
In addition to the three methods of on-demand, reserved instances,
and spot instances, payments can also be made for Dedicated Hosts.
:::
`

export const Bookmark: Story = {
  args: { markdown: bookmark }
}

export const Embed: Story = {
  args: {
    markdown:
      ':embed[external contents]{src="https://www.youtube.com/embed/BpPEoZW5IiY"}'
  }
}

const toggle = `
:::toggle{summary="Folded"}
Describes the four payment methods for Amazon EC2 instances.
In addition to the three methods of on-demand, reserved instances,
and spot instances, payments can also be made for Dedicated Hosts.
:::
`

export const Toggle: Story = {
  args: {
    markdown: toggle
  }
}

const blockquoteMarkdown =
  '> This is a blockquote, used for quoting external content or highlighting important sections in your document.'

export const Blockquote: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: blockquoteMarkdown
  }
}

export const Divider: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: '---'
  }
}

const paragraphMarkdown =
  "This text features ~~strikethrough~~, **bold**, *italic*, and __underline__ formatting. There's also `inline code`. [Here is a link](https://example.com)."

export const Paragraph: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: paragraphMarkdown
  }
}

const footnoteMarkdown = `
Sometimes, you may want to add extra details without cluttering the main text. This is where footnotes come in handy.

This is part of the main text[^1].

This is another part of the main text[^2].

[^1]: Footnote one with additional details goes here.
[^2]: Footnote two with more explanation is included here.
`

export const Footnote: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: footnoteMarkdown
  }
}

const codeMarkdown = `
\`\`\`rust [src/main.rs] {2, 5-11, 20}
${code}
\`\`\`
`

export const Code: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: codeMarkdown
  }
}

const headingMarkdown = new Array(6)
  .fill(null)
  .map((_, index) => '#'.repeat(index + 1) + ' Heading' + (index + 1))
  .join('\n\n')

export const Headings: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: headingMarkdown
  }
}

export const Images: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown:
      '![unsplash image](https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)'
  }
}

const tablemarkdwon = `
| Name          | Department  | Position          |
| ------------- | ----------- | ----------------- |
| John Doe      | Engineering | Software Engineer |
| Jane Smith    | Marketing   | Marketing Manager |
| Emily Johnson | Finance     | Financial Analyst |

|     Name      | Department  |          Position |
| :-----------: | :---------- | ----------------: |
|   John Doe    | Engineering | Software Engineer |
|  Jane Smith   | Marketing   | Marketing Manager |
| Emily Johnson | Finance     | Financial Analyst |
`

export const Table: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: tablemarkdwon
  }
}

const listMarkdown = `
- Bulleted 1
- Bulleted 2
1. Numbered 1
2. Numbered 2
   1. Numbered 12a
   2. Numbered 2-b
- Bulleted 1
- Bulleted 2
- - Bulleted 2-a
- - Bulleted 2-b
`

export const List: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
    markdown: listMarkdown
  }
}

const definitionMarkdown = `
You can use reference-style links for cleaner markdown syntax:

Here is a link to [GitHub][GitHub Home Page].

Here is another link to [Google][Google Home Page].

![Unsplash image][Unsplash Image]

[GitHub Home Page]: https://github.com "GitHub"
[Google Home Page]: https://www.google.com "Google"
[Unsplash Image]: https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb "Nature"
`

export const Definition: Story = {
  args: {
    isDark: false,
    enableTableOfContents: true,
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
    isDark: false,
    enableTableOfContents: true,
    markdown: GfmAlertMarkdown
  }
}

export const InlineMath: Story = {
  args: {
    isDark: false,
    markdown: `This is an inline equation: $x^2 + y^2 = z^2$`
  }
}

const blockMath = `
This is an block equation:

$$
x^2 + y^2 = z^2
$$
`

export const BlockMath: Story = {
  args: {
    isDark: false,
    markdown: blockMath
  }
}

const longMarkdown = `
# Markdown Components Showcase

${paragraphMarkdown}

## Blockquote

${blockquoteMarkdown}

---

## Formatting in Paragraphs

This section demonstrates different text formatting options. You can use **bold** text to emphasize important information, *italic* text for highlighting terms, __underline__ for underlined sections, and even ~~strikethrough~~ to indicate deletions.

Additionally, here's an example of \`inline code\`. [You can also include links](https://example.com) within your paragraphs for navigation purposes.

---

## Code Example

Below is a code snippet demonstrating simple Rust code:

${codeMarkdown}

---

## Footnotes

${footnoteMarkdown}

---

## Headings

You can create hierarchical structures in your document using headings of different levels:

${headingMarkdown}

---

## Image Example

![A beautiful nature image from Unsplash](https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)

---

## Lists

Here are some bulleted and numbered lists for organizing information:

${listMarkdown}

---

## Table Example

Tables can be used to represent structured data:

${tablemarkdwon}

---

## Definition Links

${definitionMarkdown}

---

## GFM Alerts

${GfmAlertMarkdown}
`

export const Full: Story = {
  args: {
    markdown: longMarkdown
  }
}
