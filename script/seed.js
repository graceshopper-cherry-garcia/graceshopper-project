'use strict';

const e = require('express');
const {
  db,
  models: { User, Item, Order_Item, Order, Category },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const bands = [
  'Queen',
  'Trash Mood',
  'Blink-182',
  'Linkin Park',
  'Mouse-Rat',
  'The Cure',
];
const products = [
  'coffee mug',
  'poster',
  'shirt',
  'hat',
  'guitar',
  'phone case',
  'fidget spinner',
  'jacket',
  'pair of pants',
  'cup',
  'bottle opener',
  'hoodie',
  'videogame',
  'lamp',
];
const descriptions = [
  'An awesome',
  'A really cool',
  'A dope',
  'A kick-ass',
  'A one-of-a-kind',
  'The most metal',
  'No collection is complete without this',
];
let itemNames = [];
const bandNames = [];
//used with generateCategory
const productNames = [];
const bandImages = {
  Queen: 'https://m.media-amazon.com/images/I/81fZ-TE7J1L._SY500_.jpg',
  'Blink-182':
    'https://nerdist.com/wp-content/uploads/2021/04/BLink182cover2.jpg',
    'The Cure' : 'https://i.pinimg.com/564x/2f/c3/e7/2fc3e78fd725127fb209624a5b6c67e2.jpg',
    'Mouse-Rat' : 'https://townsquare.media/site/366/files/2021/05/Mouse-Rat-The-Awesome-Album-Artwork.jpg?w=720&h=720&q=75',
    'Linkin Park' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBO8CIJLsP2Zo9uhAlbNENegDsXvSxKWYRtCJtRumrPyr-D6hMc6v7_9B_PMt7Q9Oqmf8&usqp=CAU',
    'Trash Mood' : 'https://i1.sndcdn.com/avatars-000399683646-nyl0co-t500x500.jpg'
};


for (let x = 0; x < bands.length; x++) {
  for (let y = 0; y < products.length; y++) {
    itemNames.push(bands[x] + ' ' + products[y]);
    bandNames.push(bands[x]);
    productNames.push(products[y]);
  }
}
const generateImage = (item) => {
  let band = [];
  let product = [];
  let productParts = item.split(' ');
  for (let word of productParts) {
    if (word[0] === word[0].toUpperCase()) {
      band.push(word);
    } else {
      product.push(word)
    }
  }
  band = band.join(' ');
  // console.log('band: ', band);
  console.log('product:', product)
  return bandImages[band];
};

const generatePrice = () => {
  return parseInt(Math.random() * 10000, 10);
};

const generateDescription = () => {
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// const generateCategory = (item) => {

// }
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log('db synced!');

    // Creating Users
    const users = await Promise.all([
      User.create({
        username: 'cody',
        email: 'cody@cody.com',
        password: '123',
        isAdmin: true,
      }),
      User.create({
        username: 'murphy',
        email: 'murphy@murphy.gov',
        password: '123',
      }),
    ]);

    //Creating Items
    const items = await Promise.all(
      itemNames.map((item) => {
        return Item.create({
          name: item,
          description: generateDescription() + ' ' + item,
          price: generatePrice(),
          imageUrl: generateImage(item),
        });
      })
    );

    //Create Order
    // await Order.create({
    //   userId: 1,
    // });

    // await Order_Item.create({
    //   quantity: 4,
    //   purchasePrice: 1234,
    //   itemId: 2,
    //   orderId: 1,
    // });
    // console.log(Order.prototype);

    //Create Orders
    // const orders = await Promise.all([
    //   Order.create({
    //     quantity: 3,
    //   }),
    //   Order.create({
    //     quantity: 4,
    //   }),
    //   Order.create({
    //     quantity: 5,
    //   }),
    // ]);

    //Create associations
    // await orders[0].setUser(1);
    // await orders[1].setUser(1);
    // await orders[0].setItem(await Item.findByPk(3));
    // await orders[1].setItem(await Item.findByPk(10));

    //send information
    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${items.length} items`);
    // console.log(`seeded ${orders.length} orders`);
    console.log(`seeded successfully`);
    return {
      users: {
        cody: users[0],
        murphy: users[1],
      },
    };
  } catch (e) {
    console.log(e.message);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
