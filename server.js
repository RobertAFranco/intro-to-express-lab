import express from 'express';

// Create an Express application
const app = express();
const PORT = 3000;

// Data Arrays
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Define the route for greetings 1
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;

  let greetingMessage;
  if (username.toUpperCase() === 'BOBERT') {
    greetingMessage = `What's good, ${username}?`;
  } else if (username.toUpperCase() === 'MATHILDA') {
    greetingMessage = `What a delight it is to see you once more, ${username}!`;
  } else {
    greetingMessage = `Hello there, ${username}!`;
  }

  res.send(greetingMessage);
});

// Define the route for rolling dice 2
app.get('/roll/:number', (req, res) => {
  const numberParam = req.params.number;
  const number = Number(numberParam);

  if (isNaN(number) || number <= 0) {
    return res.send('You must specify a valid positive number.');
  }

  const rollResult = Math.floor(Math.random() * (number + 1));
  res.send(`You rolled a ${rollResult}.`);
});

// Define the route for collectibles 3
app.get('/collectibles/:index', (req, res) => {
  const indexParam = req.params.index;
  const index = parseInt(indexParam, 10);

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');
  }

  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price.toFixed(2)}, it can be yours!`);
});

// Define the route for shoes with query parameters 4
app.get('/shoes', (req, res) => {
  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query.type;

  let filteredShoes = shoes;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





  