import { Spinner } from '@heroui/react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[40vh] flex-col gap-4">
      <Spinner size="lg" />
      <div className="text-sm text-gray-600">Loading user information...</div>
    </div>
  )
}
