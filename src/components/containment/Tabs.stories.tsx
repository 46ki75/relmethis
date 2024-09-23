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
        content: <CodeBlock language='js' code='console.log(0)' />
      },
      {
        header: 'typescript',
        content: <CodeBlock language='ts' code='console.log(0)' />
      },
      {
        header: 'rust',
        content: <CodeBlock language='rust' code={rustCode} />
      }
    ]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} }
}
