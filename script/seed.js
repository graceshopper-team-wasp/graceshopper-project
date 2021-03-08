'use strict'

const {green, red} = require('chalk')
const {findDOMNode} = require('react-dom')
const db = require('../server/db')
const {Product, User, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Users
  const users = [
    {
      email: 'nikki@teamwasp.com',
      password: 'lacroix',
      isAdmin: true
    },
    {
      email: 'nuala@teamwasp.com',
      password: 'pellegrino'
    },
    {
      email: 'catherine@teamwasp.com',
      password: 'bubly'
    },
    {
      firstName: 'Malika',
      lastName: 'Abdulina',
      email: 'malika@teamwasp.com',
      password: 'schweppes'
    }
  ]
  const [nikki, nuala, malika, catherine] = await User.bulkCreate(users, {
    returning: true
  })

  console.log(green('Seeded users'))

  const products = [
    {
      flavor: 'melon',
      inventory: 16,
      price: 2.0,
      description:
        'All the delicious flavors of your favorite melons, canteloupe and honeydew, in one drink. Built to keep you hydrated and thinking of summer days. ',
      imageURL: 'https://i.imgur.com/cwxe3Bi.png'
    },
    {
      flavor: 'cherry',
      inventory: 20,
      price: 2.0,
      description: 'cherry seltzer',
      imageURL: 'https://i.imgur.com/qFugLfS.png'
    },
    {
      flavor: 'grape',
      inventory: 32,
      price: 2.0,
      description: 'grape seltzer',
      imageURL: 'https://i.imgur.com/Pnsdste.png'
    },
    {
      flavor: 'orange',
      inventory: 22,
      price: 2.0,
      description: 'orange seltzer',
      imageURL: 'https://i.imgur.com/wkaJl1V.png'
    },
    {
      flavor: 'peach',
      inventory: 17,
      price: 2.0,
      description: 'peach seltzer',
      imageURL: 'https://i.imgur.com/RPMTVSM.png'
    },
    {
      flavor: 'strawberry',
      inventory: 31,
      price: 2.0,
      description: 'strawberry seltzer',
      imageURL: 'https://i.imgur.com/O83l4fx.png'
    },
    {
      flavor: 'just seltzer',
      inventory: 45,
      price: 2.0,
      description: 'no flavor, just plain seltzer',
      imageURL: 'https://i.imgur.com/1G0tZ1U.png'
    }
  ]

  const [
    cherry,
    pomegranate,
    lemon_lime,
    orange,
    blueberry,
    grapefruit
  ] = await Product.bulkCreate(products, {returning: true})
  console.log(green('Seeded products'))

  await nuala.addToCart(cherry.id)
  await nuala.addToCart(pomegranate.id)
  await nuala.checkout()

  //   await Product.bulkCreate([
  //     {
  //       flavor: 'Pike - Frozen Fillet',
  //       inventory: 94,
  //       price: 1.63,
  //       description: 'unleash holistic interfaces'
  //     },
  //     {
  //       flavor: 'Flavouring Vanilla Artificial',
  //       inventory: 13,
  //       price: 1.06,
  //       description: 'recontextualize web-enabled platforms'
  //     },
  //     {
  //       flavor: 'Onions Granulated',
  //       inventory: 87,
  //       price: 1.74,
  //       description: 'aggregate bricks-and-clicks eyeballs'
  //     },
  //     {
  //       flavor: 'Cheese - Bakers Cream Cheese',
  //       inventory: 57,
  //       price: 1.37,
  //       description: 'redefine front-end markets'
  //     },
  //     {
  //       flavor: 'Lid - Translucent, 3.5 And 6 Oz',
  //       inventory: 15,
  //       price: 1.9,
  //       description: 'synergize next-generation infrastructures'
  //     },
  //     {
  //       flavor: 'Apple - Northern Spy',
  //       inventory: 73,
  //       price: 1.01,
  //       description: 'disintermediate collaborative applications'
  //     },
  //     {
  //       flavor: 'Asparagus - Green, Fresh',
  //       inventory: 15,
  //       price: 1.37,
  //       description: 'reintermediate B2C ROI'
  //     },
  //     {
  //       flavor: 'Wine - Zinfandel California 2002',
  //       inventory: 94,
  //       price: 1.74,
  //       description: 'strategize revolutionary content'
  //     },
  //     {
  //       flavor: 'Remy Red Berry Infusion',
  //       inventory: 23,
  //       price: 1.22,
  //       description: 'generate sexy partnerships'
  //     },
  //     {
  //       flavor: 'Mince Meat - Filling',
  //       inventory: 93,
  //       price: 1.62,
  //       description: 'enable seamless infrastructures'
  //     },
  //     {
  //       flavor: 'Wine - White, Ej',
  //       inventory: 92,
  //       price: 1.97,
  //       description: 'integrate user-centric e-business'
  //     },
  //     {
  //       flavor: 'Apples - Sliced / Wedge',
  //       inventory: 98,
  //       price: 1.73,
  //       description: 'visualize vertical ROI'
  //     },
  //     {
  //       flavor: 'Lamb - Whole Head Off,nz',
  //       inventory: 53,
  //       price: 1.46,
  //       description: 'scale strategic action-items'
  //     },
  //     {
  //       flavor: 'Nougat - Paste / Cream',
  //       inventory: 65,
  //       price: 1.43,
  //       description: 'redefine e-business e-business'
  //     },
  //     {
  //       flavor: 'Ecolab - Ster Bac',
  //       inventory: 26,
  //       price: 1.57,
  //       description: 'orchestrate synergistic partnerships'
  //     },
  //     {
  //       flavor: 'Pork - Bones',
  //       inventory: 25,
  //       price: 1.78,
  //       description: 'deploy leading-edge infrastructures'
  //     },
  //     {
  //       flavor: 'Onion - Dried',
  //       inventory: 43,
  //       price: 1.75,
  //       description: 'target innovative e-services'
  //     },
  //     {
  //       flavor: 'Oil - Olive, Extra Virgin',
  //       inventory: 82,
  //       price: 2.0,
  //       description: 'deploy innovative content'
  //     },
  //     {
  //       flavor: 'Bar Mix - Lime',
  //       inventory: 80,
  //       price: 1.61,
  //       description: 'engage cross-platform niches'
  //     },
  //     {
  //       flavor: 'Beer - Camerons Cream Ale',
  //       inventory: 62,
  //       price: 1.05,
  //       description: 'disintermediate plug-and-play models'
  //     },
  //     {
  //       flavor: 'Langers - Mango Nectar',
  //       inventory: 16,
  //       price: 1.69,
  //       description: 'seize enterprise e-markets'
  //     },
  //     {
  //       flavor: 'Wine - Sauvignon Blanc Oyster',
  //       inventory: 45,
  //       price: 1.66,
  //       description: 'reinvent enterprise e-business'
  //     },
  //     {
  //       flavor: 'Beer - Blue',
  //       inventory: 50,
  //       price: 1.7,
  //       description: 'leverage interactive deliverables'
  //     },
  //     {
  //       flavor: 'Nut - Hazelnut, Ground, Natural',
  //       inventory: 46,
  //       price: 1.13,
  //       description: 'revolutionize mission-critical models'
  //     },
  //     {
  //       flavor: 'Turkey Leg With Drum And Thigh',
  //       inventory: 54,
  //       price: 1.6,
  //       description: 'monetize user-centric applications'
  //     },
  //     {
  //       flavor: 'Beef Cheek Fresh',
  //       inventory: 29,
  //       price: 2.0,
  //       description: 'syndicate user-centric schemas'
  //     },
  //     {
  //       flavor: 'Longos - Grilled Salmon With Bbq',
  //       inventory: 38,
  //       price: 1.43,
  //       description: 'enable sexy platforms'
  //     },
  //     {
  //       flavor: 'Oil - Shortening,liqud, Fry',
  //       inventory: 15,
  //       price: 1.51,
  //       description: 'incentivize distributed relationships'
  //     },
  //     {
  //       flavor: 'Bread - Bagels, Mini',
  //       inventory: 27,
  //       price: 1.73,
  //       description: 'drive user-centric convergence'
  //     },
  //     {
  //       flavor: 'Coffee - Almond Amaretto',
  //       inventory: 59,
  //       price: 1.08,
  //       description: 'utilize frictionless portals'
  //     },
  //     {
  //       flavor: 'Beer - Original Organic Lager',
  //       inventory: 56,
  //       price: 1.18,
  //       description: 'enable wireless synergies'
  //     },
  //     {
  //       flavor: 'Sprouts - Onion',
  //       inventory: 1,
  //       price: 1.29,
  //       description: 'strategize intuitive e-services'
  //     },
  //     {
  //       flavor: 'Nantucket Pine Orangebanana',
  //       inventory: 43,
  //       price: 1.63,
  //       description: 'mesh impactful portals'
  //     },
  //     {
  //       flavor: 'Beans - Black Bean, Canned',
  //       inventory: 14,
  //       price: 1.05,
  //       description: 'monetize 24/7 metrics'
  //     },
  //     {
  //       flavor: 'Shichimi Togarashi Peppeers',
  //       inventory: 20,
  //       price: 1.25,
  //       description: 'incentivize best-of-breed infomediaries'
  //     },
  //     {
  //       flavor: 'Bread - Burger',
  //       inventory: 84,
  //       price: 1.67,
  //       description: 'engineer e-business e-business'
  //     },
  //     {
  //       flavor: 'Wine - Acient Coast Caberne',
  //       inventory: 50,
  //       price: 1.97,
  //       description: 'target distributed e-commerce'
  //     },
  //     {
  //       flavor: 'Red Pepper Paste',
  //       inventory: 72,
  //       price: 1.53,
  //       description: 'visualize mission-critical platforms'
  //     },
  //     {
  //       flavor: 'Pasta - Canelloni',
  //       inventory: 96,
  //       price: 1.76,
  //       description: 'incubate front-end applications'
  //     },
  //     {
  //       flavor: 'Beans - Kidney, Red Dry',
  //       inventory: 48,
  //       price: 1.25,
  //       description: 'productize vertical partnerships'
  //     },
  //     {
  //       flavor: 'Pineapple - Canned, Rings',
  //       inventory: 89,
  //       price: 1.27,
  //       description: 'incubate 24/7 initiatives'
  //     },
  //     {
  //       flavor: 'Blouse / Shirt / Sweater',
  //       inventory: 52,
  //       price: 1.86,
  //       description: 'empower front-end vortals'
  //     },
  //     {
  //       flavor: 'Almonds Ground Blanched',
  //       inventory: 22,
  //       price: 1.97,
  //       description: 'empower impactful technologies'
  //     },
  //     {
  //       flavor: 'Wine - Red, Colio Cabernet',
  //       inventory: 38,
  //       price: 1.36,
  //       description: 'repurpose killer bandwidth'
  //     },
  //     {
  //       flavor: 'Appetizer - Shrimp Puff',
  //       inventory: 59,
  //       price: 1.99,
  //       description: 'matrix extensible web-readiness'
  //     },
  //     {
  //       flavor: 'Muffin - Mix - Strawberry Rhubarb',
  //       inventory: 2,
  //       price: 1.29,
  //       description: 'evolve clicks-and-mortar markets'
  //     },
  //     {
  //       flavor: 'Soup - Clam Chowder, Dry Mix',
  //       inventory: 71,
  //       price: 1.34,
  //       description: 'drive scalable e-tailers'
  //     },
  //     {
  //       flavor: 'Tea - Lemon Scented',
  //       inventory: 85,
  //       price: 1.85,
  //       description: 'iterate extensible networks'
  //     },
  //     {
  //       flavor: 'Water - Spring Water, 355 Ml',
  //       inventory: 4,
  //       price: 1.99,
  //       description: 'innovate revolutionary bandwidth'
  //     },
  //     {
  //       flavor: 'Towels - Paper / Kraft',
  //       inventory: 37,
  //       price: 1.18,
  //       description: 'revolutionize magnetic mindshare'
  //     },
  //     {
  //       flavor: 'Transfer Sheets',
  //       inventory: 20,
  //       price: 1.54,
  //       description: 'target 24/7 paradigms'
  //     },
  //     {
  //       flavor: 'Sauce - Soya, Light',
  //       inventory: 74,
  //       price: 1.48,
  //       description: 'brand visionary content'
  //     },
  //     {
  //       flavor: 'Kahlua',
  //       inventory: 11,
  //       price: 1.21,
  //       description: 'benchmark impactful paradigms'
  //     },
  //     {
  //       flavor: 'Caviar - Salmon',
  //       inventory: 69,
  //       price: 1.33,
  //       description: 'reintermediate magnetic networks'
  //     },
  //     {
  //       flavor: 'Pan Grease',
  //       inventory: 21,
  //       price: 1.87,
  //       description: 'maximize cross-platform vortals'
  //     },
  //     {
  //       flavor: 'Syrup - Kahlua Chocolate',
  //       inventory: 15,
  //       price: 1.08,
  //       description: 'maximize extensible methodologies'
  //     },
  //     {
  //       flavor: 'Appetizer - Tarragon Chicken',
  //       inventory: 62,
  //       price: 1.96,
  //       description: 'empower revolutionary schemas'
  //     },
  //     {
  //       flavor: 'Trueblue - Blueberry Cranberry',
  //       inventory: 76,
  //       price: 1.85,
  //       description: 'unleash leading-edge communities'
  //     },
  //     {
  //       flavor: 'Tamarind Paste',
  //       inventory: 32,
  //       price: 1.46,
  //       description: 'engineer plug-and-play portals'
  //     },
  //     {
  //       flavor: 'Tomatoes - Yellow Hot House',
  //       inventory: 83,
  //       price: 1.92,
  //       description: 'expedite user-centric networks'
  //     },
  //     {
  //       flavor: 'Veal - Kidney',
  //       inventory: 55,
  //       price: 1.39,
  //       description: 'morph rich architectures'
  //     },
  //     {
  //       flavor: 'Mince Meat - Filling',
  //       inventory: 61,
  //       price: 1.64,
  //       description: 'benchmark open-source markets'
  //     },
  //     {
  //       flavor: 'Pizza Pizza Dough',
  //       inventory: 51,
  //       price: 1.83,
  //       description: 'orchestrate B2C architectures'
  //     },
  //     {
  //       flavor: 'Capon - Breast, Double, Wing On',
  //       inventory: 33,
  //       price: 1.28,
  //       description: 'extend vertical paradigms'
  //     },
  //     {
  //       flavor: 'Bread - Crusty Italian Poly',
  //       inventory: 75,
  //       price: 1.48,
  //       description: 'evolve cutting-edge interfaces'
  //     },
  //     {
  //       flavor: 'Mushroom - Lg - Cello',
  //       inventory: 60,
  //       price: 1.03,
  //       description: 'integrate cutting-edge vortals'
  //     },
  //     {
  //       flavor: 'Cookies Cereal Nut',
  //       inventory: 81,
  //       price: 1.09,
  //       description: 'morph frictionless e-commerce'
  //     },
  //     {
  //       flavor: 'Leeks - Baby, White',
  //       inventory: 28,
  //       price: 1.2,
  //       description: 'transition 24/365 users'
  //     },
  //     {
  //       flavor: 'Mcguinness - Blue Curacao',
  //       inventory: 89,
  //       price: 1.86,
  //       description: 'envisioneer proactive vortals'
  //     },
  //     {
  //       flavor: 'Juice - Pineapple, 48 Oz',
  //       inventory: 63,
  //       price: 1.33,
  //       description: 'revolutionize global networks'
  //     },
  //     {
  //       flavor: 'Oil - Margarine',
  //       inventory: 44,
  //       price: 1.03,
  //       description: 'synthesize 24/7 vortals'
  //     },
  //     {
  //       flavor: 'Garam Masala Powder',
  //       inventory: 17,
  //       price: 1.33,
  //       description: 'iterate virtual supply-chains'
  //     },
  //     {
  //       flavor: 'Chevril',
  //       inventory: 18,
  //       price: 1.36,
  //       description: 'extend dot-com methodologies'
  //     },
  //     {
  //       flavor: 'Mushroom - Crimini',
  //       inventory: 2,
  //       price: 1.91,
  //       description: 'envisioneer plug-and-play convergence'
  //     },
  //     {
  //       flavor: 'Sauce - Vodka Blush',
  //       inventory: 18,
  //       price: 1.8,
  //       description: 'transform dynamic models'
  //     },
  //     {
  //       flavor: 'Sprouts - Alfalfa',
  //       inventory: 93,
  //       price: 1.47,
  //       description: 'architect robust platforms'
  //     },
  //     {
  //       flavor: 'Pur Value',
  //       inventory: 41,
  //       price: 1.65,
  //       description: 'streamline extensible convergence'
  //     },
  //     {
  //       flavor: 'Puree - Guava',
  //       inventory: 59,
  //       price: 1.67,
  //       description: 'revolutionize bricks-and-clicks users'
  //     },
  //     {
  //       flavor: 'External Supplier',
  //       inventory: 37,
  //       price: 1.1,
  //       description: 'drive leading-edge interfaces'
  //     },
  //     {
  //       flavor: 'Chickensplit Half',
  //       inventory: 28,
  //       price: 1.3,
  //       description: 'harness scalable supply-chains'
  //     },
  //     {
  //       flavor: 'Curry Powder Madras',
  //       inventory: 63,
  //       price: 1.98,
  //       description: 'engage efficient systems'
  //     },
  //     {
  //       flavor: 'Stock - Fish',
  //       inventory: 41,
  //       price: 1.16,
  //       description: 'implement enterprise solutions'
  //     },
  //     {
  //       flavor: 'Chicken - Thigh, Bone In',
  //       inventory: 48,
  //       price: 1.44,
  //       description: 'evolve robust synergies'
  //     },
  //     {
  //       flavor: 'Steampan - Half Size Shallow',
  //       inventory: 2,
  //       price: 1.65,
  //       description: 'incentivize impactful technologies'
  //     },
  //     {
  //       flavor: 'Cheese - Mozzarella, Shredded',
  //       inventory: 53,
  //       price: 1.44,
  //       description: 'cultivate frictionless e-services'
  //     },
  //     {
  //       flavor: 'Beer - Mill St Organic',
  //       inventory: 66,
  //       price: 1.63,
  //       description: 'deploy rich users'
  //     },
  //     {
  //       flavor: 'Allspice - Jamaican',
  //       inventory: 41,
  //       price: 1.7,
  //       description: 'incubate visionary partnerships'
  //     },
  //     {
  //       flavor: 'Cake Sheet Combo Party Pack',
  //       inventory: 56,
  //       price: 1.67,
  //       description: 'engage interactive channels'
  //     },
  //     {
  //       flavor: 'Glass Clear 7 Oz Xl',
  //       inventory: 62,
  //       price: 1.55,
  //       description: 'expedite seamless applications'
  //     },
  //     {
  //       flavor: 'Icecream - Dstk Super Cone',
  //       inventory: 31,
  //       price: 1.81,
  //       description: 'visualize synergistic web services'
  //     },
  //     {
  //       flavor: 'Lemon Tarts',
  //       inventory: 53,
  //       price: 1.93,
  //       description: 'disintermediate web-enabled schemas'
  //     },
  //     {
  //       flavor: 'Milk - Skim',
  //       inventory: 77,
  //       price: 1.73,
  //       description: 'unleash e-business web-readiness'
  //     },
  //     {
  //       flavor: 'Pasta - Fettuccine, Dry',
  //       inventory: 96,
  //       price: 1.9,
  //       description: 'synergize seamless applications'
  //     },
  //     {
  //       flavor: 'Creamers - 10%',
  //       inventory: 32,
  //       price: 1.6,
  //       description: 'syndicate leading-edge solutions'
  //     },
  //     {
  //       flavor: 'Pastry - Mini French Pastries',
  //       inventory: 13,
  //       price: 1.72,
  //       description: 'empower integrated metrics'
  //     },
  //     {
  //       flavor: 'Sea Bass - Whole',
  //       inventory: 25,
  //       price: 1.68,
  //       description: 'architect user-centric channels'
  //     },
  //     {
  //       flavor: 'Coffee - 10oz Cup 92961',
  //       inventory: 68,
  //       price: 1.09,
  //       description: 'embrace intuitive e-services'
  //     },
  //     {
  //       flavor: 'Rice Paper',
  //       inventory: 32,
  //       price: 1.83,
  //       description: 'transition distributed initiatives'
  //     },
  //     {
  //       flavor: 'Barramundi',
  //       inventory: 100,
  //       price: 1.3,
  //       description: 'engage vertical e-tailers'
  //     },
  //     {
  //       flavor: 'Cheese - Pont Couvert',
  //       inventory: 33,
  //       price: 1.86,
  //       description: 'streamline B2B ROI'
  //     }
  //   ])
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
