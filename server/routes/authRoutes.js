const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');


router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,

        });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User registered successfully', newUser, token});

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        let user = await User.findOne({username});
        if (!user) {
            return res.status(400).json('User does not exist');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json('Invalid password');
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.status(200).json({token});

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
    session: false
}), (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "none" });
    res.redirect("http://localhost:3000");
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("http://localhost:3000");
});




module.exports = router;