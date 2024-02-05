import Image from 'next/image'
import React, { FC } from 'react'

interface Props {
  src : string | null | undefined
}

const Avatar:FC<Props> = ({src}) => {
  return (
    <div>
      <Image src={src || "/assets/images/placeholder.jpg"}  height={30} width={30} alt='avatar' className='rounded-full'/>
    </div>
  )
}

export default Avatar