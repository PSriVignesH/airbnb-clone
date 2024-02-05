"use client"
import React, { FC, useCallback, useState } from 'react'
import { SafeListing,SafeUser } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'


interface Props{
  listings:SafeListing[],
  currentUser?:SafeUser | null
}

const PropertiesClient:FC<Props> = ({listings,currentUser}) => {


  
  const router =useRouter()
  const [deletingId,setDeletingId] =useState("")

  const onCancel =useCallback((id:string)=>{
    setDeletingId(id)

    axios.delete(`/api/listings/${id}`).then(()=>{
      toast.success("Listing Deleted")
      router.refresh()
    })
    .catch
    ((error)=>{
      toast.error("Something went wrong")
    })
    .finally(()=>{
      setDeletingId("")
    })
  },[router])
  return (
    <Container>
      <Heading title='Properties' subtitle="List of your properties" />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          listings.map((listing:any)=>{
            return (
              <ListingCard key={listing.id}  data={listing}  actionId={listing.id} actionLabel="Delete Property" currentUser={currentUser} disabled={deletingId === listing.id} onAction={onCancel}/>
            )
          })
        }
      </div>
    </Container>
  )
}

export default PropertiesClient