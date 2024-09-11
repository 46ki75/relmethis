import type { Meta, StoryObj } from '@storybook/react'
import { Window } from './Window'

const meta: Meta<typeof Window> = {
  title: 'Components/Containment/Window',
  component: Window,
  tags: ['autodocs'],
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        window content
      </div>
    ),
    title: 'React Components'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Green: Story = {
  args: { color: 'darkgreen' }
}
