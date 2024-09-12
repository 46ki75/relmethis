import type { Meta, StoryObj } from '@storybook/react'
import { Bookmark } from './Bookmark'

const meta: Meta<typeof Bookmark> = {
  title: 'Components/Typography/Bookmark',
  component: Bookmark,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Amazon EC2 Pricing | AWS Official',
    description:
      'Describes the four payment methods for Amazon EC2 instances. In addition to the three methods of on-demand, reserved instances, and spot instances, payments can also be made for Dedicated Hosts.',
    url: 'https://aws.amazon.com/jp/ec2/pricing/',
    image:
      'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png'
  }
}

export const GitHub: Story = {
  args: {
    title: '46ki75 - Overview',
    description:
      '46ki75 has 108 repositories available. Follow their code on GitHub.',
    url: 'https://github.com/46ki75',
    image: 'https://avatars.githubusercontent.com/u/85323087?v=4?s=400'
  }
}
