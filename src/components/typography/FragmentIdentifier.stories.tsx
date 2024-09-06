import type { Meta, StoryObj } from '@storybook/react'
import { FragmentIdentifier } from './FragmentIdentifier'

const meta: Meta<typeof FragmentIdentifier> = {
  title: 'Components/Typography/FragmentIdentifier',
  component: FragmentIdentifier,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { identifier: 'Heading1' }
}
