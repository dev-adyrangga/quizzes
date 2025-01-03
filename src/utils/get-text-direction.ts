const getTextDir = (locale: string) => {
  if (locale === 'ar') return 'rtl'
  return 'ltr'
}

export default getTextDir
