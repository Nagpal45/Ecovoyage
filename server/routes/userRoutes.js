const router = require('express').Router();
const User = require('../models/User');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = `../client/public/uploads/${req.params.userId}`;
      fs.mkdirSync(destination, { recursive: true });
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + "profilePic" + '.jpg');
    },
  });

  const upload = multer({ storage: storage });

router.post('/upload/:userId', upload.single('file'), async (req, res) => {
  const userId = req.params.userId;
  const photoURL = `/uploads/${userId}/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { picture: photoURL },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
}
);


router.put('/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
  
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedUserData,
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user.' });
    }
  });

    module.exports = router;