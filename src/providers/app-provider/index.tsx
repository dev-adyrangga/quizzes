import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react'
import localeTranslations from '../../../locale-translations.json'
import SpinnerLoading from '@/components/spinner-loading'
import { noop } from '@/utils/noop'
import useAppRouter from '@/hooks/use-app-router'
import ToastMessage from '@/components/toast-message'

export const AppContext = createContext<{
  translations: object
  loading: boolean
  setLoading: (loading: boolean) => void
  toast?: ReactNode
  setToast: (message?: ReactNode) => void
}>({
  translations: {},
  loading: false,
  setLoading: noop,
  toast: undefined,
  setToast: noop
})

const AppProvider = ({
  children,
  locale = 'en'
}: PropsWithChildren & { locale: string }) => {
  const router = useAppRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ReactNode | undefined>(undefined)
  const translation = useMemo(() => localeTranslations, [])

  useEffect(() => {
    const startHandler = () => {
      setLoading(true)
    }
    const completeHandler = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', startHandler)
    router.events.on('routeChangeComplete', completeHandler)
    router.events.on('routeChangeError', completeHandler)

    return () => {
      router.events.off('routeChangeStart', startHandler)
      router.events.off('routeChangeComplete', completeHandler)
      router.events.on('routeChangeError', completeHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider
      value={{
        translations: translation[locale as keyof typeof translation],
        loading,
        setLoading,
        toast,
        setToast
      }}
    >
      {toast && <ToastMessage />}
      {children}
      {loading && <SpinnerLoading />}
    </AppContext.Provider>
  )
}

export default AppProvider
