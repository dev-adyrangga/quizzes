import styled from '@emotion/styled/macro'
import tw from 'twin.macro'

export const PrefixTextArea = styled.span`
  ${tw`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md`}
`

export const CustomTextArea = styled.textarea`
  ${tw`resize-none block flex-1 min-w-0 w-full text-sm p-2.5`}
  ${tw`rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
`
