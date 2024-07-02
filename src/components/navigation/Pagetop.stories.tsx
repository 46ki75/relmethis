import type { Meta, StoryObj } from '@storybook/react'
import { Pagetop } from './Pagetop'

const meta: Meta<typeof Pagetop> = {
  title: 'Navigation/Pagetop',
  component: Pagetop,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Left: Story = {
  args: { position: 'left' },
  render: ({ position }) => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop position={position} />
      </div>
    )
  }
}

export const Right: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ height: '2000px' }}>
        <Pagetop />
      </div>
    )
  }
}
