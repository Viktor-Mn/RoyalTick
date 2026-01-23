import { Db, MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import { shuffle } from './common'
import bcrypt from 'bcryptjs'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getNewAndBestsellerGoods = async (
  db: Db,
  fieldName: 'isBestseller' | 'isNew'
) => {
  // Випадкові 2 годинники
  const watches = await db
    .collection('watches')
    .aggregate([
      { $match: { [fieldName]: true, inStock: { $gt: 0 } } },
      { $sample: { size: 2 } },
    ])
    .toArray()

  // Випадкові 2 ремені
  const straps = await db
    .collection('straps')
    .aggregate([
      { $match: { [fieldName]: true, inStock: { $gt: 0 } } },
      { $sample: { size: 2 } },
    ])
    .toArray()

  // Об’єднуємо і додаємо додаткове перетасування
  return shuffle([...watches, ...straps])
}

export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    {
      name,
      email,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    {
      email,
    },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}

export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; password: string; email: string }
) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    password: hash,
    email: reqBody.email,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })
