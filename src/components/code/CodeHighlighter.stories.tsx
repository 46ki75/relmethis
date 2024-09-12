import type { Meta, StoryObj } from '@storybook/react'
import { CodeHighlighter } from './CodeHighlighter'

const meta: Meta<typeof CodeHighlighter> = {
  title: 'Components/Code/CodeHighlighter',
  component: CodeHighlighter,
  tags: ['autodocs'],
  args: { isDark: true, showNumber: true }
}

export default meta
type Story = StoryObj<typeof meta>

const code = `
export const useCopy = (
  delay?: number
): {
  isCopied: boolean
  copy: (text: string) => void
} => {
  const [isCopied, setCopied] = useState(false)

  const copy = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API is not available')
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error('Failed to copy text:', error))
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, delay ?? 3000)

      return () => clearTimeout(timer)
    }
  }, [delay, isCopied])

  return { isCopied, copy }
}
`

export const Primary: Story = {
  args: { style: {}, code, highlightLines: ['5', '14-17'] }
}
