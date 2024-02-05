"use client"
import React, { FC, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import useRentModal from '@/app/hooks/useRentModal'
import { SafeUser } from '@/app/types'

interface Props {
  currentUser :SafeUser | null
}

const UserMenu:FC<Props> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal =useRegisterModal()
  const loginModal =useLoginModal()
  const router = useRouter()
  const rentModal =useRentModal()

   const onRent =()=>{
    if(!currentUser){
      return loginModal.onOpen()
    }

    rentModal.onOpen()
   }

  const toggleOpen = ()=>{
    setIsOpen((curr)=>!curr)
  }
  console.log(isOpen);
  
  return (
    <div className='relative'>
     <div className='flex flex-row items-center gap-3'>
      <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>Airbnb your home</div>
      <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'> 
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image}/>
        </div>
      </div> 
      {
        isOpen && (
          <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer'>
              {
              currentUser ? 
              <>
              <MenuItem label='My trips' onClick={()=>router.push("/trips")}/>
              <MenuItem label='My favourites' onClick={()=>router.push("/favorites")}/>
              <MenuItem label='My reservations' onClick={()=>router.push("/reservations")}/>
              <MenuItem label='My properties' onClick={()=>router.push("/properties")}/>
              <MenuItem label='Airbnb your home' onClick={rentModal.onOpen}/>
              <hr />
              <MenuItem  label='Logout' onClick={()=>signOut()}/>
              </> 
              : 
              <>
              <MenuItem onClick={loginModal.onOpen} label="Login"/>
              <MenuItem onClick={registerModal.onOpen} label="Signup"/>
              </>
              }   
            </div>
          </div>
        )
      } 
     </div>
    </div>
  )
}

export default UserMenu