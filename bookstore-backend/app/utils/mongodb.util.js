const mongoose = require("mongoose");
const ROLE = require("../models/role.model.js");
const BOOK = require("../models/book.model.js");
const bookController = require("../controllers/book.controller.js");

async function initial() {
    ROLE.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new ROLE({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            new ROLE({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

class MongoDB{
    static connect = async (uri) => {
        if(this.client){
            // console.log(this.client)
            return this.client;
        } 
        this.client = await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              }).then(() => {
                initial();

                // const collection = this.client.db('bookstore').collection('books');
                // collection.createIndex({title: "text"})
              });
            //   console.log(this.client)
        
        return this.client;
    }
}

module.exports = MongoDB;