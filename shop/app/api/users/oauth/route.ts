import clientPromise from '@/lib/mongodb'
import {
  getDbAndReqBody,
  findUserByEmail,
  createUserAndGenerateTokens,
  generateTokens,
} from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)

    if (!user) {
      const tokens = await createUserAndGenerateTokens(db, reqBody)
      return NextResponse.json({
        ...tokens,
        name: reqBody.name,
        email: reqBody.email,
        image: reqBody.image || '',
      })
    }

    const tokens = generateTokens(user.name, reqBody.email)
    return NextResponse.json({
      ...tokens,
      name: user.name,
      email: user.email,
      image: user.image || '',
    })
  } catch (error) {
    console.error("CRITICAL BACKEND ERROR:", error)
    return NextResponse.json({ warningMessage: "Помилка бази даних" }, { status: 500 })
  }
}
