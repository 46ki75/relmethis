import type { Meta, StoryObj } from '@storybook/react'
import { Edit } from './Edit'

const meta: Meta<typeof Edit> = {
  title: 'Components/Form/Edit',
  component: Edit,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  render: (args) => {
    const mutate = async (value: string): Promise<boolean> => {
      void value
      return new Promise((resolve) =>
        setTimeout(() => resolve(Math.random() > 0.5), 1500)
      )
    }

    return (
      <div>
        <div>
          <Edit {...args} firstValue='Hello!' mutateFunction={mutate} />
        </div>
      </div>
    )
  }
}
