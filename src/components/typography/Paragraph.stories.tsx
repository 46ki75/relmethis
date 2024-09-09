import type { Meta, StoryObj } from '@storybook/react'
import { Paragraph } from './Paragraph'

const meta: Meta<typeof Paragraph> = {
  title: 'Components/Typography/Paragraph',
  component: Paragraph,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: <span>Paragraph</span>, isDark: false }
}
