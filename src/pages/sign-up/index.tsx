import SignInPage from '@/app/sign-in'
import { PAGE_SLUG } from '@/constants/page-slug-constants'

export const getServerSideProps = () => {
  return {
    props: { pageSlug: PAGE_SLUG.SIGN_UP }
  }
}

export default SignInPage
