const express = require("express");
const { ObjectId } = require("mongodb");

const personalWebsiteApi = (personalWebsiteCollection) => {
  const personalWebsiteRouter = express.Router();

  personalWebsiteRouter.get("/", async (req, res) => {
    const result = await personalWebsiteCollection.find().toArray();
    res.send(result);
  });
  personalWebsiteRouter.post("/", async (req, res) => {
    const newPersonalWebsite = req.body;
    const result = await personalWebsiteCollection.insertOne(
      newPersonalWebsite
    );
    res.send(result);
  });

  personalWebsiteRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await personalWebsiteCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.website.splice(index, 1);

      const result = await personalWebsiteCollection.replaceOne(
        query,
        document
      );
      res.send(result);
    } catch (error) {
      console.error("Error deleting personalWebsite link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return personalWebsiteRouter;
};

module.exports = personalWebsiteApi;
