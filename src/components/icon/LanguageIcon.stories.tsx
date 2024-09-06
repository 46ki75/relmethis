import type { Meta, StoryObj } from '@storybook/react'
import { LanguageIcon } from './LanguageIcon'

const meta: Meta<typeof LanguageIcon> = {
  title: 'Components/Icon/LanguageIcon',
  component: LanguageIcon,
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: { type: 'radio' },
      options: [
        'txt',
        'javascript',
        'typescript',
        'rust',
        'java',
        'kotlin',
        'json',
        'markdown',
        'bash'
      ]
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
