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

export const Tex: Story = {
  args: {
    code: 'E = mc^2',
    language: 'katex',
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
