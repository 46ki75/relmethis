import type { Meta, StoryObj } from '@storybook/react'
import { DotLoadingIcon } from './DotLoadingIcon'

const meta: Meta<typeof DotLoadingIcon> = {
  title: 'Components/Icon/DotLoadingIcon',
  component: DotLoadingIcon,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Small: Story = {
  args: {
    size: 32
  }
}

export const Colored: Story = {
  args: {
    color: 'darkgreen'
  }
}
