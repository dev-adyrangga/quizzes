import { Radio, Label, Button } from 'flowbite-react'
import { ChangeEvent } from 'react'
import QuizInputLocaleField from '../quiz-input-locale-field'
import { FormChangeEventTypes, QuizOptionTypes } from '../types'
import { useAppTranslation } from '@/hooks/use-app-translation'

type QuisOptionItemProps = FormChangeEventTypes & {
  idxOption: number
  optNum: number
  option: QuizOptionTypes
  idxQuestion: number
  onMarkCorrectAnswer: (
    event: ChangeEvent<HTMLInputElement>,
    idxQuestion: number,
    idxOption: number
  ) => void
  isLast: boolean
  onAddOption: (idxQuestion: number) => void
}

const QuisOptionItem = ({
  idxOption,
  optNum,
  option,
  onChange,
  idxQuestion,
  onMarkCorrectAnswer,
  isLast,
  onAddOption
}: QuisOptionItemProps) => {
  const { translate } = useAppTranslation()
  return (
    <div key={idxOption}>
      <QuizInputLocaleField
        label={`${translate('add-quiz.form.option')} ${optNum}`}
        values={option}
        onChange={(ev) => onChange(ev, 'option', idxQuestion, idxOption)}
        addOnLabel={
          <div className="flex items-center gap-2">
            <Radio
              id={`${option.id}-isCorrectOption`}
              name={`${idxQuestion}-isCorrectOption`}
              checked={option.isCorrectOption}
              onChange={(ev) => onMarkCorrectAnswer(ev, idxQuestion, idxOption)}
            />
            <Label htmlFor={`${option.id}-isCorrectOption`}>
              {translate('add-quiz.form.mark-correct-answer')}
            </Label>
          </div>
        }
      />
      {!isLast && <hr className="my-4" />}
      {isLast && (
        <div className="flex justify-end mt-4 border-t pt-4">
          <Button
            size="sm"
            type="button"
            className="font-bold"
            onClick={() => {
              onAddOption(idxQuestion)
            }}
          >
            {translate('add-quiz.form.add-option')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuisOptionItem
