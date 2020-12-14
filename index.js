const express = require('express');
const cors = require('cors');
const { encode } = require('./utils/shortener');
const client = require('./lib/redis-client');

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.post('/api/create', async (req, res) => {
  const id = await client.asyncIncr('id');
  const encoded = encode(id);

  const url = req.body.url;

  await client.setAsync(encoded, url);

  res.json({'url': encoded});
});


app.get('/:s', async (req, res, next) => {
  const url = await client.getAsync(req.params.s);

  if (!url) {
    return next();
  }

  res.redirect(url);
})

app.use(function (req, res, next) {
  res.status(404).send('404 Not Found');
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
