import type { Meta, StoryObj } from '@storybook/react'
import { BarPagination } from './BarPagination'
import { useState } from 'react'

const meta: Meta<typeof BarPagination> = {
  title: 'Components/Navigation/BarPagination',
  component: BarPagination,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isDark: false,
    length: 5
  },
  render: (args) => {
    const [activePage, setActivePage] = useState(0)

    const onBarClick = (index: number) => {
      setActivePage(index)
    }

    return (
      <BarPagination {...args} active={activePage} onBarClick={onBarClick} />
    )
  }
}
