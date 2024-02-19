const express = require("express");
const { ObjectId } = require("mongodb");

const twitterApi = (twitterCollection) => {
  const twitterRouter = express.Router();

  twitterRouter.get("/", async (req, res) => {
    const result = await twitterCollection.find().toArray();
    res.send(result);
  });
  twitterRouter.post("/", async (req, res) => {
    const newTwitter = req.body;
    const result = await twitterCollection.insertOne(newTwitter);
    res.send(result);
  });

  twitterRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await twitterCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.twitter.splice(index, 1);

      const result = await twitterCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting Twitter link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return twitterRouter;
};

module.exports = twitterApi;
