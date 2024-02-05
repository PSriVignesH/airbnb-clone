import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


  interface Params{
    reservationId?:string
  }


  export async function DELETE(request:Request,{params}:{params:Params}){
      const currentUser =await getCurrentUser()

      if(!currentUser){
        return NextResponse.error()
      }

      const {reservationId}= params


      if(!reservationId || typeof reservationId !== "string"){
        throw new Error("Invalid ID")
      }


      const reservation = await prisma.reservation.deleteMany({
        where :{
          id:reservationId,
          OR:[{userId:currentUser.id},{lisiting :{userId:currentUser.id}}]
        }
      })

      return NextResponse.json(reservation)
  }