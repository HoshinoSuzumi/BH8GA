export const estimateReadingTime = (html: string): number => {
  let text = html.replace(/<[^>]+>/g, '')
  if (typeof window !== 'undefined') {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    text = doc.body.textContent || ''
  }

  const englishWords = text.match(/[a-zA-Z]+/g) || []
  const chineseCharacters = text.match(/[\u4e00-\u9fa5]/g) || []

  const englishWordCount = englishWords.length
  const chineseCharacterCount = chineseCharacters.length

  const englishReadingSpeed = 250 // 250 words per min
  const chineseReadingSpeed = 450 // 450 chars per min

  const englishReadingTime = englishWordCount / englishReadingSpeed
  const chineseReadingTime = chineseCharacterCount / chineseReadingSpeed
  return Math.ceil(englishReadingTime + chineseReadingTime)
}