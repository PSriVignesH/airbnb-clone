"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import {useForm,FieldValues, SubmitHandler} from 'react-hook-form'
import Input from '../inputs/Input'
import Heading from '../Heading'
import Button from '../Button'
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()

const {register,handleSubmit,formState:{errors}} =useForm<FieldValues>({
  defaultValues:{
    email:"",
    password:""
  }
})

const onSubmit : SubmitHandler<FieldValues> =(data) =>{
  setIsLoading(true)

  signIn("credentials",{
    ...data,
    redirect:false,
  }).then((callback)=>{
   setIsLoading(false)

   if(callback?.ok){
    toast.success("Logged in")
    router.refresh()
    loginModal.onClose()
   }

   if(callback?.error){
    toast.error(callback.error)
   }
  })
}

const onToggle =()=>{
  loginModal.onClose()
  registerModal.onOpen()
}

const bodyContent =(
    <div className=' flex flex-col gap-3'>
      <Heading  title='Welcome back' subtitle='Login to your account!'/>
      <Input  id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
      <Input  id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  )

  const footerContent =(
    <div className='flex flex-col gap-3 mt-2'>
      <hr/>
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>signIn("google")}/>
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=>signIn("github")}/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <p>First time using Airbnb? <span className='text-neutral-800 cursor-pointer hover:underline' onClick={onToggle}>{" "}Create an account</span></p>
      </div>
    </div> 
    )
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue'  onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/> 
  )
}

export default LoginModal