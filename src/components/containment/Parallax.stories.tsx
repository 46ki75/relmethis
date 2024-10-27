import type { Meta, StoryObj } from '@storybook/react'
import { Parallax } from './Parallax'

const meta: Meta<typeof Parallax> = {
  title: 'Components/Containment/Parallax',
  component: Parallax,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    return (
      <div style={{ width: '100%' }}>
        <Parallax {...args} />
        {new Array(100).fill(0).map((_, i) => (
          <h1 key={i} style={{ color: 'gray' }}>
            TEXT CONTENT {i}
          </h1>
        ))}
      </div>
    )
  },
  args: {
    isDark: false,
    imageUrl1: '/images/bg1.webp',
    imageUrl2: '/images/bg2.webp'
  }
}
