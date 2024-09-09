import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './Carousel'
import { ReactNode } from 'react'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Containment/Carousel',
  component: Carousel,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const contentTemplate = (children: ReactNode) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15rem',
      width: '100%',
      border: 'solid 1px gray'
    }}
  >
    <span>{children}</span>
  </div>
)

export const Primary: Story = {
  args: {
    children: ['Page 1', 'Page 2', 'Page 3', 'Page 4'].map(contentTemplate)
  }
}
