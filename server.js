const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

let phonebok = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

//Implement a Node application that returns a hardcoded list of phonebook entries from the address
app.get("/api/persons", function (req, res) {
  res.send(phonebok);
});

//Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
//If an entry for the given id is not found, the server has to respond with the appropriate status code.
app.get("/api/persons/:id", function (req, res) {
  const person = phonebok.find((p) => p.id === req.params.id);
  if (!person) {
    return res.status(404).send("The person with the given ID was not found.");
  }
  res.send(person);
});

//The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.
app.get("/info", function (req, res) {
  res.send(
    `<p>Phone been has info for ${
      phonebok.length
    }</p><p> ${new Date().toString()}</p>`
  );
});

// delete a phonebook with the param supplied
app.delete("/api/persons/:id", function (req, res) {
  const index = phonebok.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    phonebok.splice(index, 1);
    return res
      .status(204)
      .send(`user with id ${req.params.id} deleted successfully`);
  }

  res.status(404).send("id does not exist");
});

app.post("/api/persons", function (req, res) {
  const body = req.body;

  // check if name of number exists
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name and number must be provided" });
  }

  // check if name already exists
  const person = phonebok.find((p) => p.name.trim() === body.name.trim());

  if (person) {
    return res.status(400).json({ error: "name must be unique" });
  }

  // generate unique ID for the entry
  const Id = Math.floor(Math.random() * 1000000) + 101050;

  phonebok = [
    ...phonebok,
    {
      id: String(Id),
      name: body.name,
      number: body.number,
    },
  ];
});

app.listen(process.env.PORT, function (request, response) {
  // app.listen(process.env.PORT, function
  console.log("Server is running on port 3000");
});
