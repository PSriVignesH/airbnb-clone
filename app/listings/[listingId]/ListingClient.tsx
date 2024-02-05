"use client"
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useMemo, useState } from 'react'
import Container from '../../components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/Navbar/Categories'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { Range } from 'react-date-range'
import ListingReservation from '@/app/components/listings/ListingReservation'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialDateRange ={
  startDate:new Date(),
  endDate:new Date(),
  key:"selection"
}

interface Props{
  reservations?:any,
  listing: SafeListing & {
    user:SafeUser
  },
  currentUser? :SafeUser | null
}

const ListingClient:FC<Props> = ({listing,reservations=[],currentUser}) => {
  
  const loginModal=useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const category =useMemo(()=>{
    return categories.find((items)=>items.label === listing.category)
  },[listing.category])

  const disabledDates = useMemo(()=>{
   let dates:Date[] =[]

   reservations.forEach((reservation:any)=>{
    const range = eachDayOfInterval({
      start:new Date(reservation.startDate),
      end:new Date(reservation.endDate)
    })
    dates = [...dates,...range]
   })
   return dates
  },[reservations])

  const onCreateReservation =()=>{
 if(!currentUser){
  return loginModal.onOpen()
 }

 setIsLoading(true)

 axios.post("/api/reservations",{
  totalPrice,
  startDate: dateRange.startDate,
  endDate:dateRange.endDate,
  listingId:listing?.id
 })
 .then(()=>{
  toast.success("Listing Reserved!")
  setDateRange(initialDateRange)
  router.push("/trips")
 })
 .catch(()=>{
  toast.error("Something went wrong")
 })
 .finally(()=>{
  setIsLoading(false)
 })
  }


  useEffect(()=>{
  if(dateRange.startDate && dateRange.endDate){
    const dayCount = differenceInDays(dateRange.endDate,dateRange.startDate)

    if(dayCount && listing.price){
      setTotalPrice(dayCount * listing.price)
    }else{
      setTotalPrice(listing.price)
    }
  }
  },[dateRange,listing.price])
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
         <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationvalue={listing.locationvalue} id={listing.id} currentUser={currentUser}/>
         <div className='grid  grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
          <ListingInfo user={listing.user}  category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationvalue={listing.locationvalue}/>
          <div className='mb-10 order-first md:order-last md:col-span-3'>
            <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value)=>setDateRange(value)} dateRange={dateRange} disabled={isLoading} disabledDates={disabledDates} onSubmit={onCreateReservation}/>
          </div>
         </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient