import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export function Modal({ props, children }) {
  // console.log(props);

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px] space-y-2">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add task to your task list. We will send you reminder email.
          </DialogDescription>
        </DialogHeader>
        
        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className={"bg-green-500 hover:bg-prim cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
