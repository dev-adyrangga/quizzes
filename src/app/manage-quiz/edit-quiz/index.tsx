import QuizForm from '@/components/forms/quiz-form'
import { QuizTypes } from '@/components/forms/quiz-form/types'
import PageContainer from '@/components/page-container'

type EditQuizPageProps = {
  pageSlug: string
  initValues: QuizTypes
}

const EditQuizPage = ({ pageSlug, initValues }: EditQuizPageProps) => {
  return (
    <PageContainer>
      <QuizForm pageSlug={pageSlug} initValues={initValues} />
    </PageContainer>
  )
}

export default EditQuizPage
