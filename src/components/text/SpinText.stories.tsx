import type { Meta, StoryObj } from '@storybook/react'
import { SpinText } from './SpinText'

const meta: Meta<typeof SpinText> = {
  title: 'Components/Text/SpinText',
  component: SpinText,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'LOADING'
  }
}
