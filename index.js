const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT;

const whitelist = ['localhost:1114', 'mint.pepemetaai.co'];

app.use(express.static('public'));
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.info("=> Allowed cors for:", origin);
      callback(null, true);
    } else {
      if (origin)
        console.error("=> Blocked cors for:", origin);
      callback(null, false);
    }
  },
  allowedHeaders: "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS,HEAD,PATCH",
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('SERVER STATICS');
})

app.listen(port, () => {
  console.log(`Example app listening on: http://localhost:${port}`);
});
