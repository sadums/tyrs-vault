const router = require('express').Router();
const User = require('../../models/User');
const multer = require('multer');
const upload = multer({dest: '../../public/imgs/profiles'});

/* ENDPOINT: "/api/user-profile/" */


// Edits user profile picture
// ENDPOINT: "/api/user-profile/edit-picture"
router.post('/edit-picture', upload.single('profileImage'), async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userid);

        if(!user){
            res.status(400).json({message: "something went wrong, please try again"});
        }

        user.pfp = `./imgs/profile/${user.dataValues.id}/pfp.png`;
        await user.save();

        res.status(200).json({
            path: user.dataValues.pfp,
            message: "added file path to user"
        })
    } catch (e) {
        console.error(e);
    }
});

// Edits user description
// ENDPOINT: "/api/user-profile/edit-description"
router.post('/edit-description', async (req, res) => {
    try {
        if(!req.body.description){
            res.status(400).json({ message: "No description included" });
        }

        const user = await User.findByPk(req.session.userid);

        if(!user){
            res.status(400).json({message: "something went wrong, please try again"});
        }

        user.description = req.body.description;
        await user.save();

        res.json(200).status({message: "Description was changed"});
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router;