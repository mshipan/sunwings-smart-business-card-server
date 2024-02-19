const express = require("express");
const { ObjectId } = require("mongodb");

const snapChatApi = (snapChatCollection) => {
  const snapChatRouter = express.Router();

  snapChatRouter.get("/", async (req, res) => {
    const result = await snapChatCollection.find().toArray();
    res.send(result);
  });
  snapChatRouter.post("/", async (req, res) => {
    const newSnapChat = req.body;
    const result = await snapChatCollection.insertOne(newSnapChat);
    res.send(result);
  });

  snapChatRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await snapChatCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.snapchat.splice(index, 1);

      const result = await snapChatCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting snapChat link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return snapChatRouter;
};

module.exports = snapChatApi;
