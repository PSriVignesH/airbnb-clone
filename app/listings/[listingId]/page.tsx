import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import React, { FC } from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getReservations from '@/app/actions/getReservations'

interface Props{
  params:{
    listingId?:string
  }
}

const ListingPage:FC<Props> = async({params}) => {
  const listing = await getListingById(params)
  const reservations =await getReservations(params)
  
  const currentUser= await getCurrentUser()
  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  )
}

export default ListingPage