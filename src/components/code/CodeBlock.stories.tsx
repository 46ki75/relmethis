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
    theme: 'light'
  }
}

export const Dark: Story = {
  args: {
    code,
    language: 'rust',
    theme: 'dark'
  }
}
