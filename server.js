const express = require('express');
const root = require('path').join(__dirname, 'client/build')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//server set up
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use(express.static(root));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ecom',  {
  useNewUrlParser: true,
});


app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

app.listen(port, ()=> console.log(`Listening on port ${port}`))