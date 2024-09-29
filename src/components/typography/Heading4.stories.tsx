import type { Meta, StoryObj } from '@storybook/react'
import { Heading4 } from './Heading4'

const meta: Meta<typeof Heading4> = {
  title: 'Components/Typography/Heading4',
  component: Heading4,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Template' }
}
