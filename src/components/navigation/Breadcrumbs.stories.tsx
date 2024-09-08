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
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
      { href: '/blog/article', label: 'Article' },
      { href: '/blog/article/1', label: 'Page' }
    ],
    isDark: false,
    align: 'center'
  }
}

export const Colored: Story = {
  args: {
    links: [
      { href: '/', label: 'Home', color: '#59b57c' },
      { href: '/blog', label: 'Blog', color: '#6987b8' },
      { href: '/blog/article', label: 'Article', color: '#9771bd' }
    ],
    isDark: false,
    align: 'center'
  }
}

export const CustomIcon: Story = {
  args: {
    links: [
      { href: '/', label: 'Home', icon: <>🏠</> },
      {
        href: '/blog',
        label: 'Blog',
        icon: <CloudIcon style={{ width: 16 }} />
      },
      { href: '/blog/article', label: 'Article', icon: <>●</> }
    ],
    isDark: false,
    align: 'center'
  }
}

export const AlignLeft: Story = {
  args: {
    links: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
      { href: '/blog/article', label: 'Article' },
      { href: '/blog/article/1', label: 'Page' }
    ],
    isDark: false,
    align: 'left'
  }
}

export const External: Story = {
  args: {
    links: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
      { href: 'https://example.com', label: 'External' },
      { href: '/blog/article/1', label: 'Page' }
    ],
    isDark: false,
    align: 'left'
  }
}
