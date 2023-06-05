const router = require('express').Router();
const User = require('../../models/User');
const path = require('path');
const multer = require('multer');
const Platform = require('../../models/Platform');
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


router.get('/get-platforms', async (req, res) => {
    try{
        const platforms = await Platform.findAll({
            where: {
                user_id: req.session.userid
            }
        });

        if(!platforms){
            res.status(200).json({message: "User has no platforms"});
            return;
        }

        res.status(200).json(platforms);
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.post('/add-platform', async (req, res) => {
    try {
        if (!req.body.platform || !req.body.username) {
            res.status(400).json({ message: "req.body is not correct" });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: "Something went wrong, please try again" });
            return;
        }

        const addedPlatform = await Platform.create({
            user_id: user.dataValues.id,
            platform_name: req.body.platform,
            platform_username: req.body.username
        });

        if (!addedPlatform) {
            res.status(400).json({ message: "failed to add platform" });
            return;
        }

        res.status(200).json({
            message: "Platform added successfully",
            platform: addedPlatform
        });

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put('/edit-platform', async(req, res) => {
    try{
        if (!req.body.platform || !req.body.username) {
            res.status(400).json({ message: "req.body is not correct" });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: "Something went wrong, please try again" });
            return;
        }

        const updatedPlatform = await Platform.findOne({
            where: {
                user_id: user.dataValues.id,
                platform_name: req.body.platform,
            }
        });

        updatedPlatform.platform_username = req.body.username;

        await updatedPlatform.save();

        res.status(200).json({message: "Platform updated successfully"});

    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
})


router.delete('/delete-platform', async (req, res) => {
    try {
        if (!req.body.platform || !req.body.username) {
            res.status(400).json({ message: "req.body is not correct" });
            return;
        }

        const user = await User.findByPk(req.session.userid);

        if (!user) {
            res.status(404).json({ message: "Something went wrong, please try again" });
            return;
        }

        await Platform.destroy({
            where: {
                user_id: user.dataValues.id,
                platform_name: req.body.platform,
                platform_username: req.body.username
            }
        });


        res.status(200).json({message: "Platform deleted successfully"});
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router;