import type { Meta, StoryObj } from '@storybook/react'
import { InlineCode } from './InlineCode'

const meta: Meta<typeof InlineCode> = {
  title: 'Components/Inline/InlineCode',
  component: InlineCode,
  tags: ['autodocs'],
  argTypes: { color: { control: 'color' } },
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'JSON.stringify()'
  }
}

export const Coloed: Story = {
  args: {
    text: 'JSON.stringify()',
    color: '#59b57c'
  }
}

export const Multi: Story = {
  render: () => (
    <>
      <InlineCode text='Hi!' color='red' />
      <InlineCode text='Hi!' />
      <InlineCode text='Hi!' />
    </>
  )
}
