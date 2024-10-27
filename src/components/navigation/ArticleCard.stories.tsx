import type { Meta, StoryObj } from '@storybook/react'
import { ArticleCard } from './ArticleCard'

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/Navigation/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  args: {
    isDark: false,
    maxWidth: '520px',
    title: 'Placeholder Title',
    description:
      'This is a placeholder description for the ArticleCard component.',
    image:
      'https://web-toolbox.dev/__og-image__/static/en/tools/ogp-checker/og.png',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01'
  }
}
