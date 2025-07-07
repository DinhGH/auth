
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { 
    email,
    password
   } = body

  try {
    const newUser = await prisma.user.create({ data: { 
    email,
    password
   }})
    return NextResponse.json(newUser)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 })
  }
}
