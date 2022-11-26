const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    products: [
        {
            book_id: { type: mongoose.Schema.Types.ObjectId, ref: "BOOK"},
            quantity: { type: Number, require: true },
            price: { type: Number, require: true },
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "USER"},
    totalPrice: { type: Number, default: 0 }
})

let CARD = mongoose.model("CARD", cardSchema);

module.exports = CARD ;