const AUTHOR = require("../models/author.model");
const BOOK = require("../models/book.model");
const ApiError = require("../api-error");

async function phanTrang(id, fields, limit, page) {
    const tempt = []; let i = 0;
    do {
        let t = [];
            t = await AUTHOR.findById(id,fields).populate("books")
            console.log(t);
        
        if (t.length === 0) {
            break;
        } else if (t.length < limit) {
            tempt.push(t);
            break;
        }
        tempt.push(t);
        i++;
    } while (i < page);
    console.log(tempt)
    return tempt;
}

const authorController = {
    addAnAuthor: async (req, res, next) => {
        try {
            const newAuthor = new AUTHOR(req.body);
            const savedAuthor = await newAuthor.save();
            return res.send(savedAuthor);
        } catch (error) {
            return next(
                new ApiError(500, `An error: ${error} occurred while add an author`)
            );
        }
    },

    getAllAuthors: async (req, res, next) => {
        try {
            const authors = await AUTHOR.find({},{full_name: 1});
            return res.send(authors);
        } catch (error) {
            return next(
                new ApiError(500, `An error: ${error} occurred while get all authors`)
            );
        }
    },

    getAnAuthor: async (req, res, next) => {
        try {
            // console.log(req.params.id)   
            // const author = await phanTrang(req.params.id,{},12,1);
            const author = await AUTHOR.findById(req.params.id).populate("books");
            // console.log("author", author);
            return res.send(author);
        } catch (error) {
            return next(
                new ApiError(500, `An error: ${error} occurred while get a author`)
            );
        }
    },

    updateAuthor: async (req, res, next) => {
        try {
            let author = await AUTHOR.findById(req.params.id);
            if (author) {
                let oldBooks = [];
                oldBooks = author.books.map(e => e._id.toHexString())
                const newBooks = req.body.books ? req.body.books : [];

                const noChanges = oldBooks.filter(e => newBooks.includes(e));
                const needRemove = oldBooks.filter(e => !noChanges.includes(e));
                const needAdd = newBooks.filter(e => !noChanges.includes(e));
                /*
    
                    1. Cho phần author: null cho tất cả các book có id trong needRemove[]
                    2. Sửa lại author từ id cũ sang req.params.id cho tất cả các book có id trong needAdd[]
                    3. updateOne req.body cho author có id req.params.id
    
                */
                needRemove.forEach(async (e) => {
                    await BOOK.findById(e).updateOne({ author: null })
                })

                needAdd.forEach(async (e) => {
                    const book = await BOOK.findById(e);
                    if (book) {
                        await AUTHOR.updateMany({ books: e }, { $pull: { books: e } })
                        await book.updateOne({ author: req.params.id });
                    }
                })

                author = await AUTHOR.findById(req.params.id);
                await author.updateOne({ $set: req.body });
            }

            return res.send({ message: "Author was updated successfully" });
        } catch (error) {
            return next(
                new ApiError(500, `An error: ${error} occurred while update author`)
            );
        }
    },

    deleteAnAuthor: async (req, res, next) => {
        try {
            await BOOK.updateMany({ author: req.params.id }, { author: null })
            const document = await AUTHOR.findByIdAndDelete(req.params.id);

            if (!document) {
                return next(new ApiError(404, "Author not found"));
            }
            return res.send({ message: " Author was deleted successfully" });

        } catch (error) {
            return next(
                new ApiError(500, `An error: ${error} occurred while delete an author`)
            );
        }
    }
}

module.exports = authorController;