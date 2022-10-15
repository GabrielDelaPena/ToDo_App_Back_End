const router = require("express").Router();
const verify = require("./verifyToken");

const listController = require("../controllers/list");

// Get
router.get("/", verify, listController.getLists);

// Get
router.get("/get-list/:id", verify, listController.getList);

// Post
router.post("/add-list", verify, listController.createList);

// Post
router.post("/update-list/:id", verify, listController.updateList);

// Delete
router.delete("/delete-list/:id", verify, listController.deleteList);

module.exports = router;
