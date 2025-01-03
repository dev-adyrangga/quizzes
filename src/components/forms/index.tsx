import { Translation } from '@/components/translation'
import { Button } from 'flowbite-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import TextInputField from './text-input-field'
import { useAppLoader } from '@/hooks/use-app-loader'
import { SignInValueTypes } from './types'
import { signInAdapter, signUpAdapter } from '@/app/sign-in/adapters'
import appNavigation from '@/utils/app-navigation'
import useAppRouter from '@/hooks/use-app-router'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAppTranslation } from '@/hooks/use-app-translation'
import { PAGE_SLUG } from '@/constants/page-slug-constants'
import Link from 'next/link'

type SignInFormProps = {
  pageSlug: string
}

const SignInForm = ({ pageSlug }: SignInFormProps) => {
  const { translate } = useAppTranslation()
  const { setToast } = useAppToast()
  const [values, setValues] = useState<SignInValueTypes>({
    email: '',
    password: ''
  })
  const { setLoading } = useAppLoader()
  const router = useAppRouter()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setValues((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    setLoading(true)
    try {
      if (pageSlug === PAGE_SLUG.SIGN_IN) {
        await signInAdapter(values)
      }
      if (pageSlug === PAGE_SLUG.SIGN_UP) {
        await signUpAdapter(values)
      }

      appNavigation.navToManageQuiz(router)
    } catch (error) {
      setToast(
        error?.['message' as keyof typeof error] ||
          translate('message.generic.error')
      )
    }
    setLoading(false)
  }

  const isDisabledSubmit = !values.email || !values.password

  return (
    <div className="border px-10 py-6 rounded-md shadow">
      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        <Translation
          id={
            pageSlug === PAGE_SLUG.SIGN_IN
              ? 'sign-in-form.heading'
              : 'sign-up-form.heading'
          }
        />
      </h2>
      <hr className="my-4" />
      <form
        className="flex md:min-w-80 flex-col gap-4"
        onSubmit={onSubmitHandler}
      >
        <TextInputField
          id="email"
          type="email"
          label={<Translation id="sign-in-form.email" />}
          value={values.email}
          onChange={onChangeHandler}
        />
        <TextInputField
          id="password"
          type="password"
          label={<Translation id="sign-in-form.password" />}
          value={values.password}
          onChange={onChangeHandler}
        />
        <Button
          color="blue"
          className="font-bold mt-6"
          type="submit"
          disabled={isDisabledSubmit}
        >
          <Translation id="sign-in-form.submit" />
        </Button>
        <p className="text-sm font-light text-gray-500">
          {pageSlug === PAGE_SLUG.SIGN_IN ? (
            <>
              <Translation id="sign-in-form.dont-have-account" />
              <Link
                href={`/${router.locale}/sign-up/`}
                className="font-medium text-blue-600 hover:underline"
              >
                <Translation id="sign-up-form.heading" />
              </Link>
            </>
          ) : (
            <>
              <Translation id="sign-in-form.have-account" />
              <Link
                href={`/${router.locale}/sign-in/`}
                className="font-medium text-blue-600 hover:underline"
              >
                <Translation id="sign-in-form.heading" />
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default SignInForm
