const express = require('express');
const authMiddleware = require('../middleware');
const mongoose = require('mongoose');
const { Account } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    //start a MongoDB session
    const session = await mongoose.startSession();
    session.startTransaction();
    //extract to & amount from request body
    const {to, amount} = req.body;
    //find user's account and check for suffiecient balance
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    //find receipient's account
    const toAccount = await Account.findOne({ userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }
    //perform transfer
    //In mongoDB, $inc operator is used to increment or decrement value of a field in a document. When used with updateOne func, it allows us to atomically modify the value of the specified field.
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, { session });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, { session });
    //commit transaction
    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })
})

// async function transfer(req) {
//     // print user corrent account balance
//     console.log("start")

//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         // console.log("Balance", account.balance);
//         console.log("Insufficient balance")
//         return;
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         console.log("Invalid account")
//         return;
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     console.log("done")
// }

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 10
//     }
// })

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

module.exports = router;