import { Translation } from '@/components/translation'
import { ChangeEventHandler } from 'react'
import { CustomTextArea, PrefixTextArea } from './styled'

type TextAreaProps = {
  id: string
  locale: string
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

const TextArea = ({ id, locale, value, onChange }: TextAreaProps) => {
  return (
    <div className="flex">
      <PrefixTextArea>
        <Translation id={locale} />
      </PrefixTextArea>
      <CustomTextArea rows={2} id={id} value={value} onChange={onChange} />
    </div>
  )
}

export default TextArea
