import type { Meta, StoryObj } from '@storybook/react'
import { InlineLink } from './InlineLink'

const meta: Meta<typeof InlineLink> = {
  title: 'Components/Inline/InlineLink',
  component: InlineLink,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Link to Page',
    href: 'https://example.com'
  }
}

export const External: Story = {
  args: {
    text: 'Link to Page',
    href: 'https://example.com'
  }
}

export const Internal: Story = {
  args: {
    text: 'Link to Page',
    href: window.location.href
  }
}
