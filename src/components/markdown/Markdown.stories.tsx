import type { Meta, StoryObj } from '@storybook/react'
import { Markdown } from './Markdown'

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

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

const code = `
use reqwest::Error;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Post {
    #[serde(rename = "userId")]
    user_id: u32,
    id: u32,
    title: String,
    body: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let response = reqwest::get(url).await?;
    let posts: Vec<Post> = response.json().await?;

    for post in posts.iter().take(5) {
        println!("ID: {}, Title: {}", post.id, post.title);
    }

    Ok(())
}
`

const codeMarkdown = `
\`\`\`rust src/main.rs
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

export const Image: Story = {
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
