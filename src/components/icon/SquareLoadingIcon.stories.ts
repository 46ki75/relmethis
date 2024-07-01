import type { Meta, StoryObj } from '@storybook/react'
import { SquareLoadingIcon } from './SquareLoadingIcon'

const meta: Meta<typeof SquareLoadingIcon> = {
  title: 'Icon/SquareLoadingIcon',
  component: SquareLoadingIcon,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Small: Story = {
  args: { size: 32 }
}

export const Colored: Story = {
  args: { color: 'darkgreen' }
}
