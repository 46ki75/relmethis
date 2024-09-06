import type { Meta, StoryObj } from '@storybook/react'
import { RectangleWave } from './RectangleWave'

const meta: Meta<typeof RectangleWave> = {
  title: 'Components/Decoration/RectangleWave',
  component: RectangleWave,
  parameters: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <RectangleWave />
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
