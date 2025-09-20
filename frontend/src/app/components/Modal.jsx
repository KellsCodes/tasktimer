"use client"
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
import React, { useRef } from "react";



export function Modal({ props, children }) {
  const buttonRef = useRef(null)
  // console.log(props);

  const handleSaveTask = () => {
    if (buttonRef.current) {
      buttonRef.current.handleSubmit()
    }
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px] space-y-2">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add task to your task list. We will send you reminder email.
          </DialogDescription>
        </DialogHeader>

        {React.cloneElement(children, { ref: buttonRef })}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            className={"bg-green-500 hover:bg-prim cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"}
            onClick={handleSaveTask}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
