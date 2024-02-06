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
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

const {register,handleSubmit,formState:{errors}} =useForm<FieldValues>({
  defaultValues:{
    name:"",
    email:"",
    password:""
  }
})

const onSubmit:SubmitHandler<FieldValues> =(data:any) =>{
  setIsLoading(true)
  axios.post("/api/register",data)
  .then(()=>{
    toast.success("Registered")
    loginModal.onOpen()
  registerModal.onClose()
  })
  .catch((error:any)=>{
    toast.error(error)
  })
  .finally(()=>{
    setIsLoading(false)
  })
}

const onToggle =()=>{
  loginModal.onOpen()
  registerModal.onClose()
}

  const bodyContent =(
    <div className=' flex flex-col gap-3'>
      <Heading  title='Welcome to Airbnb' subtitle='Create an account!'/>
      <Input  id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
      <Input  id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
      <Input  id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  )

  const footerContent =(
    <div className='flex flex-col gap-3 mt-2'>
      <hr/>
      <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>signIn("google")}/>
      <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=>signIn("github")}/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <p>Already have an account? <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>{" "}Log in</span></p>
      </div>
    </div> 
    )
  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue'  onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/> 
  )
}

export default RegisterModal