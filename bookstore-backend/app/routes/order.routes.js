const order = require("../controllers/order.controller");

const router = require("express").Router();

router.route("/addorder")
    .post(order.addOrder);

router.route("/confirmorder/:id")
    .put(order.confirmOrder);

router.route("/:id")
    .post(order.getDataOrder);

module.exports = router;