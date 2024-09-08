import type { Meta, StoryObj } from '@storybook/react'
import { Blockquote } from './Blockquote'

const meta: Meta<typeof Blockquote> = {
  title: 'Components/Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores
        modi quidem veniam, expedita quis laboriosam, ullam facere adipisci,
        iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab
        at.
      </p>
    ),
    cite: 'https://www.lipsum.com/',
    isDark: false
  }
}

export const NoCite: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores
        modi quidem veniam, expedita quis laboriosam, ullam facere adipisci,
        iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab
        at.
      </p>
    ),
    isDark: false
  }
}
