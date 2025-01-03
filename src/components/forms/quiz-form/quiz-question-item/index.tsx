import { Translation } from '@/components/translation'
import { ChangeEvent } from 'react'
import QuizInputLocaleField from '../quiz-input-locale-field'
import { FormChangeEventTypes, QuizQuestionTypes } from '../types'
import QuisOptionItem from '../quis-option-item'

type QuizQuestionItemProps = FormChangeEventTypes & {
  idxQuestion: number
  question: QuizQuestionTypes
  onAddOption: (idxQuestion: number) => void
  onMarkCorrectAnswer: (
    event: ChangeEvent<HTMLInputElement>,
    idxQuestion: number,
    idxOption: number
  ) => void
}

const QuizQuestionItem = ({
  idxQuestion,
  question,
  onChange,
  onAddOption,
  onMarkCorrectAnswer
}: QuizQuestionItemProps) => (
  <div className="rounded-md border shadow p-4 h-fit">
    <QuizInputLocaleField
      label={
        <>
          <Translation id="add-quiz.form.question" /> {idxQuestion + 1}
        </>
      }
      values={question}
      onChange={(ev) => onChange(ev, 'question', idxQuestion)}
    />
    <div className="mt-4">
      <hr className="my-3" />
      <p className="text-md font-bold mb-2">
        <Translation id="add-quiz.form.answer-choices" />
      </p>
      <div>
        {question.options?.map((option, idxOption) => {
          const optNum = idxOption + 1
          const isLast = optNum === question.options.length
          return (
            <QuisOptionItem
              key={option.id}
              idxOption={idxOption}
              optNum={optNum}
              option={option}
              onChange={onChange}
              idxQuestion={idxQuestion}
              onMarkCorrectAnswer={onMarkCorrectAnswer}
              isLast={isLast}
              onAddOption={onAddOption}
            />
          )
        })}
      </div>
    </div>
  </div>
)

export default QuizQuestionItem
