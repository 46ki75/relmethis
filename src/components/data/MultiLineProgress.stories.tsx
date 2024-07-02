import type { Meta, StoryObj } from '@storybook/react'
import { MultiLineProgress } from './MultiLineProgress'

const meta: Meta<typeof MultiLineProgress> = {
  title: 'Data/MultiLineProgress',
  component: MultiLineProgress,
  tags: ['autodocs'],
  parameters: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { color: '#59b57c', label: 'Green', value: 30 },
      { color: '#6987b8', label: 'Blue', value: 200 },
      { color: '#9771bd', label: 'Purple', value: 200 }
    ]
  }
}

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true
  }
}
