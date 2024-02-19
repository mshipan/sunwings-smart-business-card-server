const express = require("express");
const { ObjectId } = require("mongodb");

const tiktokApi = (tiktokCollection) => {
  const tiktokRouter = express.Router();

  tiktokRouter.get("/", async (req, res) => {
    const result = await tiktokCollection.find().toArray();
    res.send(result);
  });
  tiktokRouter.post("/", async (req, res) => {
    const newTiktok = req.body;
    const result = await tiktokCollection.insertOne(newTiktok);
    res.send(result);
  });

  tiktokRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await tiktokCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.tiktok.splice(index, 1);

      const result = await tiktokCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting tiktok link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return tiktokRouter;
};

module.exports = tiktokApi;
