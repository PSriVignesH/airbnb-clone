"use client"
import React, { FC, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'


interface Props{
  reservations:any,
  currentUser?:SafeUser | null
}

const TripsClient:FC<Props> = ({reservations,currentUser}) => {

  console.log(reservations);
  
  const router =useRouter()
  const [deletingId,setDeletingId] =useState("")

  const onCancel =(id:string)=>{
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`).then(()=>{
      toast.success("Reservation Cancelled")
      router.refresh()
    })
    .catch
    ((error:any)=>{
      toast.error(error?.response?.data?.error)
    })
    .finally(()=>{
      setDeletingId("")
    })
  }
  return (
    <Container>
      <Heading title='Trips' subtitle="Where you've been and where you're going " />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          reservations.map((reservation:any)=>{
            return (
              <ListingCard key={reservation.id}  data={reservation.lisiting} reservation={reservation} actionId={reservation.id} actionLabel="Cancel Reservation" currentUser={currentUser} disabled={deletingId === reservation.id} onAction={onCancel}/>
            )
          })
        }
      </div>
    </Container>
  )
}

export default TripsClient