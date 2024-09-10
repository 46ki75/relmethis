import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/Code/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const code = `
use reqwest::Error;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Post {
    #[serde(rename = "userId")]
    user_id: u32,
    id: u32,
    title: String,
    body: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let response = reqwest::get(url).await?;
    let posts: Vec<Post> = response.json().await?;

    for post in posts.iter().take(5) {
        println!("ID: {}, Title: {}", post.id, post.title);
    }

    Ok(())
}
`

export const Light: Story = {
  args: {
    code,
    language: 'rust',
    isDark: false,
    enablePreview: true
  }
}

export const Dark: Story = {
  args: {
    code,
    language: 'rust',
    isDark: true,
    enablePreview: true
  }
}

export const Katex: Story = {
  args: {
    code: 'E = mc^2',
    language: 'katex',
    isDark: false,
    enablePreview: true
  }
}

const long = `
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import {
  ChartBarSquareIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { isEqual } from 'lodash'
import { darken, lighten, rgba } from 'polished'
import React, { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

// # --------------------------------------------------------------------------------
//
// style
//
// # --------------------------------------------------------------------------------

const wrapperStyle = ({
  color,
  inView
}: {
  color: string
  inView: boolean
}) => css\`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  margin-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border-left: solid 4px \${darken(0.1, color)};
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0) 0% 50%,
    \${lighten(0.15, rgba(color, 0.2))} 50% 100%
  );
  background-size: 200% 100%;
  background-position: \${inView ? 0 : 100}%;

  transition: background-position 600ms;
\`

const headerStyle = ({
  isDark,
  color
}: {
  isDark: boolean
  color: string
}) => css\`
  color: \${darken(0.05, color)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  *::selection {
    background-color: \${isDark ? lighten(0.1, color) : darken(0.1, color)};
    color: \${!isDark ? lighten(0.3, color) : darken(0.3, color)};
  }
\`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution'

export interface AlertProps {
  /**
   * Child components
   */
  children: React.ReactNode
  /**
   * Type of alert
   */
  type: AlertType
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

const colors: Record<AlertType, string> = {
  note: '#6987b8',
  tip: '#59b57c',
  important: '#9771bd',
  warning: '#b8a36e',
  caution: '#b36472'
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

export const AlertComponent = ({
  children,
  type,
  isDark = false
}: AlertProps) => {
  const color = useMemo(() => colors[type], [type])

  const icon = useMemo(() => {
    const style = { width: 20, height: 20 }
    switch (type) {
      case 'note':
        return <ChartBarSquareIcon style={style} />
      case 'tip':
        return <LightBulbIcon style={style} />
      case 'important':
        return <ShieldCheckIcon style={style} />
      case 'warning':
        return <ExclamationTriangleIcon style={style} />
      case 'caution':
      default:
        return <XCircleIcon style={style} />
    }
  }, [type])

  const { ref, inView } = useInView()

  return (
    <div css={wrapperStyle({ color, inView })} ref={ref}>
      <div css={headerStyle({ color, isDark })}>
        {icon}
        <div>{type.toUpperCase()}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Alert = React.memo(AlertComponent, (prevProps, nextProps) => {
  return (
    prevProps.isDark === nextProps.isDark &&
    prevProps.type === nextProps.type &&
    isEqual(prevProps.children, nextProps.children)
  )
})  
`

export const Long: Story = {
  args: {
    code: long,
    language: 'typescript',
    isDark: false,
    enablePreview: true
  }
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

export const Mermaid: Story = {
  args: {
    code: git,
    language: 'mermaid',
    isDark: false,
    enablePreview: true
  }
}

const markdown = `
## Lists

Here are some bulleted and numbered lists for organizing information:

- Bullet 1
- Bullet 2

1. Number 1
2. Number 2

## GFM Alerts

> [!NOTE]
> Here's a note to keep in mind while reading this section.

## Code Example

Below is a code snippet demonstrating simple TypeScript code:

\`\`\`ts
console.log('Hello, world!');
\`\`\`
`

export const Markdown: Story = {
  args: {
    code: markdown,
    language: 'markdown',
    isDark: false,
    enablePreview: true
  }
}
