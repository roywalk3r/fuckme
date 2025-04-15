

import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import { adminAuthMiddleware } from "@/lib/admin-auth"

export async function GET(req: NextRequest) {
 // Check admin authorization
 const authResponse = await adminAuthMiddleware(req)
 if (authResponse.status !== 200) {
   return authResponse
 }

 try {
   const hero = await prisma.hero.findMany()

   return createApiResponse({
     data: hero,
     status: 200,
   })
 } catch (error) {
   return handleApiError(error)
 }
}

export async function POST(req: NextRequest) {
 // Check admin authorization
 const authResponse = await adminAuthMiddleware(req)
 if (authResponse.status !== 200) {
   return authResponse
 }

 try {
   const body = await req.json()

   const hero = await prisma.hero.create({
     data: {
       title: body.title,
       description: body.description,
       image: body.image,
       buttonText: body.buttonText,
       buttonLink: body.buttonLink,
       color: body.color,
     },
   })

   return createApiResponse({
     data: hero,
     status: 201,
   })
 } catch (error) {
   return handleApiError(error)
 }
}

export async function PATCH(req: NextRequest) {
 // Check admin authorization
 const authResponse = await adminAuthMiddleware(req)
 if (authResponse.status !== 200) {
   return authResponse
 }

 try {
   const body = await req.json()

   const hero = await prisma.hero.update({
     where: {
       id: Number(body.id),
     },
     data: {
       title: body.title,
       description: body.description,
       image: body.image,
       buttonText: body.buttonText,
       buttonLink: body.buttonLink,
       color: body.color,
     },
   })

   return createApiResponse({
     data: hero,
     status: 200,
   })
 } catch (error) {
   return handleApiError(error)
 }
}

export async function DELETE(req: NextRequest) {
 // Check admin authorization
 const authResponse = await adminAuthMiddleware(req)
 if (authResponse.status !== 200) {
   return authResponse
 }

 try {
   const url = new URL(req.url)
   const id = url.searchParams.get("id")

   if (!id) {
     return createApiResponse({
       error: "Hero Content ID is required",
       status: 400,
     })
   }

   await prisma.hero.delete({
     where: {
       id: Number(id),
     },
   })

   return createApiResponse({
     data: { message: "Hero Content deleted successfully" },
     status: 200,
   })
 } catch (error) {
   return handleApiError(error)
 }
}
