import { useContext } from 'react'
import { AppContext } from '../providers/app-provider'

export const useAppToast = () => {
  const { toast, setToast } = useContext(AppContext)
  return { toast, setToast }
}
