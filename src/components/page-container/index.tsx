import useAppRouter from '@/hooks/use-app-router'
import getTextDir from '@/utils/get-text-direction'
import { PropsWithChildren } from 'react'

const PageContainer = ({ children }: PropsWithChildren) => {
  const { locale } = useAppRouter()
  return (
    <div
      dir={getTextDir(locale)}
      className="grid w-screen min-h-[calc(100vh_-_60px)]"
    >
      {children}
    </div>
  )
}

export default PageContainer
