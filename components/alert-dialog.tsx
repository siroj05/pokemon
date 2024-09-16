import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-base"
import { ReactNode } from "react"

interface Props {
  children : ReactNode
  title : string
  handleDropp? : (value : any) => void
  item? : any
}

export function AlertDialogPokedex({children, title, handleDropp, item}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {handleDropp ? <AlertDialogAction onClick={() => handleDropp(item)} className="bg-header hover:bg-blue-800">Ok</AlertDialogAction>
          :  <AlertDialogAction className="bg-header hover:bg-blue-800">Ok</AlertDialogAction>
        }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
