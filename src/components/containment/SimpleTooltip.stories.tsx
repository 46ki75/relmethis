import type { Meta, StoryObj } from '@storybook/react'
import { SimpleTooltip } from './SimpleTooltip'

const meta: Meta<typeof SimpleTooltip> = {
  title: 'Components/Containment/SimpleTooltip',
  component: SimpleTooltip,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { content: 'SimpleTooltip', children: <span>Hover ME!</span> }
}
