import type { Meta, StoryObj } from '@storybook/react'
import { ToggleTheme } from './ToggleTheme'
import { useState } from 'react'

const meta: Meta<typeof ToggleTheme> = {
  title: 'Components/Icon/ToggleTheme',
  component: ToggleTheme,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { size: '32px' },
  render: (args) => {
    const [isDark, setIsDark] = useState(false)
    return (
      <ToggleTheme
        {...args}
        isDark={isDark}
        onClick={() => setIsDark(!isDark)}
      />
    )
  }
}
