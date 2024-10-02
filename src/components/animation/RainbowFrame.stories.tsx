import type { Meta, StoryObj } from '@storybook/react'
import { RainbowFrame } from './RainbowFrame'

const meta: Meta<typeof RainbowFrame> = {
  title: 'Components/Animation/RainbowFrame',
  component: RainbowFrame,
  tags: ['autodocs'],
  args: { opacity: 0.5, strokeWidth: 1 },
  render: (args) => (
    <div style={{ height: 300 }}>
      <span>aaaaaaaaaaaaaaaaaaaaaa</span>
      <RainbowFrame {...args} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const DisplayOnHover: Story = {
  args: { displayOnHover: true }
}
