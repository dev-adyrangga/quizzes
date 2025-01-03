import { useContext } from 'react'
import { AppContext } from '../providers/app-provider'

export const useAppLoader = () => {
  const { loading, setLoading } = useContext(AppContext)
  return { loading, setLoading }
}
