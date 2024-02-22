const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Import the logo and banner API modules
const logoApi = require("./apis/logoApi");
const bannerApi = require("./apis/bannerApi");
const visitingInformationApi = require("./apis/visitingInformationApi");
const standardCardImageApi = require("./apis/standardCardImageApi");
const premiumCardImageApi = require("./apis/premiumCardImageApi");
const usersApi = require("./apis/usersApi/usersApi");
const educationApi = require("./apis/usersApi/educationApi");
const jobExperienceApi = require("./apis/usersApi/jobExperienceApi");
const facebookApi = require("./apis/socialMediaApi/facebookApi");
const twitterApi = require("./apis/socialMediaApi/twitterApi");
const instagramApi = require("./apis/socialMediaApi/instagramApi");
const whatsAppApi = require("./apis/socialMediaApi/whatsAppApi");
const linkedInApi = require("./apis/socialMediaApi/linkedInApi");
const youTubeApi = require("./apis/socialMediaApi/youTubeApi");
const tiktokApi = require("./apis/socialMediaApi/tiktokApi");
const snapChatApi = require("./apis/socialMediaApi/snapChatApi");
const personalWebsiteApi = require("./apis/socialMediaApi/personalWebsiteApi");

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

    const visitingInformationCollection = client
      .db("sunwings-smart-business-card")
      .collection("visiting-information");

    const standardCardImageCollection = client
      .db("sunwings-smart-business-card")
      .collection("standard-card-image");

    const premiumCardImageCollection = client
      .db("sunwings-smart-business-card")
      .collection("premium-card-image");

    const usersCollection = client
      .db("sunwings-smart-business-card")
      .collection("users");

    const educationsCollection = client
      .db("sunwings-smart-business-card")
      .collection("educations");

    const jobExperienceCollection = client
      .db("sunwings-smart-business-card")
      .collection("job-experiences");

    const facebookCollection = client
      .db("sunwings-smart-business-card")
      .collection("facebook-links");

    const twitterCollection = client
      .db("sunwings-smart-business-card")
      .collection("twitter-links");

    const instagramCollection = client
      .db("sunwings-smart-business-card")
      .collection("instagram-links");

    const whatsAppCollection = client
      .db("sunwings-smart-business-card")
      .collection("whatsApp-links");

    const linkedInCollection = client
      .db("sunwings-smart-business-card")
      .collection("linkedIn-links");

    const youTubeCollection = client
      .db("sunwings-smart-business-card")
      .collection("youtube-links");

    const tiktokCollection = client
      .db("sunwings-smart-business-card")
      .collection("tiktok-links");

    const snapChatCollection = client
      .db("sunwings-smart-business-card")
      .collection("snapchat-links");

    const personalWebsiteCollection = client
      .db("sunwings-smart-business-card")
      .collection("personal-website-links");
    //collection end

    //APIs Start
    // Using the API modules as middleware
    app.use("/logo", logoApi(logoCollection));
    app.use("/banner", bannerApi(bannerCollection));
    app.use(
      "/visiting-information",
      visitingInformationApi(visitingInformationCollection)
    );
    app.use(
      "/stanndard-card-image",
      standardCardImageApi(standardCardImageCollection)
    );
    app.use(
      "/premium-card-image",
      premiumCardImageApi(premiumCardImageCollection)
    );

    app.use("/users", usersApi(usersCollection));
    app.use("/educations", educationApi(educationsCollection));
    app.use("/job-experiences", jobExperienceApi(jobExperienceCollection));

    app.use("/twitter", twitterApi(twitterCollection));
    app.use("/instagram", instagramApi(instagramCollection));
    app.use("/whatsapp", whatsAppApi(whatsAppCollection));
    app.use("/linkedin", linkedInApi(linkedInCollection));
    app.use("/youtube", youTubeApi(youTubeCollection));
    app.use("/tiktok", tiktokApi(tiktokCollection));
    app.use("/snapchat", snapChatApi(snapChatCollection));
    app.use(
      "/personal-websites",
      personalWebsiteApi(personalWebsiteCollection)
    );
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
