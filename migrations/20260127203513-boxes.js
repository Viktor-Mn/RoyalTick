// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const boxMaterials = [
  'wood',
  'leatherette',
  'velvet',
  'plastic',
  'carbon fiber',
]
const boxColors = ['black', 'cherry', 'dark brown', 'carbon', 'navy']
const capacities = [1, 2, 4, 6, 12] // на скільки годинників
const interiorMaterials = ['suede', 'velvet', 'silk']

const boxImages = [
  '/img/boxes/box-1.png',
  '/img/boxes/box-2.png',
  '/img/boxes/box-3.png',
]

module.exports = {
  async up(db) {
    return db.collection('boxes').insertMany(
      [...Array(20)].map(() => {
        const material = getRandomArrayValue(boxMaterials)

        return {
          category: 'accessories', // загальна категорія
          type: 'boxes', // тип для перевірки логіки кошика
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: `${getRandomArrayValue(boxColors)} ${material} box for watches`,
          description: faker.lorem.sentences(3),
          characteristics: {
            material: material,
            color: getRandomArrayValue(boxColors),
            capacity: getRandomArrayValue(capacities),
            interior: getRandomArrayValue(interiorMaterials),
            weight: faker.string.numeric(3) + 'g',
          },
          // Зверни увагу: тут немає caseSize або width, тому таблиця розмірів не відкриється
          images: [getRandomArrayValue(boxImages)],
          vendorCode: faker.string.alphanumeric(6).toUpperCase(),
          inStock: +faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
    )
  },

  async down(db) {
    return db.collection('boxes').deleteMany({})
  },
}
