import * as fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export type Post = {
  tags?: string[],
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  external?: boolean;
};

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${ realSlug }.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug)!)
    .sort((post1, post2) => new Date(post2!.date).getTime() - new Date(post1!.date).getTime())
}
