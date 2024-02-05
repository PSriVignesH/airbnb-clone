import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'
import { SafeReservation } from '../types'

const TripsPage =async() => {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Plase Login'/>
      </ClientOnly>
    )
  }

   const reservations = await getReservations({userId:currentUser.id})
   console.log(reservations);
   

  if(reservations.length === 0 ){
    return (
      <ClientOnly>
        <EmptyState title='No trips found' subtitle='Looks like you havent reserved any trips'/>
      </ClientOnly>
    )
  }
  return (
   <ClientOnly>
    <TripsClient  reservations={reservations} currentUser={currentUser}/>
   </ClientOnly>
  )
}

export default TripsPage