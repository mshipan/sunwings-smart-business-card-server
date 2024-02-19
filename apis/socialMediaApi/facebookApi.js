const express = require("express");
const { ObjectId } = require("mongodb");

const facebookApi = (facebookCollection) => {
  const facebookRouter = express.Router();

  facebookRouter.get("/", async (req, res) => {
    const result = await facebookCollection.find().toArray();
    res.send(result);
  });
  facebookRouter.post("/", async (req, res) => {
    const newFacebook = req.body;
    const result = await facebookCollection.insertOne(newFacebook);
    res.send(result);
  });

  facebookRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await facebookCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.facebook.splice(index, 1);

      const result = await facebookCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting Facebook link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return facebookRouter;
};

module.exports = facebookApi;
