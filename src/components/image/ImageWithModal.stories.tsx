import type { Meta, StoryObj } from '@storybook/react'
import { ImageWithModal } from './ImageWithModal'

const meta: Meta<typeof ImageWithModal> = {
  title: 'Components/Image/ImageWithModal',
  component: ImageWithModal,
  parameters: {},
  tags: ['autodocs'],
  args: {
    isDark: false,
    src: 'https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

export const DisableModal: Story = {
  args: {
    disableModal: true
  }
}
