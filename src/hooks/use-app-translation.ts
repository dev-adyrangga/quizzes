import { useContext } from 'react'
import { AppContext } from '../providers/app-provider'

export const useAppTranslation = () => {
  const { translations } = useContext(AppContext)
  return {
    translate: (key: string) => translations[key as keyof typeof translations]
  }
}
