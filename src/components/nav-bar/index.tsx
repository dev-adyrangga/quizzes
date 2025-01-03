import { Translation } from '@/components/translation'
import appNavigation from '@/utils/app-navigation'
import useAppRouter from '@/hooks/use-app-router'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import getTextDir from '@/utils/get-text-direction'
import cookieHelper from '@/libs/cookie-helper'
import { useEffect } from 'react'
import { PAGE_SLUG } from '@/constants/page-slug-constants'
import { supabase } from '@/libs/supabase'

type NavBarProps = {
  pageSlug?: string
}

const NavBar = ({ pageSlug }: NavBarProps) => {
  const router = useAppRouter()
  const { email } = cookieHelper.getUserData(null)
  const isSignInPage =
    pageSlug === PAGE_SLUG.SIGN_IN || pageSlug === PAGE_SLUG.SIGN_UP

  useEffect(() => {
    if (!isSignInPage && !email) {
      appNavigation.goToSignInPage(router)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSwitchLangHandler = (nextLocale: 'en' | 'ar') => {
    if (nextLocale !== router.locale) {
      router.replace(router.pathname, router.asPath, { locale: nextLocale })
    }
  }

  const signOutHandler = async () => {
    await supabase.auth.signOut()
    cookieHelper.completeSignOut(null)
    appNavigation.goToSignInPage(router)
  }

  return (
    <Navbar
      fluid
      className="bg-blue-600 border-b"
      dir={getTextDir(router.locale)}
    >
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-3xl font-bold text-white">
          <Translation id="app-name" />
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar stacked size="sm" alt="Avatar Account" rounded></Avatar>
          }
        >
          {!isSignInPage && (
            <>
              <Dropdown.Header>
                <span className="block truncate text-sm font-bold">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => appNavigation.navToManageQuiz(router)}
              >
                <Translation id="avatar.manage-quiz" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => appNavigation.navToTakeQuiz(router)}
              >
                <Translation id="avatar.take-quiz" />
              </Dropdown.Item>
              <Dropdown.Item onClick={signOutHandler}>
                <Translation id="avatar.sign-out" />
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
          <Dropdown.Header className="pb-0">
            <span className="block truncate text-sm font-bold min-w-36">
              <Translation id="avatar.lang-heading" />
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => onSwitchLangHandler('en')}>
            <Translation id="avatar.lang.en" />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onSwitchLangHandler('ar')}>
            <Translation id="avatar.lang.ar" />
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  )
}

export default NavBar
