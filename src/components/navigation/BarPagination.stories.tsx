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
    isDark: false
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pages = new Array(5).fill(null).map((_, index) => ({
      onClick: () => {
        setCurrentPage(index + 1)
      },
      isActive: currentPage === index + 1
    }))

    return <BarPagination {...args} pages={pages} />
  }
}
