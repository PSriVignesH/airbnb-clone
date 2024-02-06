import prisma from '@/app/libs/prismadb'

interface Props{
  listingId?:string,
  userId?:string,
  authorId?:string
}

export default async function getReservations(params:Props){
  try {
    const {listingId,userId,authorId} = params
    const query:any = {}

    if(listingId){
      query.listingId = listingId
    }

    if(userId){
      query.userId =userId
    }

    if(authorId){
      query.lisiting ={userId:authorId}
    }

    const reservations = await prisma.reservation.findMany({
      where:query,
      include:{
        lisiting:true
      },
      orderBy :{
        createdAt:"desc"
      }
    })


    const safeReservations = reservations.map((reservation:any)=>{
      return {
        ...reservation,
        createdAt:reservation.createdAt.toISOString(),
        startDate:reservation.startDate.toISOString(),
        endDate:reservation.endDate.toISOString(),
        lisiting :{
          ...reservation.lisiting,
          createdAt:reservation.lisiting.createdAt.toISOString()
        }
      }
    })

    return safeReservations
  } catch (error:any) {
    throw new Error(error)
  }

}