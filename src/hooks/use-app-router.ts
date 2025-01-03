import { useRouter } from 'next/router'

const useAppRouter = () => {
  const { locale, ...router } = useRouter()
  return { ...router, locale: locale || 'en' }
}

export default useAppRouter
