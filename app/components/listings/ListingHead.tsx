"use client"
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import React, { FC } from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface Props{
  title:string,
  locationvalue:string,
  imageSrc:string,
  id:string,
  currentUser?:SafeUser  | null
}

const ListingHead:FC<Props> = ({title,locationvalue,id,imageSrc,currentUser}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationvalue)
  return (
    <>
    <Heading  title={title} subtitle={`${location?.region},${location?.label}`}/>
    <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
     <Image src={imageSrc} fill  className='object-cover w-full' alt='Image'/>
     <div className='absolute top-5 right-5'>
      <HeartButton listingId={id} currentUser={currentUser} />
     </div>
    </div>
    </>
  )
}

export default ListingHead