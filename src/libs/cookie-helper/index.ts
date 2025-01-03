import { NextPageContext } from 'next'
import nookies from 'nookies'

export type CookieCtx = NextPageContext | null

const getCookies = (ctx: CookieCtx, key: string) => {
  const cookies = nookies.get(ctx)
  return cookies[key]
}

const setCookie = (ctx: CookieCtx, key: string, value: string) => {
  nookies.set(ctx, key, value, { path: '/' })
}

const getUserData = (ctx: CookieCtx) => {
  try {
    const data = getCookies(ctx, 'user')
    return JSON.parse(data) as { id: string; email: string }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { id: '', email: '' }
  }
}

const setUserData = (
  ctx: CookieCtx,
  userData: { id: string; email?: string }
) => {
  setCookie(ctx, 'user', JSON.stringify(userData))
}

const getToken = (ctx: CookieCtx) => ({
  accessToken: getCookies(ctx, 'accessToken'),
  refreshToken: getCookies(ctx, 'refreshToken')
})

const setToken = (
  ctx: CookieCtx,
  tokenVal: string,
  refreshTokenVal: string
) => {
  setCookie(ctx, 'accessToken', tokenVal)
  setCookie(ctx, 'refreshToken', refreshTokenVal)
}

const completeSignOut = (ctx: CookieCtx) => {
  nookies.destroy(ctx, 'accessToken', { path: '/' })
  nookies.destroy(ctx, 'refreshToken', { path: '/' })
  nookies.destroy(ctx, 'user', { path: '/' })
}

const cookieHelper = {
  getCookies,
  getUserData,
  setUserData,
  getToken,
  setToken,
  completeSignOut
}

export default cookieHelper
