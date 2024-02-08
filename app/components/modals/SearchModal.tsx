"use client"  
import useSearchModal from '@/app/hooks/useSearchModal'
import React, { useMemo, useState } from 'react'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import { Range } from 'react-date-range'
import Heading from '../Heading'
import Map from '../Map'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'

enum STEPS {
  LOCATION = 0,
  DATE=1,
  INFO =2
}

const SearchModal = () => {
  const searchModal = useSearchModal()
  const router = useRouter()
  const [step,setStep]=useState(STEPS.LOCATION)
 const [location, setLocation] = useState<CountrySelectValue>()
 const [guestCount,setGuestCount] = useState(1)
 const [roomCount,setRoomCount] = useState(1)
 const [bathroomCount,setBathroomCount] = useState(1)
 const [dateRange,setDateRange] =useState<Range>({
  startDate:new Date(),
  endDate:new Date(),
  key:"selection"
 })

 const params = useSearchParams()

 const Map = useMemo(() => dynamic(() => import('../Map'), { 
  ssr: false 
}), [location]);

 const onBack =()=>{
  setStep((value)=>value -1)
}

const onNext =()=>{
  setStep((value)=>value + 1)
}

const actionLabel = useMemo(()=>{
  if(step === STEPS.INFO){
    return "Search"
  }
  return "Next"
},[step])

const secondaryActionLabel = useMemo(()=>{
  if(step === STEPS.LOCATION){
    return undefined
  }
  return "Back"
},[step])

const onSubmit =()=>{
if(step!== STEPS.INFO){
  return onNext()
}

let currentQuery ={}

if(params){
  currentQuery = qs.parse(params.toString())
}

const updatedQuery:any ={
  ...currentQuery,
  locationvalue:location?.value,
  guestCount,
  roomCount,
  bathroomCount
}

if(dateRange.startDate){
  updatedQuery.startDate =formatISO(dateRange.startDate)
}

if(dateRange.endDate){
  updatedQuery.endDate =formatISO(dateRange.endDate)
}


const url = qs.stringifyUrl({
  url:"/",
  query:updatedQuery
},{
  skipNull:true
})

setStep(STEPS.LOCATION)
searchModal.onClose()
router.push(url)
}

let bodyContent =  (
  <div className='flex flex-col gap-8'>
    <Heading  title='Where is your place located' subtitle='Find the perfect location'/>
    <CountrySelect onChange={(Value)=>setLocation(Value as CountrySelectValue)}/>
    <Map center={location?.latlng}/>
  </div>
)

if(step === STEPS.DATE){
  bodyContent =(
    <div className='flex flex-col gap-8'>
      <Heading  title='Where do you plan to go' subtitle='Make sure everyone is free!'/>
      <Calendar onChange={(value)=>setDateRange(value.selection)} value={dateRange}/>
    </div>
  )
}

if(step === STEPS.INFO){
  bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='More Information' subtitle='Find your perfect place!'/>
      <Counter onChange={(value)=>setGuestCount(value)} value={guestCount} title="Guests" subtitle="How many guests are coming?"/>
      <hr/>
      <Counter onChange={(value)=>setRoomCount(value)} value={roomCount} title="Rooms" subtitle="How many rooms do you need?"/>
      <hr/>
      <Counter onChange={(value)=>setBathroomCount(value)} value={bathroomCount} title="Bathrooms" subtitle="How many bathrooms do you need?"/>
    </div>
  )
}

  return (
    <Modal title='Filters' isOpen={searchModal.isOpen} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} body={bodyContent} onClose={searchModal.onClose} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} onSubmit={onSubmit}/>
  )
}

export default SearchModal