import type { Meta, StoryObj } from '@storybook/react'
import { CodeHighlighter } from './CodeHighlighter'

const meta: Meta<typeof CodeHighlighter> = {
  title: 'Components/Code/CodeHighlighter',
  component: CodeHighlighter,
  tags: ['autodocs'],
  args: { isDark: true, showLineNumber: true }
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

export const Primary: Story = {
  args: { code, highlightLines: ['5', '14-17'], language: 'rust' }
}

const css = `
.example-gradient {
	background: -webkit-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Chrome10+, Safari5.1+ */
	background:    -moz-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* FF3.6+ */
	background:     -ms-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* IE10+ */
	background:      -o-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Opera 11.10+ */
	background:         linear-gradient(to right, #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* W3C */
}
.example-angle {
	transform: rotate(10deg);
}
.example-color {
	color: rgba(255, 0, 0, 0.2);
	background: purple;
	border: 1px solid hsl(100, 70%, 40%);
}
.example-easing {
	transition-timing-function: linear;
}
.example-time {
	transition-duration: 3s;
}
`

export const CSS: Story = {
  args: { code: css, language: 'css' }
}

const diff = `
@@ -4,6 +4,5 @@
-    let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
+    const foo = bar.baz([1, 2, 3]) + 1;
     console.log(\`foo: \${foo}\`);
`

export const Diff: Story = {
  args: { code: diff, language: 'diff' }
}

const oldCode = `const a = 10;
const b = 20;
console.log(a + b);`

const newCode = `const a = 10;
const b = 30;
console.log(a + b);`

export const DiffWithUtils: Story = {
  args: { code: newCode, oldCode }
}

const tree = `
/home/shirayuki/sandbox/vite-project/src//
├── App.css
├── App.tsx
├── assets/
│   └── react.svg
├── index.css
├── main.tsx
└── vite-env.d.ts
`

export const Tree: Story = {
  args: { code: tree, language: 'treeview' }
}

const command = `
pwd
/usr/home/chris/bin
ls -la
total 2
drwxr-xr-x   2 chris  chris     11 Jan 10 16:48 .
drwxr--r-x  45 chris  chris     92 Feb 14 11:10 ..
-rwxr-xr-x   1 chris  chris    444 Aug 25  2013 backup
-rwxr-xr-x   1 chris  chris    642 Jan 17 14:42 deploy
`

export const CommandLine: Story = {
  args: {
    code: command,
    language: 'bash',
    commandLine: {
      user: 'shirayuki',
      host: '46ki75.local',
      output: ['2', '4-8']
    }
  }
}

export const CommandLineSimple: Story = {
  args: {
    code: 'npm exec -- prettier --write .',
    language: 'bash',
    commandLine: {
      prompt: '$'
    }
  }
}
