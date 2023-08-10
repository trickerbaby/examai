const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); // Use the body-parser middleware

const password = "Navya#1427";
const encodedPassword = encodeURIComponent("Navya#1427");
const uri = `mongodb+srv://trickerbaby:${encodedPassword}@cluster0.rq5ucba.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  console.log("welcome to server");
  res.send("welcome to db server");
});

app.post('/insertquestion', async (req, res) => {
  const examdata = req.body;
  console.log("questions insertion came", examdata);
  try {
    const db = client.db("myDatabase");
    const quecollection = db.collection("questions");

    // Find a user with the specified username and password
    await quecollection.insertOne(examdata); // Use await as it's an asynchronous operation
    res.send("success!");
  } catch (err) {
    console.error(err);
    res.send({ success: false });
  }
});



app.get('/getSubject', async (req, res) => {
  console.log("arrived in");
    const subjectCode = req.query.subjectCode;
    const date = req.query.date;
    console.log("arrived ",subjectCode);
    console.log("arrived on ",date);
    
    try {
      // Assuming you have a MongoDB collection named 'subjects'
      const db = client.db("myDatabase");
      const queCollection = db.collection("questions");
  
      // Find the subject with the specified subjectCode
      const subject = await queCollection.findOne({ subjectCode,date });
      console.log(subject);
  
      if (subject) {
        res.json(subject);
      } else {
        res.json({ error: "Subject not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
