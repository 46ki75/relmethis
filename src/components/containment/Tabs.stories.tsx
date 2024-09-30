import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import { CodeBlock } from '../code/CodeBlock'
import rustCode from '../../assets/code/main.rs?raw'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Containment/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: [
      {
        header: 'javascript',
        content: <CodeBlock language='js'>console.log(0)</CodeBlock>
      },
      {
        header: 'typescript',
        content: <CodeBlock language='ts'>console.log(0)</CodeBlock>
      },
      {
        header: 'rust',
        content: <CodeBlock language='rust'>{rustCode}</CodeBlock>
      }
    ]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Height: Story = {
  args: { height: '200px' }
}

export const TooManyTabs: Story = {
  args: {
    tabs: new Array(20).fill(null).map((_, index) => ({
      header: `Tab${index + 1}`,
      content: <h2>Tab{index + 1}</h2>
    }))
  }
}
