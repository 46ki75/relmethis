import { unified } from 'unified'
import remarkParse from 'remark-parse'
import gfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import inlineStyleRemarkPlugin from './plugins/inlineStyleRemarkPlugin'

export const parseMarkdownToMdast = (markdown: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkMath)
    .use(remarkDirective)
    .use(inlineStyleRemarkPlugin)
    .parse(markdown)
  return processor
}
