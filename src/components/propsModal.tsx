import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface PropsModalProps {
  props: {
    id: string;
    name: string;
    check: boolean | null;
    challengeId: string | null;
  }[];
}
function PropsModal({ props }: PropsModalProps) {
  console.log(props);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit todays challenge props!</DialogTitle>
      </DialogHeader>
      <ul>
        {props.map((prop) => (
          <li key={prop.id}>
            <Label>{prop.name}</Label>
          </li>
        ))}
      </ul>
    </DialogContent>
  );
}

export default PropsModal;
