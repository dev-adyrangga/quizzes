import { Translation } from '@/components/translation'
import { Spinner } from 'flowbite-react'

const SpinnerLoading = () => {
  const loadingTx = Translation('spinner-loading.heading')
  return (
    <div className="fixed inset-0 z-10 bg-black/[.25] backdrop-blur w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="info" size="xl" aria-label={loadingTx} />
        <span className="text-sm font-bold">{loadingTx}</span>
      </div>
    </div>
  )
}

export default SpinnerLoading
