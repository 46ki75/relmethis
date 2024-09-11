import type { Meta, StoryObj } from '@storybook/react'
import { RectangleWave } from './RectangleWave'

const meta: Meta<typeof RectangleWave> = {
  title: 'Components/Fallback/RectangleWave',
  component: RectangleWave,
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { isDark: false },
  render: (args) => {
    return (
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <RectangleWave {...args} />
      </div>
    )
  }
}

export const Colored: Story = {
  args: { color: 'darkgreen' },
  render: ({ color }) => {
    return (
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <RectangleWave color={color} />
      </div>
    )
  }
}
