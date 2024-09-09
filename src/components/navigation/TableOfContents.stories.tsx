import type { Meta, StoryObj } from '@storybook/react'
import { TableOfContents } from './TableOfContents'

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/Navigation/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isDark: false,
    fontSizeRatio: 1,
    headings: [
      {
        level: 1,
        text: 'Welcome to Our Comprehensive Guide to Modern Web Development'
      },
      { level: 2, text: 'An In-Depth Introduction to Web Technologies' },
      { level: 2, text: 'Key Features and Benefits of the Frameworks' },
      { level: 3, text: 'Detailed Overview of Feature 1 with Examples' },
      { level: 3, text: 'How Feature 2 Enhances the User Experience' },
      {
        level: 1,
        text: 'Get in Touch with Our Support Team for Further Assistance'
      }
    ]
  }
}

export const Section: Story = {
  args: {
    isDark: false,
    headings: [
      {
        level: 1,
        text: 'Welcome to Our Comprehensive Guide to Modern Web Development'
      },
      { level: 2, text: 'An In-Depth Introduction to Web Technologies' },
      { level: 2, text: 'Key Features and Benefits of the Frameworks' },
      { level: 3, text: 'Detailed Overview of Feature 1 with Examples' },
      { level: 3, text: 'How Feature 2 Enhances the User Experience' },
      {
        level: 1,
        text: 'Get in Touch with Our Support Team for Further Assistance'
      }
    ]
  },
  render: (args) => {
    const id = args.headings[4].text
    return (
      <>
        <TableOfContents {...args} />
        <section id={id}>
          <h3>{id}</h3>
          <span>content</span>
        </section>
      </>
    )
  }
}

export const DeepLevel: Story = {
  args: {
    isDark: false,
    headings: [
      {
        level: 1,
        text: 'Comprehensive Overview of the Main Title and Its Impact on the Industry'
      },
      {
        level: 2,
        text: 'Detailed Breakdown of Subsection 1 Covering Key Concepts'
      },
      {
        level: 3,
        text: 'Subsection 1.1: A Deeper Dive into Technical Aspects'
      },
      {
        level: 4,
        text: 'Subsection 1.1.1: Understanding the Nuances and Advanced Techniques'
      },
      {
        level: 5,
        text: 'Subsection 1.1.1.1: Exploring Cutting-Edge Implementations in Detail'
      },
      {
        level: 6,
        text: 'Subsection 1.1.1.1.1: Final Thoughts and Future Trends in the Field'
      },
      {
        level: 2,
        text: 'Subsection 2: Introduction to the Next Set of Topics and Their Relevance'
      },
      {
        level: 3,
        text: 'Subsection 2.1: Exploring Practical Applications and Use Cases'
      },
      {
        level: 4,
        text: 'Subsection 2.1.1: Advanced Techniques and Best Practices for Implementation'
      },
      {
        level: 5,
        text: 'Subsection 2.1.1.1: Real-World Examples of Success and Challenges'
      },
      {
        level: 6,
        text: 'Subsection 2.1.1.1.1: Conclusion and Key Takeaways from This Section'
      }
    ]
  }
}
