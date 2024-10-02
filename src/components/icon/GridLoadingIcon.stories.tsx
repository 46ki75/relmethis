import type { Meta, StoryObj } from '@storybook/react'
import { GridLoadingIcon } from './GridLoadingIcon'

const meta: Meta<typeof GridLoadingIcon> = {
  title: 'Components/Icon/GridLoadingIcon',
  component: GridLoadingIcon,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} }
}
