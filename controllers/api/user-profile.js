const router = require('express').Router();
const User = require('../../models/User');
const fs = require('fs');

/* ENDPOINT: "/api/user-profile/" */


//sends all data in the users table
// ENDPOINT: "/api/user-profile/edit-picture"
router.post('/edit-picture', async (req, res) => {
    try {
        if(!req.body.pfp){
            res.status(400).json({ message: "No profile picture included" });
        }

        const user = await User.findByPk(req.session.userid);

        if(!user){
            res.status(400).json({message: "something went wrong, please try again"});
        }

        user.pfp = req.body.pfp;
        await user.save(`./imgs/profile/${user.dataValues.id}/pfp`);

        fs.open(`../../public/imgs/profile/${user.dataValues.id}/pfp`, req.body.pfp, (e) => {
            e ? console.error(e) : console.log("Profile picture uploaded");
        })
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});



module.exports = router;