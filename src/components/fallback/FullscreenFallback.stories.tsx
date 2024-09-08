import type { Meta, StoryObj } from '@storybook/react'
import { FullscreenFallback } from './FullscreenFallback'

const meta: Meta<typeof FullscreenFallback> = {
  title: 'Components/Fallback/FullscreenFallback',
  component: FullscreenFallback,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
