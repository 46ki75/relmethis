import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Image } from '../media/Image'

const meta: Meta<typeof Alert> = {
  title: 'Components/Typography/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['note', 'tip', 'important', 'warning', 'caution']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <div>
        Useful information that users should know, even when skimming content.
      </div>
    ),
    type: 'note'
  }
}

export const Tip: Story = {
  args: {
    children: <div>Helpful advice for doing things better or more easily.</div>,
    type: 'tip'
  }
}

export const Important: Story = {
  args: {
    children: (
      <div>Key information users need to know to achieve their goal.</div>
    ),
    type: 'important'
  }
}

export const Warning: Story = {
  args: {
    children: (
      <div>
        Urgent info that needs immediate user attention to avoid problems.
      </div>
    ),
    type: 'warning'
  }
}

export const Caution: Story = {
  args: {
    children: (
      <div>Advises about risks or negative outcomes of certain actions.</div>
    ),
    type: 'caution'
  }
}

export const Nest: Story = {
  args: {
    children: (
      <>
        <p>Advises about risks or negative outcomes of certain actions.</p>
        <Image
          src='https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
          alt=''
        />
      </>
    ),
    type: 'note'
  }
}
