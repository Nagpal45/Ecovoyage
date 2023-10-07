const router = require('express').Router();
const User = require('../models/User');

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