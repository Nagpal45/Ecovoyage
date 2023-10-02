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
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json('User does not exist');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json('Invalid password');
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.status(200).json({token,user});

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
}));

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "User has successfully authenticated.",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "User failed to authenticate."
    });
}
);



router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('http://localhost:3000/');
    });
});




module.exports = router;