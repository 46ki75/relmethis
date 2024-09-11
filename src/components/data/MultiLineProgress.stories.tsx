import type { Meta, StoryObj } from '@storybook/react'
import { MultiLineProgress } from './MultiLineProgress'

const meta: Meta<typeof MultiLineProgress> = {
  title: 'Components/Data/MultiLineProgress',
  component: MultiLineProgress,
  tags: ['autodocs'],
  args: {
    isDark: false,
    data: [
      { color: '#59b57c', label: 'Green', value: 100 },
      { color: '#6987b8', label: 'Blue', value: 200 },
      { color: '#9771bd', label: 'Purple', value: 200 }
    ]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    unit: 'KB'
  }
}

export const Dark: Story = {
  args: {
    isDark: true
  }
}

export const Bold: Story = {
  args: {
    weight: 16
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}
