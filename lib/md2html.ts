import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkParse from 'remark-parse'
import rehypeStringify from 'rehype-stringify'

export default async function md2html(markdown: string) {
  const result = await remark()
  .use(remarkHtml)
  .use(remarkRehype)
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(rehypeKatex)
  .use(remarkToc, { ordered: true })
  .use(rehypeStringify)
  .process(markdown)
  return result.toString()
}