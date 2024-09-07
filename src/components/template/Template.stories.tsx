import type { Meta, StoryObj } from '@storybook/react'
import { Template } from './Template'

const meta: Meta<typeof Template> = {
  title: 'Components/Template/Template',
  component: Template,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Template' }
}
