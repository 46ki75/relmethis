import type { Meta, StoryObj } from '@storybook/react'
import { InlineCode } from './InlineCode'

const meta: Meta<typeof InlineCode> = {
  title: 'Components/Inline/InlineCode',
  component: InlineCode,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'JSON.stringify()',
    isDark: false
  }
}
