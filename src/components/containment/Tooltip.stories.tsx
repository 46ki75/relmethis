import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Containment/Tooltip',
  component: Tooltip,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <span>Hover ME!</span>,
    tooltipComponent: <div>Tooltip Tooltip</div>
  }
}

export const Long: Story = {
  args: {
    children: <span>Hover ME!</span>,
    place: 'bottom',
    tooltipComponent: (
      <div>
        Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip
        Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip
        Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip
        Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip
        Tooltip Tooltip Tooltip
      </div>
    )
  }
}
