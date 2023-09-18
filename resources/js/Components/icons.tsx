import {
  PlusIcon as PlusIconRadix,
  DotsHorizontalIcon as DotsHorizontalIconRadix,
  TrashIcon as TrashIconRadix
} from '@radix-ui/react-icons';
import { IconProps } from "@radix-ui/react-icons/dist/types";

export const PlusIcon = (props: IconProps) => {
  return <PlusIconRadix {...props} />
}

export const DotsHorizontalIcon = (props: IconProps) => {
  return <DotsHorizontalIconRadix {...props} />
}

export const TrashIcon = (props: IconProps) => {
  return <TrashIconRadix {...props} />
}