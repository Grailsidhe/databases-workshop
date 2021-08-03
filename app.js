const { response } = require("express");
const express = require("express");
const app = express();
const port = 8080;
const database = require("./database");
//TO have access to body 
app.use(express.urlencoded({extended: false}))
app.use(express.json())


database.connect((error)=>{
    if(error){
      console.log(error)
    } else {
        console.log("Connected suddessfully to database")
    }
});

//GET homepage
app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

//GET all players
app.get("/players", (req, res)=>{
  database.promise().query("SELECT * FROM players")
  .then((result)=>{
    console.log(result[0])
    res.json(res[0])
  })
  .catch((err)=>{
    res.status("400").send("Not found")
    console.log(err)
  })
});

//GET all players from any country
app.get("/players/:country", (req, res)=>{
  console.log(req.params.country)
  database.promise().query("SELECT * FROM players WHERE country=?", [req.params.country])
  .then((result)=>{
    console.log(result[0])
    response.json(res[0])
  })
  .catch((err)=>{
    res.status("400").send("Not found")
    console.log(err)
  })
});

//POST new player
app.post("/players/new", (req, res)=>{
  const {firstName, lastName, etc, etc2} = req.body
  console.log(firstName, lastName, etc, etc2)
  database.promise().query("INSERT INTO players (firstName, lastName, etc, etc2) VALUES (?, ?, ?, ?)", 
  [firstName, lastName, etc, etc2])
  .then((result)=>{
    console.log(result[0])
    response.json(res[0])
  })
  .catch((err)=>{
    res.status("400").send("Not found")
    console.log(err)
  })
})

//DELETE player by ID
app.delete("players/delete/:id", (req, res)=>{
  database.promise().query("DELETE FROM players WHERE id=?", [req.params.id])
  .then((result)=>{
    console.log(result[0])
    response.json(res[0])
  })
  .catch((err)=>{
    res.status("400").send("Not found")
    console.log(err)
  })
})


app.listen(port, () => console.log(`Listening on port ${port}...`));