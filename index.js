const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const corsConfig = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

// mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1oh7p7d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //collection start
    const logoCollection = client
      .db("sunwings-smart-business-card")
      .collection("logo");

    const bannerCollection = client
      .db("sunwings-smart-business-card")
      .collection("banner");
    //collection end

    //APIs Start

    // logo Apis Start
    app.get("/logo", async (req, res) => {
      const result = await logoCollection.find().toArray();
      res.send(result);
    });

    app.post("/logo", async (req, res) => {
      const newLogo = req.body;
      const result = await logoCollection.insertOne(newLogo);
      res.send(result);
    });

    app.patch("/logo/:id", async (req, res) => {
      const id = req.params.id;
      const { logo } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateLogo = {
        $set: {
          logo: logo,
        },
      };
      const result = await logoCollection.updateOne(filter, updateLogo);
      res.send(result);
    });
    // logo Apis End

    // Banner Apis Start
    app.get("/banner", async (req, res) => {
      const result = await bannerCollection.find().toArray();
      res.send(result);
    });

    app.post("/banner", async (req, res) => {
      const newBanner = req.body;
      const result = await bannerCollection.insertOne(newBanner);
      res.send(result);
    });

    app.patch("/banner/:id", async (req, res) => {
      const id = req.params.id;
      const { banner } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateBanner = {
        $set: {
          banner: banner,
        },
      };
      const result = await bannerCollection.updateOne(filter, updateBanner);
      res.send(result);
    });
    // Banner Apis End

    //APIs End
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongodb end

// basic setup
app.get("/", (req, res) => {
  res.send("Sunwings Smart Business Card Server is Running.");
});

app.listen(port, () => {
  console.log(
    `Sunwings Smart Business Card Server is Running on PORT: ${port}`
  );
});