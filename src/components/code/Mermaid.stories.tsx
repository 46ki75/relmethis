import type { Meta, StoryObj } from '@storybook/react'
import { Mermaid } from './Mermaid'

const meta: Meta<typeof Mermaid> = {
  title: 'Components/Code/Mermaid',
  component: Mermaid,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const code = `
graph TD
  A[Client] --> B[Load Balancer]
  B --> C[Server01]
  B --> D[Server02]
`

export const Primary: Story = {
  args: { code, isDark: false }
}

const git = `
gitGraph
   commit id: "Initial Commit"
   branch feature
   commit id: "Feature work 1"
   branch bugfix
   commit id: "Bugfix work 1"
   checkout main
   commit id: "Main work 1"
   checkout feature
   commit id: "Feature work 2"
   checkout bugfix
   commit id: "Bugfix work 2"
   checkout main
   commit id: "Main work 2"
   merge bugfix tag: "Bugfix merged"
   checkout feature
   commit id: "Feature work 3"
   checkout main
   merge feature tag: "Feature merged"
   commit id: "Main work 3"
`

export const Git: Story = {
  args: { code: git, isDark: false }
}

const sequence = `
sequenceDiagram
    participant User
    participant WebApp
    participant Database

    User->>WebApp: Log in request
    WebApp->>Database: Validate credentials
    Database-->>WebApp: Return validation result
    WebApp-->>User: Success message
    User->>WebApp: Request data
    WebApp->>Database: Query data
    Database-->>WebApp: Return data
    WebApp-->>User: Display data
`

export const Sequence: Story = {
  args: { code: sequence, isDark: false }
}

const gantt = `
gantt
    title Project Schedule
    dateFormat YYYY-MM-DD
    section Planning
    Requirements Definition :a1, 2024-09-01, 5d
    Functional Design       :after a1, 3d
    section Development
    Frontend Development    :b1, 2024-09-06, 7d
    Backend Development     :b2, after b1, 10d
    section Testing
    Unit Testing            :c1, 2024-09-20, 5d
    Integration Testing     :c2, after c1, 4d
    User Testing            :c3, after c2, 3d
    section Release
    Production Release      :d1, 2024-09-30, 1d
`

export const Gantt: Story = {
  args: { code: gantt, isDark: false }
}
