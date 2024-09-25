import type { Meta, StoryObj } from '@storybook/react'
import { Audio } from './Audio'

const meta: Meta<typeof Audio> = {
  title: 'Components/Media/Audio',
  component: Audio,
  tags: ['autodocs'],
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover:
      'https://images.unsplash.com/photo-1663162221489-385e5d75d29f?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
