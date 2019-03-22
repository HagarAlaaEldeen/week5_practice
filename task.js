const Joi = require('joi');
const week5_Vidly = require('./routes/week5_Vidly');  //exported file
const express= require ('express');
const app= express();
// app has 4 methods{get,post,put,del}.

app.use(express.json());
app.use('/api/Vidly', week5_Vidly);

const port=process.env.port||5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

