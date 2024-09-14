import { ReactNode } from "react"

interface Props {
  children : ReactNode
}

export const Title = (
  {children}:Props
) => {
  return <div className="font-bold text-4xl">
    {children}
  </div>
}