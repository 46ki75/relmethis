import type { Meta, StoryObj } from '@storybook/react'
import { WorkerSample } from './WorkerSample'

const meta: Meta<typeof WorkerSample> = {
  title: 'Example/Worker/PrimeWorker',
  component: WorkerSample,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { count: 100 }
}

export const Secondary: Story = {
  args: { count: 100000 }
}
