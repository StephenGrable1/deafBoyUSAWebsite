const express = require('express');
require('dotenv').load();

const app = express();
const port = process.env.PORT || 5000;

const client = require('drip-nodejs')({
    token: process.env.DRIP_API_TOKEN,
    accountId: process.env.ACCOUNT_ID
});

const payload = {
    subscribers: [{
      email: "Stephen@acme.com",
      time_zone: "America/New_York",
      custom_fields: {
        name: "John Doe"
      }
    }]
  };


app.get('/api/hello', (req, res) => {
    client.createUpdateSubscriber(payload)
    .then((res) => {
        console.log(res.body)
      // Handle `response.body`
    })
    .catch((error) => {
        console.log(error)
      // Handle errors
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
