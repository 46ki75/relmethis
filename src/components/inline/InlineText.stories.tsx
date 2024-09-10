import type { Meta, StoryObj } from '@storybook/react'
import { InlineText } from './InlineText'

const meta: Meta<typeof InlineText> = {
  title: 'Components/Inline/InlineText',
  component: InlineText,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Inline Text', isDark: false }
}

export const PresetColor: Story = {
  args: { text: 'Inline Text', isDark: false, presetColorName: 'emerald' }
}

export const CustomColor: Story = {
  args: { text: 'Inline Text', isDark: false, color: 'red' }
}

export const Bold: Story = {
  args: { text: 'Inline Text', isDark: false, bold: true }
}

export const Italic: Story = {
  args: { text: 'Inline Text', isDark: false, italic: true }
}

export const Strikethrough: Story = {
  args: { text: 'Inline Text', isDark: false, strikethrough: true }
}

export const Underline: Story = {
  args: { text: 'Inline Text', isDark: false, underline: true }
}

export const All: Story = {
  args: {
    text: 'Inline Text',
    isDark: false,
    bold: true,
    italic: true,
    strikethrough: true,
    underline: true
  }
}
