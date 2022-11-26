const card = require("../controllers/card.controller");

const router = require("express").Router();

router.route("/addcart")
    .post(card.addCart);

router.route("/updatecart/:id")
    .post(card.updateCard);

router.route("/:id")
    .post(card.getDataCard);

module.exports = router;