export const locales = ['en', 'ja'] as const
export const defaultLocale = 'ja' as const

export type Locale = (typeof locales)[number]
