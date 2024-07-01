import type { Meta, StoryObj } from '@storybook/react'
import { RectangleWave } from './RectangleWave'

const meta: Meta<typeof RectangleWave> = {
  title: 'Decoration/RectangleWave',
  component: RectangleWave,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Colored: Story = {
  args: { color: 'darkgreen' }
}
