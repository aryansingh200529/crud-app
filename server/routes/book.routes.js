const express = require("express");
const { handleBookStoreController,handleBookListController,handleBookDeleteController, handleBookUpdateController } = require("../controller/book.controller");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListController);

router.delete("/deletebook/:id", handleBookDeleteController);
router.put("/updatebook",handleBookUpdateController);

module.exports = router;
