const express = require("express");
const mongoose = require("mongoose");

// sabry
//for body encode using classic way
const bodyParser = require("body-parser");

let app = express();

//middle ware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://0.0.0.0:27017/")
  .then(() => console.log("connected successfully"))
  .catch((err) => {console.error(err);
  });

const userscheama = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

let usermodel = mongoose.model("user", userscheama);



const animalscheama = new mongoose.Schema({
  name: String,
  kind: String,
  age: Number,
});

let animalmodel = mongoose.model("animal", animalscheama);

let animal1 = new animalmodel({
  name: "dog",
  kind: "BEARDED COLLE",
  age: 5,
}).save();

let animal2 = new animalmodel({
  name: "dog",
  kind: "MALTESE",
  age: 3,
}).save();

let animal3 = new animalmodel({
  name: "dog",
  kind: "POODLE",
  age: 4,
}).save();

let animal4 = new animalmodel({
  name: "cat",
  kind: "CHERAZI",
  age: 2,
}).save();

let animal5 = new animalmodel({
  name: "cat",
  kind: "PERSAIN",
  age: 1,
}).save();

let animal6 = new animalmodel({
  name: "cat",
  kind: "TURKISH VAN",
  age: 3,
}).save();

let animal7 = new animalmodel({
  name: "hamster",
  kind: "CAMBELL'S DWARF",
  age: 2,
}).save();

let animal8 = new animalmodel({
  name: "hamster",
  kind: "ROBOROVSKI",
  age: 2,
}).save();

let animal9 = new animalmodel({
  name: "hamster",
  kind: "WINTER WHITE",
  age: 2,
}).save();

app.get("/users", async (req, res) => {
  let allusers = await usermodel.find();
  res.status(200);
  res.json({allusers});
});

app.get("/animals", async (req, res) => {
  let allanimals = await animalmodel.find();
  res.status(201);
  res.json({allanimals});
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/signup", async (req, res) => {
  const { fname, lname, email, password } = req.body;


  const user = await usermodel.findOne({ email });

  if (user) {
    res.status(400).json({ error: "Email is founded, login in" });
  }

  const newUser = await usermodel.create({
    fname,
    lname,
    email,
    password,
  });

  res.json(newUser);
});

app.post("/login", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const user = await usermodel.findOne({ fname, lname, email, password });

  if (!user) {
    res.status(400).json({ error: "there no account, please signup" });
  }

  res.status(200).json({ message: `hello ${fname} ${lname}` });
});

app.listen(3000, function () {
  console.log("i am listening at port 3000 now");
});
