const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const client = require('drip-nodejs')({
    token:'8f073dbe3865832d8c40ef52cd0a9fdb',
    accountId: '5542548'
});

const payload = {
    subscribers: [{
      email: "Stephen@acme.com",
      time_zone: "America/Los_Angeles",
      custom_fields: {
        name: "John Doe"
      }
    }]
  };


app.get('/api/hello', (req, res) => {
    client.createUpdateSubscriber(payload)
    .then((res) => {
        console.log(res)
      // Handle `response.body`
    })
    .catch((error) => {
        console.log(error)
      // Handle errors
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
