const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice) {
            return res.status(400).json({ Message: "All fields are required", Success: false });
        }

        const bookAdd = await Book.create(body); 

        if (bookAdd) {
            return res.status(201).json({ Message: "Book added successfully", Success: true, Data: bookAdd });
        }

        console.log("Book added:", bookAdd);


    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false });
    }
};

const handleBookListController = async (req, res) => {
    try {
        const bookList = await Book.find({});
        return res.status(200).json({ Message: "All books fetched successfully", Success: true, TotalCount: bookList.length, BookList: bookList });

    } catch {
        return res.status(400).json({ Message: error.message, Success: false });

    }
};


const handleBookDeleteController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ Message: "ID is required", Success: false });
        }

        const deleted = await Book.deleteOne({ _id: id });

        if (deleted.deletedCount === 1) {
            return res.status(200).json({ Message: "Book deleted successfully", Success: true });
        } else {
            return res.status(404).json({ Message: "Book not found", Success: false });
        }

    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false });
    }
};

const handleBookUpdateController = async (req, res) => {
    try {
        const body = req.body;

        const updating = await Book.updateOne({ _id: body?.Id }, { $set: body });

        console.log(updating);

        if (updating?.acknowledged) {
            return res.json({
                Message: "Book updated successfully",
                Success: true,
            })
        }
    } catch (error) {
        return res.status(500).json({ Message: error.message, Success: false });
    }
}

module.exports = { handleBookStoreController, handleBookListController, handleBookDeleteController,handleBookUpdateController };
