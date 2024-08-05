import express, { json, response } from 'express';
import mongoose from 'mongoose';
import user from './Model/Signup.js';
import todo from './Model/Todo.js';
import cors from 'cors';
import Url from 'url';
import { ClientEncryption, MongoClient } from 'mongodb';



const connection_string = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(connection_string);
const dataBase = "Todo";

mongoose.connect("mongodb://127.0.0.1:27017/Todo")
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Some error in connection"))

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let response = await client.connect()
  let db = response.db(dataBase)
  let collection = db.collection("users")
  let userDb = await collection.find().toArray()
  // console.log(userDb)
  console.log("server is running")

})



app.post("/login", (req, res) => {
  let find;
  let loginData = req.body;
  console.log(loginData)
  user.findOne({ Email: loginData.userName }).then((user) => {
    if (user) {
      find = user;
      // console.log(find)
      res.send("yes")
    }
    else {
      console.log("user not found")
      res.send("user not found")
    }

  })


})
// app.use(cookieSession({
//   name: 'session',
//   keys: [/* secret keys */],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

app.post("/insert", (req, res) => {

  let userData = req.body;
  console.log(userData);
  let newUser = new user({
    Fullname: userData.fullname,
    Email: userData.email,
    Password: userData.password,
    contact: userData.contact

  })
  newUser.save();
  // console.log(newUser)
  res.send("Data Stored")

})

app.post("/newtodo", (req, res) => {
  let data = req.body;
  // console.log(data)s
  let newTodo = new todo({
    todouser: data.Todouser,
    title: data.Title,
    description: data.Description,
    todochecked: "Incomplete"

  })
  newTodo.save();
  console.log(newTodo)
  res.send(newTodo)

})


// get todo data
app.get("/tododata", async (req, res) => {
  let find;
  let loginData = req.query.param;
  console.log(loginData)
  todo.find({ todouser: loginData }).then((user) => {
    if (user) {
      find = user;
      console.log(find)
      res.send(user)
    }
    else {
      console.log("user not found")
      res.send("user not found")
    }
    // console.log(req.query + " get todo data")

  })


  // console.log(req.query.param)
})

// delete todo data
app.delete("/delete", async (req, res) => {
  let deleteid = req.query.param;
  // console.log(deleteid)
  await todo.findByIdAndDelete({ _id: deleteid }).then((result) => {
    // console.log(result)
    res.send(result.data)
  })


})

// Update Todo 
app.put("/update", async (req, res) => {
  let updateTodoid = req.query.param1;
  let updateTitle = req.query.param2;
  let updatedesc = req.query.param3;

  await todo.findByIdAndUpdate({ _id: updateTodoid }, { title: updateTitle, description: updatedesc }).then((result) => {
    // console.log(result)

  })

})

//Todo Status
app.put("/todoStatus", async (req, res) => {
  let updateTodoid = req.query.param1;


  await todo.findByIdAndUpdate({ _id: updateTodoid }, { todochecked: "Complete" }).then((result) => {
    // console.log(result)

  })

})

// todo filter data

app.get("/todofilter", async (req, res) => {

  let loginData = req.query.param1;
  let todostatus = req.query.param2
  console.log(loginData, todostatus)
  await todo.find({ todouser: loginData, todochecked: todostatus }).then((user) => {
    // console.log(user)
    res.send(user);

  })

})




app.listen(8000)