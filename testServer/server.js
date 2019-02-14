const express = require('express');

const port = 1000;
const app = express();
const body = require('body-parser');

app.use(body.json());

const handler = () => (req, res) => {
    console.log(`server resp`,req.body);
    res.send('server resp');
};
app.get('*', handler()).post('*', handler());


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});