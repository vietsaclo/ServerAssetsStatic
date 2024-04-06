const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const { Metaplex } = require("@metaplex-foundation/js");
const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");

const RPC = String(process.env.SOLANA_RPC_HOST);
const COLLECTION_ID = String(process.env.SUGAR_CANDY_MACHINE_COLLECTION_ID);

const connection = new Connection(RPC);
const metaplex = new Metaplex(connection);

const port = process.env.PORT;

const whitelist = ['http://localhost:1114', 'https://catai-mint.pepemetaai.co'];
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

app.use(express.static('public'));

app.get('/', async (req, res) => {
  res.send('K-CATs Server');
});

app.get('/inventory', async (req, res) => {
  const pubkey = req.query.pubkey;
  if (!pubkey) {
    return res.send({
      success: false,
      message: 'missing pubkey',
    });
  }

  const rawMints = await metaplex.nfts().findAllByOwner({
    owner: new PublicKey(pubkey),
  });
  console.log(rawMints[0]);

  const mints = [];
  for (let i = 0; i < rawMints.length; i++) {
    if (rawMints[i].collection && rawMints[i].collection.address.toBase58() === COLLECTION_ID) {
      mints.push(rawMints[i]);
    }
  }
  return res.send({
    success: true,
    result: mints,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on: http://localhost:${port}`);
});
