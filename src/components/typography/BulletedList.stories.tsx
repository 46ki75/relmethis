import type { Meta, StoryObj } from '@storybook/react'
import { BulletedList } from './BulletedList'
import { CodeBlock } from '../code/CodeBlock'

const meta: Meta<typeof BulletedList> = {
  title: 'Components/Typography/BulletedList',
  component: BulletedList,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isDark: false
  },
  render: (args) => (
    <>
      <p>BulletedList</p>
      {
        <BulletedList {...args}>
          <>List Item 1</>
          <>List Item 2</>
          <>List Item 3</>
        </BulletedList>
      }
    </>
  )
}

export const Nest: Story = {
  args: {
    isDark: false
  },
  render: (args) => (
    <BulletedList {...args}>
      <>List Item 1</>
      <>List Item 2</>
      <BulletedList {...args}>
        <>List Item 1</>
        <>List Item 2</>
        <BulletedList {...args}>
          <>List Item 1</>
          <>List Item 2</>
        </BulletedList>
      </BulletedList>
    </BulletedList>
  )
}

export const Break: Story = {
  args: {
    children: [
      <>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </>,
      <>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </>
    ],
    isDark: false
  }
}

export const Block: Story = {
  args: {
    children: [
      <p>List Item 1</p>,
      <CodeBlock code='conole.log(0)' language='typescript' />,
      <p>List Item 3</p>
    ],
    isDark: false
  }
}
