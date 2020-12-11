const express = require('express');
const cors = require('cors');
const { encode, decode } = require('./utils/shortener');
const client = require('./lib/redis-client');

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.post('/api/create', async (req, res) => {
  const id = await client.asyncIncr('id');
  const encoded = encode(id);

  const url = req.body.url;

  await client.setAsync(encoded, url);

  return res.json({'url': encoded});
});


app.get('/:s', async (req, res) => {
  const url = await client.getAsync(req.params.s);

  return res.json({'url': url});
})
