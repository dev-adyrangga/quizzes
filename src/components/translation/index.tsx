import { useAppTranslation } from '@/hooks/use-app-translation'

export const Translation = ({ id }: { id: string }) => {
  const { translate } = useAppTranslation()
  return <>{translate(id)}</>
}
