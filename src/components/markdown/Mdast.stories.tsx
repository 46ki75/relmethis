import type { Meta, StoryObj } from '@storybook/react'
import { Mdast } from './Mdast'

const meta: Meta<typeof Mdast> = {
  title: 'Components/Markdown/Mdast',
  component: Mdast,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  args: {
    mdast: [
      {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'This is H1 Heading Text'
          }
        ]
      },
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'This is H2 Heading Text'
          }
        ]
      },
      {
        type: 'heading',
        depth: 3,
        children: [
          {
            type: 'text',
            value: 'This is H3 Heading Text'
          }
        ]
      }
    ]
  }
}
