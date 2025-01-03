import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react'
import { QuizItemTypes } from '../types'
import TextArea from './text-area'

type QuizInputLocaleFieldProps = {
  type?: HTMLInputTypeAttribute
  label: ReactNode | string
  values: QuizItemTypes
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  className?: string
  addOnLabel?: ReactNode
  locales?: string[]
}

const QuizInputLocaleField = ({
  label,
  values,
  onChange,
  className,
  addOnLabel,
  locales = ['en', 'ar']
}: QuizInputLocaleFieldProps) => {
  return (
    <div className={className}>
      <div className="flex flex-row mb-2 justify-between">
        <label
          htmlFor={`${values.id}-en`}
          className="text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {addOnLabel}
      </div>
      <div className="grid grid-cols-[auto_auto] gap-2">
        {locales.map((locale, idx) => (
          <TextArea
            key={idx}
            id={`${values.id}-${locale}`}
            locale={locale}
            value={values[locale as keyof typeof values]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizInputLocaleField
