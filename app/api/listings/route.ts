import { NextResponse } from "next/server";
 import prisma  from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request:Request){
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }
  
const body = await request.json() 

const {title,description,imageSrc,category,roomCount,bathroomCount,guestCount,location,price} =body

Object.keys(body).forEach((value:any)=>{
  if(!body[value]){
    return NextResponse.error()
  }
})

  const listing = await prisma.listing.create({
    data:{
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationvalue:location.value,
      price:Number(price),
      userId:currentUser.id
    }
  })
  
return NextResponse.json(listing)
}