import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/app/actions/posts'
import md2html from '@/lib/md2html'

export default async function Post({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const content = await md2html(post.content)

  return (
    <div className={ 'min-h-screen pt-16 relative' }>
      <div className={ `container xl:max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12` }>
        <h1>{ post.title }</h1>
        <article
          className={ 'prose' }
          dangerouslySetInnerHTML={ { __html: content } }
        />
      </div>
    </div>
  )
}