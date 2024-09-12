import type { Meta, StoryObj } from '@storybook/react'
import { Sample } from './Sample'

const meta: Meta<typeof Sample> = {
  title: 'Components/Template/Sample',
  component: Sample,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
