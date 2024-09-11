import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'MyCheckbox' },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false)
    return (
      <Checkbox {...args} isChecked={isChecked} setIsChecked={setIsChecked} />
    )
  }
}

export const Colored: Story = {
  args: { label: 'MyCheckbox', color: 'darkblue' },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false)
    return (
      <Checkbox {...args} isChecked={isChecked} setIsChecked={setIsChecked} />
    )
  }
}
