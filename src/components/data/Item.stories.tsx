import type { Meta, StoryObj } from '@storybook/react'
import { Item } from './Item'

const meta: Meta<typeof Item> = {
  title: 'Components/Data/Item',
  component: Item,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Item' }
}
