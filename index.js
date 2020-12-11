const express = require('express');
const cors = require('cors');
const { encode, decode } = require('./utils/shortener');

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
