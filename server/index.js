const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('./passport');
require('./db');
// const fs = require('fs');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 *1000
    }

})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use('/auth', authRoutes);
app.use('/api/users', userRoutes)

// let hotelData = [];

// function loadHotels() {
//     try{
//         const data = fs.readFileSync('./airbnb-listings1.json');
//         hotelData = JSON.parse(data);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// loadHotels();

// app.get('/api/hotels', (req, res) => {
//     const page = req.query.page;
//     const pageSize = 100;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     const results = hotelData.slice(startIndex, endIndex);
//     res.json(results);
// }
// );


app.listen(5000, () => console.log('Server is running on port 5000'));

