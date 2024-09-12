import type { Meta, StoryObj } from '@storybook/react'
import { CodeHighlighter } from './CodeHighlighter'

const meta: Meta<typeof CodeHighlighter> = {
  title: 'Components/Code/CodeHighlighter',
  component: CodeHighlighter,
  tags: ['autodocs'],
  args: { isDark: true, showNumber: true }
}

export default meta
type Story = StoryObj<typeof meta>

const code = `
import type { Meta, StoryObj } from '@storybook/react'
import { CodeHighlighter } from './CodeHighlighter'

const meta: Meta<typeof CodeHighlighter> = {
  title: 'Components/Code/CodeHighlighter',
  component: CodeHighlighter,
  tags: ['autodocs'],
  args: { isDark: true, showNumber: true }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {}, code: 'console.log()' }
}
`

export const Primary: Story = {
  args: { style: {}, code }
}
