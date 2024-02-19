const express = require("express");
const { ObjectId } = require("mongodb");

const instagramApi = (instagramCollection) => {
  const instagramRouter = express.Router();

  instagramRouter.get("/", async (req, res) => {
    const result = await instagramCollection.find().toArray();
    res.send(result);
  });
  instagramRouter.post("/", async (req, res) => {
    const newInstagram = req.body;
    const result = await instagramCollection.insertOne(newInstagram);
    res.send(result);
  });

  instagramRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await instagramCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.instagram.splice(index, 1);

      const result = await instagramCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting instagram link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return instagramRouter;
};

module.exports = instagramApi;
