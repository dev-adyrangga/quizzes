import { PropsWithChildren } from 'react'
import { CustomHeading } from './styled'

type PageHeadingProps = PropsWithChildren & {
  className?: string
}

const PageHeading = ({ children, className }: PageHeadingProps) => {
  return <CustomHeading className={className}>{children}</CustomHeading>
}

export default PageHeading
