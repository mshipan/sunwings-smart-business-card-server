const express = require("express");
const { ObjectId } = require("mongodb");

const linkedInApi = (linkedInCollection) => {
  const linkedInRouter = express.Router();

  linkedInRouter.get("/", async (req, res) => {
    try {
      const result = await linkedInCollection
        .aggregate([
          // Match documents where 'facebook' array is not empty
          { $match: { "linkedin.0": { $exists: true } } },
        ])
        .toArray();
      res.send(result);
    } catch (error) {
      console.error("Error fetching LinkedIn links:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  linkedInRouter.post("/", async (req, res) => {
    const newLinkedIn = req.body;
    const result = await linkedInCollection.insertOne(newLinkedIn);
    res.send(result);
  });

  linkedInRouter.delete("/:id/:index", async (req, res) => {
    const id = req.params.id;
    const index = parseInt(req.params.index); // Parse index as integer
    const query = { _id: new ObjectId(id) };

    try {
      const document = await linkedInCollection.findOne(query);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove the element at the specified index from the 'facebook' array
      document.linkedin.splice(index, 1);

      const result = await linkedInCollection.replaceOne(query, document);
      res.send(result);
    } catch (error) {
      console.error("Error deleting linkedIn link:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  return linkedInRouter;
};

module.exports = linkedInApi;
