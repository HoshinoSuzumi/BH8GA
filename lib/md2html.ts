import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'

export default async function md2html(markdown: string) {
  const result = await remark()
  .use(remarkHtml)
  .use(remarkGfm)
  .use(remarkToc, { ordered: true })
  .process(markdown)
  return result.toString()
}