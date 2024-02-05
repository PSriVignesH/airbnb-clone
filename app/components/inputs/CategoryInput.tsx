"use client"
import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface Props{
  icon:IconType,
  label:string,
  selected?:boolean,
  onClick:(value:string)=>void
}


const CategoryInput:FC<Props> = ({icon:Icon,label,selected,onClick}) => {
  
  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"  }`} onClick={()=>onClick(label)}>
      <Icon size={30}/>
      <div className='font-semibold'>{label}</div>
    </div>
  )
}

export default CategoryInput