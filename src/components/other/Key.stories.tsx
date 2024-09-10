import type { Meta, StoryObj } from '@storybook/react'
import { Key } from './Key'
import { useKeyPress } from 'react-use'

const meta: Meta<typeof Key> = {
  title: 'Components/Other/Key',
  component: Key,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const WithHook: Story = {
  args: { mainKey: 'k', isDark: false },
  render: (args) => {
    const [isPressed] = useKeyPress(args.mainKey)

    return (
      <>
        <p>Please try pressing the `k` key.</p>

        <Key {...args} isPressed={isPressed} />
      </>
    )
  }
}

export const LongPress: Story = {
  args: { mainKey: 'k', isDark: false, progress: 50 }
}

export const Progress: Story = {
  args: { mainKey: 'k', isDark: false, progress: 50, isPressed: true }
}

export const Shift: Story = {
  args: {
    mainKey: 'Shift',
    isDark: false,
    widthRatio: 2.75,
    toUpperCase: false
  }
}

export const Tab: Story = {
  args: {
    mainKey: 'Tab',
    isDark: false,
    widthRatio: 2.75,
    toUpperCase: false
  }
}
