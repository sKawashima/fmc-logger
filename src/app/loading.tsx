export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[50vh] flex-col gap-major-2">
      <div className="spinner w-major-4 h-major-4"></div>
      <div className="text-major-2 text-gray-600">読み込み中...</div>
    </div>
  )
}
