const express = require("express");
const { ObjectId } = require("mongodb");

const youTubeApi = (youTubeCollection) => {
  const youTubeRouter = express.Router();

  youTubeRouter.get("/", async (req, res) => {
    const result = await youTubeCollection.find().toArray();
    res.send(result);
  });
  youTubeRouter.post("/", async (req, res) => {
    const newYouTube = req.body;
    const result = await youTubeCollection.insertOne(newYouTube);
    res.send(result);
  });

  youTubeRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await youTubeCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.youtube.splice(index, 1);

      const result = await youTubeCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting youTube link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return youTubeRouter;
};

module.exports = youTubeApi;
