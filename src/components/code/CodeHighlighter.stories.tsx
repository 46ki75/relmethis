import type { Meta, StoryObj } from '@storybook/react'
import { CodeHighlighter } from './CodeHighlighter'

import rustCode from '../../assets/code/main.rs?raw'
import scss from './prism-one-common.scss?raw'

const meta: Meta<typeof CodeHighlighter> = {
  title: 'Components/Code/CodeHighlighter',
  component: CodeHighlighter,
  tags: ['autodocs'],
  args: { isDark: true, showLineNumber: true }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { code: rustCode, highlightLines: ['2', 5, '14-17'], language: 'rust' }
}

export const Scss: Story = {
  args: { code: scss, language: 'scss' }
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
