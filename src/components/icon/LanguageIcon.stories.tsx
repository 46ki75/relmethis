import type { Meta, StoryObj } from '@storybook/react'
import { LanguageIcon } from './LanguageIcon'

const meta: Meta<typeof LanguageIcon> = {
  title: 'Icon/LanguageIcon',
  component: LanguageIcon,
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['txt', 'javascript', 'typescript', 'rust', 'java', 'kotlin']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    language: 'rust'
  }
}
