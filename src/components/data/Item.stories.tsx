import type { Meta, StoryObj } from '@storybook/react'
import { Item } from './Item'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof Item> = {
  title: 'Components/Data/Item',
  component: Item,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isDark: false,
    cooldown: 10,
    progress: 50,
    stackCount: 64,
    focus: false
  },
  render: (args) => {
    return (
      <Item
        {...args}
        children={
          <AcademicCapIcon
            style={{
              width: 48,
              color: args.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
            }}
          />
        }
      />
    )
  }
}
