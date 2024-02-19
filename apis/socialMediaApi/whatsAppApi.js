const express = require("express");
const { ObjectId } = require("mongodb");

const whatsAppApi = (whatsAppCollection) => {
  const whatsAppRouter = express.Router();

  whatsAppRouter.get("/", async (req, res) => {
    const result = await whatsAppCollection.find().toArray();
    res.send(result);
  });
  whatsAppRouter.post("/", async (req, res) => {
    const newWhatsApp = req.body;
    const result = await whatsAppCollection.insertOne(newWhatsApp);
    res.send(result);
  });

  whatsAppRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await whatsAppCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.whatsApp.splice(index, 1);

      const result = await whatsAppCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting whatsApp link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return whatsAppRouter;
};

module.exports = whatsAppApi;
