const mongoose = require("mongoose");
const List = require("../models/List");
const User = require("../models/User");
const { listValidation } = require("../validation");

// List of current user
exports.getLists = async (req, res, next) => {
  // This is attached in the req body
  const userId = req.user._id;
  try {
    const lists = await List.find({ creator: userId });
    console.log("FETCHED USER LIST");
    res.status(200).json({ lists: lists });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Create new list with current user
exports.createList = async (req, res, next) => {
  // Validate inputs
  // Get all req body data
  // Create new List
  // try catch
  // Save created list
  // Find the current user loggedin
  // Save the new list to user
  // Send response the list and the user

  const { error } = listValidation(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const list = new List({
    title: req.body.title,
    description: req.body.description,
    createdDate: req.body.createdDate,
    endDate: req.body.endDate,
    creator: req.user._id,
  });

  try {
    await list.save();
    console.log("LIST CREATED");

    const user = await User.findById(req.user._id);

    user.lists.push(list);
    await user.save();
    console.log("LIST ADDED TO USER");

    res
      .status(200)
      .json({ creator: { _id: user._id, username: user.username } });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getList = async (req, res, next) => {
  // Get the list id
  // try catch
  // Find the list by id and use populate
  // Check if post exist else throw error
  // Send response 200 and the list

  const listId = req.params.id;

  try {
    const list = await List.findById(listId).populate("creator");

    if (!list) {
      return res.status(404).send("List not found.");
    }

    console.log("FETCHED SINGLE LIST");
    res.status(200).json({ list: list });
  } catch (error) {
    res.status(400).send("An error occured fetching the list.");
  }
};

exports.updateList = async (req, res, next) => {
  // Take list id from param
  // Validate req body data
  // Get all req body data
  // try catch
  // Search for list and send error if not found
  // Check if creator id equals current user id else throw error
  //  Update current list properties
  // Send response with the updated list

  const listId = req.params.id;

  const { error } = listValidation(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const title = req.body.title;
  const description = req.body.description;
  const createdDate = req.body.createdDate;
  const endDate = req.body.endDate;
  const creator = req.user._id;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(401).send("List not found.");
    }

    if (list.creator.toString() !== creator) {
      return res.status(400).send("Not authorized.");
    }

    list.title = title;
    list.description = description;
    list.createdDate = createdDate;
    list.endDate = endDate;
    list.creator = creator;

    const updatedList = await list.save();

    res.status(200).json({ updatedList: updatedList });
    console.log("LIST UPDATED");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteList = async (req, res, next) => {
  // Get list id from params
  // trycatch
  // await Find list else throw not found error
  // Check if list creator equals current user
  // await Remove list using findandremove method
  // await find current user by id
  // pull deleted list from current user
  // await save user
  // send response json message deleted

  const listId = req.params.id;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(401).send("List not found.");
    }

    if (list.creator.toString() !== req.user._id) {
      return res.status(500).send("Not authorized");
    }

    await List.findByIdAndRemove(list._id);

    const user = await User.findById(req.user._id);

    user.lists.pull(list._id);

    await user.save();

    res.status(200).json({ message: "List deleted." });
    console.log("LIST DELETED");
  } catch (error) {
    res.status(400).send(error);
  }
};
