import type { Meta, StoryObj } from '@storybook/react'
import { BlockFallback } from './BlockFallback'

const meta: Meta<typeof BlockFallback> = {
  title: 'Components/Fallback/BlockFallback',
  component: BlockFallback,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
