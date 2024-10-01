import type { Meta, StoryObj } from '@storybook/react'
import { ColorTable } from './ColorTable'

const meta: Meta<typeof ColorTable> = {
  title: 'Examples/ColorTable/ColorTable',
  component: ColorTable,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} }
}
