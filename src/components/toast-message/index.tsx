import { useAppToast } from '@/hooks/use-app-toast'
import { Toast } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi'

const ToastMessage = () => {
  const { toast, setToast } = useAppToast()
  return (
    <div className="fixed z-[5] right-4 top-4">
      <Toast className="border-cyan-500 bg-cyan-100 shadow-lg text-cyan-700">
        <div className="inline-flex h-fit w-fit shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500">
          <HiInformationCircle className="h-5 w-5" />
        </div>
        <div className="ml-1 mr-6 text-sm font-normal">{toast}</div>
        <Toast.Toggle
          className="bg-transparent hover:bg-transparent-100 text-cyan-700"
          onDismiss={() => setToast()}
        />
      </Toast>
    </div>
  )
}

export default ToastMessage
