import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from './CodeBlock'

import rustCode from '../../assets/code/main.rs?raw'
import loggCode from './CodeBlock?raw'
import gitMermaid from '../../assets/code/git.mermaid?raw'
import markdown from '../../assets/code/markdown.md?raw'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/Code/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  args: { invalidCode: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    children: rustCode,
    language: 'rust',
    isDark: false,
    enablePreview: true
  }
}

export const Dark: Story = {
  args: {
    children: rustCode,
    language: 'rust',
    isDark: true,
    enablePreview: true
  }
}

export const InvalidCode: Story = {
  args: {
    children: rustCode,
    language: 'rust',
    isDark: false,
    enablePreview: true,
    invalidCode: true
  }
}

export const Katex: Story = {
  args: {
    children: 'E = mc^2',
    language: 'katex',
    isDark: false,
    enablePreview: true
  }
}

export const Long: Story = {
  args: {
    children: loggCode,
    language: 'typescript',
    isDark: false,
    enablePreview: true
  }
}

export const Mermaid: Story = {
  args: {
    children: gitMermaid,
    language: 'mermaid',
    isDark: false,
    enablePreview: true
  }
}

export const Markdown: Story = {
  args: {
    children: markdown,
    language: 'markdown',
    isDark: false,
    enablePreview: true
  }
}
