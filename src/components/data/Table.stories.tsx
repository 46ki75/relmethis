import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import { useState } from 'react'

const meta: Meta<typeof Table> = {
  title: 'Components/Data/Table',
  component: Table,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const SEED_ROWS = [
  [<>Name</>, <>Department</>, <>Position</>],
  [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
  [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
  [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>]
]

export const Primary: Story = {
  args: {
    isDark: false,
    rows: SEED_ROWS
  }
}

export const Reactive: Story = {
  args: {
    isDark: false,
    rows: SEED_ROWS
  },
  render: (args) => {
    const [rows, setRows] = useState(args.rows)

    const handleAdd = () => {
      setRows([...rows, [<>Data</>, <>Data</>, <>Data</>]])
    }

    const handleRemove = () => {
      setRows(rows.slice(0, rows.length - 1))
    }

    return (
      <>
        <button onClick={handleAdd}>ADD ROW</button>
        <button onClick={handleRemove}>REMOVE ROW</button>
        <Table {...args} rows={rows} />
      </>
    )
  }
}

export const Logs: Story = {
  args: {
    isDark: false,
    rows: [
      [<>Name</>, <>Department</>, <>Position</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>],
      [<>John Doe</>, <>Engineering</>, <>Software Engineer</>],
      [<>Jane Smith</>, <>Marketing</>, <>Marketing Manager</>],
      [<>Emily Johnson</>, <>Finance</>, <>Financial Analyst</>]
    ]
  }
}

export const Align: Story = {
  args: {
    isDark: false,
    rows: SEED_ROWS
  }
}
