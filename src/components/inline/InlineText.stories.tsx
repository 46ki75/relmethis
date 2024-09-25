import type { Meta, StoryObj } from '@storybook/react'
import { InlineText } from './InlineText'

const meta: Meta<typeof InlineText> = {
  title: 'Components/Inline/InlineText',
  component: InlineText,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: 'Inline Text' }
}

export const Ruby: Story = {
  args: { text: '名古屋', ruby: 'なごや' }
}

export const PresetColor: Story = {
  args: { text: 'Inline Text', presetColorName: 'emerald' }
}

export const CustomColor: Story = {
  args: { text: 'Inline Text', color: 'red' }
}

export const Bold: Story = {
  args: { text: 'Inline Text', bold: true }
}

export const Italic: Story = {
  args: { text: 'Inline Text', italic: true }
}

export const Strikethrough: Story = {
  args: { text: 'Inline Text', strikethrough: true }
}

export const Underline: Story = {
  args: { text: 'Inline Text', underline: true }
}

export const InlineQuote: Story = {
  args: { text: 'Inline Text', quote: true }
}

export const Cite: Story = {
  args: { text: 'Inline Text', cite: true }
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
