const express = require("express");
const { ObjectId } = require("mongodb");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  userRouter.get("/", async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
  });

  userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.findOne(query);
    res.send(result);
  });

  userRouter.post("/", async (req, res) => {
    const userData = req.body;
    const newUser = {
      fatherName: "",
      motherName: "",
      designation: "",
      alternatePhone: "",
      email: userData.email,
      alternateEmail: "",
      presentAddress: userData.address || null,
      permanentAddress: "",
      ...userData,
    };
    const result = await usersCollection.insertOne(newUser);
    res.send(result);
  });

  userRouter.patch("/:uid/profile-image", async (req, res) => {
    const uid = req.params.uid;
    const { profileImage } = req.body;
    const filter = { uid: uid };
    const updateProfilePicture = {
      $set: {
        profileImage: profileImage,
      },
    };
    const result = await usersCollection.updateOne(
      filter,
      updateProfilePicture
    );
    res.send(result);
  });
  userRouter.patch("/:uid/profile-cover", async (req, res) => {
    const uid = req.params.uid;
    const { profileCover } = req.body;
    const filter = { uid: uid };
    const updateProfileCover = {
      $set: {
        profileCover: profileCover,
      },
    };
    const result = await usersCollection.updateOne(filter, updateProfileCover);
    res.send(result);
  });

  userRouter.patch("/:uid/about-me", async (req, res) => {
    const uid = req.params.uid;
    const { aboutMe } = req.body;
    const filter = { uid: uid };
    const updateAboutMe = {
      $set: {
        aboutMe: aboutMe,
      },
    };
    const result = await usersCollection.updateOne(filter, updateAboutMe);
    res.send(result);
  });

  userRouter.put("/:uid/basic-info", async (req, res) => {
    const uid = req.params.uid;
    const updateBasicInfo = req.body;
    const filter = { uid: uid };
    const options = { upsert: true };
    const newBasicInfo = {
      $set: {
        name: updateBasicInfo.name,
        fatherName: updateBasicInfo.fatherName,
        motherName: updateBasicInfo.motherName,
        designation: updateBasicInfo.designation,
        phone: updateBasicInfo.phone,
        alternatePhone: updateBasicInfo.alternatePhone,
        email: updateBasicInfo.email,
        alternateEmail: updateBasicInfo.alternateEmail,
        dob: updateBasicInfo.dob,
        presentAddress: updateBasicInfo.presentAddress,
        permanentAddress: updateBasicInfo.permanentAddress,
        preferedLanguage: updateBasicInfo.preferedLanguage,
      },
    };
    const result = await usersCollection.updateOne(
      filter,
      newBasicInfo,
      options
    );
    res.send(result);
  });

  return userRouter;
};

module.exports = usersApi;