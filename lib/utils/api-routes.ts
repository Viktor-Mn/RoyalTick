import { Db, MongoClient } from 'mongodb'
import jwt, { VerifyErrors } from 'jsonwebtoken'
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
  reqBody: { name: string; password: string; email: string; isOAuth?: boolean, image?: string }
) => {
  // Якщо це OAuth, не хешуємо пароль bcrypt-ом (або використовуємо UID як є)
  const passwordToSave = reqBody.isOAuth
    ? reqBody.password // Firebase UID зберігаємо як ідентифікатор
    : bcrypt.hashSync(reqBody.password, bcrypt.genSaltSync(10))

  const newUser = {
    name: reqBody.name,
    password: passwordToSave,
    email: reqBody.email,
    image: reqBody.image || '',
    role: 'user',
    authSource: reqBody.isOAuth ? 'google' : 'credentials',
  }

  const result = await db.collection('users').insertOne(newUser)

  if (!result.insertedId) {
    throw new Error('Не вдалося записати користувача в базу')
  }

  return generateTokens(reqBody.name, reqBody.email)
}

export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })

export const getAuthRouteData = async(
  clientPromise: Promise<MongoClient>,
  req: Request,
  withReqBody = true
) => {
  const {db, reqBody} = await getDbAndReqBody(
    clientPromise,
    withReqBody ? req : null
  )
  const token = req.headers.get('authorization')?.split(' ')[1]
  const validatedTokenResult = await isValidAccessToken(token)

  return {db, reqBody, validatedTokenResult, token}
}

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }
  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
