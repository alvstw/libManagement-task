import express from 'express';
import {Borrow} from "../models/borrow.js";
import {notFoundError} from "../utils/error.js";

const router = express.Router();

router.get('/:userId', async function (req, res, next) {
    const userId = req.params.userId;
    const borrows = await Borrow.findAll({
        where: {
            user_id: userId,
        }
    });
    
    if (borrows.length === 0) {
        return notFoundError(res);
    }
    
    res.send(borrows);
});

export default router;
