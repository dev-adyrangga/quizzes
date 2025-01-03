import { PAGE_URL } from '@/constants/page-url-contants'
import { NextRouter } from 'next/router'

const navToManageQuiz = (router: NextRouter) => {
  router.push(PAGE_URL.MANAGE_QUIZ, PAGE_URL.MANAGE_QUIZ, {
    locale: router.locale
  })
}

const navToEditQuiz = (router: NextRouter, quizId: string) => {
  const url = PAGE_URL.EDIT_QUIZ.replace('[id]', quizId)
  router.push(url, url, { locale: router.locale })
}

const navToAddQuiz = (router: NextRouter) => {
  router.push(PAGE_URL.ADD_QUIZ, PAGE_URL.ADD_QUIZ, { locale: router.locale })
}

const navToTakeQuiz = (router: NextRouter) => {
  router.push(PAGE_URL.TAKE_QUIZ, PAGE_URL.TAKE_QUIZ, { locale: router.locale })
}

const goToSignInPage = (router: NextRouter) => {
  router.replace(PAGE_URL.SIGN_IN, PAGE_URL.SIGN_IN, { locale: router.locale })
}

const appNavigation = {
  navToManageQuiz,
  navToEditQuiz,
  navToAddQuiz,
  navToTakeQuiz,
  goToSignInPage
}

export default appNavigation
