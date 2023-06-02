const router = require('express').Router();
const { text } = require('express');
const User = require('../../models/User');
const fs = require('fs');

/* ENDPOINT: "/api/user-profile/" */


// Edits user profile picture
// ENDPOINT: "/api/user-profile/edit-picture"
router.post('/edit-picture', async (req, res) => {
    try {
        res.json(req.body);
        // console.log("HERE");
        // let test = JSON.parse(req.body.pfp);
        // console.log(test);
        // console.log("HERE");
        // if(!req.body.pfp){
        //     res.status(400).json({ message: "No profile picture included" });
        // }

        // const user = await User.findByPk(req.session.userid);

        // if(!user){
        //     res.status(400).json({message: "something went wrong, please try again"});
        // }

        // user.pfp = `./imgs/profile/${user.dataValues.id}/pfp.png`;
        // await user.save();

        // fs.open(`../../public/imgs/profile/${user.dataValues.id}/pfp.png`, req.body.pfp, (e) => {
        //     e ? console.error(e) : res.status(200).json({message: "Profile picture changed"});
        // });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
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