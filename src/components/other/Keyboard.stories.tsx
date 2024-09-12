import type { Meta, StoryObj } from '@storybook/react'
import { Keyboard } from './Keyboard'

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Other/Keyboard',
  component: Keyboard,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
