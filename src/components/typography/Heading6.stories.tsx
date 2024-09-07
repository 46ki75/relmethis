import type { Meta, StoryObj } from '@storybook/react'
import { Heading6 } from './Heading6'

const meta: Meta<typeof Heading6> = {
  title: 'Components/Typography/Heading6',
  component: Heading6,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Template' }
}
