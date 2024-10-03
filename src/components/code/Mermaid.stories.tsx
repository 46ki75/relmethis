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
   commit id: "Initial Commit" tag: "v1.0.0" type: HIGHLIGHT
   branch develop
   checkout develop
   commit id: "Develop feature" type: HIGHLIGHT
   branch feature/feature-1
   checkout feature/feature-1
   commit id: "Work on feature 1"
   commit id: "Complete feature 1" type: HIGHLIGHT
   checkout develop
   merge feature/feature-1 tag: "Merge feature-1" type: HIGHLIGHT
   commit id: "Develop feature 2"
   branch feature/feature-2
   checkout feature/feature-2
   commit id: "Work on feature 2"
   commit id: "Complete feature 2" type: HIGHLIGHT
   checkout develop
   merge feature/feature-2 tag: "Merge feature-2"
   commit id: "Prepare for release"
   branch release/v1.1.0
   checkout release/v1.1.0
   commit id: "Finalize release" type: HIGHLIGHT
   checkout main
   merge release/v1.1.0 tag: "Release v1.1.0" type: HIGHLIGHT
   commit id: "Hotfix for release"
   branch hotfix/v1.1.1
   checkout hotfix/v1.1.1
   commit id: "Apply hotfix"
   checkout main
   merge hotfix/v1.1.1 tag: "Release v1.1.1" type: HIGHLIGHT
   checkout develop
   merge hotfix/v1.1.1 tag: "Merge hotfix into develop"
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
