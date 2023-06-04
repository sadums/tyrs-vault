const router = require('express').Router();
const User = require('../../models/User');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/imgs/profiles/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, req.session.userid + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

/* ENDPOINT: "/api/user-profile/" */


// Edits user profile picture
// ENDPOINT: "/api/user-profile/edit-picture"
router.post('/edit-picture', upload.single('profilePictureSubmit'), async (req, res) => {
    console.log(req.file);
    try {
        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(400).json({ message: "something went wrong, please try again" });
        }

        user.pfp = `./imgs/profiles/${user.dataValues.id}.png`;
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
        if (!req.body.description) {
            res.status(400).json({ message: "No description included" });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(400).json({ message: "something went wrong, please try again" });
            return;
        }

        user.description = req.body.description;
        await user.save();

        res.status(200).json({ message: "Description was changed" });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});


// Edits user username
// ENDPOINT: "/api/user-profile/edit-username"
router.post('/edit-username', async (req, res) => {
    try {
        if (!req.body.username) {
            res.status(400).json({ message: "No username included!" });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(400).json({ message: "something went wrong, please try again" });
            return;
        }

        user.username = req.body.username;
        await user.save();

        res.status(200).json({ message: "Username was changed" });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});



module.exports = router;