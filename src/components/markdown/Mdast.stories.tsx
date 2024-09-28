import type { Meta, StoryObj } from '@storybook/react'
import { Mdast } from './Mdast'

const meta: Meta<typeof Mdast> = {
  title: 'Components/Markdown/Mdast',
  component: Mdast,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  args: {
    mdast: [
      {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'This is H1 Heading Text'
          }
        ]
      },
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'This is H2 Heading Text'
          }
        ]
      },
      {
        type: 'heading',
        depth: 3,
        children: [
          {
            type: 'text',
            value: 'This is H3 Heading Text'
          }
        ]
      }
    ]
  }
}

export const Bookmark: Story = {
  args: {
    mdast: [
      {
        type: 'containerDirective',
        name: 'bookmark',
        attributes: {
          title: 'Amazon EC2 Pricing | AWS Official',
          url: 'https://aws.amazon.com/jp/ec2/pricing/',
          image:
            'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png'
        },
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value:
                  'Describes the four payment methods for Amazon EC2 instances. In addition to the three methods of on-demand, reserved instances, and spot instances, payments can also be made for Dedicated Hosts.'
              }
            ]
          }
        ]
      }
    ]
  }
}

export const Toggle: Story = {
  args: {
    mdast: [
      {
        type: 'containerDirective',
        name: 'toggle',
        attributes: {
          summary: 'summary text'
        },
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value:
                  'Describes the four payment methods for Amazon EC2 instances. In addition to the three methods of on-demand, reserved instances, and spot instances, payments can also be made for Dedicated Hosts.'
              }
            ]
          }
        ]
      }
    ]
  }
}
