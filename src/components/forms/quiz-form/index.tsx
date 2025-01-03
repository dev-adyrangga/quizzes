import { Button } from 'flowbite-react'
import QuizInputLocaleField from './quiz-input-locale-field'
import { ChangeEvent, useState } from 'react'
import { QuizTypes } from './types'
import { getPayload, newOptionValue, newQuestionValue } from './utils'
import QuizQuestionItem from './quiz-question-item'
import { useAppTranslation } from '@/hooks/use-app-translation'
import PageHeading from '@/components/page-heading'
import { PAGE_SLUG } from '@/constants/page-slug-constants'
import cookieHelper from '@/libs/cookie-helper'
import { useAppLoader } from '@/hooks/use-app-loader'
import { storeQuizAdapter } from '@/app/manage-quiz/adapters'
import { useAppToast } from '@/hooks/use-app-toast'

type QuizFormProps = {
  pageSlug: string
  initValues: QuizTypes
}

const QuizForm = ({ pageSlug, initValues }: QuizFormProps) => {
  const { translate } = useAppTranslation()
  const { setLoading } = useAppLoader()
  const { setToast } = useAppToast()
  const [values, setValues] = useState<QuizTypes>(initValues)

  const onAddQuestionHandler = () => {
    setValues((prevState) => {
      const nextState = { ...prevState }
      nextState.questions.unshift(newQuestionValue())
      return nextState
    })
  }

  const onAddOptionHandler = (idxQuestion: number) => {
    setValues((prevState) => {
      const nextState = { ...prevState }
      nextState.questions[idxQuestion].options.push(newOptionValue())
      return nextState
    })
  }

  const onChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement>,
    itemTypes: 'title' | 'question' | 'option',
    idxQuestion = 0,
    idxOption = 0
  ) => {
    const { id, value } = event.target
    const key = /-ar$/.test(id) ? 'ar' : 'en'
    setValues((prevState) => {
      const nextState = { ...prevState }
      switch (itemTypes) {
        case 'title':
          nextState[key] = value
          if (!nextState.action) nextState.action = 'update'
          break
        case 'question':
          nextState.questions[idxQuestion][key] = value
          if (!nextState.questions[idxQuestion].action) {
            nextState.questions[idxQuestion].action = 'update'
          }
          break
        case 'option':
          nextState.questions[idxQuestion].options[idxOption][key] = value
          if (!nextState.questions[idxQuestion].options[idxOption].action) {
            nextState.questions[idxQuestion].options[idxOption].action =
              'update'
          }
          break
        default:
          break
      }
      return nextState
    })
  }

  const onMarkCorrectAnswerHandler = (
    event: ChangeEvent<HTMLInputElement>,
    idxQuestion: number,
    idxOption: number
  ) => {
    setValues((prevState) => {
      const nextState = { ...prevState }
      nextState.questions[idxQuestion].options = nextState.questions[
        idxQuestion
      ].options.map((option, idx) => ({
        ...option,
        action: option.action || 'update',
        isCorrectOption: idx === idxOption
      }))
      return nextState
    })
  }

  const onSaveHandler = async () => {
    setLoading(true)
    try {
      const token = cookieHelper.getToken(null).accessToken
      const payload = getPayload(values)
      await storeQuizAdapter(
        token,
        values.id,
        payload,
        pageSlug === PAGE_SLUG.EDIT_QUIZ
      )
      setToast(translate('message.generic.success'))
    } catch (error) {
      setToast(
        error?.['message' as keyof typeof error] ||
          translate('message.generic.error')
      )
    }
    setLoading(false)
  }

  const disabledSave =
    !values.en ||
    !values.ar ||
    values.questions.some(
      (q) => !q.en || !q.ar || q.options.some((o) => !o.en || !o.ar)
    )

  return (
    <main className="p-2 md:p-6">
      <PageHeading className="mb-2">
        {pageSlug === PAGE_SLUG.EDIT_QUIZ
          ? translate('edit-quiz.heading')
          : translate('add-quiz.heading')}
      </PageHeading>
      <hr />
      <form className="mt-6 grid gap-8">
        <QuizInputLocaleField
          label={translate('add-quiz.form.quiz-title')}
          values={values}
          onChange={(ev) => onChangeHandler(ev, 'title')}
        />
        <div>
          <div className="flex flex-row items-center justify-between mb-4">
            <h2 className="font-bold text-md">
              {translate('add-quiz.form.question-list')}
            </h2>
            <Button
              type="button"
              className="font-bold"
              onClick={onAddQuestionHandler}
            >
              {translate('add-quiz.form.add-question')}
            </Button>
          </div>
          <div className="grid grid-cols-1 grid-flow-row gap-4">
            {values.questions?.map((question, idxQuestion) => (
              <QuizQuestionItem
                key={question.id}
                idxQuestion={idxQuestion}
                question={question}
                onChange={onChangeHandler}
                onAddOption={onAddOptionHandler}
                onMarkCorrectAnswer={onMarkCorrectAnswerHandler}
              />
            ))}
          </div>
        </div>
      </form>
      <div className="flex flex-row justify-end my-6">
        <Button
          type="button"
          color="blue"
          className="font-bold px-6"
          onClick={onSaveHandler}
          disabled={disabledSave}
        >
          {translate('form.button.save')}
        </Button>
      </div>
    </main>
  )
}

export default QuizForm
