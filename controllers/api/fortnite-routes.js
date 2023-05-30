const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const apiKey = process.env.API_KEY_FORTNITE;

router.get('/:accoutid', (req, res) => {
  accountId = req.params.accoutid
  const requestUrl = `https://fortnite-api.com/v2/stats/br/v2/?name=${accountId}`
  axios.get(requestUrl, {
    headers: {
      'x-api-key': apiKey
    }
  })
    //.then((response) =>  response.json())
    .then((data) => {
      const temp = data.data
      res.json(temp)
    })
    .catch(err => {
      
      console.error(err);
    });
})


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