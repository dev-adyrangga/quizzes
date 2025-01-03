import SignInForm from '@/components/forms'
import PageContainer from '@/components/page-container'

type SignInPageProps = {
  pageSlug: string
}

const SignInPage = ({ pageSlug }: SignInPageProps) => {
  return (
    <PageContainer>
      <main className="w-full h-full grid items-center justify-items-center">
        <SignInForm pageSlug={pageSlug} />
      </main>
    </PageContainer>
  )
}

export default SignInPage
