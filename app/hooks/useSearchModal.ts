import {create} from 'zustand'

interface Props {
  isOpen:boolean,
  onOpen:()=> void,
  onClose:()=> void
}

const  useSearchModal =create<Props>((set:any)=>({
  isOpen:false,
  onOpen:()=> set({isOpen :true}),
  onClose:()=> set({isOpen :false}),
}))

export default useSearchModal