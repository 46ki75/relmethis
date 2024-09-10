import type { Meta, StoryObj } from '@storybook/react'
import { Keyboard } from './Keyboard'

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Other/Keyboard',
  component: Keyboard,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Keyboard' }
}
