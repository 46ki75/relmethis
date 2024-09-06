import type { Meta, StoryObj } from '@storybook/react'
import { Heading3 } from './Heading3'

const meta: Meta<typeof Heading3> = {
  title: 'Components/Typography/Heading3',
  component: Heading3,
  tags: ['autodocs'],
  argTypes: {
    isDark: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Getting Started',
    isDark: false
  }
}
