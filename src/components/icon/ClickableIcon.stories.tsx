import type { Meta, StoryObj } from '@storybook/react'
import { ClickableIcon } from './ClickableIcon'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof ClickableIcon> = {
  title: 'Components/Icon/ClickableIcon',
  component: ClickableIcon,
  tags: ['autodocs'],
  args: { isDark: false },
  render: (args) => (
    <ClickableIcon {...args}>
      <DocumentTextIcon
        style={{
          width: 16,
          color: args.isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
        }}
      />
    </ClickableIcon>
  )
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
