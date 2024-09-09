import type { Meta, StoryObj } from '@storybook/react'
import { DotPagination } from './DotPagination'
import { useState } from 'react'

const meta: Meta<typeof DotPagination> = {
  title: 'Components/Navigation/DotPagination',
  component: DotPagination,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { isDark: false },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(3)

    return (
      <DotPagination
        {...args}
        isDark={args.isDark}
        length={8}
        currentPage={currentPage}
        setCurrentPaget={setCurrentPage}
      />
    )
  }
}

export const GraterThan8: Story = {
  args: { isDark: false },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(3)

    return (
      <DotPagination
        {...args}
        isDark={args.isDark}
        length={12}
        currentPage={currentPage}
        setCurrentPaget={setCurrentPage}
      />
    )
  }
}
