const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));





var que ='';
var marks = '';

var gained = '';
var feed = '';


app.get('/give-questions',(req,res)=>
{
    console.log("sending questions to client");
    res.send({marks:marks,question:que});

});

app.get('/get-results',(req,res)=>{
    console.log("sending results");
    res.send({marks:gained,feedback:feed});

});







//SUBMISSION HANDLING
app.post('/submit-question',(req,res)=>{

    const mark = req.body.marks;
    const question = req.body.question;

    que = question;
    marks = mark;

   
    res.send("Questions Submitted!");


});


app.post("/submit-answer", async (req, res) => {
    const question = req.body.question;
    const marks = req.body.marks;

  const completion = await openai.createChatCompletion(
    {
      model:'gpt-3.5-turbo',
      messages: [
        {role:'user',content:`You are a university professor give marks out of ${marks} on this answer "${req.body.answer}" For this questions "${question}" Please only give output in this format "<total_marks>,<Reasons>" please maintain this format `}
      ]
    });

    const detail = completion.data.choices[0].message.content.split(',');

    console.log("MARKS :",detail[0]);
    console.log("FEEDBACK :",detail[1]);

    feed = detail[1];
    gained = detail[0];


    res.send("submissions done results will be annouced soon");
  }
  )

const port =  5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));