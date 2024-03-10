const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT;

const allowlist = ['localhost:1114', 'mint.pepemetaai.co'];

app.use(express.static('public'));
app.use(cors({
  origin: allowlist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.get('/', (req, res) => {
  res.send('SERVER STATICS');
})

app.listen(port, () => {
  console.log(`Example app listening on: http://localhost:${port}`);
});
