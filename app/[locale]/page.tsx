import Main from './Main'
import { getAllPosts } from '@/app/actions/posts'

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const posts = getAllPosts()

  return (
    <>
      <Main
        params={ { locale: locale } }
        posts={ posts }
      />
    </>
  )
}
