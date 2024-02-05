"use client"
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { FC } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

interface Props{
  onChange:(value:string)=>void,
  value:string
}

const ImageUpload:FC<Props> = ({onChange,value}) => {
  const handleUpload =(result:any)=>{
    onChange(result.info.secure_url)
  }
  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset='ktwolb2i' options={{maxFiles:1}}>
     {(open)=>{
      return (
        <div onClick={()=>open?.open()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flwx flex-col justify-center items-center gap-4 text-neutral-600'>
        <TbPhotoPlus size={50}/>
        <div className='font-semibold text-lg'>Click to upload</div>
        {
          value && (
            <div className='absolute inset-0 w-full h-full'>
            <Image fill style={{objectFit:"cover"}} src={value} alt='picture'/>
          </div>
          )
        }   
        </div>
      )
     }}
    </CldUploadWidget>
  )
}

export default ImageUpload