import type { Meta, StoryObj } from '@storybook/react'
import { LineProgress } from './LineProgress'
import { useState } from 'react'

const meta: Meta<typeof LineProgress> = {
  title: 'Components/Data/LineProgress',
  component: LineProgress,
  tags: ['autodocs'],
  parameters: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    percent: 50
  }
}

export const Colored: Story = {
  args: {
    percent: 50,
    color: 'darkgreen'
  }
}

export const Bold: Story = {
  args: {
    weight: 8,
    percent: 50
  }
}

export const ExtraBold: Story = {
  args: {
    weight: 16,
    percent: 50
  }
}

export const Thin: Story = {
  args: {
    weight: 2,
    percent: 50
  }
}

export const Max: Story = {
  args: {
    percent: 100
  }
}

export const Loading: Story = {
  args: {
    percent: 100,
    isLoading: true,
    color: 'darkblue'
  }
}

export const LoadingToggle: Story = {
  render: () => {
    const [isLoading, setIsloasing] = useState(true)
    return (
      <>
        <div>
          <LineProgress percent={50} isLoading={isLoading} />
        </div>
        <div>
          <button
            onClick={() => {
              setIsloasing(!isLoading)
            }}
          >
            toggle loading
          </button>
        </div>
      </>
    )
  }
}
