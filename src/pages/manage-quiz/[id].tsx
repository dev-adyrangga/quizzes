import { PAGE_SLUG } from '@/constants/page-slug-constants'
import EditQuizPage from '@/app/manage-quiz/edit-quiz'
import cookieHelper from '@/libs/cookie-helper'
import { NextPageContext } from 'next'
import { getQuisByIdAdapter } from '@/app/manage-quiz/adapters'
import { PAGE_URL } from '@/constants/page-url-contants'

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query
  const { data, error } = await getQuisByIdAdapter(
    cookieHelper.getToken(ctx).accessToken,
    id as string
  )

  if ((error as unknown as { code?: number })?.code === 401) {
    return {
      redirect: {
        destination: `/${ctx.locale}/${PAGE_URL.SIGN_IN}`,
        permanent: false
      }
    }
  }
  return {
    props: {
      pageSlug: PAGE_SLUG.EDIT_QUIZ,
      initValues: data,
      error
    }
  }
}

export default EditQuizPage
