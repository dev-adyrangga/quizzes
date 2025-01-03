import { Label, TextInput } from 'flowbite-react'
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react'

type TextInputFieldProps = {
  id: string
  type?: HTMLInputTypeAttribute
  label: ReactNode | string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const TextInputField = ({
  id,
  type = 'text',
  label,
  value,
  onChange
}: TextInputFieldProps) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label as unknown as string} />
      </div>
      <TextInput id={id} type={type} onChange={onChange} value={value} />
    </div>
  )
}

export default TextInputField
