"use client"
import Image from 'next/image'
import React, { FC, useCallback, useMemo } from 'react'
import HeartButton from '../HeartButton'
import useCountries from '@/app/hooks/useCountries'
import { format } from 'date-fns'
import Button from '../Button'
import { useRouter } from 'next/navigation'


interface Props {
  data:any,
  reservation?:any,
  onAction?:(id:string)=>void,
  disabled?:boolean,
  actionLabel?:string,
  actionId?:string,
  currentUser:any 
}
const ListingCard:FC<Props>=({data,reservation,onAction,disabled,actionLabel,actionId="",currentUser}) => {
  const router = useRouter()
   const {getByValue}=useCountries()
   const location = getByValue(data.locationvalue)
  
   

   const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()

    if(disabled){
      return
    }

    onAction?.(actionId)
   },[disabled,onAction,actionId])


   const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }
    return data.price
   },[reservation,data.price])


   const reservationDate = useMemo(()=>{
    if(!reservation){
      return null
    }

    const start =new Date(reservation.startDate)
    const end =new Date(reservation.endDate)

    return `${format(start,"PP")} -${format(end,"PP")}`
   },[reservation])
  return (
    <div className='col-span-1 cursor-pointer group' onClick={()=>router.push(`/listings/${data.id}`)}>
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square  w-full  relative overflow-hidden rounded-xl'>
          <Image fill className='object-cover w-full h-full group-hover:scale-110 transition' alt='Listing' src={data.imageSrc}/>
          <div className='absolute top-3 right-3'>
           <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='font-semibold text-lg'>
          {location?.region},{location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'> 
           <div className='font-semibold'>$ {price}</div>
           {!reservation && <div className='font-light'>night</div>}
        </div>
      </div>
      {
        onAction && actionLabel && (
          <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )
      }
    </div>
  )
}

export default ListingCard