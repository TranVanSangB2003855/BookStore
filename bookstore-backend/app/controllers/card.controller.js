const CARD = require("../models/card.model");
const ApiError = require("../api-error");

const cardController = {
    addCart: async (req, res, next) => {
        try{
            const newCard = new CARD(req.body);
            const savedCard = await newCard.save();
            return res.send(savedCard);
        }catch(error){
            return next(
                new ApiError(500, `An error: ${error} occurred while creat a new Card`)
            );
        }
    },
    updateCard: async (req, res, next) =>{
        try{
            let card = await CARD.findById(req.params.id);
            console.log(req.body)
            await card.updateOne({ $set: req.body });
            return res.send({ message: " Card was updated successfully" });
        }catch(error){
            return next(
                new ApiError(500, `An error: ${error} occurred while update Card`)
            );
        }
    },
    getDataCard: async (req, res, next) =>{
        try{
            let card = await CARD.findById(req.params.id).populate("book");
            return res.send(card);
        }catch(error){
            return next(
                new ApiError(500, `An error: ${error} occurred while update Card`)
            );
        }
    }
}

module.exports = cardController;