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
  args: { children: 'Inline Text' }
}

export const Code: Story = {
  args: { children: 'JSON.stringify()', code: true }
}

export const Ruby: Story = {
  args: { children: '名古屋', ruby: 'なごや' }
}

export const PresetColor: Story = {
  args: { children: 'Inline Text', presetColorName: 'emerald' }
}

export const CustomColor: Story = {
  args: { children: 'Inline Text', color: 'red' }
}

export const Bold: Story = {
  args: { children: 'Inline Text', bold: true }
}

export const Italic: Story = {
  args: { children: 'Inline Text', italic: true }
}

export const Strikethrough: Story = {
  args: { children: 'Inline Text', strikethrough: true }
}

export const Underline: Story = {
  args: { children: 'Inline Text', underline: true }
}

export const InlineQuote: Story = {
  args: { children: 'Inline Text', quote: true }
}

export const Cite: Story = {
  args: { children: 'Inline Text', cite: true }
}

export const All: Story = {
  args: {
    children: 'Inline Text',
    isDark: false,
    bold: true,
    italic: true,
    strikethrough: true,
    underline: true
  }
}
