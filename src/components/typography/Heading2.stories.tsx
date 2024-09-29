import type { Meta, StoryObj } from '@storybook/react'
import { Heading2 } from './Heading2'

const meta: Meta<typeof Heading2> = {
  title: 'Components/Typography/Heading2',
  component: Heading2,
  tags: ['autodocs'],
  argTypes: {
    isDark: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Getting Started',
    isDark: false
  }
}
