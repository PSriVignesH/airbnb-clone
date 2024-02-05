"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import qs  from 'query-string'
import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface Props{
  icon:IconType,
  label:string,
  selected?:boolean
}


const CategoryBox:FC<Props> = ({icon:Icon,label,selected}) => {
  const router =useRouter()
  const params = useSearchParams()

  const handleClick = ()=>{
    let currentQuery={}
  
    if(params){
     currentQuery = qs.parse(params.toString()) 
    }

    const updatedQuery:any = {
      ...currentQuery,
      category:label
    }

    if(params?.get("category") === label){
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url:'/',
      query:updatedQuery
    },{skipNull:true})

    router.push(url)
  }
  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? "border-b-neutral-800" : "border-transparent" } ${selected ? "text-neutral-800" : "text-neutral-500" }`} onClick={handleClick}>
      <Icon size={26}/>
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default CategoryBox