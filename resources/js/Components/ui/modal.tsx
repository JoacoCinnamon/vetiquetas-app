import { ReactNode } from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "./dialog";

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
}

function ModalContent({ children,
}: {
  children: ReactNode;
}) {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md  p-8  shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">

        {children}
      </DialogContent>
    </DialogPortal>
  );
}

Modal.Button = DialogTrigger;
Modal.Close = DialogClose;
Modal.Title = DialogTitle;
Modal.Header = DialogHeader;
Modal.Description = DialogDescription;
Modal.Content = ModalContent;
Modal.Footer = DialogFooter;