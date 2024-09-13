import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from './CodeBlock'

import rustCode from '../../assets/code/main.rs?raw'
import loggCode from './CodeBlock?raw'
import gitMermaid from '../../assets/code/git.mermaid?raw'
import markdown from '../../assets/code/markdown.md?raw'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/Code/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    code: rustCode,
    language: 'rust',
    isDark: false,
    enablePreview: true
  }
}

export const Dark: Story = {
  args: {
    code: rustCode,
    language: 'rust',
    isDark: true,
    enablePreview: true
  }
}

export const Katex: Story = {
  args: {
    code: 'E = mc^2',
    language: 'katex',
    isDark: false,
    enablePreview: true
  }
}

export const Long: Story = {
  args: {
    code: loggCode,
    language: 'typescript',
    isDark: false,
    enablePreview: true
  }
}

export const Mermaid: Story = {
  args: {
    code: gitMermaid,
    language: 'mermaid',
    isDark: false,
    enablePreview: true
  }
}

export const Markdown: Story = {
  args: {
    code: markdown,
    language: 'markdown',
    isDark: false,
    enablePreview: true
  }
}
