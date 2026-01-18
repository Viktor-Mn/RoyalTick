// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const types = [
  'leather strap',
  'metal bracelet',
  'rubber strap',
  'nato strap',
  'mesh bracelet',
]

const collections = ['Classic', 'Premium', 'Sport', 'Casual', 'Urban']

const materials = ['leather', 'rubber', 'steel', 'silicone', 'fabric']
const colors = ['black', 'brown', 'blue', 'green', 'red', 'white', 'gray']
const lengths = [18, 20, 22, 24] // см
const widths = [18, 20, 22, 24] // мм
const claspTypes = ['buckle', 'deployant', 'folding', 'pin']
const textures = ['smooth', 'embossed', 'woven', 'stitched']
const patterns = ['plain', 'patterned', 'stitch detail', 'perforated']
const compatibleModels = ['Casio', 'Seiko', 'Orient', 'Citizen', 'Tissot']

const images = [
  '/img/straps/strap-leather-1.png',
  '/img/straps/strap-leather-2.png',
  '/img/straps/strap-rubber-1.png',
  '/img/straps/strap-steel-1.png',
  '/img/straps/strap-silicone-1.png',
]

module.exports = {
  async up(db) {
    return db.collection('straps').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(types)

        const characteristics = [
          {
            type: 'leather strap',
            collection: getRandomArrayValue(['Classic', 'Premium', 'Casual']),
            material: 'leather',
            claspType: getRandomArrayValue(claspTypes),
            texture: getRandomArrayValue(textures),
            pattern: getRandomArrayValue(patterns),
            waterResistant: faker.datatype.boolean(),
            length: getRandomArrayValue(lengths),
            width: getRandomArrayValue(widths),
          },
          {
            type: 'metal bracelet',
            collection: getRandomArrayValue(['Classic', 'Mesh', 'Premium']),
            material: 'steel',
            claspType: getRandomArrayValue(claspTypes),
            texture: getRandomArrayValue(textures),
            pattern: getRandomArrayValue(patterns),
            waterResistant: faker.datatype.boolean(),
            length: getRandomArrayValue(lengths),
            width: getRandomArrayValue(widths),
          },
          {
            type: 'rubber strap',
            collection: getRandomArrayValue(['Sport', 'Casual']),
            material: 'rubber',
            claspType: getRandomArrayValue(claspTypes),
            texture: getRandomArrayValue(textures),
            pattern: getRandomArrayValue(patterns),
            waterResistant: faker.datatype.boolean(),
            length: getRandomArrayValue(lengths),
            width: getRandomArrayValue(widths),
          },
          {
            type: 'nato strap',
            collection: getRandomArrayValue(['Casual', 'Urban']),
            material: 'fabric',
            claspType: getRandomArrayValue(claspTypes),
            texture: getRandomArrayValue(textures),
            pattern: getRandomArrayValue(patterns),
            waterResistant: faker.datatype.boolean(),
            length: getRandomArrayValue(lengths),
            width: getRandomArrayValue(widths),
          },
          {
            type: 'mesh bracelet',
            collection: getRandomArrayValue(['Classic', 'Premium']),
            material: 'steel',
            claspType: getRandomArrayValue(claspTypes),
            texture: getRandomArrayValue(textures),
            pattern: getRandomArrayValue(patterns),
            waterResistant: faker.datatype.boolean(),
            length: getRandomArrayValue(lengths),
            width: getRandomArrayValue(widths),
          },
        ]

        const currentCharacteristics = characteristics.find(
          (item) => item.type === type
        )

        return {
          category: 'straps',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: `${getRandomArrayValue(colors)} ${type}`,
          description: faker.lorem.sentences(3),
          characteristics: currentCharacteristics,
          images: [getRandomArrayValue(images)],
          vendorCode: faker.string.alphanumeric(6).toUpperCase(),
          inStock: +faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
        }
      })
    )
  },

  async down(db) {
    return db.collection('straps').deleteMany({})
  },
}
