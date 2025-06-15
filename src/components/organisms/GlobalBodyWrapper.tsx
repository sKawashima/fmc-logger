type Props = {
  children: React.ReactNode
}

export const GlobalBodyWrapper = (props: Props) => {
  return (
    <div className="max-w-[1280px] mx-auto p-major-2 min-h-[calc(100vh-140px)]">
      {props.children}
    </div>
  )
}
