const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/todoroutes');

//middleware
app.use(cors());
app.use(express.json()); //req.body

const PORT = process.env.port || 5000;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
