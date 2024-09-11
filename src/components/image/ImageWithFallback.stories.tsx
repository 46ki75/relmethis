import type { Meta, StoryObj } from '@storybook/react'
import { ImageWithFallback } from './ImageWithFallback'

const meta: Meta<typeof ImageWithFallback> = {
  title: 'Components/Image/ImageWithFallback',
  component: ImageWithFallback,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isDark: false,
    src: 'https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
  }
}

export const Loading: Story = {
  args: {
    isDark: false,
    isLoading: true,
    src: 'https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
  }
}
