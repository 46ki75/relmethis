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
      '2. Numbered 2'
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
