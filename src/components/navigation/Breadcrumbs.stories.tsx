import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'
import { CloudIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    links: [
      { label: 'Home' },
      { label: 'Blog' },
      { label: 'Article' },
      { label: 'Page' }
    ],
    isDark: false,
    align: 'center'
  }
}

export const Colored: Story = {
  args: {
    links: [
      { label: 'Home', color: '#59b57c' },
      { label: 'Blog', color: '#6987b8' },
      { label: 'Article', color: '#9771bd' }
    ],
    isDark: false,
    align: 'center'
  }
}

export const CustomIcon: Story = {
  args: {
    links: [
      { label: 'Home', icon: <>🏠</> },
      {
        label: 'Blog',
        icon: <CloudIcon style={{ width: 16 }} />
      },
      { label: 'Article', icon: <>●</> }
    ],
    isDark: false,
    align: 'center'
  }
}

export const AlignLeft: Story = {
  args: {
    links: [
      { label: 'Home' },
      { label: 'Blog' },
      { label: 'Article' },
      { label: 'Page' }
    ],
    isDark: false,
    align: 'left'
  }
}

export const External: Story = {
  args: {
    links: [
      { label: 'Home' },
      { label: 'Blog' },
      { label: 'External' },
      { label: 'Page' }
    ],
    isDark: false,
    align: 'left'
  }
}

export const Long: Story = {
  args: {
    links: [
      { label: 'Home' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Blog' },
      { label: 'Page' }
    ],
    isDark: false,
    align: 'left'
  }
}
