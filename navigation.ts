import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['zh', 'en', 'ja']
export const localePrefix: 'as-needed' | 'always' | 'never' = 'never'

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix })
