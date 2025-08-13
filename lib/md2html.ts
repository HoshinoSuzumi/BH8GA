import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";

// 创建一个预配置的处理器实例，避免重复创建
const processor = unified()
  .use(remarkParse)
  .use(remarkHtml)
  .use(remarkRehype)
  // @ts-ignore
  .use(rehypeShiki, {
    themes: {
      light: "light-plus",
      dark: "dark-plus",
    },
    inline: "tailing-curly-colon",
  } as RehypeShikiOptions)
  .use(remarkGfm)
  .use(remarkMath)
  .use(rehypeKatex)
  .use(remarkToc, { ordered: true })
  .use(rehypeStringify);

// 添加缓存机制
const cache = new Map<string, string>();

export default async function md2html(markdown: string) {
  // 检查缓存
  if (cache.has(markdown)) {
    return cache.get(markdown)!;
  }

  try {
    const result = await processor.process(markdown);
    const html = result.toString();
    
    // 缓存结果（限制缓存大小避免内存泄露）
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }
    cache.set(markdown, html);
    
    return html;
  } catch (error) {
    console.error('Error processing markdown:', error);
    return markdown; // 降级返回原始 markdown
  }
}
