import EditQuizPage from '@/app/manage-quiz/edit-quiz'
import { quizInitValue } from '@/components/forms/quiz-form/utils'
import { PAGE_SLUG } from '@/constants/page-slug-constants'

export const getServerSideProps = () => {
  return {
    props: {
      pageSlug: PAGE_SLUG.ADD_QUIZ,
      initValues: quizInitValue()
    }
  }
}

export default EditQuizPage
