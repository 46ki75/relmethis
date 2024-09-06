import type { Meta, StoryObj } from '@storybook/react'
import { Heading1 } from './Heading1'

const meta: Meta<typeof Heading1> = {
  title: 'Typography/Heading1',
  component: Heading1,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Hello, world!'
  }
}
