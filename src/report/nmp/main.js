//Using Express
const express = require('express');
const mongoose = require('mongoose');
const cars=require('cars');
mongoose.set('strictQuery',true);

//create an instance of express
const app = express();

//app.use(cars())
app.use(express.json())
const { Schema } = mongoose;

// connecting mongodb
mongoose.connect('mongodb://localhost:27017/demodb')
  .then(() => {
    console.log('DB Connected!')
  })
  .catch((err) => {
    console.log(err)
  })

//schema
const userSchema = new Schema({
  title: {
    require: true,
    type:String
  },
  description: String
  
});

//model
const Users= mongoose.model('Users', userSchema);

//post
app.post('/user', async function (req, res) {
 try {
var payload = req.body;
   const user= await new Users(payload);
   user.save().then(() => console.log('bubbles'));
    res.end('Record Created');
} catch (err) {
    console.log(err);
}
})

//get

app.get('/users', async function (req, res) {
try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
console.log(error)
   res.status(500).json({ message: error.message });
 }
})

//put

app.put("/users/update/:id", async (req, res) => {
try {
   const id = req.params.id;
    const { title,description } = req.body
    const updateUserData = await Users.findByIdAndUpdate(
id,
{ title,description },
)
res.json(updateUserData)
 } catch (err) {
    console.log(err)
 }
})

//delete

app.delete("/user/delete/:id", async (req, res) => {
  try {
   const id = req.params.id;
await Users.findByIdAndDelete(id)
   res.status(204).end();
  } catch (err) {
console.log(err)
  }
})

//Start the server

const port = 4000;
app.listen(port, () => {
  console.log("Server is listening to port " + port);
})                                                      