require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");

const { PORT = 3000, DATABASE_URL } = process.env;
//const PORT = process.env.PORT || 3000;
const app = express();


//----------------------------------
// Database Connection
//----------------------------------
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

//----------------------------------
// Models
//----------------------------------

const PeopleSchema = new mongoose.Schema({
        name: String,
        image: String,
        title: String,
});

const People = mongoose.model("People", PeopleSchema);

//----------------------------------
// Middleware
//----------------------------------
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//----------------------------------
// Routes
//----------------------------------
app.get("/", (req, res) => {
        res.send("hello world");
      });

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
    
// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// PEOPLE Update ROUTE
app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// PEOPLE Delete ROUTE
app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE INDEX ROUTE
  app.get("/people/:id", async (req, res) => {
      try {
        // send all people
        res.json(await People.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });




app.listen(PORT, () => console.log(`listing on port ${PORT}`))