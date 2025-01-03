import ManageQuizPage from '@/app/manage-quiz'
import { getQuisListAdapter } from '@/app/manage-quiz/adapters'
import { PAGE_SLUG } from '@/constants/page-slug-constants'
import cookieHelper from '@/libs/cookie-helper'
import { NextPageContext } from 'next'

export const getServerSideProps = async (ctx: NextPageContext) => {
  let quizList = []
  let error = null
  try {
    quizList = await getQuisListAdapter(cookieHelper.getToken(ctx).accessToken)
  } catch (err) {
    error = err
  }
  return {
    props: { pageSlug: PAGE_SLUG.MANAGE_QUIZ, quizList, error }
  }
}

export default ManageQuizPage
