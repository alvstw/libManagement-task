import express from 'express';
import {Book} from "../models/book.js";
import {invalidError, notFoundError} from "../utils/error.js";
import {User} from "../models/user.js";
import {Borrow} from "../models/borrow.js";
import {Op} from "sequelize";
import {isEmpty} from "../utils/object.js";

const router = express.Router();

router.get('/search', async function (req, res, next) {
    const title = req.query.title;
    const author = req.query.author;
    let published_date = req.query.published_date;
    let is_available = req.query.is_available?.toLowerCase();
    const genre = req.query.genre;
    let rating = req.query.rating;

    if (published_date) {
        // Attempt to parse the published_date value as a date using JavaScript's Date constructor
        const parsedDate = new Date(published_date);

        // If parsing fails, return an error response to the client
        if (isNaN(parsedDate)) {
            return invalidError(res, 'Invalid published date format')
        }

        published_date = parsedDate;
    }

    if (is_available !== undefined) {
        if (is_available !== 'true' && is_available !== 'false') {
            return invalidError(res, 'Invalid is_available format')
        }
        is_available = is_available === 'true';
    }

    if (rating !== undefined) {
        // Attempt to convert rating to a float using JavaScript's parseFloat function
        const parsedRating = parseFloat(rating);

        // If parsing fails, return an error response to the client
        if (isNaN(parsedRating)) {
            return invalidError(res, 'Invalid rating format')
        }

        rating = parsedRating;
    }

    const filter = {}
    if (title) filter.title = { [Op.like]: `%${title}%` };
    if (author) filter.author = { [Op.like]: `%${author}%` };
    if (published_date) filter.published_date = published_date;
    if (is_available !== undefined) filter.is_available = is_available;
    if (genre) filter.genre = { [Op.like]: `%${genre}%` };
    if (rating !== undefined) filter.rating = { [Op.gte]: rating };

    if (isEmpty(filter)) return invalidError(res, 'Invalid search parameters')

    const books = await Book.findAll({
        where: filter
    });

    res.send(books);
});

router.get('/:bookId', async function (req, res, next) {
    const userId = req.params.bookId;
    const book = await Book.findOne({
        where: {
            id: userId,
        }
    });

    res.send(book);
});

router.post('/:bookId/borrow', async function (req, res, next) {
    const userId = req.query.userId;
    if (!userId) {
        return invalidError(res, "invalid userId");
    }
    const user = await User.findOne({
        where: {
            id: userId,
        }
    })
    if (!user) {
        return notFoundError(res, "User not found");
    }

    const bookId = req.params.bookId;
    const book = await Book.findOne({
        where: {
            id: bookId,
            is_available: true,
        }
    });
    if (!book) {
        return notFoundError(res, "Book does not exist");
    }

    const existingBorrows = await Borrow.findAll({
        where: {
            user_id: userId,
            book_id: bookId,
            return_date: {
                [Op.is]: null
            }
        }
    })
    if (existingBorrows.length > 0) {
        return invalidError(res, "The book has been borrowed already");
    }
    const borrow = await Borrow.create({
        user_id: userId,
        book_id: bookId,
        borrow_date: Date.now()
    })

    res.send(borrow);
});

router.post('/:bookId/return', async function (req, res, next) {
    const userId = req.query.userId;
    if (!userId) {
        return invalidError(res, "invalid userId");
    }

    const bookId = req.params.bookId;

    const existingBorrows = await Borrow.findAll({
        where: {
            user_id: userId,
            book_id: bookId,
            return_date: {
                [Op.is]: null
            }
        }
    })
    if (existingBorrows.length === 0) {
        return invalidError(res, "No borrow records found");
    }
    const borrow = await Borrow.update({
        return_date: Date.now()
    }, {
        where: {
            user_id: userId,
            book_id: bookId,
        }
    })

    res.send(borrow);
});

export default router;
