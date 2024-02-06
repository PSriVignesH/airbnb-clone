import {create} from 'zustand'

interface Props {
  isOpen:boolean,
  onOpen:()=> void,
  onClose:()=> void
}

const  useRentModal =create<Props>((set:any)=>({
  isOpen:false,
  onOpen:()=> set({isOpen :true}),
  onClose:()=> set({isOpen :false}),
}))

export default useRentModal