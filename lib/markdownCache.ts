import * as fs from 'fs'
import * as path from 'path'
import md2html from './md2html'

const cacheDir = path.join(process.cwd(), '.next', 'markdown-cache')

// Ensure cache directory exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true })
}

function getCacheFilePath(slug: string): string {
  return path.join(cacheDir, `${slug}.html`)
}

function getContentHash(content: string): string {
  // Simple hash function for content
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

export async function getCachedMarkdown(slug: string, content: string): Promise<string> {
  const cacheFile = getCacheFilePath(slug)
  const contentHash = getContentHash(content)
  
  try {
    // Check if cache file exists and is valid
    if (fs.existsSync(cacheFile)) {
      const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
      if (cacheData.hash === contentHash) {
        return cacheData.html
      }
    }
  } catch (error) {
    // Cache file is corrupted or doesn't exist, proceed to regenerate
  }
  
  // Generate HTML and cache it
  const html = await md2html(content)
  
  try {
    const cacheData = {
      hash: contentHash,
      html: html,
      timestamp: Date.now()
    }
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2))
  } catch (error) {
    // If cache write fails, just continue without caching
    console.warn('Failed to write markdown cache:', error)
  }
  
  return html
}

export function clearMarkdownCache(): void {
  try {
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true })
    }
  } catch (error) {
    console.warn('Failed to clear markdown cache:', error)
  }
}