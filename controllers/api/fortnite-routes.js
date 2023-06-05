const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const apiKey = process.env.API_KEY_FORTNITE;

router.get('/:accountid', (req, res) => {
  const accountId = req.params.accountid;
  const requestUrl = `https://fortnite-api.com/v2/stats/br/v2/${accountId}`;

    //.then((response) =>  response.json())
  axios
    .get(requestUrl, {
            headers: {
                'x-api-key': apiKey
            }
        })
        .then((response) => {
            const temp = response.data;
            res.json(temp);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving Fortnite stats.' });
        });
});


// router.get('/:accoutid', (req, res) => {
//     const accountId = req.params.accoutid;
//     const requestURL = `https://fortnite-api.com/v2/stats/br/v2/${accountId}`;
  
//     axios.get(requestURL)
//       .then(response => {
//         res.json(response.data);
//       })
//       .catch(err => res.status(500).json(err));
//   });


module.exports = router;