import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Typography/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}

export const WithText: Story = {
  args: {
    text: 'Hello!'
  }
}

export const Colored: Story = {
  args: {
    color: 'crimson'
  }
}

export const Full: Story = {
  args: {
    text: 'Hello!',
    color: 'gold'
  }
}
