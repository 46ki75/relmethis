import type { Meta, StoryObj } from '@storybook/react'
import { Heading5 } from './Heading5'

const meta: Meta<typeof Heading5> = {
  title: 'Components/Typography/Heading5',
  component: Heading5,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Template' }
}
