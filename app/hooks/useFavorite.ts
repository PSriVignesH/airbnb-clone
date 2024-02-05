import { useRouter } from "next/navigation"
import { FC, useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import axios from "axios"
import toast from "react-hot-toast"


interface Props{
  listingId:string,
  currentUser:any
}

const useFavorite=({listingId,currentUser}:Props)=>{
 const router =useRouter()
 const loginModal=useLoginModal()


 const hasFavorited = useMemo(()=>{
  const list = currentUser?.favouriteIds || []
  console.log(list,currentUser);
  
  return list.includes(listingId)
 },[currentUser,listingId])

 const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
   e.stopPropagation()

   if(!currentUser){
    return loginModal.onOpen()
   }

   try {
    let request

    if(hasFavorited){
      request =()=>axios.delete(`/api/favorites/${listingId}`)
    }else{
      request =()=>axios.post(`/api/favorites/${listingId}`)
    }

    await request()
    router.refresh()
    toast.success("Success")
   } catch (error) {
    toast.error("Something went wrong")
   }
 },[currentUser,hasFavorited,listingId,loginModal])

 return {hasFavorited,toggleFavorite}
}

export default useFavorite