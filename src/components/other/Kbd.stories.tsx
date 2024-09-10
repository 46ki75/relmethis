import type { Meta, StoryObj } from '@storybook/react'
import { Kbd } from './Kbd'
import { useKeyPress } from 'react-use'

const meta: Meta<typeof Kbd> = {
  title: 'Components/Other/Kbd',
  component: Kbd,
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

        <Kbd {...args} isPressed={isPressed} />
      </>
    )
  }
}

export const Small: Story = {
  args: { mainKey: 'k', isDark: false, size: 20, bigKey: true }
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
