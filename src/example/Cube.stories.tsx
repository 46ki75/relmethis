import type { Meta, StoryObj } from '@storybook/react'
import { Cube } from './Cube'

const meta: Meta<typeof Cube> = {
  title: 'Examples/Cube/Cube',
  component: Cube,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} }
}
