const express = require('express');
const zod = require('zod');
const authMiddleware = require("../middleware");
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config').JWT_SECRET;
const { User, Account } = require("../db");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName:zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

// Routes
router.post('/signup', async (req, res) => {
    //check if schema is valid
    const { success } = signupSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json ({
            message: "Email already taken / Incorrect inputs"
        })
    }
    //check for existing user
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    //else create a new user
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    //get id
    const userId = user._id;
    // Create a new account for user
    await Account.create({
        userId,
        balance: 1 + Math.floor(Math.random() * 100)
    })
    //create a token
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '7d'
    })
    //send a response
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
});

router.post('/signin', async (req, res) => {
    const body = req.body;
    //check for valid signinSchema
    const { success } = signinSchema.safeParse(body);
    if(!success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //check for existing user
    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(!existingUser) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    //create a token
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    //send a response
    res.status(200).json({ token: token })
})

//Get users based on filter
router.get("/bulk", authMiddleware, async (req, res) => {
    //set "filter" query parameter from the HTTP request, OR an empty string if the query parameter is not present.
    const filter = req.query.filter || "";
    const user = await User.find({
        //or is for either firstName or lastName should match
        $or: [{
                firstName: {
                    "$regex": filter
                },
            },
            {
                lastName: {
                    "$regex": filter
                },
            }]
    })
    //send out user info
    res.json({
        user: user.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
})

//update user information
router.put('/', authMiddleware, async (req, res) => {
    //check for valid updateSchema
    const { success } = updateSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information."
        })
    }
    //update user
    await User.updateOne({ _id: req.userId }, req.body)
    //send a response
    res.status(200).json({
    message: "Updated successfully"
    });
});

router.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

module.exports = router;
