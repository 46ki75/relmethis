import type { Meta, StoryObj } from '@storybook/react'
import { Pagetop } from './Pagetop'

const meta: Meta<typeof Pagetop> = {
  title: 'Components/Navigation/Pagetop',
  component: Pagetop,
  parameters: {},
  tags: ['autodocs'],
  argTypes: { position: { control: 'radio', options: ['left', 'right'] } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Left: Story = {
  args: { position: 'left', isDark: false },
  render: (args) => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop {...args} />
      </div>
    )
  }
}

export const Right: Story = {
  args: { position: 'right', isDark: false },
  render: (args) => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop {...args} />
      </div>
    )
  }
}

export const Big: Story = {
  args: { size: 128 },
  render: (args) => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop {...args} />
      </div>
    )
  }
}

export const Small: Story = {
  args: { size: 48 },
  render: (args) => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop {...args} />
      </div>
    )
  }
}
