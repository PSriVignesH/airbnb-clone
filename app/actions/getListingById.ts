import prisma from '@/app/libs/prismadb'

interface Params{
 listingId?:string
 }

 export default async function getListingById(params:Params){
try {
  const {listingId} = params
  if(!listingId){
    return null
  }
  const listing = await prisma.listing.findUnique({
    where:{
      id:listingId
    },
    include:{
      user:true
    } 
  })

  if(!listing){
    return null
  }


  return {
    ...listing,
    createdAt:listing.createdAt.toString(),
    user:{
      ...listing.user,
      createdAt:listing.user.createdAt.toString(),
      updatedAt:listing.user.updatedAt.toString(),
      emailVerified:listing.user.emailVerified?.toString() || null,
    }
  }
} catch (error:any) {
  throw new Error(error)
}
 }