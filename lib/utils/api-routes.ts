import { Db, MongoClient } from 'mongodb'
import { shuffle } from './common'

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